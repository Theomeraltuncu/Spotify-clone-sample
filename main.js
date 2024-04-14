import { API } from "./js/api.js";
import { elements } from "./js/helpers.js";
import { renderPlayingInfo, updateTitle } from "./js/ui.js";

const api = new API();

document.addEventListener(
  "DOMContentLoaded",
  async () => await api.getPopular()
);

const playMusic = (url) => {
  elements.audioSource.src = url;
  elements.audio.load();
  elements.audio.play();
};

const handleClick = (e) => {
  if (e.target.id === "play-btn") {
    const parent = e.target.closest(".card");

    renderPlayingInfo(parent.dataset);
    playMusic(parent.dataset.url);
  }
};
document.addEventListener("click", handleClick);

const animatePhoto = () => {
  const img = document.querySelector(".info img");
  img.className = "animate";
};

const stopAnimation = () => {
  const img = document.querySelector(".info img");
  img.classList.remove("animate");
};
elements.audio.addEventListener("play", animatePhoto);
elements.audio.addEventListener("pause", stopAnimation);

elements.form.addEventListener("submit", (e) => {
  e.preventDefault();
  const query = e.target[0].value;
  if (!query) {
    alert("There is nothing to search");
    return;
  }

  updateTitle(`Results for ${query}`);
  api.searchMusic(query);
});

elements.menu.addEventListener("click", () => {
  elements.ulList.classList.toggle("toggle");
});
