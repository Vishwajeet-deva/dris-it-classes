// function toggleMenu() {
//   var menu = document.getElementById("menu");
//   if (menu.style.display === "flex") {
//     menu.style.display = "none";
//   } else {
//     menu.style.display = "flex";
//   }
// }

// console.log("index.js connected successfully");

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
