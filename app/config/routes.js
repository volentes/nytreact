//Node package imports
const React = require('react');
const Router = require('react-router');
const Route = Router.Route;
const IndexRoute  = Router.IndexRoute;
//
const Saved = require('../components/Saved'); 
const Search = require('../components/Search'); 
const Main = require('../components/Main');

// Export the Routes
module.exports = (
  <Route path='/' component={Main}>
  <Route path='Saved' component={Saved} />
  <Route path='Search' component={Search} />
  <IndexRoute component={Search} />
  </Route>
);