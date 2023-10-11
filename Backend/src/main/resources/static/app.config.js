// app.config.js

angular.module('myApp', ['ui.router'])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('layout', {
        abstract: true, // Layout State
        templateUrl: 'Components/Layout/layout.html', 
      })
      .state('layout.home', {
        url: '/', 
        views: {
          '': {
            templateUrl: 'Components/Home/home.component.html',
            controller: 'HomeController'
          }
        }
      })
      .state('layout.login', {
        url: '/login', 
        views: {
          '': {
            templateUrl: 'Components/Login/login.component.html', 
            controller: 'LoginController'
          }
        }
      })
      .state('layout.calculator', {
        url: '/calculator', 
        views: {
          '': {
            templateUrl: 'Components/Calc/calculator.component.html', 
            controller: 'CalculatorController'
          }
        }
      })
      .state('layout.redirect', {
        url: '/redirect', 
        views: {
          '': {
            templateUrl: 'Components/Redirect/redirect.component.html', 
            controller: 'RedirectController'
          }
        }
      })
      .state('layout.dashboard', {
        url: '/dashboard', 
        views: {
          '': {
            templateUrl: 'Components/Dashboard/dashboard.component.html', 
            controller: 'DashboardController'
          }
        }
      })
      .state('layout.signup', {
        url: '/signup', 
        views: {
          '': {
            templateUrl: 'Components/Signup/signup.component.html', 
            controller: 'SignupController'
          }
        }
      });



    // Default route 
    $urlRouterProvider.otherwise('/');
  });