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

function scrub(e){
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
 }

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`; /*changes the value in the css property*/
}

video.addEventListener('click', togglePlay);
video.addEventListener('play', buttonUpdate);
video.addEventListener('pause', buttonUpdate);
video.addEventListener('timeupdate', handleProgress); /*the handleProgress will be updated based on the current timeupdate of the video*/

toggle.addEventListener('click', togglePlay);
skipButtons.forEach(skipBtn => skipBtn.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', hangleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', hangleRangeUpdate));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e => mousedown && scrub(e))); /*if mousedown is true will run the scrub(e), else won't */
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
