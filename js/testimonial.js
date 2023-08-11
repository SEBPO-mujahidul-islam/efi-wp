/*----------------------
---- RoW slider js -----
------------------------*/
let efi_testimonial_carousel = document.querySelector(".efi_testimonial_carousel");

let efi_testimonial_carouselInner = document.querySelector(
  ".efi_testimonial_carousel-inner"
);

let prev = document.querySelector(".efi_testimonial_carousel-controls .prev");

let next = document.querySelector(".efi_testimonial_carousel-controls .next");

let slides = document.querySelectorAll(
  ".efi_testimonial_carousel-inner .efi_testimonial_carousel-item"
);

let totalSlides = slides.length;

let step = 100 / totalSlides;

let activeSlide = 0;

let activeIndicator = 0;

let direction = -1;

let jump = 1;

let interval = 5000; /*5000*/

let time;

//Init efi_testimonial_carousel
efi_testimonial_carouselInner.style.minWidth = totalSlides * 100 + "%";
loadIndicators();
loop(true);

//efi_testimonial_carousel events

next.addEventListener("click", () => {
  slideToNext();
});

prev.addEventListener("click", () => {
  slideToPrev();
});

efi_testimonial_carouselInner.addEventListener("transitionend", () => {
  if (direction === -1) {
    if (jump > 1) {
      for (let i = 0; i < jump; i++) {
        activeSlide++;
        efi_testimonial_carouselInner.append(
          efi_testimonial_carouselInner.firstElementChild
        );
      }
    } else {
      activeSlide++;
      efi_testimonial_carouselInner.append(
        efi_testimonial_carouselInner.firstElementChild
      );
    }
  } else if (direction === 1) {
    if (jump > 1) {
      for (let i = 0; i < jump; i++) {
        activeSlide--;
        efi_testimonial_carouselInner.prepend(
          efi_testimonial_carouselInner.lastElementChild
        );
      }
    } else {
      activeSlide--;
      efi_testimonial_carouselInner.prepend(
        efi_testimonial_carouselInner.lastElementChild
      );
    }
  }

  efi_testimonial_carouselInner.style.transition = "none";
  efi_testimonial_carouselInner.style.transform = "translateX(0%)";
  setTimeout(() => {
    jump = 1;
    efi_testimonial_carouselInner.style.transition = "all ease .5s";
  });
  updateIndicators();
});

document
  .querySelectorAll(".efi_testimonial_carousel-indicators span")
  .forEach((item) => {
    item.addEventListener("click", (e) => {
      let slideTo = parseInt(e.target.dataset.slideTo);
      let indicators = document.querySelectorAll(
        ".efi_testimonial_carousel-indicators span"
      );

      indicators.forEach((item, index) => {
        if (item.classList.contains("active")) {
          activeIndicator = index;
        }
      });
      if (slideTo - activeIndicator > 1) {
        jump = slideTo - activeIndicator;
        step = jump * step;
        slideToNext();
      } else if (slideTo - activeIndicator === 1) {
        slideToNext();
      } else if (slideTo - activeIndicator < 0) {
        if (Math.abs(slideTo - activeIndicator) > 1) {
          jump = Math.abs(slideTo - activeIndicator);
          step = jump * step;
          slideToPrev();
        }
        slideToPrev();
      }
      step = 100 / totalSlides;
    });
  });

efi_testimonial_carousel.addEventListener("mouseover", () => {
  loop(false);
});

efi_testimonial_carousel.addEventListener("mouseout", () => {
  loop(true);
});

//efi_testimonial_carousel functions

function loadIndicators() {
  slides.forEach((slide, index) => {
    if (index === 0) {
      document.querySelector(
        ".efi_testimonial_carousel-indicators"
      ).innerHTML += `<span data-slide-to="${index}" class="active"></span>`;
    } else {
      document.querySelector(
        ".efi_testimonial_carousel-indicators"
      ).innerHTML += `<span data-slide-to="${index}"></span>`;
    }
  });
}

function updateIndicators() {
  if (activeSlide > totalSlides - 1) {
    activeSlide = 0;
  } else if (activeSlide < 0) {
    activeSlide = totalSlides - 1;
  }
  document
    .querySelector(".efi_testimonial_carousel-indicators span.active")
    .classList.remove("active");
  document
    .querySelectorAll(".efi_testimonial_carousel-indicators span")
    [activeSlide].classList.add("active");
}

