const lightbox = GLightbox({ selector: ".glightbox" });
function initAudioPlayer(targetId, songs) {
  const container = document.getElementById(targetId);
  let currentIndex = 0;
  let isPlaying = false;

  const audio = document.createElement('audio');
  audio.preload = "auto";
  container.appendChild(audio);

  const playerHTML = `
    <div>
      <div class="song-info text-center mb-4">
        <span class="current-title"></span><br>
      </div>

        <div class="mb-4 pb-2">
            <div class="time-display mb-0 d-flex justify-content-between align-items-center w-100 mb-2">
                <span class="player-time start-time">00:00</span>
                <span class="player-time current-time">00:00</span>
                <span class="player-time end-time">00:00</span>
            </div>
            <input type="range" class="progress-bar w-100" value="0" min="0" step="1">
        </div>
      <div class="controls d-flex justify-content-center align-items-center gap-4">
        <button class="player-control prev-btn"><img src="./assets/images/prev-icon.svg" /></button>
        <button class="player-control mx-2 play-btn"><img src="./assets/images/play-icon.svg" /></button>
        <button class="player-control mx-2 pause-btn" style="display:none;"><img src="./assets/images/pause-solid-full.svg" /></button>
        <button class="player-control next-btn"><img src="./assets/images/next-icon.svg" /></button>
      </div>

        <div class="up-next d-flex flex-column align-items-center gap-3 mt-5">
            <span class="up-next-title">Up Next</span>
            <span class="next-title"></span>
        </div>
    </div>
  `;
  container.insertAdjacentHTML('beforeend', playerHTML);

  const playBtn = container.querySelector(".play-btn");
  const pauseBtn = container.querySelector(".pause-btn");
  const prevBtn = container.querySelector(".prev-btn");
  const nextBtn = container.querySelector(".next-btn");
  const progressBar = container.querySelector(".progress-bar");
  const currentTitle = container.querySelector(".current-title");
  const nextTitle = container.querySelector(".next-title");

  const startTime = container.querySelector(".start-time");
  const currentTime = container.querySelector(".current-time");
  const endTime = container.querySelector(".end-time");

  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60) || 0;
    const secs = Math.floor(seconds % 60) || 0;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }

  function setAudioSource(index) {
    audio.innerHTML = `
      <source src="${songs[index].m4a}" type="audio/mp4">
      <source src="${songs[index].mp3}" type="audio/mpeg">
      Your browser does not support the audio element.
    `;
    audio.load();
  }

  function updateDisplay() {
    currentTitle.textContent = songs[currentIndex].title;
    const nextIndex = (currentIndex + 1) % songs.length;
    nextTitle.textContent = songs[nextIndex].title;
  }

  function playTrack() {
    setAudioSource(currentIndex);
    audio.play();
    isPlaying = true;
    playBtn.style.display = "none";
    pauseBtn.style.display = "inline-block";
    updateDisplay();
  }

  function pauseTrack() {
    audio.pause();
    isPlaying = false;
    pauseBtn.style.display = "none";
    playBtn.style.display = "inline-block";
  }

  function nextTrack() {
    currentIndex = (currentIndex + 1) % songs.length;
    playTrack();
  }

  function prevTrack() {
    currentIndex = currentIndex === 0 ? songs.length - 1 : currentIndex - 1;
    playTrack();
  }

  playBtn.onclick = playTrack;
  pauseBtn.onclick = pauseTrack;
  nextBtn.onclick = nextTrack;
  prevBtn.onclick = prevTrack;

  audio.addEventListener("timeupdate", () => {
    if (audio.duration) {
      progressBar.max = audio.duration;
      progressBar.value = audio.currentTime;
      startTime.textContent = formatTime(0);
      currentTime.textContent = formatTime(audio.currentTime);
      endTime.textContent = formatTime(audio.duration);
        const percent = (audio.currentTime / audio.duration) * 100 || 0;
  progressBar.max = audio.duration || 0;
  progressBar.value = audio.currentTime || 0;
  progressBar.style.setProperty('--progress-percent', percent);
    }
  });

  progressBar.addEventListener("input", () => {
    audio.currentTime = progressBar.value;
  });

  audio.addEventListener("ended", nextTrack);

  // Init
  updateDisplay();
  setAudioSource(currentIndex);
}

const songs = [
  {
    title: "Dr. Allie Martin – Remixing Fountain Hughes",
    m4a: "assets/music/Allie_Martin_Fountain_Hughes.m4a",
    mp3: "assets/music/Allie_Martin_Fountain_Hughes.mp3"
  },
  {
    title: "Janiya Peters – The Gin in Motion",
    m4a: "assets/music/Janiya_Peters_JF_Soundscape.wav",  // fallback won't work with .wav
    mp3: "assets/music/Janiya_Peters_JF_Soundscape.mp3"
  },
  {
    title: "Jonathan Walton – Interconnected Sounds of America",
    m4a: "assets/music/Jonathan_Walton_CCDI_Soundscape_Project.wav",
    mp3: "assets/music/Jonathan_Walton_CCDI_Soundscape_Project.mp3"
  }
];


$(document).ready(function () {

initAudioPlayer("myAudioPlayer", songs);
  $(".my-carousel").slick({
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToScroll: 1,
    variableWidth: true,
    infinite: true,
    arrows: false,
    centerMode: true,
    initialSlide: 2,
    swipe: true,
    touchMove: true,
    draggable: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          centerMode: false,
          variableWidth: false,
          slidesToShow: 1,
        },
      },
    ],
  });
});
