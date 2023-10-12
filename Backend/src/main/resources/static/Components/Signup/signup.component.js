// signup.component.js

angular.module('myApp')
  .controller('SignupController', SignupController);

function SignupController($scope, $http, $state, $timeout) {
  $scope.user = {};
  $scope.badPassword = false;
  $scope.registrationSuccess = false;
  $scope.badReg = false;

  $scope.submitForm = function () {
    $http.post('/users/create', $scope.user)
      .then(function (response) {
        console.log('User registered successfully:', response.data.message);
        $scope.registrationSuccess = true;
        $timeout(function () {
          $state.go('layout.login');
        }, 3000);
      })
      .catch(function (error) {
        console.error('Error registering user:', error);
        $scope.badReg = true;
        $timeout(function () {
          $state.go('layout.home');
        }, 3000);
      });
  };

  $scope.passwordCheck = function () {
    var password = $scope.user.password;
    if (password.length < 7 && !/\d/.test(password)) {
      $scope.badPassword = true;
    }
  }
}
