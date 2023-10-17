// dashboard.component.js

angular.module('myApp')
  .controller('DashboardController', DashboardController);

function DashboardController($scope, $cookies) {
  // Retrieve the username from the cookie
  $scope.username = $cookies.get('username');
}