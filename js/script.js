  let currentMusic = 0;

  const music = document.querySelector("#music");
  const songName = document.querySelector(".song-name");
  const artistName = document.querySelector(".artist-name");
  const seekBar = document.querySelector("#seek-bar");
  const currentTime = document.querySelector(".current-time");
  const songDuration = document.querySelector(".song-duration");
  const volume = document.querySelector("#volume");
  const volumeValue = document.querySelector("#volume-value");
  const volumeIcon = document.querySelector("#icon");
  const playPauseButton = document.querySelector("#play");
  const prevButton = document.querySelector("#previous");
  const nextButton = document.querySelector("#next");

  // Set Music
  const setMusic = (i) => {
    seekBar.value = 0;
    let song = songs[i];
    currentMusic = i;
    music.src = song.path;

    songName.innerHTML = song.name;
    artistName.innerHTML = song.artist;

    currentTime.innerHTML = "00:00";
    setTimeout(() => {
      seekBar.max = music.duration;
      songDuration.innerHTML = formatTime(music.duration);
    }, 300);
  }

  setMusic(0);

  // Seekbar
  const formatTime = (time) => {
    let min = Math.floor(time / 60);
    if(min < 10) {
      min = `0${min}`;
    }
    let sec = Math.floor(time % 60);
    if(sec < 10) {
      sec = `0${sec}`;
    }
    return `${min} : ${sec}`;
  }
 
  setInterval(() => {
    seekBar.value = music.currentTime;
    currentTime.innerHTML = formatTime(music.currentTime);
    if(Math.floor(music.currentTime) == Math.floor(seekBar.max)) { 
    }
  }, 500)

  seekBar.addEventListener('change', () => {
    music.currentTime = seekBar.value;
  });

  // Volume
  music.volume = 0.5;

  volumeIcon.addEventListener("click", mute);

  function mute() {
    if(music.muted) {
      music.muted = false;
      volumeIcon.classList.remove("fa-volume-mute");
      volumeIcon.classList.add("fa-volume-up");
    } else {
      music.muted = true;
      volumeIcon.classList.remove("fa-volume-up");
      volumeIcon.classList.add("fa-volume-mute");
    }
  }
 
  volume.addEventListener("input", (event) => {
    const tempVolumeValue = Number(event.target.value);
    const progress = (tempVolumeValue / volume.max) * 100;
    volume.style.background = `linear-gradient(to right, #028a0f ${progress}%, #ccc ${progress}%)`;
    music.volume = volume.value;
    updateVolumeValue();
  }); 

  function updateVolumeValue() {
    volumeValue.textContent = `${Math.floor(music.volume * 100)}%`;   
  }

  // Play/Pause functionality
  playPauseButton.addEventListener("click", () => {
    if (music.paused) { 
      music.play(); 
      playPauseButton.innerHTML = "<i class='fas fa-pause'></i>";
    } else {
      music.pause(); 
      playPauseButton.innerHTML = "<i class='fas fa-play'></i>";
    } 
  });

  // Previous and Next Buttons functionality
  nextButton.addEventListener("click", () => {
    playPauseButton.innerHTML = "<i class='fas fa-pause'></i>";
    if(currentMusic >= songs.length - 1) {
      currentMusic = 0;
    } else {
      currentMusic++;
    }
    setMusic(currentMusic);
    music.play();
  });

  prevButton.addEventListener("click", () => {
    playPauseButton.innerHTML = "<i class='fas fa-pause'></i>"; 
    if(currentMusic <= 0) {
      currentMusic = songs.length - 1;
    } else {
      currentMusic--;
    }
    setMusic(currentMusic);
    music.play();
  });

  // Start new song automatically after previous song ends
  music.addEventListener("ended", () => {
      if(currentMusic >= songs.length - 1) {
        currentMusic = 0;
      } else {
        currentMusic++;
      }
      setMusic(currentMusic);
      music.play();
  });

  


 