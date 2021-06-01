@@include('libs/jquery-3.5.1.min.js')
@@include('libs/da.js')

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
  
 var deadline="July 07 2021 14:00:00 GMT+3";
initializeClock('timer', deadline);