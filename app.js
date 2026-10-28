/* ============================================================
   LÓGICA INTERACTIVA - PROPUESTA EN CÓMIC ❤️
   ============================================================ */

// Datos de los 3 Retos / Capítulos
const DEFAULT_RETOS = [
  {
    id: 1,
    badge: "CAPÍTULO 1",
    title: "El Primer Encuentro ✨",
    description: "Para desbloquear la primera viñeta, responde con el corazón:",
    question: "¿Recuerdas cómo comenzó todo entre nosotros?",
    options: [
      { text: "Fue algo totalmente inesperado que cambió mi vida", correct: true },
      { text: "Desde el primer día sentí una conexión única", correct: true },
      { text: "Estaba escrito en el destino que nos cruzáramos", correct: true },
      { text: "Todas las anteriores y mucho más ❤️", correct: true }
    ],
    panelTitle: "Capítulo 1: El Primer Encuentro",
    storyText: "Dicen que las mejores historias comienzan sin que uno se dé cuenta. En un día cualquiera, tu sonrisa apareció y de pronto todo tuvo más luz, más color y más sentido.",
    sfx: "¡BOOM! ❤️"
  },
  {
    id: 2,
    badge: "CAPÍTULO 2",
    title: "Nuestras Aventuras y Risas 🍕",
    description: "Para desbloquear la segunda viñeta, supera este recuerdo:",
    question: "¿Qué es lo que hace que cada momento contigo sea inolvidable?",
    options: [
      { text: "Nuestras risas y las pláticas que no tienen fin", correct: true },
      { text: "Tu compañía que me hace sentir en casa", correct: true },
      { text: "La manera tan bonita en la que nos entendemos", correct: true },
      { text: "¡Absolutamente todo a tu lado! 🥰", correct: true }
    ],
    panelTitle: "Capítulo 2: Risas y Complicidad",
    storyText: "Paso a paso, compartimos días inolvidables, anécdotas, risas tontas y miradas que lo dicen todo. Cada recuerdo contigo es mi página favorita de este cómic.",
    sfx: "¡ZAP! ✨"
  },
  {
    id: 3,
    badge: "CAPÍTULO 3",
    title: "La Pregunta Más Importante 💍",
    description: "Has llegado al último regalo... Responde antes de la revelación final:",
    question: "Si nuestra historia fuera un cómic... ¿qué capítulo deberíamos escribir ahora?",
    options: [
      { text: "Uno lleno de amor, apoyo mutuo y complicidad", correct: true },
      { text: "Nuestra mejor aventura: ser novios oficiales", correct: true },
      { text: "Un 'para siempre' que empiece hoy mismo", correct: true },
      { text: "¡El más feliz de todos juntos! 💖", correct: true }
    ],
    panelTitle: "Capítulo 3: Nuestro Presente y Futuro",
    storyText: "Ya no es solo un recuerdo bonito; es saber que quiero compartir mis días contigo, celebrar tus logros y caminar de la mano en cada nuevo capítulo.",
    sfx: "¡AMOR! 💥"
  }
];

// Estado de desbloqueo
let unlockedPanels = {
  1: false,
  2: false,
  3: false
};

// Cargar estado desde localStorage
function loadSavedState() {
  try {
    const saved = localStorage.getItem('propuesta_comic_unlocked');
    if (saved) {
      unlockedPanels = JSON.parse(saved);
    }
  } catch (e) {
    console.warn("No se pudo leer localStorage:", e);
  }
}

function saveState() {
  try {
    localStorage.setItem('propuesta_comic_unlocked', JSON.stringify(unlockedPanels));
  } catch (e) {
    console.warn("No se pudo guardar en localStorage:", e);
  }
}

