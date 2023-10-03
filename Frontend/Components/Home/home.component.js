// home.component.js

angular.module('myApp')
  .controller('HomeController', HomeController);

function HomeController($state) {
  this.goToLogin = function () {
    $state.go('layout.login');
  };

  // Function to scroll to the top of the viewport
  function scrollToTop() {
    window.scrollTo(0, 0);
  }

  // Attach an event listener to all links
  const links = document.querySelectorAll('a, .scroll-top-button');
  links.forEach(link => {
    link.addEventListener('click', scrollToTop);
  });
}