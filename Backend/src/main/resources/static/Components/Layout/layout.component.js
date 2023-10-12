// LayoutController.js

angular.module('myApp')
  .controller('LayoutController', LayoutController);

function LayoutController($scope, $state, $cookies) {

  $scope.LoginCheckCalculator = function () {
    var authToken = $cookies.get('authToken'); //Need to write this to check authToken at the TIME of the request
    if (authToken) {
      $state.go('layout.calculator');
    } else {
      $state.go('layout.redirect');
    }
  }

  $scope.LoginCheckLogin = function () {
    var authToken = $cookies.get('authToken');
    if (authToken) {
      $state.go('layout.dashboard');
    } else {
      $state.go('layout.login');
    }
  }

  //Listener for set of authToken - workaround
  $scope.$on('authTokenUpdated', function (event, authToken) {
    $scope.authToken = authToken;
  });

  //Listener for experation
  $scope.$watch(
    function () {
      return $cookies.get('authToken');
    },
    function (newAuthToken, oldAuthToken) {
      if (!newAuthToken && oldAuthToken) {
        $scope.authToken = null;
      }
    }
  );
}