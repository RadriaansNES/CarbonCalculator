// app.config.js

angular.module('myApp', ['ui.router'])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'Components/Home/home.component.html',
        controller: 'HomeController'
      })
      .state('login', {
        url: '/login',
        templateUrl: 'Components/Login/login.component.html',
        controller: 'LoginController'
      });

    // Default route (redirect to home)
    $urlRouterProvider.otherwise('/');
  });