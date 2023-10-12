// login.component.js

angular.module('myApp')
  .controller('LoginController', LoginController);


function LoginController($scope, $http, $state, $cookies) {
  $scope.login = function () {
    var credentials = {
      username: $scope.user.username,
      password: $scope.user.password
    };

    $scope.badLog = false;

    $http.post('/users/login', credentials)
      .then(function (response) {
        console.log('Login successful:', response.data.message);

        var authToken = response.headers('Set-Cookie');
        $cookies.put('authToken', authToken);

        $state.go('layout.dashboard');
      })

      .catch(function (error) {
        console.error('Login failed:', error);
        $scope.badLog = true;
      });
  };
}
