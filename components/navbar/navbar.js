const navButton = document.getElementById("nav-button");
const navbar = document.querySelector(".navbar");
const parentSubmenu = document.querySelector(".parent-submenu");
const navbarDivSubmenu = document.querySelector(".navbar-div-submenu");
const arrowIcon = document.querySelector(".arrow-icon ");

navButton.addEventListener("click", (e) => {
  e.preventDefault();
  navButton.style.position = "fixed";
  navButton.style.zIndex = "100";
  navButton.style.display = "block";
  navButton.textContent == "+"
    ? (navButton.textContent = "-")
    : (navButton.textContent = "+");

  //   navbar.style.display = navbar.style.display == "block" ? "none" : "block";
  navbar.style.left = navbar.style.left == "0%" ? "100%" : "0%";
});
parentSubmenu.onclick = (e) => {
  e.preventDefault();
  arrowIcon.style.transform =
    arrowIcon.style.transform == "rotate(180deg)"
      ? "rotate(0deg)"
      : "rotate(180deg)";
  navbarDivSubmenu.style.display =
    navbarDivSubmenu.style.display == "block" ? "none" : "block";
};
