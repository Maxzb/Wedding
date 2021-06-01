@@include('libs/jquery-3.5.1.min.js')
@@include('libs/slick.min.js')

$('.hamburger').on('click', function () {
   $('.hamburger').toggleClass('is-active');
   $('.menu').toggleClass('menu-active');
   $('body').toggleClass('scroll');
});

//ПЛАВНОЕ ПЕРЕМЕЩЕНИЕ К ЯКОРЯМ
$('.menu__list').on("click","a", function (e) {
   //отменяем стандартную обработку нажатия по ссылке
   e.preventDefault();
   //забираем идентификатор с атрибута href
   let id  = $(this).attr('href'),
   //узнаем высоту от начала страницы до блока на который ссылается якорь
   top = $(id).position().top;
   //анимируем переход на расстояние
   $('body, html').animate({scrollTop: top}, 1000);

   $('.hamburger').toggleClass('is-active');
   $('.menu').toggleClass('menu-active');
   $('body').removeClass('scroll');
});

//маска для телефона
$('input[type="tel"]').mask("+7(999) 999-9999");

// SLICK-SLIDER

$(".section-slider").slick({
   lazyLoad: 'ondemand',
   arrows: true,
   dots: false,
   slidesToShow: 5,
   slidesToScroll: 1,
   variableWidth: true,
   /* asNavFor: '.slider',
   prevArrow: '<div class="arrow-left"></div>',
   nextArrow: '<div class="arrow-right"></div>'
   adaptiveHeight: true
   autoplay: true,
   autoplaySpeed: 3500,
   appendDots: $('.specialties-slider_dots') */
   /* speed:1000, */
   /* responsive:[
      {
         breakpoint: 768,
         settings: {
            slidesToShow:2
         }
      },
      {
         breakpoint: 550,
         settings: {
            slidesToShow:1
         }
      }
   ] */
});

/* EXAMPLE */
/* $(".logos-slider").slick({
   arrows: true,
   dots: false,
   slidesToShow: 5,
   slidesToScroll: 1,
   variableWidth: true,
   responsive: [
      {
      breakpoint: 769,
      settings: {
         variableWidth: false,
         slidesToShow: 3,
         slidesToScroll: 1,
         }
      },
      {
      breakpoint: 700,
      settings: {
         variableWidth: false,
         slidesToShow: 2,
         slidesToScroll: 1,
      }
      },
      {
      breakpoint: 470,
      settings: {
         variableWidth: false,
         slidesToShow: 1,
         slidesToScroll: 1,
      }
      }
   ]
}); */

/* Включить слайдер на определенном разрешении! */

/* if ($(window).width() <= 768) {
   $(".massage__block").slick({
      infinite: false,
      arrows: true,
      slidesToShow: 1,
      slidesToScroll: 1
   });
} */

/* SWIPER для блока Workshop */

// var galleryThumbs = new Swiper('.choice-buttons', {
//    slidesPerView: 'auto', /* фиксированная ширина слайда указанная в css */
//    freeMode: true, 
//    watchSlidesVisibility: true,
//    watchSlidesProgress: true
// });

// var mySwiper = new Swiper('.workout__slider', {
//    slidesPerView: 1,
//    effect: "fade",
//    fadeEffect: {
//       crossFade: true
//    },
//    spaceBetween: 150,
//       navigation: {
//          nextEl: '.swiper-button-next',
//          prevEl: '.swiper-button-prev',
//       },
//       thumbs: {
//          swiper: galleryThumbs
//       }
// });

// $('[data-fancybox="gallery"]').fancybox({
//    buttons: [
//       //"zoom",
//       //"share",
//       //"slideShow",
//       //"fullScreen",
//       //"download",
//       //"thumbs",
//       "close"
//    ],
//    animationEffect: "fade",
//    animationDuration: 450,
//    transitionEffect: "fade",
//    transitionDuration: 800,
//    hideScrollbar: false,
//    mobile: {
//       clickOutside: "close",
//       //clickSlide:  "close",
//       clickContent: "close"
//    },
// });