//redirect.component.js

angular.module('myApp')
  .controller('RedirectController', RedirectController);

function RedirectController($scope, $http, $state) {
  $scope.login = function () {
    var credentials = {
      username: $scope.user.username,
      password: $scope.user.password
    };

    $http.post('/users/login', credentials)
      .then(function (response) {
        console.log('Login successful:', response.data.message);
        $state.go('layout.dashboard');
      })

      .catch(function (error) {
        console.error('Login failed:', error);
        $scope.badLog = true;
      });
  };
}