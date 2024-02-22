angular.module('myApp')
  .controller('LoginController', LoginController);

function LoginController($scope, $http, $state, $cookies) {
  $scope.login = function () {
    var credentials = {
      username: $scope.user.username,
      password: $scope.user.password
    };

    $http.post('/users/login', credentials)
      .then(function (response) {
        var authToken = $cookies.get('authToken');
        $scope.$emit('authTokenUpdated', authToken);
        $state.go('layout.dashboard');
      })
      .catch(function (error) {
        console.error('Login failed:', error);
        $scope.badLog = true;
      });
  };
}

