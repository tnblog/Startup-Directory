"use strict";

document.addEventListener('DOMContentLoaded', function () {
  // ==============================================================
  // スクロール監視 - about
  // ==============================================================
  {
    var els = document.querySelectorAll('.box');
    var options = {
      root: null,
      // 今回はビューポートをルート要素とする
      rootMargin: "-50% 0px",
      // ビューポートの中心を判定基準にする
      threshold: 0 // 閾値は0

    };
    var io = new IntersectionObserver(doWhenIntersect, options);
    els.forEach(function (el) {
      return io.observe(el);
    });
    doWhenIntersect(entries);
    activateIndex(els);
  }
});