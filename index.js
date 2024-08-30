const image = document.getElementById("cover");
const title = document.getElementById("music-title");
const artist = document.getElementById("music-artist");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const progress = document.getElementById("progress");
const playerProgress = document.getElementById("player-progress");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const playButton = document.getElementById("play");
const background = document.getElementById("bg-img");

const music = new Audio();

const songs = [
  {
    path: "assets/songs/Kanye West - Bound 2.mp3",
    displayName: "Kanye West - Bound 2",
    cover: "assets/img/stare-west.png",
    artist: "Kanye West",
  },
  {
    path: "assets/songs/Kanye West - Chakras (OG Selah Demo).mp3",
    displayName: "Kanye West - Chakras",
    cover: "assets/img/tyler-west.jpg",
    artist: "Kanye West",
  },
  {
    path: "assets/songs/Kanye West - Heartless.mp3",
    displayName: "Kanye West - Heartless",
    cover: "assets/img/davi-west.png",
    artist: "Kanye West",
  },
  {
    path: "assets/songs/Kanye West - I Wonder.mp3",
    displayName: "Kanye West - I Wonder",
    cover: "assets/img/kanye-east.jpg",
    artist: "Kanye West",
  },
];

let musicIndex = 0;
let isPlaying = false;

function togglePlay() {
  if (isPlaying) {
    pauseMusic();
  } else {
    playMusic();
  }
}

function playMusic() {
  isPlaying = true;
  playButton.classList.replace("fa-play", "fa-pause");
  playButton.setAttribute("title", "Pause");
  music.play();
}

function pauseMusic() {
  isPlaying = false;
  playButton.classList.replace("fa-pause", "fa-play");
  playButton.setAttribute("title", "Play");
  music.pause();
}

function loadMusic(song) {
  music.src = song.path;
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  image.src = song.cover;
  background.src = song.cover;
}

function changeMusic(direction) {
  musicIndex = (musicIndex + direction + songs.length) % songs.length;
  loadMusic(songs[musicIndex]);
  playMusic();
}

function updateProgressBar() {
  const { duration, currentTime } = music;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;

  const formatTime = (time) => String(Math.floor(time)).padStart(2, "0");
  durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(
    duration % 60
  )}`;
  currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(
    currentTime % 60
  )}`;
}

function setProgressBar(e) {
  const width = playerProgress.clientWidth;
  const clickX = e.offsetX;
  music.currentTime = (clickX / width) * music.duration;
}

playButton.addEventListener("click", togglePlay);
prevButton.addEventListener("click", () => changeMusic(-1));
nextButton.addEventListener("click", () => changeMusic(1));
music.addEventListener("ended", () => changeMusic(1));
music.addEventListener("timeupdate", updateProgressBar);
playerProgress.addEventListener("click", setProgressBar);

loadMusic(songs[musicIndex]);
