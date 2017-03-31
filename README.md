An example server ([Feathers](http://feathersjs.com/), NeDB) + client ([React](https://github.com/facebookincubator/create-react-app), via [Create React App](https://github.com/facebookincubator/create-react-app)) to demonstrate real-time editing.

Note: there's no authentication, so anyone can read/write to/from the server.

# Notes

## monorepo

`mkdir example-feathers-react && cd $_`

`git init`

`lerna init`

In package.json add a "scripts" section:

```
"scripts": {
  "server:start": "cd packages/server && npm run start",
  "client:start": "cd packages/client && npm run start",
  "test": "lerna run test --stream"
}
```

`mkdir packages && cd $_`

## server

`yarn global add feathers-cli@pre`
(using `@pre` as the new version isn't released yet)

`mkdir server && cd $_`

`feathers generate app`
(accept default options, except choose yarn and disable rest)

`feathers generate service`
(accept default options, call it "articles")

`cd ..`

## client

`yarn global add create-react-app`

`create-react-app client`

`cd client`

Install UI dependencies:

`yarn add material-ui formsy-material-ui formsy-react typeface-roboto react-tap-event-plugin`

Install data dependencies:

`yarn add feathers-client feathers-hooks feathers-socketio feathers-reactive rxjs socket.io-client`

Edit App.js etc

`cd ..`

## ESLint

[see note on why this is necessary](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#displaying-lint-output-in-the-editor)

In the root folder:
`yarn add --dev eslint-config-react-app eslint babel-eslint eslint-plugin-react eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-flowtype`

Add a section to `packages/client/package.json`:
```
"eslintConfig": {
	"extends": "react-app"
}
```

## PHPStorm

* Enable ESLint (select the package in the root folder's node_modules), disable all other JS code quality tools
* Set Yarn as package manager
* Enable Node Coding Assistance
* Right-click package.json, select "Show npm scripts"
