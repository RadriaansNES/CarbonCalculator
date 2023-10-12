// LayoutController.js

angular.module('myApp')
.controller('LayoutController', LayoutController);

function LayoutController($scope, $state, $cookies) {
  var authToken = $cookies.get('authToken');
  $scope.isLoggedIn = !!authToken;

  $scope.LoginCheckCalculator = function () {
    if (authToken) {
      $state.go('layout.calculator');
    } else {
      $state.go('layout.redirect');
    }
  }

  $scope.LoginCheckLogin = function () {
    if (authToken) {
      $state.go('layout.dashboard');
    } else {
      $state.go('layout.login');
    }
  }
}