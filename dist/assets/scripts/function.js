'use strict';

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function splitStr(els) {
  var _iterator = _createForOfIteratorHelper(els),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var el = _step.value;
      var chars = el.innerHTML.trim().split("");
      el.innerHTML = chars.reduce(function (acc, curr) {
        curr = curr.replace(/\s+/, '&nbsp;');
        return "".concat(acc, "<span class=\"char\">").concat(curr, "</span>");
      }, "");
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
}

function doWhenIntersect(entries) {
  // 交差検知をしたもののなかで、isIntersectingがtrueのDOMを色を変える関数に渡す
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      activateIndex(entry.target);
    }
  });
}

function activateIndex(els) {
  // すでにアクティブになっている目次を選択
  var currentActiveIndex = document.querySelector("#indexList .is-active"); // すでにアクティブになっているものが0個の時（=null）以外は、activeクラスを除去

  if (currentActiveIndex !== null) {
    currentActiveIndex.classList.remove("is-active");
  } // 引数で渡されたDOMが飛び先のaタグを選択し、activeクラスを付与


  var newActiveIndex = document.querySelector("a[href='#".concat(els.id, "']"));
  newActiveIndex.classList.add("is-active");
}