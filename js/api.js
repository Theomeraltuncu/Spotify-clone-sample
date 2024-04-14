import { renderSongs } from "./ui.js";

const url =
  "https://shazam.p.rapidapi.com/charts/track?locale=en-US&listId=ip-country-chart-US";

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "",
    "X-RapidAPI-Host": "",
  },
};

export class API {
  constructor() {
    this.songs = [];
  }
  async getPopular() {
    const res = await fetch(url, options);
    const data = await res.json();
    this.songs = data.tracks;

    renderSongs(this.songs);
  }
  async searchMusic(query) {
    const res = await fetch(
      `https://shazam.p.rapidapi.com/search?term=${query}&locale=en-US`,
      options
    );
    const data = await res.json();
    const newData = data.tracks.hits;
    const updateData = newData.map((song) => ({ ...song.track }));
    this.songs = updateData;
    renderSongs(this.songs);
  }
}
