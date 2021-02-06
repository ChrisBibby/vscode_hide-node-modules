import * as vscode from 'vscode';

const packageJsonWatcher = vscode.workspace.createFileSystemWatcher('**/package*.json', false, true, false);

function hideNodeModules(hide: boolean): void {
  const config = vscode.workspace.getConfiguration();
  const excluded = config.get("files.exclude", {});

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (excluded as any)['**/node_modules'] = hide;
  config.update("files.exclude", excluded);
}

function isNodeModulesVisible(): boolean {
  const config = vscode.workspace.getConfiguration();
  const excluded = config.get("files.exclude", {});

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (excluded as any)['**/node_modules'];
} 

async function containsPackageJson(): Promise<boolean> {
  return (await vscode.workspace.findFiles('**package*.json')).length > 0;
}

const showHideCommand = async () => vscode.commands.executeCommand('setContext', 'hide-node-modules:containsPackageJson', await containsPackageJson());

export async function activate(): Promise<void> {
  packageJsonWatcher.onDidCreate(async () => showHideCommand());
  packageJsonWatcher.onDidDelete(async () => showHideCommand());

  showHideCommand(); 
  
  vscode.commands.registerCommand('hide-node-modules.hide', async () => {
    hideNodeModules(!isNodeModulesVisible());
  });
}

export function deactivate(): void {
  packageJsonWatcher.dispose();
}
