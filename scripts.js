const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

function togglePlay(){
    const method = video.paused? 'play' : 'pause';
    video[method]();  
    /* OR
    if (video.paused) { video.play(); }
    else { video.pause(); }*/
}

function buttonUpdate(){
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
}

function skip(){
    video.currentTime += parseFloat(this.dataset.skip) /*returns a number*/
}

function hangleRangeUpdate(){
    video[this.name] = this.value;
}

video.addEventListener('click', togglePlay);
video.addEventListener('play', buttonUpdate);
video.addEventListener('pause', buttonUpdate);

toggle.addEventListener('click', togglePlay);
skipButtons.forEach(skipBtn => skipBtn.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', hangleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', hangleRangeUpdate));
