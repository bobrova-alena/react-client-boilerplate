# react-client-boilerplate

The React client application with a node.js server which proxies api requests to the api url specified via 
the API_URL environment variable or `http://localhost:8080` in case of absence the one.
The Nodejs-api-server-boilerplate (https://github.com/bobrova-alena/nodejs-api-server-boilerplate.git)
may be used as an api server.

## Features
- Webpack 5+
- TypeScript for both frontend and backend
- React 17+
- Styled Components
- Styled System
- Redux-Saga
- Eslint
- Stylelint
- Prettier
- Express
- http-proxy-middleware

## Quick start

1. Make sure that you have Node.js v8.15.1 and npm v5 or above installed.
2. Clone the api server using `git clone --depth=1 https://github.com/bobrova-alena/nodejs-api-server-boilerplate.git <YOUR_SERVER_API_PROJECT_NAME>`.
3. Lead to the instruction described at the server api project to run the one.
4. Clone this repo using `git clone --depth=1 https://github.com/bobrova-alena/react-client-boilerplate.git <YOUR_PROJECT_NAME>`
5. Move to the appropriate directory: `cd <YOUR_PROJECT_NAME>`.
6. Run `npm i` in order to install dependencies.
7. Run `watch` script placed at the package.json to run the application at `http://localhost:3000`.

The scripts to work with project are places in a ```package.json``` file:

1) ```build``` builds a client and a server in production mode.
2) ```dev``` builds the client and the server in developer mode.
3) ```watch``` builds the client and the server in developer watch mode and runs the project via the nodemon webpack plugin.
4) ```clean``` deletes the 'dist' folder at the root of the project with bundled source scripts.
5) ```lint:styles``` formats styled system styles.
6) ```lint:code``` formats code.
7) ```run:nodemon``` runs the project via nodemon.
8) ```watch:prod``` builds the client and the server in production watch mode and runs the project via the nodemon webpack plugin.

## Documentation
- Styled Components: https://styled-components.com
- Styled System: https://styled-system.com
- Redux-Saga: https://redux-saga.js.org