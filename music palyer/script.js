const audio = document.getElementById('audio');
const playButton = document.getElementById('play');
const nextButton = document.getElementById('next');
const prevButton = document.getElementById('prev');
const shuffleButton = document.getElementById('shuffle');
const repeatButton = document.getElementById('repeat');
const songTitle = document.getElementById('song-title');
const artist = document.getElementById('artist');
const progress = document.getElementById('progress');
const progressContainer = document.querySelector('.progress-container');
const volumeControl = document.getElementById('volume-control');
const albumCover = document.getElementById('album-cover');

let isShuffling = false;
let isRepeating = false;
let currentSongIndex = 0;

let songs = [
    {title: 'Superhero', artist: '', src: 'music/song1.mp3', cover: 'cover/Top_50_NCS.webp'},
    {title: 'Royalty', artist: '', src: 'music/song2.mp3', cover: 'cover/Top_50_NCS.webp'},
    {title: 'Fearless', artist: '', src: 'music/song3.mp3', cover: 'cover/Top_50_NCS.webp'}
];

function loadSong(song) {
    songTitle.textContent = song.title;
    artist.textContent = song.artist;
    audio.src = song.src;
    albumCover.src = song.cover;
}

function playSong() {
    audio.play();
    playButton.innerHTML = '<i class="fas fa-pause"></i>';
}

function pauseSong() {
    audio.pause();
    playButton.innerHTML = '<i class="fas fa-play"></i>';
}

function togglePlay() {
    if (audio.paused) {
        playSong();
    } else {
        pauseSong();
    }
}

function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(songs[currentSongIndex]);
    playSong();
}

function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(songs[currentSongIndex]);
    playSong();
}

function updateProgress() {
    const percent = (audio.currentTime / audio.duration) * 100;
    progress.style.width = `${percent}%`;
}

function setProgress(e) {
    const width = progressContainer.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}

function toggleShuffle() {
    isShuffling = !isShuffling;
    shuffleButton.classList.toggle('active');
}

function toggleRepeat() {
    isRepeating = !isRepeating;
    repeatButton.classList.toggle('active');
}

function setVolume(e) {
    audio.volume = e.target.value;
}

audio.addEventListener('timeupdate', updateProgress);
progressContainer.addEventListener('click', setProgress);
volumeControl.addEventListener('input', setVolume);
playButton.addEventListener('click', togglePlay);
nextButton.addEventListener('click', nextSong);
prevButton.addEventListener('click', prevSong);
shuffleButton.addEventListener('click', toggleShuffle);
repeatButton.addEventListener('click', toggleRepeat);

audio.addEventListener('ended', () => {
    if (isRepeating) {
        playSong();
    } else if (isShuffling) {
        currentSongIndex = Math.floor(Math.random() * songs.length);
        loadSong(songs[currentSongIndex]);
        playSong();
    } else {
        nextSong();
    }
});


loadSong(songs[currentSongIndex]);
