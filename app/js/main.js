console.log('hell3');
$(() => {
  $(document).ready(() => {
    const topBtn = $('.top-scroll');
    const header = $('.header');
    const spMenu = $('.header__menu-sp');
    const accordion = $('.accordion');
    const about = $('#about');
    $(window).scroll(() => {
      console.log('scroll');
      // スクロール位置が最初だったら
      if ($(this).scrollTop() == 0) {
        header.removeClass('scroll');
        return false;
      } else {
        header.addClass('scroll');
      }
    });
    //スルスルっとスクロールでトップへもどる
    topBtn.click(() => {
      $('body,html').animate({
        scrollTop: 0
      }, 500);
      return false;
    });
    //spメニューをクリック
    spMenu.click(() => {
      $('.header__menu-sp, .mask, body').toggleClass('active');
      accordion.slideToggle();
      if (!header.hasClass('scroll')) {
        header.addClass('scroll');
      }
    });
    // pcメニューをホバー
    $('#about, .dropdown').hover(() => {
      if (!header.hasClass('scroll')) {
        header.addClass('scroll');
      }
      $(".dropdown").stop().slideDown();
      $('.mask, body').addClass('active');
    }, function () {
        $(".dropdown").stop().slideUp();
        $('.mask, body').removeClass('active');
    });
  });
});