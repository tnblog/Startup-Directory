'use strict';

var $body = $("body");

$(function () {

  $('body').fadeIn(1000);

  // ==============================================================
  // スムーススクロール
  // ==============================================================
  $('a[href^="#"]').on('click', function () {
    var href = $(this).attr('href');
    var position = $(href).offset().top;
    $('html, body').animate({
      'scrollTop': position
    }, 500);
    return false;
  })

  // ==============================================================
  // ドロワー
  // ==============================================================
  $('.js-draw__trigger').on('click', function () {
    $('.js-draw__trigger').toggleClass('is-active');
    $('.js-draw__content').toggleClass('is-active');
    $('body').toggleClass('lock');
  })

  // ==============================================================
  // タブ
  // ==============================================================
  $('.js-tab__list li').on('click', function () {

    $('.js-tab__list li').removeClass('is-active');
    $(this).addClass('is-active');

    let currentContent = $('#' + $(this).data('id'));

    $('.js-tab__content').removeClass('is-active');

    if (currentContent.length) {
      currentContent.addClass('is-active');
    }
  });

  // ==============================================================
  // アコーディオン
  // ==============================================================
  $('.js-acc__trigger').on('click', function () {
    $('.js-acc__trigger').not(this).removeClass('is-open');
    $('.js-acc__trigger').not(this).next().stop().slideUp(300);
    $(this).toggleClass('is-open');
    $(this).next().stop().slideToggle(300);
  })

 /* ===============================  isotope Masonery  =============================== */

    // isotope
    $('.gallery-mons').isotope({
      // options
      itemSelector: '.js-filter-items',
      masonry: {
          // use element for option
          columnWidth: '.width2'
      }
  });

  $('.gallery').isotope({
      // options
      itemSelector: '.js-filter-items'
  });

  var $gallery = $('.gallery , .gallery-mons').isotope();

  $('.js-filtering').on('click', 'li', function () {
      var filterValue = $(this).attr('data-filter');
      $gallery.isotope({ filter: filterValue });
  });

  $('.js-filtering').on('click', 'li', function () {
      $(this).addClass('is-active').siblings().removeClass('is-active');
  });







  // var webStorage = function () {
  //   if (sessionStorage.getItem('access')) {
  //     /*
  //       2回目以降アクセス時の処理
  //     */
  //     $(".loading").addClass('is-active');
  //   } else {
  //     /*
  //       初回アクセス時の処理
  //     */
  //     sessionStorage.setItem('access', 'true'); // sessionStorageにデータを保存
  //     $(".loading-animation").addClass('is-active'); // loadingアニメーションを表示
  //     setTimeout(function () {
  //       // ローディングを数秒後に非表示にする
  //       $(".loading").addClass('is-active');
  //       $(".loading-animation").removeClass('is-active');
  //     }, 3000); // ローディングを表示する時間
  //   }
  // }
  // webStorage();
});


document.addEventListener('DOMContentLoaded', function () {

  // ==============================================================
  // スクロール監視 - animation
  // ==============================================================
  {
    const els = document.querySelectorAll('.inview');

    const cb = function (entries, observer) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-anim');
        } else {}
      });
    }

    const options = {
      root: null,
      rootMargin: '-20% 0px',
      threshold: 0
    };
    const io = new IntersectionObserver(cb, options);
    els.forEach(el => io.observe(el));
  }

  // ==============================================================
  // スクロール監視 - header
  // ==============================================================
  {
    const els = document.querySelectorAll('.js-first-view');
    const header = document.getElementById('js-header');

    const options = {
      root: null,
      rootMargin: '-50% 0px',
      threshold: 0
    };
    const observer = new IntersectionObserver(callback, options);
    els.forEach((el) => {
      observer.observe(el);
    });

    function callback(entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          header.classList.add('is-active');
        } else {
          header.classList.remove('is-active');
        }
      });
    }

  }

  // ==============================================================
  // 文字アニメーション
  // ==============================================================
  {
    const els = document.querySelectorAll('.animate-heading');

    const cb = function (entries, observer) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {

          entry.target.classList.add('inview');
          // setTimeout(() => {
          // }, 600);

          observer.unobserve(entry.target);
        } else {}
      });
    }

    const options = {
      root: null,
    };

    const io = new IntersectionObserver(cb, options);
    els.forEach(el => io.observe(el));

    splitStr(els);
  }
});
