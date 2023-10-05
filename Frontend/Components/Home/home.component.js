// home.component.js

angular.module('myApp')
  .controller('HomeController', HomeController);

function HomeController($state) {

  function scrollToTop() {
    window.scrollTo(0, 0);
  }

  const links = document.querySelectorAll('a, .scroll-top-button');
  links.forEach(link => {
    link.addEventListener('click', scrollToTop);
  });
}