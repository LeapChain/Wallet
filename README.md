<p align="center">
  <img alt="thenewboston logo" src="https://i.imgur.com/C8uhI2q.png" width="620">
</p>

<p align="center">
  <img alt="thenewboston logo" src="https://i.imgur.com/8bY8yCE.png">
</p>

## Overview

Source code for thenewboston account manager desktop application. This app allows users to connect to the digital
currency network, create accounts, send and receive funds, manage your nodes, and more.

## Project Setup

<b>NOTE: There is an issue with our app when using Node v.15. Please use Node v.14.</b>

This repo uses Yarn as the package manager instead of npm. Specifically it uses Yarn 2.

Ensure that you have Yarn installed:

```
npm install -g yarn
```

Install required packages:

```
yarn install
```

Start the app:

```
yarn start
```

To make an executable package:

```
yarn run package
```

### Troubleshooting setup

#### MacOS

**gyp: No Xcode or CLT version error**: If during the project setup you bump into the following error message, it means that something is wrong with your Xcode command line tools installation. This error is extremely common after upgrading to the MacOS Catalina 10.15.2. To fix it follow these steps:

```
gyp: No Xcode or CLT version detected!
gyp ERR! configure error
```

1. Verify that you have Xcode command line tools installed by running:

```
$ xcode-select -p
/Library/Developer/CommandLineTools
```

2. If you receive `xcode-select: command not found`, it means that you do not have it installed and you should install it by running:

```
$ xcode-select --install
```

3. If you already have it installed you can try checking for any updates by lauching Software Update from System Preferences or by using the `softwareupdate` command in the Terminal.

```
$ softwareupdate --list                     # this will find and list all the available software updates
$ softwareupdate --install <Product Name>   # this will install software updates for the given product
$ softwareupdate --install -a               # this will install all available software updates
```

_ps: If there is a pending MacOS update, you will probably need to first install it, allowing Xcode to be updated as well._

4. If the problem persists, we'll need to make a fresh install of the Xcode command line tools, for that you'll need to get its current location using the same command from step 1 and remove it from the disk. You will need administrator privileges (`sudo`) for this, so you may need to provide the root password to complete this step.

```
sudo rm -r -f /Library/Developer/CommandLineTools
```

5. If you already have `git` you'll probably get a prompt like the one below guiding you through the installation of the command line tools. If for some reason, this prompt does not show for you, you'll need to rerun the command from step 2 (`xcode-select --install`).

![command-line-tools-installation-prompt](https://miro.medium.com/max/700/0*s8rdlR3j3xVHcl95)

## Contributing

You can check your styling by running:

```
yarn run lint
```
