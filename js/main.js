"use strict";

var _this = void 0;

console.log('hell3');
var topBtn = $('.top-scroll');
var header = $('.header');
var spMenu = $('.header__menu-sp');
var accordion = $('.accordion');
var about = $('#about');
$(window).scroll(function () {
  console.log('scroll'); // スクロール位置が最初だったら

  if ($(_this).scrollTop() == 0) {
    header.removeClass('scroll');
    return false;
  } else {
    header.addClass('scroll');
  }
}); //スルスルっとスクロールでトップへもどる

topBtn.click(function () {
  $('body,html').animate({
    scrollTop: 0
  }, 500);
  return false;
}); //spメニューをクリック

spMenu.click(function () {
  $('.header__menu-sp, .mask, body').toggleClass('active');
  accordion.slideToggle();

  if (!header.hasClass('scroll')) {
    header.addClass('scroll');
  }
}); // pcメニューをホバー

$('#about, .dropdown').hover(function () {
  if (!header.hasClass('scroll')) {
    header.addClass('scroll');
  }

  $(".dropdown").stop().slideDown();
  $('.mask, body').addClass('active');
}, function () {
  $(".dropdown").stop().slideUp();
  $('.mask, body').removeClass('active');
}); // $(() => {
//   $(document).ready(() => {
//   });
// });