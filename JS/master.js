// If Local Storage Item Has Value, Active Class Will Be Added To The Targeted Element
function CheckIfLocalDataHasValue(localItemName, listOfElementsSelector) {
  let localItemData = localStorage.getItem(localItemName);
  if (localItemData !== null) {
    document.querySelectorAll(listOfElementsSelector).forEach((element) => {
      element.classList.remove("active");
      if (element.dataset.local === localItemData) {
        element.classList.add("active");
      }
    });
  }
  return localItemData;
}

// Check If There Is Local Storage Color
let localData = CheckIfLocalDataHasValue("color_option", ".colors-list li");
if (localData !== null) {
  document.documentElement.style.setProperty("--main-Color", localData);
}

// Check if there is local storage Bullets Option
localData = CheckIfLocalDataHasValue("bullets_option", ".bullets-option span");
if (localData !== null) {
  ChangeBulletsShowOption(localData, document.querySelector(".nav-bullets"));
}

// Taggle spin class on icon
document.querySelector(".settings-box .settings-icon").onclick = function () {
  this.classList.toggle("fa-spin");
  document.querySelector(".settings-box").classList.toggle("open");
};

function HandleActiveClass(e) {
  // Remove active class from all childrens
  e.target.parentElement.querySelectorAll(".active").forEach((element) => {
    element.classList.remove("active");
  });

  // Add active class on targeted element
  e.target.classList.add("active");
}

// Switch Colors
const colorsLi = document.querySelectorAll(".colors-list li");
colorsLi.forEach((li) => {
  li.addEventListener("click", (e) => {
    const mainColor = e.target.dataset.maincolor;
    const mainHoverColor = e.target.dataset.mainhovercolor;
    const mainActiveColor = e.target.dataset.mainactivecolor;

    console.log(e.target.dataset);
    console.log(mainColor);
    console.log(mainHoverColor);
    console.log(mainActiveColor);

    document.documentElement.style.setProperty("--main-Color", mainColor);
    document.documentElement.style.setProperty(
      "--main-Hover-Color",
      mainHoverColor
    );
    document.documentElement.style.setProperty(
      "--main-Active-Color",
      mainActiveColor
    );

    localStorage.setItem("color_option", mainColor);
    HandleActiveClass(e);
  });
});

//Get Skill Selector
let ourSkills = document.querySelector(".skills");
//Get Progress selector
let allSkills = document.querySelectorAll(".skill-box .skill-progress span");
window.onscroll = function () {
  //Skill offset top
  let skillOffsetTop = ourSkills.offsetTop;

  //Skills outer height
  let skillOuterHeight = ourSkills.offsetHeight;

  //Window Height
  let windowHeight = this.innerHeight;

  //Window Scroll Top
  let windowScrollTop = this.pageYOffset;

  if (
    windowScrollTop + 500 >
    skillOffsetTop + skillOuterHeight - windowHeight
  ) {
    allSkills.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  } else {
    allSkills.forEach((skill) => {
      skill.style.width = "0%";
    });
  }
};

// Navigation Function
function MakeSmoothNavigation(itemsArr) {
  itemsArr.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      document
        .querySelector(e.target.dataset.section)
        .scrollIntoView({ behavior: "smooth" });
    });
  });
}

// Select All Bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullet");
// Make Naviggation on billets
MakeSmoothNavigation(allBullets);

let bulletSpan = document.querySelectorAll(".bullets-option span");
function ChangeBulletsShowOption(option, bulletsContainer) {
  // console.log(bulletsContainer);
  // console.log(option);
  if (option == "yes") {
    bulletsContainer.classList.add("d-md-block");
  } else {
    bulletsContainer.classList.remove("d-md-block");
  }
}
bulletSpan.forEach((s) => {
  s.addEventListener("click", (e) => {
    ChangeBulletsShowOption(
      s.dataset.local,
      document.querySelector(".nav-bullets")
    );
    localStorage.setItem("bullets_option", s.dataset.local);
    HandleActiveClass(e);
  });
});

//Reset Button
document.querySelector(".reset-options").onclick = function () {
  localStorage.clear();
  window.location.reload();
};
