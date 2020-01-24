# UR Mobster

**Description**: Mob programming app that helps you keep track of time, breaks and whose turn it is.

**Technology stack**: Based on [Electron React Boilerplate](https://github.com/electron-react-boilerplate/electron-react-boilerplate), so in other words, built with [React](https://github.com/facebook/react) inside an [Electron](https://github.com/electron/electron) app.

**Download**: Get the latest macOS [release](https://github.com/sveriges-utbildningsradio/ur-mobster/releases), or clone and build for your OS (instructions below under the heading **Packaging**).

**Demo**:

![](demo.gif)

## Install

Might work with [npm](https://www.npmjs.com/get-npm) (although there's no package-lock.json), but otherwise, [install yarn](https://yarnpkg.com/en/docs/install) before running the following:

```bash
$ yarn
```

## Run

Start the app in the `dev` environment. This starts the renderer process in [**hot-module-replacement**](https://webpack.js.org/guides/hmr-react/) mode and starts a webpack dev server that sends hot updates to the renderer process:

```bash
$ yarn dev
```

If you don't need autofocus when your files was changed, then run `dev` with env `START_MINIMIZED=true`:

```bash
$ START_MINIMIZED=true yarn dev
```

**Notice**: There are no environment variables to be set.

## Usage

Add mobsters either by name or GitHub account. The active mobster (marked with a red dot) gets the time specified as `Time`, and gets shuffled to the bottom after the time runs out. The navigator (marked with a white dot) then becomes the driver. Click the top-right cogwheel for settings: you can change session duration, break duration/frequency, and language. See demo gif above.
Click the `Start the mob` to minimize the app and start the timer. The app pops up once your time is up.

## Test

This project uses `jest` as test-runner, along with [react-testing-library](https://github.com/testing-library/react-testing-library) for testing. To run tests:

```bash
$ yarn test

# Alternatively, run tests in watch mode - press U to upgrade snapshots
$ yarn jest --watch
```

You can also run e2e tests using [Testcafe](https://devexpress.github.io/testcafe/) by running:

```bash
$ yarn build-and-test-e2e
// OR
$ yarn build-and-test-e2e-headless // runs in headless mode - faster
```

## Packaging

To package apps for the local platform:

```bash
$ yarn package
```

To package apps for all platforms:

First, refer to the [Multi Platform Build docs](https://www.electron.build/multi-platform-build) for dependencies.

Then,

```bash
$ yarn package-all
```

To package apps with options:

```bash
$ yarn package --[option]
```

:bulb: You can debug your production build with devtools by simply setting the `DEBUG_PROD` env variable:

```bash
DEBUG_PROD=true yarn package
```

## CSS Modules

This app is configured to use [css-modules](https://github.com/css-modules/css-modules) out of the box.

All `.css` file extensions will use css-modules unless it has `.global.css`.

If you need global styles, stylesheets with `.global.css` will not go through the
css-modules loader. e.g. `app.global.css`

## SASS support

If you want to use Sass in your app, you only need to import `.sass` files instead of `.css` once:

```js
import './app.global.scss'
```

## Static Type Checking

This project comes with Flow support out of the box! You can annotate your code with types, [get Flow errors as ESLint errors](https://github.com/amilajack/eslint-plugin-flowtype-errors), and get [type errors during runtime](https://github.com/codemix/flow-runtime) during development. Types are completely optional.
However, the flow process seems to work so-so (@aelmoznino's comment).

## Getting help

If you have questions, concerns, bug reports, etc, please [file an issue](https://github.com/sveriges-utbildningsradio/ur-mobster/issues).

## Known issues

The [electron security documentation](https://electronjs.org/docs/tutorial/security) warns about using `nodeIntegration: true`, but without it the app won't work as it is now. [More details in this issue](https://github.com/sveriges-utbildningsradio/ur-mobster/issues/33).

## Getting involved

Feature requests, bug reports and PR:s are welcome! Have a look at [open issues](https://github.com/sveriges-utbildningsradio/ur-mobster/issues).
Check out [CONTRIBUTING](CONTRIBUTING.md) for our guidelines and code of conduct.

## Open source licensing info

[LICENSE](LICENSE)

## Maintanance

This code base should for now be seen as sporadically maintained, and provided as-is. We still consider PR:s and issues if found.

## Primary Maintainer

André Elmoznino Laufer https://github.com/AElmoznino
