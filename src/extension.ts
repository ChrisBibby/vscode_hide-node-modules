import * as vscode from 'vscode';

interface Excluded {
  [property: string]: boolean;
}

let statusBarItem: vscode.StatusBarItem;

const AUTO_HIDE_SETTING = 'hide-node-modules.enable';
const EXCLUDE = 'files.exclude';
const FILE_FILE_PATTERN = '**/**package*.json';
const FILE_WATCHER_PATTERN = '**/package*.json';
const NODE_MODULES = '**/node_modules';
const HIDE_COMMAND = 'hide-node-modules.hide';
const SHOW_COMMAND = 'hide-node-modules.show';

const packageJsonWatcher = vscode.workspace.createFileSystemWatcher(FILE_WATCHER_PATTERN, false, true, false);

const enableCommand = async () => {
  const doesContain = await hasPackageJson();
  vscode.commands.executeCommand('setContext', 'hide-node-modules:containsPackageJson', doesContain);
  vscode.commands.executeCommand('setContext', 'hide-node-modules:isHidden', isNodeModulesVisible());
  doesContain ? statusBarItem.show() : statusBarItem.hide();
};

function hideNodeModules(hidden: boolean): void {
  const config = vscode.workspace.getConfiguration();
  const excluded: Excluded = config.get(EXCLUDE, {});
  excluded[NODE_MODULES] = hidden;
  config.update(EXCLUDE, excluded);
  updateStatusBar(hidden);
  vscode.commands.executeCommand('setContext', 'hide-node-modules:isHidden', hidden);
}

function updateStatusBar(hide: boolean): void {
  if (hide) {
    statusBarItem.text = '$(eye-closed) Node_Modules';
    statusBarItem.tooltip = 'Node_Modules - Hidden';
  } else {
    statusBarItem.text = '$(eye) Node_Modules';
    statusBarItem.tooltip = 'Node_Modules - Visible';
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

const hideCommand = vscode.commands.registerCommand(HIDE_COMMAND, async () => {
  hideNodeModules(true);
});

const showCommand = vscode.commands.registerCommand(SHOW_COMMAND, async () => {
  hideNodeModules(false);
});

export async function activate({ subscriptions }: vscode.ExtensionContext): Promise<void> {
  subscriptions.push(hideCommand);
  subscriptions.push(showCommand);

  packageJsonWatcher.onDidCreate(async () => enableCommand());
  packageJsonWatcher.onDidDelete(async () => enableCommand());

  statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 1);
  (statusBarItem.command = SHOW_COMMAND),
    async () => {
      hideNodeModules(!isNodeModulesVisible());
    };

  subscriptions.push(statusBarItem);

  updateStatusBar(isNodeModulesVisible());

  if (!previouslySet() && getAutoHideSetting()) {
    hideNodeModules(true);
  }

  enableCommand();
}

export function deactivate(): void {
  // no-op.
}
