document.addEventListener('DOMContentLoaded', function () {

  // ==============================================================
  // スクロール監視 - about
  // ==============================================================
  {
    const els = document.querySelectorAll('.box');

    const options = {
      root: null, // 今回はビューポートをルート要素とする
      rootMargin: "-50% 0px", // ビューポートの中心を判定基準にする
      threshold: 0 // 閾値は0
    };

    const io = new IntersectionObserver(doWhenIntersect, options);
    els.forEach(el => io.observe(el));


    doWhenIntersect(entries);
    activateIndex(els);
  }


});
