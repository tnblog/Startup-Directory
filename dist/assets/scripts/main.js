'use strict';

var $body = $("body");
$(function () {
  $('body').fadeIn(1000); // ==============================================================
  // スムーススクロール
  // ==============================================================

  $('a[href^="#"]').on('click', function () {
    var href = $(this).attr('href');
    var position = $(href).offset().top;
    $('html, body').animate({
      'scrollTop': position
    }, 500);
    return false;
  }); // ==============================================================
  // ドロワー
  // ==============================================================

  $('.js-draw__trigger').on('click', function () {
    $('.js-draw__trigger').toggleClass('is-active');
    $('.js-draw__content').toggleClass('is-active');
    $('body').toggleClass('lock');
  }); // ==============================================================
  // タブ
  // ==============================================================

  $('.js-tab__list li').on('click', function () {
    $('.js-tab__list li').removeClass('is-active');
    $(this).addClass('is-active');
    var currentContent = $('#' + $(this).data('id'));
    $('.js-tab__content').removeClass('is-active');

    if (currentContent.length) {
      currentContent.addClass('is-active');
    }
  }); // ==============================================================
  // アコーディオン
  // ==============================================================

  $('.js-acc__trigger').on('click', function () {
    $('.js-acc__trigger').not(this).removeClass('is-open');
    $('.js-acc__trigger').not(this).next().stop().slideUp(300);
    $(this).toggleClass('is-open');
    $(this).next().stop().slideToggle(300);
  });
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
    $gallery.isotope({
      filter: filterValue
    });
  });
  $('.js-filtering').on('click', 'li', function () {
    $(this).addClass('is-active').siblings().removeClass('is-active');
  }); // var webStorage = function () {
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
    var els = document.querySelectorAll('.inview');

    var cb = function cb(entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-anim');
        } else {}
      });
    };

    var options = {
      root: null,
      rootMargin: '-20% 0px',
      threshold: 0
    };
    var io = new IntersectionObserver(cb, options);
    els.forEach(function (el) {
      return io.observe(el);
    });
  } // ==============================================================
  // スクロール監視 - header
  // ==============================================================

  {
    var callback = function callback(entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          header.classList.add('is-active');
        } else {
          header.classList.remove('is-active');
        }
      });
    };

    var _els = document.querySelectorAll('.js-first-view');

    var header = document.getElementById('js-header');
    var _options = {
      root: null,
      rootMargin: '-50% 0px',
      threshold: 0
    };
    var observer = new IntersectionObserver(callback, _options);

    _els.forEach(function (el) {
      observer.observe(el);
    });
  } // ==============================================================
  // 文字アニメーション
  // ==============================================================

  {
    var _els2 = document.querySelectorAll('.animate-heading');

    var _cb = function _cb(entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('inview'); // setTimeout(() => {
          // }, 600);

          observer.unobserve(entry.target);
        } else {}
      });
    };

    var _options2 = {
      root: null
    };

    var _io = new IntersectionObserver(_cb, _options2);

    _els2.forEach(function (el) {
      return _io.observe(el);
    });

    splitStr(_els2);
  }
});