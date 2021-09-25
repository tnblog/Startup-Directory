"use strict";

var modal = document.getElementById('modal');
var show = document.getElementById('modal__show');
var close = document.getElementById('modal__close');
var backGround = document.getElementById('modal__background');
show.addEventListener('click', function () {
  modal.classList.add('is-show');
  backGround.classList.add('is-show');
});
close.addEventListener('click', function () {
  modal.classList.remove('is-show');
  backGround.classList.remove('is-show');
});
backGround.addEventListener('click', function () {
  close.click();
});
//# sourceMappingURL=main.js.map
