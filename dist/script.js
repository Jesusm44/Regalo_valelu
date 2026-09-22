const intro = document.querySelector('#intro');
const letter = document.querySelector('#letter');
const openButton = document.querySelector('#openButton');
const replayButton = document.querySelector('#replayButton');
const petals = document.querySelector('#petals');
const music = document.querySelector('#backgroundMusic');
const musicButton = document.querySelector('#musicButton');
const musicStatus = document.querySelector('#musicStatus');

function releasePetals() {
  petals.replaceChildren();
  for (let i = 0; i < 34; i += 1) {
    const petal = document.createElement('i');
    petal.className = 'petal';
    petal.style.left = `${Math.random() * 100}vw`;
    petal.style.setProperty('--duration', `${5 + Math.random() * 4}s`);
    petal.style.setProperty('--delay', `${Math.random() * 2}s`);
    petal.style.setProperty('--drift', `${-90 + Math.random() * 180}px`);
    petal.style.opacity = `${0.45 + Math.random() * 0.5}`;
    petals.append(petal);
  }
}

function openLetter() {
  openButton.setAttribute('aria-expanded', 'true');
  intro.classList.add('fade-out');
  window.setTimeout(() => {
    intro.hidden = true;
    letter.classList.add('visible');
    letter.setAttribute('aria-hidden', 'false');
    replayButton.focus({ preventScroll: true });
    releasePetals();
    playMusic();
  }, 500);
}

async function playMusic() {
  try {
    await music.play();
    musicButton.textContent = 'Pausar música';
    musicButton.setAttribute('aria-pressed', 'true');
    musicStatus.textContent = '';
  } catch {
    musicStatus.textContent = 'Toca «Reproducir música» para escuchar la canción.';
  }
}

function toggleMusic() {
  if (music.paused) {
    playMusic();
    return;
  }
  music.pause();
  musicButton.textContent = 'Reproducir música';
  musicButton.setAttribute('aria-pressed', 'false');
  musicStatus.textContent = '';
}

function replay() {
  letter.classList.remove('visible');
  letter.setAttribute('aria-hidden', 'true');
  intro.hidden = false;
  intro.classList.remove('fade-out');
  openButton.setAttribute('aria-expanded', 'false');
  openButton.focus({ preventScroll: true });
  petals.replaceChildren();
}

openButton.addEventListener('click', openLetter);
replayButton.addEventListener('click', replay);
musicButton.addEventListener('click', toggleMusic);
