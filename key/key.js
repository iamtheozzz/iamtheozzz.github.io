$(function() {
  var text = $(".text");
  $(window).scroll(function() {
    var scroll = $(window).scrollTop();

    if (scroll >= 200) {
      text.removeClass("hidden");
    } else {
      text.addClass("hidden");
    }
  });
});










$('.open-overlay').click(function() {
  $('.open-overlay').css('pointer-events', 'none');
  var overlay_navigation = $('.overlay-navigation'),
    top_bar = $('.bar-top'),
    middle_bar = $('.bar-middle'),
    bottom_bar = $('.bar-bottom');

  overlay_navigation.toggleClass('overlay-active');
  if (overlay_navigation.hasClass('overlay-active')) {

    top_bar.removeClass('animate-out-top-bar').addClass('animate-top-bar');
    middle_bar.removeClass('animate-out-middle-bar').addClass('animate-middle-bar');
    bottom_bar.removeClass('animate-out-bottom-bar').addClass('animate-bottom-bar');
    overlay_navigation.removeClass('overlay-slide-up').addClass('overlay-slide-down')
    overlay_navigation.velocity('transition.slideLeftIn', {
      duration: 300,
      delay: 0,
      begin: function() {
        $('nav ul li').velocity('transition.perspectiveLeftIn', {
          stagger: 150,
          delay: 0,
          complete: function() {
            $('nav ul li a').velocity({
              opacity: [1, 0],
            }, {
              delay: 10,
              duration: 140
            });
            $('.open-overlay').css('pointer-events', 'auto');
          }
        })
      }
    })

  } else {
    $('.open-overlay').css('pointer-events', 'none');
    top_bar.removeClass('animate-top-bar').addClass('animate-out-top-bar');
    middle_bar.removeClass('animate-middle-bar').addClass('animate-out-middle-bar');
    bottom_bar.removeClass('animate-bottom-bar').addClass('animate-out-bottom-bar');
    overlay_navigation.removeClass('overlay-slide-down').addClass('overlay-slide-up')
    $('nav ul li').velocity('transition.perspectiveRightOut', {
      stagger: 150,
      delay: 0,
      complete: function() {
        overlay_navigation.velocity('transition.fadeOut', {
          delay: 0,
          duration: 300,
          complete: function() {
            $('nav ul li a').velocity({
              opacity: [0, 1],
            }, {
              delay: 0,
              duration: 50
            });
            $('.open-overlay').css('pointer-events', 'auto');
          }
        });
      }
    })
  }
})


























$(document).ready(function ($) {
  "use strict";


  var book_table = new Swiper(".book-table-img-slider", {
      slidesPerView: 1,
      spaceBetween: 20,
      loop: true,
      autoplay: {
          delay: 3000,
          disableOnInteraction: false,
      },
      speed: 2000,
      effect: "coverflow",
      coverflowEffect: {
          rotate: 3,
          stretch: 2,
          depth: 100,
          modifier: 5,
          slideShadows: false,
      },
      loopAdditionSlides: true,
      navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
      },
      pagination: {
          el: ".swiper-pagination",
          clickable: true,
      },
  });

  var team_slider = new Swiper(".team-slider", {
      slidesPerView: 3,
      spaceBetween: 30,
      loop: true,
      autoplay: {
          delay: 1000,
          disableOnInteraction: false,
      },
      speed: 4000,

      navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
      },
      pagination: {
          el: ".swiper-pagination",
          clickable: true,
      },
      breakpoints: {
          0: {
              slidesPerView: 1.2,
          },
          768: {
              slidesPerView: 2,
          },
          992: {
              slidesPerView: 3,
          },
          1200: {
              slidesPerView: 3,
          },
      },
  });

  jQuery(".filters").on("click", function () {
      jQuery("#menu-dish").removeClass("bydefault_show");
  });
  $(function () {
      var filterList = {
          init: function () {
              $("#menu-dish").mixItUp({
                  selectors: {
                      target: ".dish-box-wp",
                      filter: ".filter",
                  },
                  animation: {
                      effects: "fade",
                      easing: "ease-in-out",
                  },
                  load: {
                      filter: ".all, .breakfast, .lunch, .dinner",
                  },
              });
          },
      };
      filterList.init();
  });

  jQuery(".menu-toggle").click(function () {
      jQuery(".main-navigation").toggleClass("toggled");
  });

  jQuery(".header-menu ul li a").click(function () {
      jQuery(".main-navigation").removeClass("toggled");
  });

  gsap.registerPlugin(ScrollTrigger);

  var elementFirst = document.querySelector('.site-header');
  ScrollTrigger.create({
      trigger: "body",
      start: "30px top",
      end: "bottom bottom",

      onEnter: () => myFunction(),
      onLeaveBack: () => myFunction(),
  });

  function myFunction() {
      elementFirst.classList.toggle('sticky_head');
  }

  var scene = $(".js-parallax-scene").get(0);
  var parallaxInstance = new Parallax(scene);


});


jQuery(window).on('load', function () {
  $('body').removeClass('body-fixed');

  //activating tab of filter
  let targets = document.querySelectorAll(".filter");
  let activeTab = 0;
  let old = 0;
  let dur = 0.4;
  let animation;

  for (let i = 0; i < targets.length; i++) {
      targets[i].index = i;
      targets[i].addEventListener("click", moveBar);
  }

  // initial position on first === All 
  gsap.set(".filter-active", {
      x: targets[0].offsetLeft,
      width: targets[0].offsetWidth
  });

  function moveBar() {
      if (this.index != activeTab) {
          if (animation && animation.isActive()) {
              animation.progress(1);
          }
          animation = gsap.timeline({
              defaults: {
                  duration: 0.4
              }
          });
          old = activeTab;
          activeTab = this.index;
          animation.to(".filter-active", {
              x: targets[activeTab].offsetLeft,
              width: targets[activeTab].offsetWidth
          });

          animation.to(targets[old], {
              color: "#0d0d25",
              ease: "none"
          }, 0);
          animation.to(targets[activeTab], {
              color: "#fff",
              ease: "none"
          }, 0);

      }

  }
});