// Sonidos mediante Web Audio API (Sin depender de archivos externos)
class ComicSoundFX {
  constructor() {
    this.ctx = null;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playPop() {
    try {
      this.init();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(400, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, this.ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.09);
    } catch(e){}
  }

  playSuccess() {
    try {
      this.init();
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, index) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.value = freq;
        const startTime = this.ctx.currentTime + (index * 0.1);
        gain.gain.setValueAtTime(0.25, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.28);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(startTime);
        osc.stop(startTime + 0.3);
      });
    } catch(e){}
  }

  playWhoosh() {
    try {
      this.init();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(600, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(200, this.ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.15);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.16);
    } catch(e){}
  }

  playLoveFanfare() {
    try {
      this.init();
      const melody = [
        { f: 523.25, d: 0.18 }, // C5
        { f: 587.33, d: 0.18 }, // D5
        { f: 659.25, d: 0.18 }, // E5
        { f: 783.99, d: 0.22 }, // G5
        { f: 880.00, d: 0.22 }, // A5
        { f: 1046.50, d: 0.6 }  // C6
      ];
      let t = this.ctx.currentTime;
      melody.forEach(item => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.value = item.f;
        gain.gain.setValueAtTime(0.3, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + item.d);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t);
        osc.stop(t + item.d);
        t += item.d * 0.85;
      });
    } catch(e){}
  }
}

const sfx = new ComicSoundFX();

// Actualizar la interfaz gráfica según el progreso
function updateUI() {
  let countUnlocked = 0;

  for (let i = 1; i <= 3; i++) {
    const isUnlocked = unlockedPanels[i];
    const cardEl = document.getElementById(`panelCard${i}`);
    const overlayEl = document.getElementById(`panelOverlay${i}`);
    const stepEl = document.getElementById(`stepIndicator${i}`);
    const statusTextEl = document.getElementById(`panelStatus${i}`);

    if (isUnlocked) {
      countUnlocked++;
      if (overlayEl) overlayEl.style.display = 'none';
      if (stepEl) {
        stepEl.classList.add('unlocked');
        stepEl.classList.remove('active');
        stepEl.innerHTML = `<span>Viñeta #${i}</span><span style="color:#2e7d32">✅ Desbloqueada</span>`;
      }
      if (statusTextEl) {
        statusTextEl.innerHTML = `<span style="color:#4ade80">● Desbloqueada</span>`;
      }
    } else {
      if (overlayEl) overlayEl.style.display = 'flex';
      if (stepEl) {
        stepEl.classList.remove('unlocked');
        if (i === countUnlocked + 1) {
          stepEl.classList.add('active');
          stepEl.innerHTML = `<span>Viñeta #${i}</span><span style="color:#ff4d6d">✨ ¡Siguiente!</span>`;
        } else {
          stepEl.classList.remove('active');
          stepEl.innerHTML = `<span>Viñeta #${i}</span><span>🔒 Bloqueada</span>`;
        }
      }
      if (statusTextEl) {
        statusTextEl.innerHTML = `<span>🔒 Bloqueada</span>`;
      }
    }
  }

  // Barra de progreso
  const percent = Math.round((countUnlocked / 3) * 100);
  const barInner = document.getElementById('progressBarInner');
  const countText = document.getElementById('progressCountText');
  if (barInner) barInner.style.width = `${percent}%`;
  if (countText) countText.textContent = `${countUnlocked} de 3 Capítulos Desbloqueados`;

  // Revelar sección final si los 3 están desbloqueados
  const proposalSection = document.getElementById('finalProposalSection');
  if (countUnlocked === 3) {
    if (proposalSection) {
      proposalSection.classList.add('revealed');
    }
  } else {
    if (proposalSection) {
      proposalSection.classList.remove('revealed');
    }
  }
}

// Abrir modal con el Reto correspondiente
function openRetoModal(retoId) {
  sfx.playPop();
  const reto = DEFAULT_RETOS.find(r => r.id === retoId);
  if (!reto) return;

  const modalBackdrop = document.getElementById('quizModalBackdrop');
  const modalBadge = document.getElementById('modalRetoBadge');
  const modalTitle = document.getElementById('modalRetoTitle');
  const modalDesc = document.getElementById('modalRetoDesc');
  const modalQuestion = document.getElementById('modalRetoQuestion');
  const modalOptions = document.getElementById('modalRetoOptions');
  const modalFeedback = document.getElementById('modalRetoFeedback');

  modalBadge.textContent = reto.badge;
  modalTitle.textContent = reto.title;
  modalDesc.textContent = reto.description;
  modalQuestion.textContent = reto.question;
  modalFeedback.textContent = '';
  modalOptions.innerHTML = '';

  const letters = ['A', 'B', 'C', 'D'];
  reto.options.forEach((opt, idx) => {
    const btn = document.createElement('button');
    btn.className = 'quiz-option-btn';
    btn.innerHTML = `
      <span class="quiz-option-letter">${letters[idx]}</span>
      <span>${opt.text}</span>
    `;
    btn.onclick = () => handleAnswer(retoId, opt, btn);
    modalOptions.appendChild(btn);
  });

  modalBackdrop.classList.add('open');
}

