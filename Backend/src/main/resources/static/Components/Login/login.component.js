// login.component.js

angular.module('myApp')
  .controller('LoginController', LoginController);

function LoginController($scope, $http, $state) {
  $scope.login = function () {
    var credentials = {
      username: $scope.user.username,
      password: $scope.user.password
    };

    $scope.badLog = false;

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