// home.component.js

angular.module('myApp')
  .controller('HomeController', HomeController);

function HomeController($state) {
  this.goToLogin = function () {
    $state.go('login');
  };
}