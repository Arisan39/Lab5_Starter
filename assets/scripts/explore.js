// explore.js
const synth = window.speechSynthesis;
window.addEventListener('DOMContentLoaded', init);
const inputForm = document.querySelector('button');
const inputTxt = document.getElementById('text-to-speak');
const voiceSelect = document.querySelector('select');
const img = document.querySelector("img");
let voices = [];

function populateVoiceList(){
  voices = synth.getVoices();

  for (let i = 0; i < voices.length ; i++) {
    const option = document.createElement('option');
    option.textContent = `${voices[i].name} (${voices[i].lang})`;

    if (voices[i].default) {
      option.textContent += ' — DEFAULT';
    }

    option.setAttribute('data-lang', voices[i].lang);
    option.setAttribute('data-name', voices[i].name);
    voiceSelect.appendChild(option);
  }
}
function init() {
  // TODO
  
  populateVoiceList();
  if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
  } 
  inputForm.addEventListener("click", (event)=>{
    img.src = "assets/images/smiling-open.png";  
    event.preventDefault();
    const utterThis = new SpeechSynthesisUtterance(inputTxt.value);
    const selectedOption = voiceSelect.selectedOptions[0].getAttribute('data-name');
    for (let i = 0; i < voices.length ; i++) {
      if (voices[i].name === selectedOption) {
        utterThis.voice = voices[i];
      }
    }
    synth.speak(utterThis);
    inputTxt.blur();
    utterThis.addEventListener("end", ()=>{
      img.src = "assets/images/smiling.png";  
    })
  });
}

