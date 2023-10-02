// home.component.js

angular.module('myApp')
  .controller('HomeController', HomeController);

function HomeController($state) {
  // Function to navigate to the login page
  this.goToLogin = function () {
    $state.go('login');
  };
}