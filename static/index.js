// THEME PICKER
const themes = ["linear-gradient(to top, #30cfd0 0%, #330867 100%)", "linear-gradient(to top, #7028e4 0%, #e5b2ca 100%)", "linear-gradient(to top, #ff0844 0%, #ffb199 100%)", "linear-gradient(to top, #09203f 0%, #537895 100%)"];

const themeBtn = document.getElementById("theme-icon");
const colorsList = document.getElementById("colors-list");
colorsList.classList.add("hidden");
themes.map(theme => {
  const color = document.createElement("div");
  color.style.width = "40px";
  color.style.height = "40px";
  color.style.borderRadius = "50%";
  color.style.backgroundImage = theme;
  colorsList.appendChild(color);
  color.addEventListener("click", () => {
    document.querySelector("body").style.backgroundImage = theme;
    colorsList.classList.add("hidden");
  });
});

themeBtn.addEventListener("click", () => {
  colorsList.classList.toggle("hidden");
});

// ADDING IMAGES

const mainContainer = document.getElementById("main-container");
let emptySlot = document.querySelector(".empty");
emptySlot.addEventListener("click", handleAddingPhotos);

// UPDATING IMAGES

// window.addEventListener("click", e => {
//   const item = e.target;
//   if (item.classList.contains("filled")) {
//     console.log(item);
//     item.innerHTML = getRandomImage(item.clientWidth, item.clientHeight);
//   }
// });

function handleAddingPhotos() {
  handleAddingSections();
  // when clicking on the empty slot, pull an image from lorempicsum
  emptySlot.innerHTML = getRandomImage(emptySlot.clientWidth, emptySlot.clientHeight);
  emptySlot.classList.remove("empty");

  emptySlot.removeEventListener("click", handleAddingPhotos);
  emptySlot.addEventListener("click", handleUpdatingPhotos);
  emptySlot.classList.add("filled");
  if (!emptySlot.nextElementSibling) handleAddingSections();
  else emptySlot = emptySlot.nextElementSibling;
  emptySlot.classList.add("empty");
  emptySlot.classList.remove("hidden");
  emptySlot.addEventListener("click", handleAddingPhotos);
}

function getRandomImage(width, height) {
  return `<img style="border-radius: inherit" class="image" src="https://picsum.photos/${width}/${height}?random=${Math.floor(Math.random() * 300)}/"/>`;
}

function handleAddingSections() {
  // if there is no 'empty' slot, create a new four-part-container and make all slots hidden except for q1
  if (document.getElementsByClassName("empty").length === 0) {
    const fourPartContainer = document.createElement("div");
    fourPartContainer.classList.add("four-part-container");
    fourPartContainer.innerHTML = `
    <div class="add_image horizontal q1 empty">+</div>
    <div class="add_image vertical q2 hidden">+</div>
    <div class="add_image vertical q3 hidden">+</div>
    <div class="add_image horizontal q4 hidden">+</div>
  `;
    mainContainer.appendChild(fourPartContainer);
    emptySlot = document.querySelector(".empty");
  }
}

function handleUpdatingPhotos(e) {
  const item = e.target;
  if (item.classList.contains("filled")) {
    console.log(item);
    item.innerHTML = getRandomImage(item.clientWidth, item.clientHeight);
  }
}

functi;
