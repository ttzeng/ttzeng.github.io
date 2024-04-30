My GitHub Pages
===============

## Overview ##

This repository contains the web assets used by the [GitHub Pages](https://github.com/skills/github-pages) to host my personal website at *[https://ttzeng.github.io/][1]*. GitHub Pages is a static site hosting service that takes HTML, CSS, and JavaScript files from a GitHub repository, and runs its predefined *[deploy-pages](https://github.com/actions/deploy-pages)* action to publish the rendered website on GitHub's `github.io` domain.

The web assets are based on [jQuery Mobile][2] framework, so that the rendered website is compatible on smartphone, tablet, and desktop platforms. *jQuery Mobile* is a HTML5-based user interface system designed to run responsive web sites across platforms. It also provides a set of touch-friendly UI [widgets](https://api.jquerymobile.com/category/widgets) and an AJAX-powered navigation system to support animated page transitions.

Not only publishing the website through GitHub Pages, the web assets also leverage [Capacitor.JS][3] for being packaged and run on Android, iOS, and Web. *Capacitor* is a cross-platform native runtime for building Web Native apps using modern web tooling. It allows developers to build mobile apps using web technologies based on Javascript/Typescript, and provides a set of [Capacitor plugins][4] and a native runtime for accessing to underlying native device features.

## Serve the Website ##

To try out the code in this repository, in addition to check-in the code and having GitHub Pages deploys the website on `github.io` domain, you can also run a local server by installing Capacitor's main `npm` dependencies, and executing the `start` script as follows:

    $ npm install @capacitor/core
    $ npm run start
    > sample@0.0.1 start
    > vite

    vite v2.9.18 dev server running at:

    > Local: http://localhost:3000/
    > Network: use `--host` to expose

    ready in 166ms.

## Packaging as a Native App ##

To serve the content from a native web app, enter the following command to build the web assets for distribution as the first step:

    $ npm run build

    > sample@0.0.1 build
    > vite build

    vite v2.9.18 building for production...
    ✓ 11 modules transformed.
    www/index.html                          1.22 KiB
    www/assets/index.e895d035.js            4.88 KiB / gzip: 1.80 KiB
    www/assets/myLinks.41c7ad4e.js          3.14 KiB / gzip: 0.96 KiB
    www/assets/myDeliverables.7a1d25f7.js   1.72 KiB / gzip: 0.53 KiB
    www/assets/tips.294de8f4.js             1.45 KiB / gzip: 0.62 KiB
    www/assets/index.8ced7966.css           1.32 KiB / gzip: 0.89 KiB

Then, add Android or iOS platforms to the Capacitor:

    $ npm install @capacitor/android @capacitor/ios

Create an Android or iOS project in the repository as follows:

    $ npx cap add android
    ✔ Adding native android project in android in 43.77ms
    ✔ add in 44.56ms
    ✔ Copying web assets from www to android/app/src/main/assets/public in 10.70ms
    ✔ Creating capacitor.config.json in android/app/src/main/assets in 647.21μs
    ✔ copy android in 22.54ms
    ✔ Updating Android plugins in 2.08ms
    [info] Found 1 Capacitor plugin for android:
           @capacitor/device@4.1.0
    ✔ update android in 25.84ms
    ✔ Syncing Gradle in 318.14μs
    [success] android platform added!
    Follow the Developer Workflow guide to get building:
    https://capacitorjs.com/docs/basics/workflow

Once you've created the native project, you can sync any web application changes to the native project by running the following command:

    $ npx cap sync
    ✔ Copying web assets from www to android/app/src/main/assets/public in 24.61ms
    ✔ Creating capacitor.config.json in android/app/src/main/assets in 1.58ms
    ✔ copy android in 34.80ms
    ✔ Updating Android plugins in 1.37ms
    [info] Found 1 Capacitor plugin for android:
           @capacitor/device@4.1.0
    ✔ update android in 36.24ms
    ✔ copy web in 4.28ms
    ✔ update web in 1.76ms
    [info] Sync finished in 0.094s

Or, run the following command each time after performing a build:

    $ npx cap copy
    ✔ Copying web assets from www to android/app/src/main/assets/public in 28.53ms
    ✔ Creating capacitor.config.json in android/app/src/main/assets in 24.58ms
    ✔ copy android in 80.82ms
    ✔ copy web in 5.85ms

Finally, enter the following command to launch the [Android Studio][5] to build the native project:

    $ npx cap open android

or build the native project directly [with the Gradle wrapper][6] command line tool:

    $ cd android
    $ ANDROID_HOME=<where_Android_SDK_installed> ./gradlew assembleDebug

[1]: <https://ttzeng.github.io/> "My personal website"
[2]: <https://jquerymobile.com/> "jQuery Mobile"
[3]: <https://capacitorjs.com/> "Capacitor by Ionic"
[4]: <https://capacitorjs.com/docs/apis> "Capacitor Plugins"
[5]: <https://developer.android.com/studio/intro> "Android Studio"
[6]: <https://developer.android.com/build/building-cmdline> "Build Android App from the Command Line"