# Lottery game app

The architecture used for this app is based on a custom build on React and Webpack. 
Babel is used as compiler through loader in webpack configuration.
html-webpack-plugin was used for creation of HTML file for webpack bundles.
mini-css-extract-plugin was used for creation of CSS file for webpack bundles.
dotenv-webpack was used to separate sensitive information from the app into a separate .env file

## Routing

Routing in app is based on react-router-dom, using route and switch to switch between paths.
NavLink was used to toggle the active link in the navbar.

## State

State management was based on Context API, which is served through a Provider (AuthProvider) in the main
App file to be available to every component, this way we can handle guest users from not accessing private
routes like the home page and redirect them to log in.

The app is separated in three basic folders
- assets
- components
- contexts

Components contain all the appropriate code for the different elements that are being used.
Each component has its own folder with its own css
Some of them are re usable like the Form component which is used both in Sign up & Sign in page.

Contexts folder contains the configuration of a provider. For example the AuthProvider is a HOC
which has some specific functions that control the logic of a user (register, signin, logout),
making also available the state to the components.
