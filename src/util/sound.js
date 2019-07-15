export default function playMessageAudio () {
    let audio = new Audio(require('./sound.mp3'));
    audio.play();
}

