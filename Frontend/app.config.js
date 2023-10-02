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
        url: '/', 
        views: {
          '': {
            templateUrl: 'Components/Calc/calculator.component.html', 
            controller: 'CalculatorController'
          }
        }
      });

    // Default route 
    $urlRouterProvider.otherwise('/');
  });