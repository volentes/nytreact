var React = require('react');
var ReactDOM = require('react-dom');

// Grab the proeprty associated with the Router
var Router = require('react-router').Router
var routes = require('./config/routes');

ReactDOM.render(

  <Router>{routes}</Router>,
  document.getElementById('app')
)