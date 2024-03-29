[![Rating](https://img.shields.io/visual-studio-marketplace/r/chrisbibby.hide-node-modules?color=blue&labelColor=grey)](https://marketplace.visualstudio.com/items?itemName=chrisbibby.hide-node-modules)
[![Review Ratings](https://img.shields.io/visual-studio-marketplace/stars/chrisbibby.hide-node-modules?color=blue&labelColor=grey)](https://marketplace.visualstudio.com/items?itemName=chrisbibby.hide-node-modules&ssr=false#review-details)
[![Marketplace Installs](https://img.shields.io/visual-studio-marketplace/i/chrisbibby.hide-node-modules?color=blue&labelColor=grey)](https://marketplace.visualstudio.com/items?itemName=chrisbibby.hide-node-modules)
[![OpenVSX Downloads](https://shields.io/open-vsx/dt/ChrisBibby/hide-node-modules?label=Open%20VSX%20Downloads&style=flat-square&color=blue&labelColor=grey)](https://open-vsx.org/extension/chrisbibby/hide-node-modules)

[![Last Github Commit](https://img.shields.io/github/last-commit/chrisbibby/vscode_hide-node-modules?color=blue&labelColor=grey)](https://github.com/ChrisBibby/vscode_hide-node-modules)
[![Last Updated](https://img.shields.io/visual-studio-marketplace/last-updated/chrisbibby.hide-node-modules?color=blue&labelColor=grey)](https://marketplace.visualstudio.com/items?itemName=chrisbibby.hide-node-modules)
[![Known Vulnerabilities](https://img.shields.io/snyk/vulnerabilities/github/chrisbibby/vscode_hide-node-modules?color=blue&labelColor=grey)](https://snyk.io/test/github/ChrisBibby/vscode_hide-node-modules)

# Hide Node Modules README

This VSCode extension adds the ability to show and hide the `node_modules` folder from within the file explorer, via a context-menu, shortcut keys, command palette or status bar. The option to show or hide the `node_modules` folder is only available if a `package.json` or `package-lock.json` is detected within the current workspace folder.

![Hide Node Modules VSCode Extension](https://raw.githubusercontent.com/chrisbibby/vscode_hide-node-modules/master/resources/hide-node-modules_screenshot_01.png 'Hide Node Modules')

## Features

- Show and hide the `node_modules` folder
- Explorer context menu
- Auto hide `node_modules` when opening a new folder
- Status bar indicator when hiding a `node_modules` folder
- Setting configurable between workspace and global

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