function slideToNext() {
  if (direction === 1) {
    direction = -1;
    efi_testimonial_carouselInner.prepend(
      efi_testimonial_carouselInner.lastElementChild
    );
  }

  efi_testimonial_carousel.style.justifyContent = "flex-start";
  efi_testimonial_carouselInner.style.transform = `translateX(-${step}%)`;
}

function slideToPrev() {
  if (direction === -1) {
    direction = 1;
    efi_testimonial_carouselInner.append(
      efi_testimonial_carouselInner.firstElementChild
    );
  }
  efi_testimonial_carousel.style.justifyContent = "flex-end";
  efi_testimonial_carouselInner.style.transform = `translateX(${step}%)`;
  loop(false);
}

function loop(status) {
  if (status === true) {
    time = setInterval(() => {
      slideToNext();
    }, interval);
  } else {
    clearInterval(time);
  }
}
// pov loader add. before full load js pov none.
document.addEventListener("DOMContentLoaded", function () {
  efi_testimonial_carousel.style.display = "flex";
});

/*-----------------------
--- End Row js Slider ----
------------------------*/

/**----------------------
 * product scroller js ---
 --------------------------*/
// tab carousal js
// initialize product scroller
advanceArrows("stella-dog-row-product");
advanceArrows("stella-cat-row-product");
function advanceArrows(idx) {
  var splideElement = "#" + idx;
  var splideDefaultOptions = {
      arrows: true,
      type: "slide",
      start:0,
      focus: 0,
      pagination: false,
      rewindSpeed: 500,
      speed: 500,
      pauseOnHover: true,
      perPage: 6,
      perMove: 1,
      omitEnd: true,
      breakpoints: {
        375: {
          perPage: 1,
        },
        576: {
          perPage: 2,
        },
        991: {
          perPage: 3,
        },
        992: {
          perPage: 3,
        },
        1024: {
          perPage: 4,
        },
        1200: {
          perPage: 6,
        },
        1440: {
          perPage: 6,
        },
      },
    };
    new Splide(splideElement, splideDefaultOptions).mount();

}


/* ************************************************************************************** */
//for tab sweater & loader added
document.addEventListener("DOMContentLoaded", function () {
  filterCatProduct("stella-cat-row-product");
  filterDogProduct("stella-dog-row-product");
});
// for dog filter function
function filterDogProduct(c) {
  var x, i;
  x = document.getElementsByClassName("citrusStella__dogProduct");
  if (c == "all") c = "";
  for (i = 0; i < x.length; i++) {
    RemoveClass(x[i], "citrusTabShow");
    if (x[i].className.indexOf(c) > -1) AddClass(x[i], " citrusTabShow");
  }
  advanceArrows(c);
}
// for cat filter function
function filterCatProduct(c) {
  var x, i;
  x = document.getElementsByClassName("citrusStella__catProduct");
  if (c == "all") c = "";
  for (i = 0; i < x.length; i++) {
    RemoveClass(x[i], "citrusTabShow");
    if (x[i].className.indexOf(c) > -1) AddClass(x[i], "citrusTabShow");
  }
  advanceArrows(c);
}
function AddClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {
      element.className += " " + arr2[i];
    }
  }
}

function RemoveClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);
    }
  }
  element.className = arr1.join(" ");
}

// Add active class to the current button (highlight it)
document.addEventListener("DOMContentLoaded", function () {
  // for dog active class filter
  var dogBtnContainer = document.getElementById("citrusStellaTabId");
  var dogBtns = dogBtnContainer.getElementsByClassName(
    "citrusStella__tab_item"
  );
  // for cat active class
  var catBtnContainer = document.getElementById("citrusStellaTabIdCat");
  var catBtns = catBtnContainer.getElementsByClassName(
    "citrusStella__tab_item"
  );
  addActiveClass(dogBtns, "citrusStella__Dog-active_tab");
  addActiveClass(catBtns, "citrusStella__cat-active_tab");
});
function addActiveClass(element, activeClass) {
  for (var i = 0; i < element.length; i++) {
    element[i].addEventListener("click", function () {
      var current = document.getElementsByClassName(activeClass);
      current[0].className = current[0].className.replace(
        " " + activeClass,
        ""
      );
      this.className += " " + activeClass;
    });
  }
}
//for Dog best seller tab switcher