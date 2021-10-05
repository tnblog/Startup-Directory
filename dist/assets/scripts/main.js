"use strict";

// アコーディオンメニュー
$(function () {
  $(".js-accordion-title").on('click', function () {
    $(".js-accordion-title").not(this).removeClass("open");
    $(".js-accordion-title").not(this).next().slideUp(300);
    $(this).toggleClass("open");
    $(this).next().slideToggle(300);
  });
}); // ローディング

$(window).on('load', function () {
  function loaderClose() {
    $("#js-loader").fadeOut();
  }

  setTimeout(loaderClose, 500);
}); // ページトップスクロール

function PageTopAnime() {
  var scroll = $(window).scrollTop();

  if (scroll >= 200) {
    $('#page-top').removeClass('DownMove');
    $('#page-top').addClass('UpMove');
  } else {
    if ($('#page-top').hasClass('UpMove')) {
      $('#page-top').removeClass('UpMove');
      $('#page-top').addClass('DownMove');
    }
  }

  var wH = window.innerHeight;
  var footerPos = $('#footer').offset().top;

  if (scroll + wH >= footerPos + 10) {
    var pos = scroll + wH - footerPos + 10;
    $('#page-top').css('bottom', pos);
  } else {
    if ($('#page-top').hasClass('UpMove')) {
      $('#page-top').css('bottom', '10px');
    }
  }
} // 画面をスクロールをしたら動かしたい場合の記述


$(window).scroll(function () {
  PageTopAnime();
});
$(window).on('load', function () {
  PageTopAnime();
});
$('#page-top').click(function () {
  $('body,html').animate({
    scrollTop: 0
  }, 500);
  return false;
}); // タブメニュー

var contents = document.querySelectorAll('.tab__box');
var listItems = document.querySelectorAll('.tab nav ul li');
listItems.forEach(function (item, idx) {
  item.addEventListener('click', function () {
    hideAllContents();
    hideAllItems();
    item.classList.add('active');
    contents[idx].classList.add('show');
  });
});

function hideAllContents() {
  contents.forEach(function (content) {
    return content.classList.remove('show');
  });
}

function hideAllItems() {
  listItems.forEach(function (item) {
    return item.classList.remove('active');
  });
}