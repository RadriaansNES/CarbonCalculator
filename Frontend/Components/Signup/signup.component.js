// signup.component.js

angular.module('myApp')
  .controller('SignupController', SignupController);

function SignupController($scope, $http) {
  $scope.user = {};

  $scope.submitForm = function () {
    $http.post('/users/create', $scope.user)
      .then(function (response) {
        console.log('User registered successfully:', response.data.message);
        // You can access the user ID like this: response.data.id
        // You can handle success actions here, e.g., show a success message
      })
      .catch(function (error) {
        console.error('Error registering user:', error);
        // You can handle error actions here, e.g., show an error message
      });
  };
}
