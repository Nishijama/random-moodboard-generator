// THEME PICKER
const themes = [
  { background: `linear-gradient(to top, #330867 0%, #30cfd0 100%)`, accent: "#330867" },
  { background: `linear-gradient(to top, #7028e4 0%, #e5b2ca 100%)`, accent: "#7028e4" },
  { background: `linear-gradient(to top, #ff0844 0%, #ffb199 100%)`, accent: "#ff0844" },
  { background: `linear-gradient(to top, #09203f 0%, #537895 100%)`, accent: "#09203f" },
];

loadMoodboard();

const themeBtn = document.getElementById("theme-icon");
const colorsList = document.getElementById("colors-list");
colorsList.classList.add("hidden");
themes.map(theme => {
  const color = document.createElement("div");
  color.style.width = "40px";
  color.style.height = "40px";
  color.style.borderRadius = "50%";
  color.style.backgroundImage = theme.background;
  colorsList.appendChild(color);
  color.addEventListener("click", () => {
    document.querySelector("body").style.backgroundImage = theme.background;
    document.querySelector("body").style.color = theme.accent;
    saveMoodboard();
    colorsList.classList.add("hidden");
  });
});

themeBtn.addEventListener("click", () => {
  colorsList.classList.toggle("hidden");
});

//LOAD SAVED MOODBOARD
function loadMoodboard() {
  if (window.localStorage.getItem("moodboard-theme")) {
    const data = JSON.parse(window.localStorage.getItem("moodboard-theme"));
    const background = data.backgroundImage;
    const accent = data.color;
    document.querySelector("body").style.backgroundImage = background;
    document.querySelector("body").style.color = accent;
  }
}

// SAVING CURRENT MOODBOARD
function saveMoodboard() {
  window.localStorage.setItem(
    "moodboard-theme",
    JSON.stringify({
      backgroundImage: document.querySelector("body").style.backgroundImage,
      color: document.querySelector("body").style.color,
    })
  );
}
// const saveBtn = document.querySelector("#save-icon").addEventListener("click", saveMoodboard);

// ADDING IMAGES
const mainContainer = document.getElementById("main-container");
let emptySlot = document.querySelector(".empty");
emptySlot.addEventListener("click", handleAddingPhotos);

function handleAddingPhotos() {
  handleAddingSections();
  // when clicking on the empty slot, pull an image from lorempicsum
  const newImgNode = getRandomImage(emptySlot.clientWidth, emptySlot.clientHeight);
  let back = emptySlot.lastElementChild;
  emptySlot.classList.add("flipping");
  emptySlot.dataset.icon = "↺";
  back.firstChild.remove();
  back.appendChild(newImgNode);
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
  const imgNode = document.createElement("img");
  imgNode.style.borderRadius = "inherit";
  imgNode.classList.add("image");
  imgNode.src = `https://picsum.photos/${width}/${height}?random=${Math.floor(Math.random() * 300)}/`;
  return imgNode;
  // return `<img style="border-radius: inherit" class="image" src="https://picsum.photos/${width}/${height}?random=${Math.floor(Math.random() * 300)}/"/>`;
}

function handleAddingSections() {
  // if there is no 'empty' slot, create a new four-part-container and make all slots hidden except for q1
  if (document.getElementsByClassName("empty").length === 0) {
    const fourPartContainer = document.createElement("div");
    fourPartContainer.classList.add("four-part-container");
    fourPartContainer.innerHTML = `
    <div class="add_image horizontal q1 empty">
    <div class="front">+</div>
    <div class="back">+</div>
  </div>
  <div class="add_image vertical q2 hidden">
    <div class="front">+</div>
    <div class="back">+</div>
  </div>
  <div class="add_image vertical q3 hidden">
    <div class="front">+</div>
    <div class="back">+</div>
  </div>
  <div class="add_image horizontal q4 hidden">
    <div class="front">+</div>
    <div class="back">+</div>
  </div>
  `;
    mainContainer.appendChild(fourPartContainer);
    emptySlot = document.querySelector(".empty");
  }
}

function handleUpdatingPhotos(e) {
  console.log(e.target);
  const item = e.target;
  if (item.classList.contains("add_image")) {
    item.classList.toggle("flipping");

    const newItem = getRandomImage(item.clientWidth, item.clientHeight);

    const back = item.lastElementChild;
    const front = item.firstElementChild;

    if (item.classList.contains("flipping")) {
      back.lastChild.remove();
      back.appendChild(newItem);
      item.dataset.icon = "↺";
    } else {
      front.lastChild.remove();
      front.appendChild(newItem);
      item.dataset.icon = "↻";
    }
  }
}
