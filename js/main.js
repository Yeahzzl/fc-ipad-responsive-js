import ipads from "../data/ipads.js";
import navigations from "../data/navigations.js";

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
  stopScroll();
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
  playScroll();
  headerMenuEls.reverse().forEach(function (el, index) {
    el.style.transitionDelay = (index * 0.4) / headerMenuEls.length + "s";
  });
  searchDelayEl.reverse().forEach(function (el, index) {
    el.style.transitionDelay = (index * 0.4) / searchDelayEl.length + "s";
  });
  searchDelayEl.reverse();
  searchInputEl.value = "";
}

function playScroll() {
  document.documentElement.classList.remove("fixed");
}
function stopScroll() {
  document.documentElement.classList.add("fixed");
}

searchStarterEl.addEventListener("click", showSearch);
searchCloserEl.addEventListener("click", function (event) {
  event.stopPropagation();
  hideSearch();
});
searchShadowEl.addEventListener("click", hideSearch);

// 헤더 메뉴 토글!
const menuStarterEl = document.querySelector("header .menu-starter");
menuStarterEl.addEventListener("click", function () {
  if (headerEl.classList.contains("menuing")) {
    headerEl.classList.remove("menuing");
    searchInputEl.value = "";

    playScroll();
  } else {
    headerEl.classList.add("menuing");
    stopScroll();
  }
});

// 헤더 검색
const searchTextFieldEL = document.querySelector("header .textfield");
const searchCancelEL = document.querySelector("header .search-canceler");
searchTextFieldEL.addEventListener("click", function () {
  headerEl.classList.add("searching--mobile");
  searchInputEl.focus();
});
searchCancelEL.addEventListener("click", function () {
  headerEl.classList.remove("searching--mobile");
});

// PC모드에서 검색창을 열고 모바일 모드로 전환할 때 발생하는 문제
window.addEventListener("resize", function () {
  if (window.innerWidth <= 740) {
    headerEl.classList.remove("searching");
  } else {
    headerEl.classList.remove("searching--mobile");
  }
});

// 네비게이션 모바일버전 클래스
const navEl = document.querySelector("nav");
const navMenuToggleEl = navEl.querySelector(".menu-toggler");
const navMenuShadowEl = navEl.querySelector(".shadow");
navMenuToggleEl.addEventListener("click", function () {
  if (navEl.classList.contains("menuing")) {
    hideNavMenu();
  } else {
    showNavMenu();
  }
});
navEl.addEventListener("click", function (event) {
  event.stopPropagation();
});
navMenuShadowEl.addEventListener("click", hideNavMenu);
window.addEventListener("click", hideNavMenu);
function showNavMenu() {
  navEl.classList.add("menuing");
}
function hideNavMenu() {
  navEl.classList.remove("menuing");
}

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

// 비디오 재생
const video = document.querySelector(".stage video");
const playBtn = document.querySelector(".stage .controller--play");
const pauseBtn = document.querySelector(".stage .controller--pause");

playBtn.addEventListener("click", function () {
  video.play();
  pauseBtn.classList.remove("hide");
  playBtn.classList.add("hide");
});

pauseBtn.addEventListener("click", function () {
  video.pause();
  pauseBtn.classList.add("hide");
  playBtn.classList.remove("hide");
});

// 당신에게 맞는 iPad는? 랜더링
const itemsEl = document.querySelector("section.compare .items");
ipads.forEach(function (ipad) {
  const itemEl = document.createElement("div");
  itemEl.classList.add("item");

  let colorList = "";
  ipad.colors.forEach(function (color) {
    colorList += /* html */ `<li style="background-color:${color}"></li>`;
  });

  itemEl.innerHTML = /* html */ `
   <div class="thumbnail">
    <img src="${ipad.thumbnail}" alt="${ipad.name}"/>
   </div>
   <ul class="colors">
    ${colorList}
   </ul>
   <h3 class="name">${ipad.name}</h3>
   <p class="tagline">${ipad.tagline}</p>
   <p class="price">₩${ipad.price.toLocaleString("en-US")}부터</p>
   <button class="btn">구입하기</button>
   <a href="${ipad.url}" class="link">더 알아보기</a>
  `;

  itemsEl.append(itemEl);
});

// 푸터 Navigations
const navigationsEl = document.querySelector("footer .navigations");
navigations.forEach(function (nav) {
  const mapEl = document.createElement("div");
  mapEl.classList.add("map");

  let mapList = "";
  nav.maps.forEach(function (map) {
    mapList += /* html */ `
<li><a href="${map.url}">${map.name}</a></li>`;
  });

  mapEl.innerHTML = /* html */ `
  <h3>
    <span class="text">${nav.title}</span>
  </h3>
  <ul>
  ${mapList}
  </ul>
  `;

  navigationsEl.append(mapEl);
});

const thisYearEl = document.querySelector("span.this-year");
thisYearEl.textContent = new Date().getFullYear();
