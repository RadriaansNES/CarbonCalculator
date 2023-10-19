angular.module('myApp')
  .controller('HomeController', HomeController);

function HomeController($state) {
  var slides; 
  var currentSlide = 4; 
  var autoAdvancePaused = false; 

  function scrollToTop() {
    window.scrollTo(0, 0);
  }

  const links = document.querySelectorAll('a, .scroll-top-button');
  links.forEach(link => {
    link.addEventListener('click', scrollToTop);
  });

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
      setTimeout(autoAdvance, 5000); // every 5 seconds
    }

  
    autoAdvance();
  }

  
  initializeCarousel();

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

  $(".next-button").click(function () {
    nextSlide();
  });
  $(".prev-button").click(function () {
    prevSlide();
  });

  // Set up event listener to pause auto-advance when any button is clicked
  $(".next-button, .prev-button").click(pauseAutoAdvance);
}
