angular.module('myApp')
  .controller('HomeController', HomeController);

function HomeController($state, $cookies, $scope) {
  var slides;
  var currentSlide = 4;
  var autoAdvancePaused = false;

  function initializeCarousel() {
    slides = $(".carousel-slide");
    var totalSlides = slides.length;

    slides.eq(currentSlide).css("opacity", 1);

    function autoAdvance() {
      if (!autoAdvancePaused) {
        slides.eq(currentSlide).css("opacity", 0);
        currentSlide = (currentSlide + 1) % totalSlides;
        slides.eq(currentSlide).css("opacity", 1);
      }
      setTimeout(autoAdvance, 5000);
    }

    autoAdvance();
  }

  function nextSlide() {
    slides.eq(currentSlide).css("opacity", 0);
    currentSlide = (currentSlide + 1) % slides.length;
    slides.eq(currentSlide).css("opacity", 1);
  }

  function prevSlide() {
    slides.eq(currentSlide).css("opacity", 0);
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    slides.eq(currentSlide).css("opacity", 1);
  }

  function pauseAutoAdvance() {
    autoAdvancePaused = true;
  }

  function scrollToTop() {
    window.scrollTo(0, 0);
  }

  $scope.checkLoginStatus = function() {
    var authToken = $cookies.get('authToken');
    if (authToken) {
      $state.go('layout.calculator');
    } else {
      $state.go('layout.redirect');
    }
  }

  $(".next-button").click(nextSlide);
  $(".prev-button").click(prevSlide);
  $(".next-button, .prev-button").click(pauseAutoAdvance);

  const links = document.querySelectorAll('a, .scroll-top-button');
  links.forEach(link => {
    link.addEventListener('click', scrollToTop);
  });

  initializeCarousel();
}
