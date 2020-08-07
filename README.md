# Angular Schematics: Faster Serve for Development

This repository is a basic Schematic implementation that is based on this (https://javascript-conference.com/blog/how-to-create-your-own-angular-schematics/)[guide].

### Setup

To use locally,

1. git clone this repository to the folder where you create your projects
2. cd into the folder
3. npm run build
4. npm install
5. cd ..
6. add the following to your package.json in your projects folder (parent directory of this repo):
```
"scripts": {
    "test": "schematics ./angular-fast-serve/src/collection.json:fast --debug=false"
  }
```

7. now you can run `npm test` in your projects folder to create a new angular project with your custom configuration

8. inside the new project you can run `npm start` to run the following:
`ng serve --live-reload=false -c fast -o`
and the fast configuration is as follows:
```
  "fast": {
            "optimization": false,
            "outputHashing": "none",
            "sourceMap": false,
            "extractCss": false,
            "namedChunks": false,
            "showCircularDependencies": true,
            "aot": true,
            "extractLicenses": false,
            "statsJson": false,
            "progress": false,
            "vendorChunk": true,
            "buildOptimizer": false,
            "browserTarget": "ng-conference:build:fast",
```

This allows your serve to be faster when developing in the browser.



That's it!
 