# JSONSchemaReactFormGenerator
## Local Development
### Publish the package
Replace `<the-project-using-this-package>` with the path to the project using this package. You can use relative path. For example: `../MurmurationsTools`.
```
npm link <the-project-using-this-package>/node_modules/react
```
### Build the package
```
npm run build
```
### Use package in another project
```
npm link @murmurations/jsrfg
```
## Reference
1. [ECMAScript Modules in Node.js](https://www.typescriptlang.org/docs/handbook/esm-node.html)
2. [Best practices for creating a modern npm package](https://snyk.io/blog/best-practices-create-modern-npm-package/)
3. [Gotchas in Remix](https://remix.run/docs/en/main/pages/gotchas)
4. [Duplicate React](https://legacy.reactjs.org/warnings/invalid-hook-call-warning.html#duplicate-react)
