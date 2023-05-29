/*=============== SHOW MENU ===============*/
const showMenu = (toggleId, navId) => {
  const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId);

  // Validate that variables exist
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      // We add the show-menu class to the div tag with the nav__menu class
      nav.classList.toggle("show-menu");
    });
  }
};
showMenu("nav-toggle", "nav-menu");

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll(".nav__link");

function linkAction() {
  const navMenu = document.getElementById("nav-menu");
  // When we click on each nav__link, we remove the show-menu class
  navMenu.classList.remove("show-menu");
}
navLink.forEach((n) => n.addEventListener("click", linkAction));

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight,
      sectionTop = current.offsetTop - 50,
      sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.add("active-link");
    } else {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.remove("active-link");
    }
  });
}
window.addEventListener("scroll", scrollActive);

/*=============== CHANGE BACKGROUND HEADER ===============*/
function scrollHeader() {
  const nav = document.getElementById("header");
  // When the scroll is greater than 80 viewport height, add the scroll-header class to the header tag
  if (this.scrollY >= 80) nav.classList.add("scroll-header");
  else nav.classList.remove("scroll-header");
}
window.addEventListener("scroll", scrollHeader);

/*=============== SHOW SCROLL UP ===============*/
function scrollUp() {
  const scrollUp = document.getElementById("scroll-up");
  // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
  if (this.scrollY >= 560) scrollUp.classList.add("show-scroll");
  else scrollUp.classList.remove("show-scroll");
}
window.addEventListener("scroll", scrollUp);

/*=============== DARK LIGHT THEME ===============*/
const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";
const iconTheme = "bx-toggle-right";

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? "dark" : "light";
const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme)
    ? "bx-toggle-left"
    : "bx-toggle-right";

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
    darkTheme
  );
  themeButton.classList[selectedIcon === "bx-toggle-left" ? "add" : "remove"](
    iconTheme
  );
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener("click", () => {
  // Add or remove the dark / icon theme
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);
  // We save the theme and the current icon that the user chose
  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});

// TIMER PROMOTION
const deadline = "2023-5-30";

function getTimeRemaining(endtime) {
  let days, hours, minutes, seconds;
  const timer = Date.parse(endtime) - Date.parse(new Date());

  if (timer <= 0) {
    days = "0";
    hours = "0";
    minutes = "0";
    seconds = "0";
  } else {
    (days = Math.floor(timer / (1000 * 60 * 60 * 24))),
      (hours = Math.floor((timer / (1000 * 60 * 60)) % 24)),
      (minutes = Math.floor((timer / 1000 / 60) % 60)),
      (seconds = Math.floor((timer / 1000) % 60));
  }

  return { timer, days, hours, minutes, seconds };
}

function getZero(num) {
  if (num >= 0 && num < 10) {
    return `0${num}`;
  } else {
    return num;
  }
}

function setClock(selector, endtime) {
  const timer = document.querySelector(selector),
    days = timer.querySelector("#days"),
    hours = timer.querySelector("#hours"),
    minutes = timer.querySelector("#minutes"),
    seconds = timer.querySelector("#seconds"),
    timeInterval = setInterval(updateClock, 1000);

  updateClock();

  function updateClock() {
    const t = getTimeRemaining(endtime);

    (days.innerHTML = getZero(t.days)),
      (hours.innerHTML = getZero(t.hours)),
      (minutes.innerHTML = getZero(t.minutes)),
      (seconds.innerHTML = getZero(t.seconds));

    if (t.timer <= 0) {
      clearInterval(timeInterval);
    }
  }
}

setClock(".timer", deadline);

// close
const x = document.querySelector(".close"),
  pro = document.querySelector(".promotion");

x.addEventListener("click", (e) => {
  if (e.target == x) {
    pro.style.display = "none";
  }
});

// MODAL
const modaltrigger = document.querySelector("[data-modal]"),
  modal = document.querySelector(".modal"),
  modalClosed = document.querySelector("[data-close]");

function closeModal() {
  modal.classList.add("hide");
  modal.classList.remove("show");
  document.body.style.overflowY = "";
}

function openModal() {
  modal.classList.add("show");
  modal.classList.remove("hide");
  document.body.style.overflowY = "hidden";
  clearInterval(timerModal);
}

modaltrigger.addEventListener("click", openModal);

modalClosed.addEventListener("click", closeModal);

modal.addEventListener("click", (e) => {
  if (e.target == modal) {
    closeModal();
  }
});

document.addEventListener("keydown", (e) => {
  if (e.code == "Escape" && modal.classList.contains("show")) {
    closeModal();
  }
});

timerModal = setTimeout(openModal, 5000);

function openModalByScrol() {
  if (
    window.pageYOffset + document.documentElement.clientHeight >=
    document.documentElement.scrollHeight
  ) {
    openModal();
    window.removeEventListener("scroll", openModalByScrol);
  }
}
window.addEventListener("scroll", openModalByScrol);