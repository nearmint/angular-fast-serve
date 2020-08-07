# Faster Serve for Angular Development

This repository is a basic Schematic implementation that is based on this [https://javascript-conference.com/blog/how-to-create-your-own-angular-schematics/](guide).

I created this repo so that you can automatically create your Angular projects with predefined settings. In this script, I've pre-configured a config that allows for a faster `ng serve`. The script can also be changed to pre-load and pre-configure anything else you want for your new angular projects.

### Setup

To use locally,

1. `git clone` this repository to the folder where you create your projects
2. `sudo npm install -g @angular-devkit/schematics-cli && sudo npm install -g @schematics/angular` 
4. `cd angular-fast-serve`
5. `npm install`
6. `npm run build`
7. `cd ..`
8. Edit the package.json in this parent folder (your projects folder), if you don't have a package.json there, use npm init to create a basic one and add the following to this file:
```
"scripts": {
    "test": "schematics ./angular-fast-serve/src/collection.json:fast --debug=false"
  }
```

9. now you can run `npm test` in your projects folder to create a new angular project with your custom configuration

10. inside the new project you can run `npm start` to run the following:

`ng serve --live-reload=false -c fast -o`
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
            "buildOptimizer": false
  }
```

This allows your serve to be faster when developing in the browser.



That's it!
 
