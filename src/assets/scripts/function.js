'use strict';


function splitStr(els) {

  for (let el of els) {
    const chars = el.innerHTML.trim().split("");

    el.innerHTML = chars.reduce((acc, curr) => {
      curr = curr.replace(/\s+/, '&nbsp;');
      return `${acc}<span class="char">${curr}</span>`;
    }, "");
  }
}




function doWhenIntersect(entries) {
  // 交差検知をしたもののなかで、isIntersectingがtrueのDOMを色を変える関数に渡す
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      activateIndex(entry.target);
    }
  });
}

function activateIndex(els) {
  // すでにアクティブになっている目次を選択
  const currentActiveIndex = document.querySelector("#indexList .is-active");
  // すでにアクティブになっているものが0個の時（=null）以外は、activeクラスを除去
  if (currentActiveIndex !== null) {
    currentActiveIndex.classList.remove("is-active");
  }
  // 引数で渡されたDOMが飛び先のaタグを選択し、activeクラスを付与
  const newActiveIndex = document.querySelector(
    `a[href='#${els.id}']`
  );
  newActiveIndex.classList.add("is-active");
}
