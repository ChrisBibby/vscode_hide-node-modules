import * as vscode from 'vscode';

interface Excluded {
  [property: string]: boolean;
}

let statusBarItem: vscode.StatusBarItem;

const AUTO_HIDE_SETTING = 'hide-node-modules.enable';
const EXCLUDE = 'files.exclude';
const FILE_FILE_PATTERN = '**package*.json';
const FILE_WATCHER_PATTERN = '**/package*.json';
const NODE_MODULES = '**/node_modules';
const SHOW_HIDE_COMMAND = 'hide-node-modules.hide';

const packageJsonWatcher = vscode.workspace.createFileSystemWatcher(FILE_WATCHER_PATTERN, false, true, false);
const enableCommand = async () => vscode.commands.executeCommand('setContext', 'hide-node-modules:containsPackageJson', await hasPackageJson());

function hideNodeModules(hide: boolean): void {
  const config = vscode.workspace.getConfiguration();
  const excluded: Excluded = config.get(EXCLUDE, {});
  excluded[NODE_MODULES] = hide;
  config.update(EXCLUDE, excluded);
  updateStatusBar(hide);
}

function updateStatusBar(hide:boolean): void {
  if (hide) {
    statusBarItem.text = '$(eye-closed) Node_Modules';
    statusBarItem.tooltip = 'Node_Modules - hidden';
  } else {
    statusBarItem.text = '$(eye) Node_Modules';
    statusBarItem.tooltip = 'Node_Modules - visible';
  }
}

function isNodeModulesVisible(): boolean {
  const excluded: Excluded = vscode.workspace.getConfiguration().get(EXCLUDE, {});
  return excluded[NODE_MODULES];
} 

function getAutoHideSetting(): boolean {
  return vscode.workspace.getConfiguration().get(AUTO_HIDE_SETTING, false);
}

function previouslySet(): boolean {
  const excluded = vscode.workspace.getConfiguration().get(EXCLUDE, {});
  return NODE_MODULES in excluded;
}

async function hasPackageJson(): Promise<boolean> {
  return (await vscode.workspace.findFiles(FILE_FILE_PATTERN)).length > 0;
}

export async function activate({ subscriptions }: vscode.ExtensionContext): Promise<void> {
  packageJsonWatcher.onDidCreate(async () => enableCommand());
  packageJsonWatcher.onDidDelete(async () => enableCommand());

  statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 1);
  statusBarItem.command = SHOW_HIDE_COMMAND, async () => {
    hideNodeModules(!isNodeModulesVisible());
  };

  statusBarItem.show();
	subscriptions.push(statusBarItem);
  updateStatusBar(isNodeModulesVisible());

  if (!previouslySet() && getAutoHideSetting()) {
    hideNodeModules(true);
  }

  enableCommand(); 
  
  vscode.commands.registerCommand(SHOW_HIDE_COMMAND, async () => {
    hideNodeModules(!isNodeModulesVisible());
  });
}

export function deactivate(): void {
  // no-op.
}