function closeQuizModal() {
  sfx.playPop();
  const modalBackdrop = document.getElementById('quizModalBackdrop');
  modalBackdrop.classList.remove('open');
}

// Manejar selección de respuesta
function handleAnswer(retoId, option, buttonEl) {
  const modalFeedback = document.getElementById('modalRetoFeedback');

  if (option.correct) {
    sfx.playSuccess();
    buttonEl.classList.add('correct');
    modalFeedback.innerHTML = `<span style="color:#2e7d32">🎉 ¡Respuesta correcta! Desbloqueando viñeta...</span>`;
    
    // Confeti de felicitación
    triggerConfetti();

    // Desbloquear etapa
    unlockedPanels[retoId] = true;
    saveState();

    setTimeout(() => {
      closeQuizModal();
      updateUI();
      
      // Auto-scroll a la viñeta recién desbloqueada
      const panelEl = document.getElementById(`panelCard${retoId}`);
      if (panelEl) {
        panelEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }

      // Si se completaron las 3, scrollear suavemente a la propuesta final
      if (unlockedPanels[1] && unlockedPanels[2] && unlockedPanels[3]) {
        setTimeout(() => {
          const propSec = document.getElementById('finalProposalSection');
          if (propSec) {
            propSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
            triggerRomanticConfetti();
          }
        }, 1200);
      }
    }, 1400);

  } else {
    buttonEl.classList.add('wrong');
    modalFeedback.innerHTML = `<span style="color:#c62828">¡Casi! Intenta con otra respuesta 💭</span>`;
  }
}

// Efectos de Confeti
function triggerConfetti() {
  if (typeof confetti === 'function') {
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 }
    });
  }
}

function triggerRomanticConfetti() {
  if (typeof confetti === 'function') {
    const duration = 4 * 1000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ff4d6d', '#ff758f', '#ffb3c1', '#ffd166', '#ffffff']
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ff4d6d', '#ff758f', '#ffb3c1', '#ffd166', '#ffffff']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  }
}

// Botón "No" juguetón que huye al pasar el cursor o intentar tocarlo
const funnyTexts = [
  "¿Segura? 🥺",
  "¡Uy, ese botón se desvió! 😂",
  "¡Por aquí no es! ✨",
  "¡Piénsalo bien! 🥰",
  "¡Ese botón no cuenta! 😜",
  "¡El destino dice que Sí! ❤️"
];
let funnyIdx = 0;

function dodgeNoButton() {
  sfx.playWhoosh();
  const btnNo = document.getElementById('btnNoProposal');
  const container = document.querySelector('.proposal-buttons');
  if (!btnNo || !container) return;

  const rect = container.getBoundingClientRect();
  const maxX = Math.max(100, rect.width - btnNo.offsetWidth - 20);
  const randomX = (Math.random() - 0.5) * (maxX * 0.8);
  const randomY = (Math.random() - 0.5) * 80;

  btnNo.style.transform = `translate(${randomX}px, ${randomY}px)`;
  btnNo.textContent = funnyTexts[funnyIdx % funnyTexts.length];
  funnyIdx++;
}

// Aceptación de la Propuesta ("¡SÍ!")
function acceptProposal() {
  sfx.playLoveFanfare();
  triggerRomanticConfetti();

  const proposalSec = document.getElementById('finalProposalSection');
  const victorySec = document.getElementById('successScreen');

  if (proposalSec) proposalSec.style.display = 'none';
  if (victorySec) {
    victorySec.classList.add('revealed');
    victorySec.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  // Lluvia prolongada de corazones
  setInterval(() => {
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 15,
        spread: 80,
        origin: { y: 0.3 },
        colors: ['#ff4d6d', '#ff8fa3', '#ffe5ec']
      });
    }
  }, 1200);
}

