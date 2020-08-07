import { Rule, SchematicContext, Tree, externalSchematic, apply, url, template, chain, mergeWith, MergeStrategy } from '@angular-devkit/schematics';
import { strings } from '@angular-devkit/core';
export function fastConfig(_options: any): Rule {
const name = _options.name
return (tree: Tree, _context: SchematicContext) => {
  

 const templateSource = apply(url('./files'), [
     template({..._options, ...strings}),
   ]);
  const merged = mergeWith(templateSource, MergeStrategy.Overwrite)
  
   const rule = chain([
     generateRepo(name),
    merged,
     updatePackageJson(name)
   ]);
  
   return rule(tree, _context) as Rule;
 }
}
  
function generateRepo(name: string): Rule {
 return externalSchematic('@schematics/angular', 'ng-new', {
   name,
   version: '*',
   directory: name,
   routing: false,
   style: 'css',
   inlineStyle: false,
   inlineTemplate: false
 });
}
  
function updatePackageJson(name: string): Rule {
 return (tree: Tree, _: SchematicContext): Tree => {
   const path = `/${name}/package.json`;
   const file = tree.read(path);
   const json = JSON.parse(file!.toString());
  
   json.scripts = {
     ...json.scripts,
     start: 'ng serve --live-reload=false -c fast -o',

   };
  
   json.husky = {
     'hooks': {
       'pre-commit': 'pretty-quick --staged --pattern \"apps/**/**/*.{ts,scss,html}\"',
     }
   };
  
 
   const path2 = `/${name}/angular.json`;
   const file2 = tree.read(path2);
   const json2 = JSON.parse(file2!.toString());

   json2.projects[name].architect.build.configurations = {
    ...json2.projects[name].architect.build.configurations,
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

  };

  json2.projects[name].architect.serve.fast = {
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
            "browserTarget": `${name}:build:fast`
  }

  json2.projects[name].architect.serve.configurations = {
    ...json2.projects[name].architect.serve.configurations,
    "fast": {
      "browserTarget": `${name}:build:fast`
    }
  }


   tree.overwrite(path, JSON.stringify(json, null, 2));
   tree.overwrite(path2, JSON.stringify(json2, null, 2));
   return tree;
 }
}