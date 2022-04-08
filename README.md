# International product app

[![Build status](https://badge.buildkite.com/da76e9f3a571b1beb9727e1c7003988000addf77e2a103cb7a.svg?branch=main)](https://buildkite.com/fanduel/international-web-app)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=fanduel_intl-web-app&metric=code_smells&token=5d995c315f8eb478428b9e34da109ab237b34531)](https://sonarcloud.io/summary/new_code?id=fanduel_intl-web-app)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=fanduel_intl-web-app&metric=bugs&token=5d995c315f8eb478428b9e34da109ab237b34531)](https://sonarcloud.io/summary/new_code?id=fanduel_intl-web-app)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=fanduel_intl-web-app&metric=sqale_rating&token=5d995c315f8eb478428b9e34da109ab237b34531)](https://sonarcloud.io/summary/new_code?id=fanduel_intl-web-app)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=fanduel_intl-web-app&metric=reliability_rating&token=5d995c315f8eb478428b9e34da109ab237b34531)](https://sonarcloud.io/summary/new_code?id=fanduel_intl-web-app)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=fanduel_intl-web-app&metric=security_rating&token=5d995c315f8eb478428b9e34da109ab237b34531)](https://sonarcloud.io/summary/new_code?id=fanduel_intl-web-app)

### Docs

Documentation is available in [docs](docs)

### Installation

👋 If you're new to setting up a JavaScript environment on your machine - we'e got some more info about what bits you'll need with more context about what they do [here](#Getting-a-JS-Environment-up-and-running)

You need the following dependencies. Check the "engines" section in [package.json](https://github.com/fanduel/intl-web-app/blob/main/package.json) for the required versions.

-   NodeJs
-   yarn (latest: `brew install yarn --ignore-dependencies`)


After installing yarn, configure it as follows:

```sh
yarn config set save-prefix "~"
```

Install dependencies:

```sh
yarn
```

If you want to run gulp tasks manually, you can install Gulp CLI `yarn global add "gulpjs/gulp-cli"`

> Installation gotcha: on MacOS, respect the capitalisation of your repo path when using `cd`.

### Contributing

Files are linted with [eslint](https://eslint.org/) and automatically formatted with [prettier](https://github.com/prettier/prettier), you are pretty much covered. The best documentation will always be the code itself.

-   Please read the [styleguide](https://github.com/fanduel/intl-web-app/tree/main/docs/styleguide)
-   Create a branch and open a pull request
-   Commits have to adhere to the [following guidelines](https://github.com/fanduel/intl-web-app/blob/main/docs/styleguide/commit-guidelines.md)
    -   Only use `fix(target): message` when fixing a bug which exists in production
    -   Only use `feat(target): message` for user-facing features
- If you use VSCode there are extensions for both `eslint` and `prettier`. The VSCode eslint extension only formats `js` files by default, to use it for typescript too add `typescript` and `typescriptreact` to the `"eslint.validate"` key of your VSCode `settings.json`.

### Development

To run the app locally, against a devstack API or the production API:

```sh
yarn start --stack-name mydevstack --proxy
# or
yarn start --stack-name production --proxy
# served at http://localhost:3000 and https://localhost:3001
```

| Arguments                       | Description                                                                                                                                 |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `stack-name`                    | The devstack name to use for API. Use `production` for using the production API                                                             |
| `proxy`                         | When used, API calls will be made to the local dev server, and proxied to their final destination (recommended, it removes CORS issues)     |
| `sections`                      | An optional comma separated list of sections to build, to speed up development. Look at `build.config.js` for a list of supported sections. |
| `ssr`                           | Turn on server-side bundling and rendering during development                                                                               |
| `styles-debug`                  | Turn on for developer friendly class names                                                                                                  |
| `analytics-debug`               | Display the data layer debug panel                                                                                                          |
| `log`                           | To have logged information in the console or not. Enabled by default, use `--no-log` for disabling                                          |
| `app`                           | What app to build (defaults to `fd-dfs`)                                                                                                    |
| `dynamic-config`                | Configuration options within an app (Example: set to `cartola-dfs` for Cartola configuration to be used with the `fd-dfs` app)              |
| `sourceMapDebug`                | Turn on detailed source maps for improved debugging experience.                                                                             |
| `disableExperimentalWatchMode`  | Disable keeping workers that webpack's `thread-loader` keeps alive when running watch mode locally (likely for debugging)                   |
| `embedChunkDomain`              | The base URL that embed webpack chunks are resolved by. Defaults to empty string, which results in relative URL for webpack chunks, which will be files served by the node server on a devstack. The release build uses https://iwa-assets.fanduel.com so that upon new releases of the app, webpack chunks for old embed versions can still be found.|
| `solus`                         | Enable the Solus SDK from GeoComply. More details [here](https://fanduel.atlassian.net/wiki/spaces/DFS/pages/306142708082/GeoComply+on+intl-web-app) |
| `sift`                          | Enable the Sift SDK. More details [here](https://fanduel.atlassian.net/wiki/spaces/DFS/pages/307270059395/Integrate+Sift+SDK+on+DFS+Web) |

There are also analytic vendor flags which can be enabled if they have been enabled in puppet on your devstack. See [Analytics - enabling vendors.](./docs/analytics.md#enabling-vendors)

### Testing

Unit tests are run using jsdom, jest and enzyme. Tests are broken down by the 4 target platforms (web, node, ios and android). To run the tests for all 4 platforms, run the following command:

```sh
# Note - does not support arguments
yarn test
```

The test commands for individual platforms are structured `test:<PLATFORM>`

```sh
yarn test:web
yarn test:node
yarn test:ios
yarn test:android
```

You can use the above commands to pass jest CLI arguments, for example:

-   to run the web platform tests in jest's interactive watch mode:
    ```sh
    yarn test:web --watch # only changed files according to git
    yarn test:web --watchAll # runs across all files
    ```
-   to run a one or more specific tests:
    ```sh
    yarn test:web ./path/to/test/file1.test.js ./path/to/test/file2.test.js
    ```

Other configuration/cli options are documented [here](https://jestjs.io/docs/en/cli)

##### Cypress Integration Tests
We are currently working on a proof of concept to move the Integration tests to the Cypress framework.  You can see the current setup within the Cypress directory or read a little about the setup [here](./integration/cypress/README.md)

#### Debugging in tests

To use the `debugger` within tests, run:

```
yarn test:inspect --config ./test/<PLATFORM>-jest-config.js
```

This will kick off a node process using `--inspect-brk` which breaks on the first line of the first file, waiting for you to connect a debugger. Once you have connected one - you can continue from the first breakpoint then steps through each test until it hits another debugger statement or finishes.

The most straightforward way to connect a debugger is to head to `chrome://inspect` after running this command and you should see your node process there.

### Component pattern library

We use [Storybook](https://storybook.js.org/) as our component pattern library and test harness. This can be useful for developing components in isolation from the application and also serves as a handy reference.

```sh
yarn run storybook
# served at http://localhost:6006
```

### Stack deployment

[Deploying via Buildkite](./docs/deploying_to_devstack.md)

### Production build

To build a production build:

```sh
yarn run build:prod
```

The following additional arguments are supported by `build`, as well as development ones listed above:

| Arguments      | Description                                                                                                                                                                      |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `prod`         | Building for production (analytics and production API)                                                                                                            |
| `webpackDebug` | Used for production builds to generate a module map of each chunk: use for debugging chunk size issues                                                                           |
| `embed`        | build an embed application (eg. dfs-notifications) rather than one of the full apps                                                                                               |

### Releasing to production

[Release documentation](./docs/releases/README.md)

### Getting a JS Environment up and running

#### For OSX/Linux:

* Run the setup instructions within [this gist](https://gist.github.com/d2s/372b5943bce17b964a79) if you're on mac or linux

**Using `n` node version manager**

If you get an error indicating that your Node.js version is incorrect, that means you will need to use a Node.js version manager.  There are a few different ways of managing your node version, but the easiest I’ve found is to install `n` which is a simple node version manager for MacOS.

To do so, run the following commands in your terminal:
```sh
### This installs n onto your machine
npm install -g n

### Then you can run this below where <version> is whichever version of node.js you want to install
sudo n <version>

ex. sudo n 12
```

Afterwards, you should be able to run the above commands to open the Cypress GUI. If more information is required, please refer to [the `n` github](https://github.com/tj/n)

**Using `nvm` node version manager**

Alternatively , installing `nvm` does wonders when you want to switch between Node.js versions. If you followed the above steps, and are still having running into errors saying that your Node.js version is not >=8.11 and <=12, please use the setup listed below:

`brew install nvm`

Once complete, create a NVM folder in your directory with mkdir ~/.nvm

Now make sure to add the block below to your bash_profile:

```sh
export NVM_DIR="$HOME/.nvm"
  [ -s "/usr/local/opt/nvm/nvm.sh" ] && . "/usr/local/opt/nvm/nvm.sh"  # This loads nvm
  [ -s "/usr/local/opt/nvm/etc/bash_completion.d/nvm" ] && . "/usr/local/opt/nvm/etc/bash_completion.d/nvm"  # This loads nvm bash_completion
Now return to your intl-web-app repo in  terminal, and run source $(brew --prefix nvm)/nvm.sh
```

To see what options you have for node, you can `nvm -v`

To see which nodes are available remotely for install,  `nvm ls-remote`

To add a node, use `nvm install <node version>` , ex. `nvm install 11`

To switch to a node, use `nvm use <node version>` , ex. `nvm use 11`

To verify your node is active, use `nvm ls`

If more information is required, please refer to [the `nvm` github](https://github.com/nvm-sh/nvm)

#### Windows:

* Installing node from [the downloads page](https://nodejs.org/en/download/) and then setting [nvm-windows](https://github.com/coreybutler/nvm-windows) up should work (disclaimer: not tested - may only need `nvm-windows` as it doesn't seem to have a dependency on node).

* Use `nvm` to install node `12.22.7` (probably `nvm install 12.22.7`)

* `nvm use 12.22.7` to set your shell to use that version of node

* `npm i -g yarn` to install the `yarn` CLI

#### Next Steps

You can now follow the steps at the top of the file from the "install dependencies" step.

For a more thorough explanation of what these terms and some info around how things work - check out [this gist](https://gist.github.com/scott-ad-riley/bfadc0a2ce9d1b808a765bb95f69e1cb)