// Manejar parámetros de la URL (?etapa=1, ?etapa=2, ?etapa=3 o ?regalo=X)
function checkURLParams() {
  const urlParams = new URLSearchParams(window.location.search);
  const etapa = urlParams.get('etapa') || urlParams.get('reto') || urlParams.get('regalo');
  
  if (etapa) {
    const num = parseInt(etapa, 10);
    if ([1, 2, 3].includes(num)) {
      setTimeout(() => {
        openRetoModal(num);
      }, 500);
    }
  }
}

// GENERADOR DE CÓDIGOS QR Y PANEL CREADOR
function openCreatorModal() {
  sfx.playPop();
  const modal = document.getElementById('creatorModalBackdrop');
  const baseInput = document.getElementById('creatorBaseUrlInput');
  
  // Asignar automáticamente la URL actual sin parámetros
  const cleanUrl = window.location.origin + window.location.pathname;
  if (!baseInput.value) {
    baseInput.value = cleanUrl;
  }
  
  generateQRCodes();
  modal.classList.add('open');
}

function closeCreatorModal() {
  sfx.playPop();
  const modal = document.getElementById('creatorModalBackdrop');
  modal.classList.remove('open');
}

function generateQRCodes() {
  const baseInput = document.getElementById('creatorBaseUrlInput');
  let baseUrl = baseInput.value.trim();
  if (!baseUrl) {
    baseUrl = window.location.origin + window.location.pathname;
  }
  // Quitar trailing slash o query params
  baseUrl = baseUrl.split('?')[0];

  for (let i = 1; i <= 3; i++) {
    const holder = document.getElementById(`qrHolder${i}`);
    const linkText = document.getElementById(`qrLinkText${i}`);
    const stageUrl = `${baseUrl}?etapa=${i}`;

    if (linkText) {
      linkText.textContent = stageUrl;
    }

    if (holder) {
      holder.innerHTML = '';
      if (typeof QRCode !== 'undefined') {
        new QRCode(holder, {
          text: stageUrl,
          width: 128,
          height: 128,
          colorDark: "#231b26",
          colorLight: "#ffffff",
          correctLevel: QRCode.CorrectLevel.H
        });
      } else {
        // Fallback usando imagen directa si la librería fallara
        const img = document.createElement('img');
        img.src = `https://api.qrserver.com/v1/create-qr-code/?size=130x130&data=${encodeURIComponent(stageUrl)}`;
        img.alt = `QR Reto ${i}`;
        holder.appendChild(img);
      }
    }
  }
}

// Resetear progreso para que el creador pruebe desde cero
function resetProgress() {
  if (confirm("¿Deseas reiniciar el progreso a 0 para probar la experiencia como si fuera la primera vez?")) {
    unlockedPanels = { 1: false, 2: false, 3: false };
    saveState();
    location.reload();
  }
}

// Desbloquear todo para previsualizar
function unlockAllPreview() {
  unlockedPanels = { 1: true, 2: true, 3: true };
  saveState();
  updateUI();
  closeCreatorModal();
  setTimeout(() => {
    const propSec = document.getElementById('finalProposalSection');
    if (propSec) {
      propSec.scrollIntoView({ behavior: 'smooth' });
    }
  }, 300);
}

// Inicialización general
document.addEventListener('DOMContentLoaded', () => {
  loadSavedState();
  updateUI();
  checkURLParams();

  // Configurar eventos del botón No
  const btnNo = document.getElementById('btnNoProposal');
  if (btnNo) {
    btnNo.addEventListener('mouseenter', dodgeNoButton);
    btnNo.addEventListener('touchstart', (e) => {
      e.preventDefault();
      dodgeNoButton();
    });
    btnNo.addEventListener('click', dodgeNoButton);
  }

  // Configurar evento de Enter en input URL del creador
  const baseInput = document.getElementById('creatorBaseUrlInput');
  if (baseInput) {
    baseInput.addEventListener('input', generateQRCodes);
  }
});
