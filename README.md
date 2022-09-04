[![](https://vsmarketplacebadge.apphb.com/version/chrisbibby.hide-node-modules.svg)](https://marketplace.visualstudio.com/items?itemName=chrisbibby.hide-node-modules)
[![](https://vsmarketplacebadge.apphb.com/installs/chrisbibby.hide-node-modules.svg)](https://marketplace.visualstudio.com/items?itemName=chrisbibby.hide-node-modules)
[![](https://vsmarketplacebadge.apphb.com/rating/chrisbibby.hide-node-modules.svg)](https://marketplace.visualstudio.com/items?itemName=chrisbibby.hide-node-modules&ssr=false#review-details)
[![Known Vulnerabilities](https://snyk.io/test/github/ChrisBibby/vscode_hide-node-modules/badge.svg)](https://snyk.io/test/github/ChrisBibby/vscode_hide-node-modules)
[![OpenVSX Downloads](https://shields.io/open-vsx/dt/ChrisBibby/hide-node-modules?label=Open%20VSX%20Downloads&style=flat-square&color=green)](https://open-vsx.org/extension/chrisbibby/hide-node-modules)

# Hide Node Modules README

This VSCode extension adds the ability to show and hide the `node_modules` folder from within the file explorer, via a context-menu, shortcut keys, command palette or status bar. The option to show or hide the `node_modules` folder is only available if a `package.json` or `package-lock.json` is detected within the current workspace folder.

![Hide Node Modules VSCode Extension](https://raw.githubusercontent.com/chrisbibby/vscode_hide-node-modules/master/resources/hide-node-modules_screenshot_01.png 'Hide Node Modules')

## Features

- Show and hide the `node_modules` folder
- Explorer context menu
- Auto hide `node_modules` when opening a new folder
- Status bar indicator when hiding a `node_modules` folder

## How to use

| Action            | Windows / Linux | macOS       | Command Palette     |
| ----------------- | --------------- | ----------- | ------------------- |
| Hide Node Modules | `ctrl-alt-n`    | `cmd-alt-n` | > Hide Node Modules |
| Show Node Modules | `ctrl-alt-n`    | `cmd-alt-n` | > Show Node Modules |

## How to manually unhide node_modules

If a folder is opened in VSCode without the [Hide Node Modules](https://marketplace.visualstudio.com/items?itemName=chrisbibby.hide-node-modules) extension but had previously used it to hide the `node_modules` folder, VSCode will keep it hidden - the extension uses an option within the VSCode `settings.json` file to control visibility of the `node_modules` folder.

To unhide the `node_modules` folder without using the extension:

1. Open the `settings.json` file located within the `.vscode` folder
2. Locate the line `"**/node_modules": true` within `"files.exclude": { ... }`
3. Change the value to `"**/node_modules": false`
4. Save the file

The `node_modules` folder should now be visible again within the explorer.

## Acknowledgements
- Folder Icons provided by: [Hide icons created by Those Icons - Flaticon](https://www.flaticon.com/free-icons/hide)
