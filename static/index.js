// THEME PICKER
const themes = [
  "linear-gradient(to top, #30cfd0 0%, #330867 100%)",
  "linear-gradient(to top, #7028e4 0%, #e5b2ca 100%)",
  "linear-gradient(to top, #ff0844 0%, #ffb199 100%)",
  "linear-gradient(to top, #09203f 0%, #537895 100%)",
];

const themeBtn = document.getElementById("theme-icon");
const colorsList = document.getElementById("colors-list");
colorsList.classList.add("hidden");
themes.map(theme => {
  const color = document.createElement("div");
  color.style.width = "30px";
  color.style.height = "30px";
  color.style.borderRadius = "50%";
  color.style.backgroundImage = theme;
  colorsList.appendChild(color);
  console.log("hello");
  return;
});

themeBtn.addEventListener("click", () => {
  colorsList.classList.toggle("hidden");
});
