// app.config.js

angular.module('myApp', ['ui.router', 'ngCookies'])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true); // Enable HTML5 mode
    $stateProvider
      .state('layout', {
        abstract: true,
        templateUrl: 'Components/Layout/layout.html',
        controller: 'LayoutController'
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
      .state('layout.social', {
        url: '/social',
        views: {
          '': {
            templateUrl: 'Components/Social/social.component.html',
            controller: 'SocialController'
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