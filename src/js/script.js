@@include('libs/jquery-3.5.1.min.js')
@@include('libs/da.js')
@@include('libs/swiper.min.js')
@@include('libs/fancybox.min.js')

$('.hamburger').on('click', function () {
  $('.hamburger').toggleClass('is-active');
  $('.mob-menu').toggleClass('menu-active');
  $('body').toggleClass('scroll');
});

/* ТАЙМЕР */
function getTimeRemaining(endtime) {
  var t = Date.parse(endtime) - Date.parse(new Date());
  var seconds = Math.floor((t / 1000) % 60);
  var minutes = Math.floor((t / 1000 / 60) % 60);
  var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
  var days = Math.floor(t / (1000 * 60 * 60 * 24));
  return {
    'total': t,
    'days': days,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds
  };
}

function initializeClock(id, endtime) {
  var clock = document.getElementById(id);
  var daysSpan = clock.querySelector('.timer__days');
  var hoursSpan = clock.querySelector('.timer__hour');
  var minutesSpan = clock.querySelector('.timer__min');
  var secondsSpan = clock.querySelector('.timer__sec');

  function updateClock() {
    var t = getTimeRemaining(endtime);

    daysSpan.innerHTML = t.days;
    hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
    minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
    secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

    if (t.total <= 0) {
      clearInterval(timeinterval);
    }
  }

  updateClock();
  var timeinterval = setInterval(updateClock, 1000);
}
var deadline = "July 07 2021 14:00:00 GMT+3";
initializeClock('timer', deadline);

/* SWIPER */

const swiper = new Swiper('.swiper-container', {
  /* фиксированная ширина слайда указанная в css */
  slidesPerView: 'auto',
  watchSlidesVisibility: true,
  watchSlidesProgress: true,
  loop: true,
  autoplay: {
    delay: 1500,
    disableOnInteraction: false
  },
  preloadImages: false,
  lazy: true,
  watchSlidesVisibility: true
});

/* Fancybox */
$('.fancybox').fancybox({
	buttons: [
		//"zoom",
		//"share",
		//"slideShow",
		//"fullScreen",
		//"download",
		//"thumbs",
		"close"
	],
	animationEffect: "fade",
	animationDuration: 450,
	transitionEffect: "fade",
	transitionDuration: 800,
	hideScrollbar: false,
	mobile: {
		clickOutside: "close",
		//clickSlide:  "close",
		clickContent: "close"
	},
});

//ПЛАВНОЕ ПЕРЕМЕЩЕНИЕ К ЯКОРЯМ
$('.nav__list').on("click","a", function (e) {
  //отменяем стандартную обработку нажатия по ссылке
  e.preventDefault();
  //забираем идентификатор с атрибута href
  let id  = $(this).attr('href'),
  //узнаем высоту от начала страницы до блока на который ссылается якорь
  top = $(id).position().top;
  //анимируем переход на расстояние
  $('body, html').animate({scrollTop: top}, 500);

  $('.hamburger').toggleClass('is-active');
  $('.mob-menu').toggleClass('menu-active');
  $('body').removeClass('scroll');
});

/* Map button */
$('.map-button').on('click', function () {
  $('.map-block').toggleClass('map-full-height');
  $('.map-wrap').toggleClass('map--pt');
});

//Отложенная загрузка карты
//Назначаем iframe id="ymap_lazy" и data-src вместо src
let flag = 0;

window.addEventListener('scroll', function(){
	let scrollY = window.scrollY+window.innerHeight;
	// console.log(scrollY)

	let mapOffset = document.getElementById('ymap_lazy').getBoundingClientRect().top + window.scrollY;
	// console.log(mapOffset)

	if ((scrollY >= mapOffset) && (flag == 0)) {
		let map_block = document.getElementById('ymap_lazy');
		map_block.setAttribute('src', map_block.getAttribute('data-src'));
		map_block.removeAttribute('data-src');
		console.log('YMAP LOADED');

		flag = 1;
	}
});