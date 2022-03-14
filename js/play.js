


const muteIconContainer = document.getElementById('mute-icon');
const playIconContainer = document.getElementById('play-icon');
const goPlay = document.querySelector(".go-play");
const goVolume = document.querySelector(".volume");
const outVolume = document.getElementById("volume-output");
const visible = document.querySelector(".visible");
console.log(visible)
let state ="play";
let muteState = 'unmute';
const seekSlider = document.getElementById('seek-slider');
const volumeSlider = document.getElementById('volume-slider');
const audio =document.querySelector("audio");
const current = document.getElementById("current-time");
const playAnimation = bodymovin.loadAnimation({
	container: playIconContainer,
  path: 'https://maxst.icons8.com/vue-static/landings/animated-icons/icons/pause/pause.json',
  renderer: 'svg',
  loop: false,
  autoplay: false,
  name: "Demo Animation",
});
playAnimation.goToAndStop(14, true);
playIconContainer.addEventListener("click", ()=>{
  if(state=="play"){
    playAnimation.playSegments([14, 27], true);
    state="pause";
    visible.style.display="block";
    console.log(visible)
    audio.play()
    muteAnimation.playSegments([15, 25], true);
     requestAnimationFrame(whilePlaying);

  }
    else {
       playAnimation.playSegments([0, 14], true);
        state = 'play';
        visible.style.display="none";
       audio.pause()
       cancelAnimationFrame(raf)
    }
})

const muteAnimation = bodymovin.loadAnimation({
    container: muteIconContainer,
    path: 'https://maxst.icons8.com/vue-static/landings/animated-icons/icons/mute/mute.json',
    renderer: 'svg',
    loop: false,
    autoplay: false,
    name: "Mute Animation",
});
muteIconContainer.addEventListener('click', () => {
    if(muteState === 'unmute') {
        muteAnimation.playSegments([0, 15], true);
        muteState = 'mute';
        audio.muted = true;
        
    } else {
        muteAnimation.playSegments([15, 25], true);
            audio.muted = false;
        muteState = 'unmute';
    }
});
muteAnimation.goToAndStop(14, true)
playAnimation.goToAndStop(14, true);
const showRangeProgress = (rangeInput) => {
    if(rangeInput === seekSlider) {
      goPlay.style.setProperty('--seek-before-width', rangeInput.value / rangeInput.max * 100 + '%');
    } else {
      goPlay.style.setProperty('--volume-before-width', rangeInput.value / rangeInput.max * 100 + '%');
    }
}

seekSlider.addEventListener('input', (e) => {
    showRangeProgress(e.target);
});
volumeSlider.addEventListener('input', (e) => {
    showRangeProgress(e.target);
});

let raf =null;
const durationContainer = document.querySelector(".duration")
console.log(durationContainer)
const caculatorTime = (secs)=>{
  const minutes = Math.floor(secs/60);
  const seconds = Math.floor(secs%60);
  const returnSeconds = seconds<10?`0${seconds}`:`${seconds}`;
  return `${minutes}:${returnSeconds}`;
}

const displayDuration = ()=>{
  durationContainer.textContent=caculatorTime(audio.duration);
}
const setSliderMax = () => {
    seekSlider.max = Math.floor(audio.duration);
}

const displayBufferedAmount = () => {
    const bufferedAmount = Math.floor(audio.buffered.end(audio.buffered.length - 1));
    goPlay.style.setProperty('--buffered-width', `${(bufferedAmount / seekSlider.max) * 100}%`);
}
const whilePlaying =()=>{
  seekSlider.value =Math.floor(audio.currentTime);
  current.textContent=caculatorTime(seekSlider.value);
  goPlay.style.setProperty('--seek-before-width', `${seekSlider.value/seekSlider.max *100}%`)
raf =requestAnimationFrame(whilePlaying);
}
if (audio.readyState > 0) {
    displayDuration();
    setSliderMax();
    displayBufferedAmount();
  
} else {
    audio.addEventListener('loadedmetadata', () => {
        displayDuration();
        setSliderMax();
        displayBufferedAmount();
    });
}
volumeSlider.addEventListener('input', (e) => {
    const value = e.target.value;
    outVolume.textContent = value;
    audio.volume = value / 100;
});

seekSlider.addEventListener('input', () => {
    current.textContent = caculatorTime(seekSlider.value);
    if(!audio.paused) {
        cancelAnimationFrame(raf);
    }
    
});
seekSlider.addEventListener('change', () => {
    audio.currentTime = seekSlider.value;
    if(!audio.paused) {
        requestAnimationFrame(whilePlaying);
    }
});
