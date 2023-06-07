# JSON Schema React Form Generator (JSRFG)

> This project is licensed under the terms of the GNU General Public License v3.0

## Customize css with tailwindcss

```css
@layer components {
  .jsrfg-title {
    @apply text-xl mt-4 block font-bold;
  }
  .jsrfg-required {
    @apply text-red-500 dark:text-red-400;
  }
  .jsrfg-description {
    @apply mb-4 block text-sm;
  }
  .jsrfg-object-block {
    @apply my-4 border-4 border-dotted border-slate-300 p-4;
  }
  .jsrfg-array-block {
    @apply flex items-center justify-around;
  }
  .jsrfg-array-input {
    @apply form-input mr-2 w-full dark:bg-gray-700 focus:dark:bg-gray-500;
  }
  .jsrfg-add-btn {
    @apply my-4 rounded-full bg-red-500 px-4 py-2 font-bold text-white hover:scale-110 hover:bg-red-400 dark:bg-purple-200 dark:text-gray-800 dark:hover:bg-purple-100
  }
  .jsrfg-remove-btn {
    @apply my-4 rounded-full bg-yellow-500 px-4 py-2 font-bold text-white hover:bg-yellow-400 dark:bg-green-200 dark:text-gray-800 dark:hover:bg-green-100;
  }
  .jsrfg-enum-block {
    @apply my-2 block text-sm;
  }
  .jsrfg-enum-select {
    @apply form-select mt-2 w-full text-ellipsis dark:bg-gray-700;
  }
}
```

## Local Development

### Install dependencies

```sh
npm install
```

### Publish the package

```sh
npm link
```

### Prevent React package duplication

Replace `<the-project-using-this-package>` with the path to the project using this package. You can use a relative path, for example: `../MurmurationsTools`.

```sh
npm link <the-project-using-this-package>/node_modules/react
```

### Build the package

```sh
npm run build
```

### Use package in another project (run command in that project's directory)

```sh
npm link @murmurations/jsrfg
```

## Reference

1. [ECMAScript Modules in Node.js](https://www.typescriptlang.org/docs/handbook/esm-node.html)
2. [Best practices for creating a modern npm package](https://snyk.io/blog/best-practices-create-modern-npm-package/)
3. [Gotchas in Remix](https://remix.run/docs/en/main/pages/gotchas)
4. [Duplicate React](https://legacy.reactjs.org/warnings/invalid-hook-call-warning.html#duplicate-react)
