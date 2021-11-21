"use strict";

var blogSwiper = null;
var hotelSwiper = null;
var shopSwiper = null;
var productThumb = null;
var productMain = null;

var createSwiper = function createSwiper() {
  var blogSwiperOption = {
    slidesPerView: 1,
    spaceBetween: 40,
    grabCursor: true,
    touchEventsTarget: true,
    scrollbar: {
      el: '.index__slideScrollbar--blog',
      hide: false,
      draggable: true,
      grabCursor: true
    },
    breakpoints: {
      767: {
        slidesPerView: 2
      },
      999: {
        slidesPerView: 4
      }
    }
  };
  blogSwiper = new Swiper('.index__slider--blog', blogSwiperOption);
  var shopSwiperOption = {
    slidesPerView: 1,
    loop: true,
    grabCursor: true,
    touchEventsTarget: true,
    centeredSlides: true,
    spaceBetween: 10,
    breakpoints: {
      767: {
        slidesPerView: 2.2
      },
      999: {
        spaceBetween: 30,
        slidesPerView: 2.2
      }
    }
  };
  shopSwiper = new Swiper('.shop__slider', shopSwiperOption);
  var productThumbOption = {
    spaceBetween: 2,
    slidesPerView: 5,
    freeMode: true,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
    wrapperClass: "product__wrap--thumbs",
    slideClass: "product__thumb" // slideActiveClass: "hotel__slide--active"

  };
  productThumb = new Swiper('.product__thumbs', productThumbOption);
  var productMainOption = {
    effect: "fade",
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    thumbs: {
      swiper: productThumb
    }
  };
  productMain = new Swiper('.product__slider', productMainOption);
  var hotelSwiperOption = {
    spaceBetween: 0,
    loop: true,
    grabCursor: true,
    autoHeight: true,
    // threshold: 9999,
    effect: "fade",
    // speed: 1400,
    // autoplay: {
    //   delay: 5e3,
    //   disableOnInteraction: !1
    // },
    wrapperClass: "hotel__slide--wrap",
    slideClass: "hotel__slide",
    slideActiveClass: "hotel__slide--active"
  };
  hotelSwiper = new Swiper('.hotel__slider', hotelSwiperOption);
  hotelSwiper.on('slideChange', function () {
    $body.attr("data-character", hotelSwiper.realIndex + 1);
  });
  $(".js-hotel-tab").on("click", function () {
    hotelSwiper.slideTo($(this).attr("data-num"));
    $(".js-hotel-tab").removeClass('is-active');
    $(this).addClass('is-active');
  });
};

createSwiper();