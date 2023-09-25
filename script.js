`use strict`;

// CREATING THE UI CIRCULAR PROGRESS BAR
(() => {
  const progressBar = document.querySelector(".container--1 .img-holder");
  for (let i = 0; i < 100; i++) {
    let span = document.createElement("span");
    span.style.setProperty("--i", i);
    progressBar.append(span);
  }
})();

const img_container__1 = document.querySelector(".container--1 img");
const trackNam = document.querySelector(".container--1 h1");
const trackArtist = document.querySelector(".artist");
const img_container__2 = document.querySelector(".currently-playing img");
const trackName = document.querySelector(".song-play span");
const trackDescription = document.querySelector(".song-description");
const trackRelease_date = document.querySelector(".date-release span");

const dis = document.querySelector(".container--3");
const section = document.querySelectorAll("section");
const sectionFeed = document.querySelector(".section--feed");
const sectionTrending = document.querySelector(".section--trending");
const sectionPlay = document.querySelector(".section-player");
const sectionFavourite = document.querySelector(".section--favourite");
const sectionLibrary = document.querySelector(".section--library");

const rangeSlider = document.querySelector(".range-slider .slider");
const btns = document.querySelector(".btns");
const btn_menu = document.querySelector(".btn-menu");
const btn_close = document.querySelector(".btn-close");

const header = document.querySelector(".header");
const navDetails = document.querySelectorAll(".nav-detail");
const audio = document.querySelector("audio");

const user_time_current = document.querySelector(".time_current");
const user_time_duration = document.querySelector(".time_duration");
const list_span = document.querySelectorAll(".img-holder span");

const music_controls = document.querySelector(".musci-controls");
const user_shuffle = document.querySelector(".shuffle");
const user_play = document.querySelector(".play");
const user_pause = document.querySelector(".pause");
const user_playnxt = document.querySelector(".playnxt");
const user_repeat = document.querySelector(".repeat");

let music_no = 0;
let number_of_songs = 0;
let random_number_state = false;
let tracks_array = [];

// HEADER NAV FUNCTIONALITY
header.addEventListener("click", function (e) {
  const clicked = e.target;
  const navParent = clicked.closest(".nav-detail");

  if (navParent) {
    navDetails.forEach((el) => el.classList.remove("active-page"));
    navParent.classList.add("active-page");
    section.forEach((el) => el.classList.add("hidden"));

    if (navParent.classList.contains("header-library"))
      sectionLibrary.classList.remove("hidden");
    else if (navParent.classList.contains("header-music-player"))
      sectionPlay.classList.remove("hidden");
    else if (navParent.classList.contains("header-feed"))
      sectionFeed.classList.remove("hidden");
    else if (navParent.classList.contains("header-trending"))
      sectionTrending.classList.remove("hidden");
    else if (navParent.classList.contains("header-favourite"))
      sectionFavourite.classList.remove("hidden");
    else if (navParent.classList.contains("settings-page-link"))
      window.location.href = "./setting/setting.html";
  }
});

const playRandom_music = () => Math.floor(Math.random() * number_of_songs + 1);

const timeFormat = (time) => {
  const hour = Math.floor(time / 3600);
  const minute = Math.floor(time / 60);
  const second = Math.floor(time - minute * 60);

  return `${
    hour.toString().padStart(2, "0") === "00"
      ? ""
      : hour.toString().padStart(2, "0") + ":"
  }${minute.toString().padStart(2, "0")}:${second.toString().padStart(2, "0")}`;
};

list_span.forEach((el, i) => {
  el.addEventListener("click", () => {
    list_span.forEach((e) => e.classList.remove("active"));
    for (let k = 0; k <= i; k++) list_span[k].classList.add("active");

    const time_go = (i * audio.duration) / 100;
    audio.currentTime = time_go;
  });
});

btns.addEventListener("click", function (e) {
  btn_close.classList.toggle("hidden");
  btn_menu.classList.toggle("hidden");
  dis.classList.toggle("hidden");
});

const update_track_UI = (songs) => {
  const track = songs[music_no];

  img_container__1.src = track.img_url;
  trackNam.textContent = track.name;
  trackArtist.textContent = track.artist;
  img_container__2.src = track.img_url;
  trackName.textContent = track.name;
  trackRelease_date.textContent = track.release_date;
  audio.src = `${track.track}`;
  trackDescription.textContent = `${track.name} by ${track.artist}  is a single and has one track(s)`;

  update_audio_track();
};

// 1.
const musicAPI_Data = async () => {
  const res = await fetch("music.json");
  const tracks = await res.json();

  update_track_UI(tracks);
  number_of_songs = tracks.length - 1;
  tracks_array = [...tracks];
};

musicAPI_Data();

// 2.
music_controls.addEventListener("click", function (e) {
  e.preventDefault();
  const clicked = e.target;

  if (clicked.classList.contains("pause_play")) {
    if (clicked === user_play) audio.play();
    else if (clicked === user_pause) audio.pause();

    user_pause.classList.toggle("hidden");
    user_play.classList.toggle("hidden");
  }

  if (clicked.classList.contains("nxt_prev")) {
    if (clicked === user_playnxt) music_no += 1;
    else music_no -= 1;

    if (music_no > number_of_songs) music_no = 1;
    else if (music_no < 0) music_no = number_of_songs;

    music_no = random_number_state ? playRandom_music() : music_no;

    update_track_UI(tracks_array);

    update_audio_track();
    audio.play();

    user_pause.classList.remove("hidden");
    user_play.classList.add("hidden");
    list_span.forEach((el) => el.classList.remove("active"));
  }

  if (clicked.classList.contains("rep_shuf"))
    if (clicked === user_shuffle)
      random_number_state = random_number_state ? false : true;
});

// 3.
const update_audio_track = () => {
  audio.addEventListener(
    "loadedmetadata",
    () => (user_time_duration.textContent = timeFormat(audio.duration))
  );

  audio.addEventListener("timeupdate", () => {
    const time_duration = audio.duration;
    const time_current = audio.currentTime;
    const position = Math.floor((time_current * 100) / time_duration);
    user_time_current.textContent = timeFormat(time_current);
    rangeSlider.value = position;

    if (position < 100) list_span[position].classList.add("active");

    if (Math.floor(time_duration) === Math.floor(time_current)) {
      list_span.forEach((el) => el.classList.remove("active"));
      user_play.classList.add("hidden");
      user_pause.classList.remove("hidden");
      user_time_current.textContent = `0:00`;

      music_no += 1;
      if (music_no > tracks_array.length) music_no = 0;

      rangeSlider.value = 0;
      music_no = random_number_state ? playRandom_music() : music_no;

      update_track_UI(tracks_array);
      update_audio_track();
      audio.play();
    }
  });
};
