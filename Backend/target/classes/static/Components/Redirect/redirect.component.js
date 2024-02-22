angular.module('myApp')
  .controller('RedirectController', RedirectController);

function RedirectController($scope, $http, $state, $cookies) {
  $scope.redirect = function () {
    var credentials = {
      username: $scope.user.username,
      password: $scope.user.password
    };

    $http.post('/users/login', credentials)
      .then(function (response) {
        var authToken = $cookies.get('authToken');
        $scope.$emit('authTokenUpdated', authToken);
        $state.go('layout.calculator');
      })
      .catch(function (error) {
        console.error('Login failed:', error);
        $scope.badLog = true;
      });
  };
}
