import * as vscode from 'vscode';

interface Excluded {
  [property: string]: boolean;
}

let statusBarItem: vscode.StatusBarItem;

const disposables: vscode.Disposable[] = [];
const AUTO_HIDE_SETTING = 'hide-node-modules.enable';
const EXCLUDE = 'files.exclude';
const FILE_FILE_PATTERN = '**/**package*.json';
const FILE_WATCHER_PATTERN = '**/package*.json';
const NODE_MODULES = '**/node_modules';
const HIDE_COMMAND = 'hide-node-modules.hide';
const SHOW_COMMAND = 'hide-node-modules.show';

const packageJsonWatcher = vscode.workspace.createFileSystemWatcher(FILE_WATCHER_PATTERN, false, true, false);

const enableCommand = async () => {
  (await hasPackageJson()) ? statusBarItem.show() : statusBarItem.hide();
  vscode.commands.executeCommand('setContext', 'hide-node-modules:containsPackageJson', await hasPackageJson());
};

function hideNodeModules(hidden: boolean): void {
  const config = vscode.workspace.getConfiguration();
  const excluded: Excluded = config.get(EXCLUDE, {});
  excluded[NODE_MODULES] = hidden;
  config.update(EXCLUDE, excluded);
  vscode.commands.executeCommand('setContext', 'hide-node-modules:isHidden', hidden);
  toggleStatusBar(hidden);
}

function toggleStatusBar(hidden: boolean) {
  statusBarItem.text = hidden ? '$(eye-closed) Node_Modules' : '$(eye) Node_Modules';
  statusBarItem.tooltip = hidden ? 'Node_Modules - Hidden' : 'Node_Modules - Visible';

  (statusBarItem.command = hidden ? SHOW_COMMAND : HIDE_COMMAND),
    async () => {
      hideNodeModules(hidden);
    };
}
function getAutoHideSetting(): boolean {
  return vscode.workspace.getConfiguration().get(AUTO_HIDE_SETTING, false);
}

function previouslySet(): boolean {
  const excluded = vscode.workspace.getConfiguration().get(EXCLUDE, {});
  return NODE_MODULES in excluded;
}

function isNodeModulesVisible(): boolean {
  const excluded: Excluded = vscode.workspace.getConfiguration().get(EXCLUDE, {});
  return excluded[NODE_MODULES];
}

async function hasPackageJson(): Promise<boolean> {
  return (await vscode.workspace.findFiles(FILE_FILE_PATTERN)).length > 0;
}

disposables.push(
  vscode.commands.registerCommand(HIDE_COMMAND, async () => {
    hideNodeModules(true);
  })
);

disposables.push(
  vscode.commands.registerCommand(SHOW_COMMAND, async () => {
    hideNodeModules(false);
  })
);

export async function activate({ subscriptions }: vscode.ExtensionContext): Promise<void> {
  packageJsonWatcher.onDidCreate(async () => await enableCommand());
  packageJsonWatcher.onDidDelete(async () => await enableCommand());

  statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 1);

  const hidden = isNodeModulesVisible();
  vscode.commands.executeCommand('setContext', 'hide-node-modules:isHidden', hidden);
  toggleStatusBar(hidden);

  if (!previouslySet() && getAutoHideSetting()) {
    hideNodeModules(true);
  }

  subscriptions.push(...disposables, statusBarItem);

  await enableCommand();
}

export function deactivate(): void {
  // no-op.
}
