import * as vscode from 'vscode';

interface Excluded {
  [property: string]: boolean;
}

let hideStatusBarItem: vscode.StatusBarItem;
let showStatusBarItem: vscode.StatusBarItem;

const AUTO_HIDE_SETTING = 'hide-node-modules.enable';
const EXCLUDE = 'files.exclude';
const FILE_FILE_PATTERN = '**/**package*.json';
const FILE_WATCHER_PATTERN = '**/package*.json';
const NODE_MODULES = '**/node_modules';
const HIDE_COMMAND = 'hide-node-modules.hide';
const SHOW_COMMAND = 'hide-node-modules.show';

const packageJsonWatcher = vscode.workspace.createFileSystemWatcher(FILE_WATCHER_PATTERN, false, true, false);

const enableCommand = async () => {
  vscode.commands.executeCommand('setContext', 'hide-node-modules:containsPackageJson', await hasPackageJson());
  vscode.window.showErrorMessage(`enableCommand ${isNodeModulesVisible()}`);
  updateUI(!isNodeModulesVisible());
};

function hideNodeModules(hidden: boolean): void {
  const config = vscode.workspace.getConfiguration();
  const excluded: Excluded = config.get(EXCLUDE, {});
  excluded[NODE_MODULES] = hidden;
  config.update(EXCLUDE, excluded);
  // updateUI(hidden);
}

async function updateUI(hidden: boolean): Promise<void> {
  vscode.commands.executeCommand('setContext', 'hide-node-modules:isHidden', hidden);
  (await hasPackageJson()) && hidden ? hideStatusBarItem.hide() : hideStatusBarItem.show();
  (await hasPackageJson()) && !hidden ? showStatusBarItem.hide() : showStatusBarItem.show();
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

const hideCommand = vscode.commands.registerCommand(HIDE_COMMAND, async () => {
  hideNodeModules(true);
});

const showCommand = vscode.commands.registerCommand(SHOW_COMMAND, async () => {
  hideNodeModules(false);
});

export async function activate({ subscriptions }: vscode.ExtensionContext): Promise<void> {
  packageJsonWatcher.onDidCreate(async () => enableCommand());
  packageJsonWatcher.onDidDelete(async () => enableCommand());

  hideStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 1);
  showStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 1);
  (hideStatusBarItem.command = HIDE_COMMAND),
    async () => {
      hideNodeModules(false);
    };

  (showStatusBarItem.command = SHOW_COMMAND),
    async () => {
      hideNodeModules(true);
    };

  hideStatusBarItem.text = '$(eye-closed) Node_Modules';
  hideStatusBarItem.tooltip = 'Node_Modules - Hidden';

  showStatusBarItem.text = '$(eye) Node_Modules';
  showStatusBarItem.tooltip = 'Node_Modules - Visible';

  subscriptions.push(hideCommand, showCommand, hideStatusBarItem, showStatusBarItem);

  if (!previouslySet() && getAutoHideSetting()) {
    hideNodeModules(true);
  }

  enableCommand();
}

export function deactivate(): void {
  // no-op.
}
