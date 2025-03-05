const basketStarterEl = document.querySelector("header .basket-starter ");
const basketEl = basketStarterEl.querySelector(".basket");

function showBasket() {
  basketEl.classList.add("show");
}
function hideBasket() {
  basketEl.classList.remove("show");
}

basketStarterEl.addEventListener("click", function (event) {
  event.stopPropagation();
  if (basketEl.classList.contains("show")) {
    hideBasket();
  } else {
    showBasket();
  }
});
// 이벤트버블링 방지
basketEl.addEventListener("click", function (event) {
  event.stopPropagation();
});

window.addEventListener("click", function () {
  hideBasket();
});

// 검색
const headerEl = document.querySelector("header");
const headerMenuEls = [...headerEl.querySelectorAll("ul.menu > li")];
const searchWrapEl = headerEl.querySelector(".search-wrap");
const searchStarterEl = headerEl.querySelector(".search-starter");
const searchCloserEl = searchWrapEl.querySelector(".search-closer");
const searchShadowEl = searchWrapEl.querySelector(".shadow");
const searchInputEl = searchWrapEl.querySelector("input");
const searchDelayEl = [...searchWrapEl.querySelectorAll("li")];

function showSearch() {
  headerEl.classList.add("searching");
  document.documentElement.classList.add("fixed");
  headerMenuEls.reverse().forEach(function (el, index) {
    el.style.transitionDelay = (index * 0.4) / headerMenuEls.length + "s";
  });
  searchDelayEl.forEach(function (el, index) {
    el.style.transitionDelay = (index * 0.4) / searchDelayEl.length + "s";
  });
  setTimeout(function () {
    searchInputEl.focus();
  }, 600);
}
function hideSearch() {
  headerEl.classList.remove("searching");
  document.documentElement.classList.remove("fixed");
  headerMenuEls.reverse().forEach(function (el, index) {
    el.style.transitionDelay = (index * 0.4) / headerMenuEls.length + "s";
  });
  searchDelayEl.reverse().forEach(function (el, index) {
    el.style.transitionDelay = (index * 0.4) / searchDelayEl.length + "s";
  });
  searchDelayEl.reverse();
  searchInputEl.value = "";
}

searchStarterEl.addEventListener("click", showSearch);
searchCloserEl.addEventListener("click", hideSearch);
searchShadowEl.addEventListener("click", hideSearch);

// 요소의 가시성 관찰
const io = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (!entry.isIntersecting) {
      return;
    }
    entry.target.classList.add("show");
  });
});

const infoEls = document.querySelectorAll(".info");
infoEls.forEach(function (el) {
  io.observe(el);
});
