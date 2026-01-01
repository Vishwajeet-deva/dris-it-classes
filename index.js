

function toggleMenu() {
  var menu = document.getElementById("menu");
  menu.style.display = menu.style.display === "flex" ? "none" : "flex";
}

/* Active page highlight */
const links = document.querySelectorAll(".navbar a");
const currentPage = window.location.pathname.split("/").pop();

links.forEach(link => {
  if (link.getAttribute("href") === currentPage || 
     (currentPage === "" && link.getAttribute("href") === "index.html")) {
    link.classList.add("active");
  }
});


function changeVideo(videoId, element) {
  document.getElementById("player").src =
    "https://www.youtube.com/embed/" + videoId;

  document.querySelectorAll(".playlist-item")
    .forEach(item => item.classList.remove("active"));

  element.classList.add("active");
}


//  Slider

/* =========================
   SLIDER – FINAL VERSION
   ========================= */

const slider = document.getElementById("slider");
const slides = slider.querySelectorAll(".slide");
const prevBtn = slider.querySelector(".prev");
const nextBtn = slider.querySelector(".next");
const dotsContainer = slider.querySelector(".dots");

let current = 0;
let interval;
const delay = 4000;
const duration = 800;

/* ---------- INITIAL STATE ---------- */
slides.forEach((slide, i) => {
  slide.style.transform = i === 0 ? "translateX(0)" : "translateX(100%)";
});

slides[0].classList.add("active");

/* ---------- DOTS SETUP ---------- */
slides.forEach((_, i) => {
  const dot = document.createElement("span");
  if (i === 0) dot.classList.add("active");
  dot.addEventListener("click", () => {
    if (i > current) {
      goToSlide(i, "next");
    } else if (i < current) {
      goToSlide(i, "prev");
    }
  });
  dotsContainer.appendChild(dot);
});

const dots = dotsContainer.querySelectorAll("span");

/* ---------- CORE FUNCTION ---------- */
function goToSlide(nextIndex, direction) {
  if (nextIndex === current) return;

  const currentSlide = slides[current];
  const nextSlide = slides[nextIndex];

  // Clean classes
  slides.forEach(slide => {
    slide.classList.remove("active");
  });

  // Prepare next slide position
  if (direction === "next") {
    nextSlide.style.transform = "translateX(100%)";
  } else {
    nextSlide.style.transform = "translateX(-100%)";
  }

  // Force reflow
  nextSlide.offsetHeight;

  // Animate current slide out
  currentSlide.style.transform =
    direction === "next" ? "translateX(-100%)" : "translateX(100%)";

  // Animate next slide in
  nextSlide.style.transform = "translateX(0)";
  nextSlide.classList.add("active");

  // Update dots
  dots[current].classList.remove("active");
  dots[nextIndex].classList.add("active");

  const oldIndex = current;
  current = nextIndex;

  // Reset old slide after animation
  setTimeout(() => {
    slides[oldIndex].style.transform = "translateX(100%)";
  }, duration);
}

/* ---------- CONTROLS ---------- */
function nextSlide() {
  goToSlide((current + 1) % slides.length, "next");
}

function prevSlide() {
  goToSlide((current - 1 + slides.length) % slides.length, "prev");
}

/* ---------- AUTOPLAY ---------- */
function startAuto() {
  interval = setInterval(nextSlide, delay);
}

function stopAuto() {
  clearInterval(interval);
}

/* ---------- EVENTS ---------- */
nextBtn.addEventListener("click", nextSlide);
prevBtn.addEventListener("click", prevSlide);

slider.addEventListener("mouseenter", stopAuto);
slider.addEventListener("mouseleave", startAuto);

/* ---------- START ---------- */
startAuto();
