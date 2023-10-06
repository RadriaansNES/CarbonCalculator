// signup.component.js

angular.module('myApp')
  .controller('SignupController', SignupController);

SignupController.$inject = ['$scope'];

function SignupController($scope) {
  $scope.formData = {}; // Initialize formData object to store form values

  $scope.handleChange = function () {
    // Handle form changes here
    // For example, you can log the form data
    console.log($scope.formData);
  };

  $scope.handleSubmit = function () {
    // Handle form submission here, e.g., send the data to your backend server
    // You can perform your registration logic here
  };
}