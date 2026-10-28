/* ============================================================
   LÓGICA INTERACTIVA - NUESTRA HISTORIA EN PIXEL ART ❤️
   Modo Misterio Progresivo:
   - Solo se muestra la viñeta actual/próxima. Las demás están ocultas.
   - Todo bloqueado: sin título, sin texto, sin canción hasta desbloquear.
   - Cuenta regresiva en vivo (Días, Horas, Minutos, Segundos).
   - Fechas: Miércoles, Viernes y Sábado.
   - Sonido 8-bit Chiptune retro con soporte para archivos locales en audio/
   ============================================================ */

// CÓDIGOS DE 6 DÍGITOS PARA CADA REGALO
const DEFAULT_CODES = {
  1: "140921", // Regalo 1 (Miércoles)
  2: "280419", // Regalo 2 (Viernes)
  3: "739105"  // Regalo 3 (Sábado)
};

// FECHAS OBJETIVO DE DESBLOQUEO (Miércoles, Viernes, Sábado)
// Se pueden ajustar en cualquier momento
const DEFAULT_TARGETS = {
  1: new Date("2026-10-28T00:00:00").getTime(),
  2: new Date("2026-10-30T00:00:00").getTime(),
  3: new Date("2026-10-31T00:00:00").getTime()
};

// PREGUNTAS Y OPCIONES EXACTAS DE SU HISTORIA
const RETOS_DATA = [
  {
    id: 1,
    badge: "RECUERDO #1",
    title: "Mini-hockey o se atreve 🍕",
    storyTitle: "Capítulo 1: Mini-hockey o se atreve",
    storyText: "Todo comenzó cuando te encontré en Facebook gracias a aquel grupo que teníamos en común: Maestría en Ciencias Químicas. Me animé a agregarte y, sin imaginarlo, ese pequeño gesto sería el inicio de algo muy bonito. Lo que empezó con mensajes terminó convirtiéndose en café, pizza, risas, partidas de mini-hockey con cauchitos y penitencias que, entre preguntas y confesiones, nos fueron dejando al descubierto algo que ambos empezábamos a sentir: que nos gustábamos. ❤️✨",
    sfx: "¡MINI-HOCKEY! 🍕",
    question: "Todo empezó porque te agregué al Facebook al ver que compartíamos el grupo de Maestría en Ciencias Químicas. El plan original era ir solo por un café; ese día primero me rechazaste, pero a los pocos minutos aceptaste y en ese mismo sitio terminamos comiendo pizza. Mientras jugábamos mini-hockey con cauchitos, yo te dije que me parecían muy lindos tus ojos, ¿qué me dejaste muy claro que te gustaba de mí?",
    options: [
      { text: "Que te daba mucha ternura mi Twingo blanco.", correct: false },
      { text: "Hiciste mucho énfasis en que te encantaba mi cara de ñoño y mi sonrisa.", correct: true },
      { text: "Que te encantaba mi estilo competitivo para jugar.", correct: false }
    ]
  },
  {
    id: 2,
    badge: "RECUERDO #2",
    title: "La Milimétrica del Jenga ☕",
    storyTitle: "Capítulo 2: La Milimétrica del Jenga",
    storyText: "En la siguiente salida, la conexión se hizo aún más evidente. Entre conversaciones profundas sobre nuestras vidas, la tensión de no derribar la torre de Jenga y lo mucho que disfrutaste aquel affogato, empezamos a descubrir nuestras pequeñas peculiaridades... y quedó claro quién era el más sensible con esas lágrimas. 🥹❤️",
    sfx: "¡JENGA! ✨",
    question: "En esa segunda salida a tomar alguito la conexión se volvió real. Hablamos de la vida, de nuestras familias y terminaste llorando un montón (ya sabemos quién es la llorona de la relación). Entre tanta charla profunda y la tensión de no tumbar el Jenga, ¿qué te pediste para acompañar el momento?",
    options: [
      { text: "Un afogato.", correct: true },
      { text: "Un capuchino de arequipe.", correct: false },
      { text: "Otra porción de pizza, porque ya había confianza.", correct: false }
    ]
  },
  {
    id: 3,
    badge: "RECUERDO #3",
    title: "Pichi, nuestro violinista en esta historia 🎻",
    storyTitle: "Capítulo 3: Pichi, nuestro violinista",
    storyText: "El final de la primera cita y el primer beso: Parados en el carro con música romántica, plancha y agropecuaria de fondo. Te quedaste dormida de cansancio, pero justo cuando abriste los ojos... sucedió nuestro primer beso.",
    sfx: "¡BESO! 💋",
    question: "Al finalizar esa misma primera cita, paramos en el carro con la intención de hablar un rato (seguro de fondo sonaba música agropecuaria, que es lo único que coge ese radio). Pero el cansancio te ganó y te quedaste profunda. ¿Qué fue lo primero que pasó justo en el instante en que abriste los ojos?",
    options: [
      { text: "Te dediqué a todo pulmón una canción de Bruno Mars.", correct: false },
      { text: "Nos dimos nuestro primer beso.", correct: true },
      { text: "Te asustaste porque puse una canción de despecho a todo volumen.", correct: false }
    ]
  }
];

// ESTADO GLOBAL
let unlockedPanels = { 1: false, 2: false, 3: false };
let giftCodes = { ...DEFAULT_CODES };
let targetTimestamps = { ...DEFAULT_TARGETS };
let simulationMode = "REAL"; // "REAL" = Misterio con fechas reales. "ALL" = Todo libre para pruebas.
let currentPinInput = "";
let currentActiveRetoId = null;
let noButtonDodgeCount = 0;
let lockoutIntervalId = null;
let countdownTickerInterval = null;

// ============================================================
// SISTEMA DE AUDIO CHIPTUNE RETRO 8-BIT PURO
// ============================================================
class Retro8BitSynth {
  constructor() {
    this.ctx = null;
    this.currentPlayingAudio = null;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  stopAll() {
    if (this.currentPlayingAudio) {
      try {
        this.currentPlayingAudio.pause();
        this.currentPlayingAudio.currentTime = 0;
      } catch(e){}
      this.currentPlayingAudio = null;
    }
  }

  playBeep() {
    try {
      this.init();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(440, this.ctx.currentTime);
      osc.frequency.setValueAtTime(880, this.ctx.currentTime + 0.04);
      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.09);
    } catch(e){}
  }

  playErrorBuzz() {
    try {
      this.init();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(140, this.ctx.currentTime);
      osc.frequency.setValueAtTime(95, this.ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.28, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.45);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.46);
    } catch(e){}
  }

  playDodgeWhoosh() {
    try {
      this.init();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(650, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.12);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.13);
    } catch(e){}
  }

  // 1. CABAS - "INCREÍBLE" (8-bit Chiptune alegre)
  playCabasIncreible8Bit() {
    try {
      this.init();
      const notes = [
        { f: 392.00, d: 0.30 }, // Sol4
        { f: 493.88, d: 0.30 }, // Si4
        { f: 587.33, d: 0.40 }, // Re5
        { f: 659.25, d: 0.70 }, // Mi5 (In-cre-í-ble...)
        { f: 0,      d: 0.12 },
        { f: 659.25, d: 0.25 }, // Mi5
        { f: 587.33, d: 0.25 }, // Re5
        { f: 493.88, d: 0.30 }, // Si4
        { f: 392.00, d: 0.30 }, // Sol4
        { f: 440.00, d: 0.70 }, // La4 (...que tú estés aquí)
        { f: 0,      d: 0.12 },
        { f: 440.00, d: 0.22 }, // La4
        { f: 493.88, d: 0.22 }, // Si4
        { f: 523.25, d: 0.25 }, // Do5
        { f: 493.88, d: 0.22 }, // Si4
        { f: 440.00, d: 0.22 }, // La4
        { f: 392.00, d: 0.55 }, // Sol4 (...tan bonita)
        { f: 0,      d: 0.12 },
        { f: 392.00, d: 0.22 }, // Sol4
        { f: 493.88, d: 0.22 }, // Si4
        { f: 587.33, d: 0.30 }, // Re5
        { f: 523.25, d: 0.25 }, // Do5
        { f: 493.88, d: 0.25 }, // Si4
        { f: 440.00, d: 0.30 }, // La4
        { f: 392.00, d: 1.00 }  // Sol4 (...tenerte cerca de mí)
      ];

      let t = this.ctx.currentTime + 0.05;
      notes.forEach(item => {
        if (item.f > 0) {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'square';
          osc.frequency.value = item.f;
          gain.gain.setValueAtTime(0.18, t);
          gain.gain.exponentialRampToValueAtTime(0.001, t + item.d);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(t);
          osc.stop(t + item.d);
        }
        t += item.d;
      });
    } catch(e){}
  }

  // 2. SYSTEM OF A DOWN - "TOXICITY" (8-bit Chiptune Metal)
  playSoadToxicity8Bit() {
    try {
      this.init();
      const notes = [
        // Riff arpegio intro
        { f: 261.63, d: 0.15 }, { f: 311.13, d: 0.15 }, { f: 392.00, d: 0.15 },
        { f: 523.25, d: 0.15 }, { f: 392.00, d: 0.15 }, { f: 311.13, d: 0.15 },
        { f: 233.08, d: 0.15 }, { f: 293.66, d: 0.15 }, { f: 349.23, d: 0.15 },
        { f: 466.16, d: 0.15 }, { f: 349.23, d: 0.15 }, { f: 293.66, d: 0.15 },
        { f: 207.65, d: 0.15 }, { f: 261.63, d: 0.15 }, { f: 311.13, d: 0.15 },
        { f: 415.30, d: 0.15 }, { f: 311.13, d: 0.15 }, { f: 261.63, d: 0.15 },
        // Coro rápido: "The toxicity of our city..."
        { f: 523.25, d: 0.20 }, { f: 523.25, d: 0.20 }, { f: 523.25, d: 0.20 },
        { f: 466.16, d: 0.20 }, { f: 415.30, d: 0.20 }, { f: 392.00, d: 0.25 },
        { f: 415.30, d: 0.20 }, { f: 392.00, d: 0.20 }, { f: 349.23, d: 0.20 },
        { f: 311.13, d: 0.20 }, { f: 293.66, d: 0.20 }, { f: 261.63, d: 0.70 }
      ];

      let t = this.ctx.currentTime + 0.05;
      notes.forEach(item => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.value = item.f;
        gain.gain.setValueAtTime(0.22, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + item.d);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t);
        osc.stop(t + item.d);
        t += item.d;
      });
    } catch(e){}
  }

  // 3. LIFEHOUSE - "YOU AND ME" (8-bit Chiptune Romántico)
  playYouAndMe8Bit() {
    try {
      this.init();
      // "'Cause it's you and me and all of the other people..."
      const lifehouseNotes = [
        { f: 392.00, d: 0.22 }, // Sol4
        { f: 440.00, d: 0.22 }, // La4
        { f: 493.88, d: 0.45 }, // Si4
        { f: 493.88, d: 0.22 }, // Si4
        { f: 493.88, d: 0.22 }, // Si4
        { f: 493.88, d: 0.25 }, // Si4
        { f: 440.00, d: 0.25 }, // La4
        { f: 392.00, d: 0.35 }, // Sol4
        { f: 440.00, d: 0.25 }, // La4
        { f: 493.88, d: 0.55 }, // Si4
        { f: 0,      d: 0.12 },
        { f: 440.00, d: 0.25 }, // La4
        { f: 392.00, d: 0.25 }, // Sol4
        { f: 329.63, d: 0.65 }, // Mi4
        { f: 0,      d: 0.10 },
        { f: 392.00, d: 0.22 }, // Sol4
        { f: 440.00, d: 0.22 }, // La4
        { f: 493.88, d: 0.25 }, // Si4
        { f: 440.00, d: 0.25 }, // La4
        { f: 392.00, d: 0.75 }, // Sol4
        { f: 0,      d: 0.18 },
        { f: 392.00, d: 0.22 }, // Sol4
        { f: 440.00, d: 0.22 }, // La4
        { f: 493.88, d: 0.45 }, // Si4
        { f: 493.88, d: 0.22 }, // Si4
        { f: 493.88, d: 0.22 }, // Si4
        { f: 493.88, d: 0.25 }, // Si4
        { f: 440.00, d: 0.25 }, // La4
        { f: 392.00, d: 0.35 }, // Sol4
        { f: 440.00, d: 0.25 }, // La4
        { f: 493.88, d: 0.55 }, // Si4
        { f: 0,      d: 0.12 },
        { f: 587.33, d: 0.30 }, // Re5
        { f: 493.88, d: 0.30 }, // Si4
        { f: 440.00, d: 0.30 }, // La4
        { f: 392.00, d: 0.35 }, // Sol4
        { f: 440.00, d: 0.25 }, // La4
        { f: 493.88, d: 0.25 }, // Si4
        { f: 440.00, d: 0.25 }, // La4
        { f: 392.00, d: 0.35 }, // Sol4
        { f: 392.00, d: 1.20 }  // Sol4 (Final dulce)
      ];

      let t = this.ctx.currentTime + 0.05;
      lifehouseNotes.forEach(item => {
        if (item.f > 0) {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'square';
          osc.frequency.value = item.f;
          gain.gain.setValueAtTime(0.2, t);
          gain.gain.exponentialRampToValueAtTime(0.001, t + item.d);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(t);
          osc.stop(t + item.d);
        }
        t += item.d;
      });
    } catch(e){}
  }
}

const audio = new Retro8BitSynth();

// REPRODUCCIÓN: Primero intenta archivo local en audio/, si no está, reproduce el sintetizador 8-bit
function playVignetteSong(stageId) {
  audio.stopAll();

  const localAudioEl = document.getElementById(`localAudio${stageId}`);
  if (localAudioEl && localAudioEl.src) {
    audio.currentPlayingAudio = localAudioEl;
    localAudioEl.currentTime = 0;
    localAudioEl.play().catch(() => {
      // Si el archivo no existe o falla, suena el sintetizador 8-bit
      trigger8BitSynth(stageId);
    });
  } else {
    trigger8BitSynth(stageId);
  }
}

function trigger8BitSynth(stageId) {
  if (stageId === 1) audio.playCabasIncreible8Bit();
  else if (stageId === 2) audio.playSoadToxicity8Bit();
  else if (stageId === 3) audio.playYouAndMe8Bit();
}

// ============================================================
// CÁLCULO DE FECHAS OBJETIVO Y CONTADORES
// ============================================================
function getStageReleaseTimestamp(stageId) {
  if (simulationMode === "ALL") return Date.now() - 1000;
  if (simulationMode === "1" && stageId === 1) return Date.now() - 1000;
  if (simulationMode === "2" && stageId <= 2) return Date.now() - 1000;
  if (simulationMode === "3") return Date.now() - 1000;

  return targetTimestamps[stageId] || (Date.now() - 1000);
}

function updateCountdowns() {
  for (let i = 1; i <= 3; i++) {
    const digitsEl = document.getElementById(`stageCountdownDigits${i}`);
    const pinBtn = document.getElementById(`pinBtn${i}`);
    const mysteryDesc = document.getElementById(`mysteryDesc${i}`);
    if (!digitsEl) continue;

    const targetTime = getStageReleaseTimestamp(i);
    const diff = targetTime - Date.now();

    if (diff <= 0) {
      digitsEl.textContent = "✨ ¡YA DISPONIBLE!";
      digitsEl.classList.add("available");
      if (pinBtn) pinBtn.style.display = "inline-flex";
      if (mysteryDesc) {
        mysteryDesc.textContent = "¡Ha llegado el momento! Ingresa el código de 6 dígitos de tu regalo para descubrir este recuerdo.";
      }
    } else {
      digitsEl.classList.remove("available");
      if (pinBtn) pinBtn.style.display = "none";
      if (mysteryDesc) {
        mysteryDesc.textContent = "La fecha y hora de este recuerdo aún no llegan. ¡La paciencia tiene su recompensa! ❤️";
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      digitsEl.textContent = `${days}d ${hours.toString().padStart(2, '0')}h ${minutes.toString().padStart(2, '0')}m ${seconds.toString().padStart(2, '0')}s`;
    }
  }
}

// ============================================================
// BLOQUEO REAL DE 30 MINUTOS POR ERROR
// ============================================================
function activateLockoutPenalty() {
  audio.playErrorBuzz();
  const lockoutUntil = Date.now() + (30 * 60 * 1000);
  localStorage.setItem('propuesta_lockout_until', lockoutUntil.toString());
  showLockoutScreen(lockoutUntil);
}

function checkActiveLockout() {
  const saved = localStorage.getItem('propuesta_lockout_until');
  if (!saved) return false;

  const lockoutUntil = parseInt(saved, 10);
  if (Date.now() < lockoutUntil) {
    showLockoutScreen(lockoutUntil);
    return true;
  } else {
    localStorage.removeItem('propuesta_lockout_until');
    hideLockoutScreen();
    return false;
  }
}

function showLockoutScreen(lockoutUntil) {
  const overlay = document.getElementById('lockoutOverlay');
  const timerDisplay = document.getElementById('lockoutCountdownDisplay');
  if (!overlay || !timerDisplay) return;

  overlay.classList.add('active');

  if (lockoutIntervalId) clearInterval(lockoutIntervalId);

  const updateTimer = () => {
    const diff = lockoutUntil - Date.now();
    if (diff <= 0) {
      clearInterval(lockoutIntervalId);
      localStorage.removeItem('propuesta_lockout_until');
      hideLockoutScreen();
      return;
    }
    const mins = Math.floor(diff / (60 * 1000));
    const secs = Math.floor((diff % (60 * 1000)) / 1000);
    timerDisplay.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  updateTimer();
  lockoutIntervalId = setInterval(updateTimer, 1000);
}

function hideLockoutScreen() {
  const overlay = document.getElementById('lockoutOverlay');
  if (overlay) overlay.classList.remove('active');
  if (lockoutIntervalId) {
    clearInterval(lockoutIntervalId);
    lockoutIntervalId = null;
  }
}

function forceClearLockout() {
  localStorage.removeItem('propuesta_lockout_until');
  hideLockoutScreen();
  alert("🔓 Bloqueo de 30 minutos desactivado para pruebas.");
}

// ============================================================
// TECLADO PIN DE 6 DÍGITOS
// ============================================================
function openPinModal(stageId) {
  audio.playBeep();
  if (checkActiveLockout()) return;

  currentActiveRetoId = stageId;
  currentPinInput = "";
  updatePinDisplay();

  const targetTime = getStageReleaseTimestamp(stageId);
  const isAvailable = (targetTime - Date.now()) <= 0;

  const titleEl = document.getElementById('pinModalTitle');
  const noticeEl = document.getElementById('pinModalDayNotice');
  const errorEl = document.getElementById('pinModalError');

  titleEl.textContent = `Código del Recuerdo Secreto 🎁`;
  errorEl.textContent = "";

  if (isAvailable) {
    noticeEl.innerHTML = `<span style="color:#06d6a0;">✅ ¡Disponible ahora!</span>`;
  } else {
    noticeEl.innerHTML = `<span style="color:#ffd166;">⏳ Aún no llega el momento de este regalo</span>`;
  }

  const modal = document.getElementById('pinModalBackdrop');
  modal.classList.add('open');
}

function closePinModal() {
  audio.playBeep();
  const modal = document.getElementById('pinModalBackdrop');
  modal.classList.remove('open');
}

function handlePinKey(key) {
  audio.playBeep();
  const errorEl = document.getElementById('pinModalError');
  errorEl.textContent = "";

  if (key === 'DEL') {
    currentPinInput = currentPinInput.slice(0, -1);
  } else if (key === 'CLEAR') {
    currentPinInput = "";
  } else {
    if (currentPinInput.length < 6) {
      currentPinInput += key;
    }
  }
  updatePinDisplay();

  if (currentPinInput.length === 6) {
    setTimeout(verifyEnteredPin, 250);
  }
}

function updatePinDisplay() {
  for (let i = 0; i < 6; i++) {
    const box = document.getElementById(`pinBox${i}`);
    if (box) {
      if (i < currentPinInput.length) {
        box.textContent = currentPinInput[i];
        box.classList.add('filled');
      } else {
        box.textContent = "";
        box.classList.remove('filled');
      }
    }
  }
}

function verifyEnteredPin() {
  const expectedCode = giftCodes[currentActiveRetoId] || DEFAULT_CODES[currentActiveRetoId];
  const errorEl = document.getElementById('pinModalError');

  if (currentPinInput !== expectedCode) {
    audio.playErrorBuzz();
    errorEl.innerHTML = `<span style="color:#ff4d6d">❌ Código incorrecto. Revisa la tarjetita de tu regalo.</span>`;
    const boxes = document.querySelector('.pin-display-container');
    if (boxes) {
      boxes.style.transform = 'translateX(-8px)';
      setTimeout(() => boxes.style.transform = 'translateX(8px)', 80);
      setTimeout(() => boxes.style.transform = 'translateX(0)', 160);
    }
    currentPinInput = "";
    setTimeout(updatePinDisplay, 600);
    return;
  }

  const targetTime = getStageReleaseTimestamp(currentActiveRetoId);
  const diff = targetTime - Date.now();

  if (diff > 0) {
    audio.playBeep();
    errorEl.innerHTML = `<span style="color:#ffd166">¡Código correcto! Pero la cuenta regresiva aún no termina. ¡Paciencia, pequeña impaciente! ❤️</span>`;
    return;
  }

  closePinModal();
  setTimeout(() => {
    openRetoQuizModal(currentActiveRetoId);
  }, 350);
}

// ============================================================
// MODAL DE PREGUNTAS Y PENALIZACIÓN
// ============================================================
function openRetoQuizModal(retoId) {
  const reto = RETOS_DATA.find(r => r.id === retoId);
  if (!reto) return;

  const modal = document.getElementById('quizModalBackdrop');
  document.getElementById('modalRetoBadge').textContent = reto.badge;
  document.getElementById('modalRetoTitle').textContent = "El Reto del Recuerdo";
  document.getElementById('modalRetoQuestion').textContent = reto.question;
  document.getElementById('modalRetoFeedback').textContent = '';

  const optionsContainer = document.getElementById('modalRetoOptions');
  optionsContainer.innerHTML = '';

  const letters = ['A', 'B', 'C'];
  reto.options.forEach((opt, idx) => {
    const btn = document.createElement('button');
    btn.className = 'quiz-option-btn';
    btn.innerHTML = `
      <span class="quiz-option-letter">${letters[idx]}</span>
      <span>${opt.text}</span>
    `;
    btn.onclick = () => handleQuizAnswer(retoId, opt, btn);
    optionsContainer.appendChild(btn);
  });

  modal.classList.add('open');
}

function closeQuizModal() {
  audio.playBeep();
  const modal = document.getElementById('quizModalBackdrop');
  modal.classList.remove('open');
}

function handleQuizAnswer(retoId, option, btnElement) {
  const feedback = document.getElementById('modalRetoFeedback');

  if (option.correct) {
    btnElement.classList.add('correct');
    feedback.innerHTML = `<span style="color:#2e7d32; font-weight:700;">🎉 ¡ACERTASTE! Revelando el recuerdo...</span>`;
    
    triggerHeartsConfetti();
    unlockedPanels[retoId] = true;
    saveProgressState();

    playVignetteSong(retoId);

    setTimeout(() => {
      closeQuizModal();
      updatePanelsUI();
      
      const panel = document.getElementById(`panelCard${retoId}`);
      if (panel) {
        panel.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }

      if (unlockedPanels[1] && unlockedPanels[2] && unlockedPanels[3]) {
        setTimeout(() => {
          const propSec = document.getElementById('finalProposalSection');
          if (propSec) {
            propSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
            triggerRomanticConfetti();
          }
        }, 1200);
      }
    }, 1500);

  } else {
    btnElement.classList.add('wrong');
    feedback.innerHTML = `<span style="color:#c62828; font-weight:700;">❌ ¡Esa no era! Bloqueando sistema por 30 minutos...</span>`;

    setTimeout(() => {
      closeQuizModal();
      activateLockoutPenalty();
    }, 1200);
  }
}

// ============================================================
// BOTÓN "NO" QUE HUYE EXACTAMENTE 3 VECES
// ============================================================
const dodgePhrases = [
  "¡Uy, casi! ¿Segura? 🥺",
  "¡Ese botón se volvió a mover! Piénsalo bien 😂",
  "¡Último intento fallido! Ese botón no quiere que digas no 😜"
];

function handleNoButtonDodge() {
  audio.playDodgeWhoosh();
  const btnNo = document.getElementById('btnNoProposal');
  if (!btnNo) return;

  noButtonDodgeCount++;

  if (noButtonDodgeCount <= 3) {
    const randomX = (Math.random() - 0.5) * 160;
    const randomY = (Math.random() - 0.5) * 80;
    btnNo.style.transform = `translate(${randomX}px, ${randomY}px)`;
    btnNo.textContent = dodgePhrases[noButtonDodgeCount - 1];

    if (noButtonDodgeCount === 3) {
      setTimeout(() => {
        btnNo.style.transform = 'translate(0, 0)';
        btnNo.className = 'comic-btn btn-yes';
        btnNo.style.background = '#ffd166';
        btnNo.textContent = '¡Bueno, SÍ! 💖';
        btnNo.onclick = acceptProposalFinal;
      }, 900);
    }
  }
}

// ============================================================
// CLÍMAX FINAL: SÍ ACEPTO + CANCIÓN FINAL + CONFETI
// ============================================================
function acceptProposalFinal() {
  playVignetteSong(3);
  triggerRomanticConfetti();

  const proposalSec = document.getElementById('finalProposalSection');
  const victorySec = document.getElementById('successScreen');

  if (proposalSec) proposalSec.style.display = 'none';
  if (victorySec) {
    victorySec.classList.add('revealed');
    victorySec.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  let heartInterval = setInterval(() => {
    triggerHeartsConfetti();
  }, 1200);

  setTimeout(() => clearInterval(heartInterval), 20000);
}

// Confeti de corazones
function triggerHeartsConfetti() {
  if (typeof confetti === 'function') {
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#0284c7', '#38bdf8', '#ffd166', '#06d6a0']
    });
  }
}

function triggerRomanticConfetti() {
  if (typeof confetti === 'function') {
    const end = Date.now() + 4500;
    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 60,
        origin: { x: 0 },
        colors: ['#0284c7', '#38bdf8', '#ffd166', '#ffffff']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 60,
        origin: { x: 1 },
        colors: ['#0284c7', '#38bdf8', '#ffd166', '#ffffff']
      });
      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  }
}

// ============================================================
// ACTUALIZACIÓN DE INTERFAZ (MISTERIO PROGRESIVO)
// ============================================================
function updatePanelsUI() {
  // 1. Viñeta 1: Siempre visible en el feed
  const card1 = document.getElementById('panelCard1');
  const mysteryBox1 = document.getElementById('mysteryBox1');
  const tag1 = document.getElementById('panelTag1');

  if (unlockedPanels[1]) {
    card1.classList.remove('is-locked');
    if (mysteryBox1) mysteryBox1.style.display = 'none';
    if (tag1) tag1.textContent = '✨ RECUERDO #1: MINI-HOCKEY O SE ATREVE';
  } else {
    card1.classList.add('is-locked');
    if (mysteryBox1) mysteryBox1.style.display = 'flex';
    if (tag1) tag1.textContent = '🔒 RECUERDO #1';
  }

  // 2. Viñeta 2: Solo visible si la Viñeta 1 ya fue superada
  const card2 = document.getElementById('panelCard2');
  const mysteryBox2 = document.getElementById('mysteryBox2');
  const tag2 = document.getElementById('panelTag2');

  if (unlockedPanels[1] || simulationMode === "ALL") {
    card2.style.display = 'block';
    if (unlockedPanels[2]) {
      card2.classList.remove('is-locked');
      if (mysteryBox2) mysteryBox2.style.display = 'none';
      if (tag2) tag2.textContent = '✨ RECUERDO #2: LA MILIMÉTRICA DEL JENGA';
    } else {
      card2.classList.add('is-locked');
      if (mysteryBox2) mysteryBox2.style.display = 'flex';
      if (tag2) tag2.textContent = '🔒 PRÓXIMO RECUERDO';
    }
  } else {
    card2.style.display = 'none';
  }

  // 3. Viñeta 3: Solo visible si la Viñeta 2 ya fue superada
  const card3 = document.getElementById('panelCard3');
  const mysteryBox3 = document.getElementById('mysteryBox3');
  const tag3 = document.getElementById('panelTag3');

  if (unlockedPanels[2] || simulationMode === "ALL") {
    card3.style.display = 'block';
    if (unlockedPanels[3]) {
      card3.classList.remove('is-locked');
      if (mysteryBox3) mysteryBox3.style.display = 'none';
      if (tag3) tag3.textContent = '✨ RECUERDO #3: PICHI, NUESTRO VIOLINISTA';
    } else {
      card3.classList.add('is-locked');
      if (mysteryBox3) mysteryBox3.style.display = 'flex';
      if (tag3) tag3.textContent = '🔒 RECUERDO DECISIVO';
    }
  } else {
    card3.style.display = 'none';
  }

  // Actualizar badges de recuerdos revelados (Sin revelar el total)
  const badgesContainer = document.getElementById('unlockedBadgesContainer');
  const countText = document.getElementById('progressCountText');

  let countUnlocked = 0;
  let badgesHtml = '';

  if (unlockedPanels[1]) {
    countUnlocked++;
    badgesHtml += `<span class="pixel-badge" style="background:#e0f2fe; color:#0284c7; font-size:0.6rem;">🍕 1. Mini-hockey o se atreve</span>`;
  }
  if (unlockedPanels[2]) {
    countUnlocked++;
    badgesHtml += `<span class="pixel-badge" style="background:#e0f2fe; color:#0284c7; font-size:0.6rem;">☕ 2. La Milimétrica del Jenga</span>`;
  }
  if (unlockedPanels[3]) {
    countUnlocked++;
    badgesHtml += `<span class="pixel-badge" style="background:#e0f2fe; color:#0284c7; font-size:0.6rem;">🎻 3. Pichi, el violinista</span>`;
  }

  if (countUnlocked === 0) {
    badgesHtml = `<span class="pixel-badge" style="background:#f1f5f9; color:#64748b; font-size:0.6rem;">🔒 En busca del primer recuerdo</span>`;
    countText.textContent = "Descubriendo el camino...";
  } else {
    countText.textContent = `${countUnlocked} recuerdo(s) revelado(s)`;
  }
  badgesContainer.innerHTML = badgesHtml;

  // Revelar sección final únicamente si los 3 están desbloqueados
  const proposalSection = document.getElementById('finalProposalSection');
  if (unlockedPanels[1] && unlockedPanels[2] && unlockedPanels[3]) {
    if (proposalSection) proposalSection.classList.add('revealed');
  }

  updateCountdowns();
}

// Guardar y Cargar Estado
function loadProgressState() {
  try {
    const saved = localStorage.getItem('propuesta_mystery_unlocked');
    if (saved) unlockedPanels = JSON.parse(saved);

    const savedCodes = localStorage.getItem('propuesta_gift_codes');
    if (savedCodes) giftCodes = JSON.parse(savedCodes);

    const savedSim = localStorage.getItem('propuesta_simulation_mode');
    if (savedSim) simulationMode = savedSim;
  } catch(e){}
}

function saveProgressState() {
  try {
    localStorage.setItem('propuesta_mystery_unlocked', JSON.stringify(unlockedPanels));
  } catch(e){}
}

// ============================================================
// PANEL DEL CREADOR / MODO PRUEBAS (ACCESO SECRETO Y PROTEGIDO)
// ============================================================
let secretBadgeTaps = 0;
let secretBadgeTimer = null;

function checkCreatorAccess() {
  const urlParams = new URLSearchParams(window.location.search);
  
  // Activar con ?admin=1 o ?cristian=1
  if (urlParams.get('admin') === '1' || urlParams.get('cristian') === '1') {
    localStorage.setItem('propuesta_modo_cristian', 'true');
  }

  // Desactivar y ocultar con ?logout=1 o ?limpiar=1
  if (urlParams.get('logout') === '1' || urlParams.get('limpiar') === '1') {
    localStorage.removeItem('propuesta_modo_cristian');
  }

  const btn = document.getElementById('creatorBtn');
  if (localStorage.getItem('propuesta_modo_cristian') === 'true') {
    if (btn) btn.classList.add('is-active');
  } else {
    if (btn) btn.classList.remove('is-active');
  }
}

function handleSecretBadgeTap() {
  secretBadgeTaps++;
  if (secretBadgeTimer) clearTimeout(secretBadgeTimer);

  // Si da 5 toques rápidos en menos de 2.5 segundos
  if (secretBadgeTaps >= 5) {
    secretBadgeTaps = 0;
    const pwd = prompt("🔐 Acceso Creador (Cristian)\nIngresa tu clave secreta:");
    if (pwd === "2026" || pwd === "1409") {
      localStorage.setItem('propuesta_modo_cristian', 'true');
      const btn = document.getElementById('creatorBtn');
      if (btn) btn.classList.add('is-active');
      openCreatorModal(true);
    } else if (pwd !== null) {
      alert("❌ Clave incorrecta.");
    }
    return;
  }

  secretBadgeTimer = setTimeout(() => {
    secretBadgeTaps = 0;
  }, 2500);
}

function openCreatorModal(bypass = false) {
  // Verificación de seguridad si no está autorizado
  if (!bypass && localStorage.getItem('propuesta_modo_cristian') !== 'true') {
    const pwd = prompt("🔐 Acceso Protegido\nIngresa tu clave de creador:");
    if (pwd !== "2026" && pwd !== "1409") {
      if (pwd !== null) alert("❌ Clave incorrecta.");
      return;
    }
    localStorage.setItem('propuesta_modo_cristian', 'true');
    const btn = document.getElementById('creatorBtn');
    if (btn) btn.classList.add('is-active');
  }

  audio.playBeep();
  const modal = document.getElementById('creatorModalBackdrop');
  
  document.getElementById('simModeSelect').value = simulationMode;
  document.getElementById('inputCode1').value = giftCodes[1];
  document.getElementById('inputCode2').value = giftCodes[2];
  document.getElementById('inputCode3').value = giftCodes[3];

  updateCodeCardsDisplay();
  modal.classList.add('open');
}

function closeCreatorModal() {
  audio.playBeep();
  const modal = document.getElementById('creatorModalBackdrop');
  modal.classList.remove('open');
}

function hideCreatorModeForGirlfriend() {
  localStorage.removeItem('propuesta_modo_cristian');
  const btn = document.getElementById('creatorBtn');
  if (btn) btn.classList.remove('is-active');
  closeCreatorModal();
  alert("🔒 Modo Creador oculto con éxito.\nNadie podrá verlo a menos que use tu enlace secreto o tu clave.");
}

function saveCreatorSettings() {
  simulationMode = document.getElementById('simModeSelect').value;
  giftCodes[1] = document.getElementById('inputCode1').value.trim() || DEFAULT_CODES[1];
  giftCodes[2] = document.getElementById('inputCode2').value.trim() || DEFAULT_CODES[2];
  giftCodes[3] = document.getElementById('inputCode3').value.trim() || DEFAULT_CODES[3];

  localStorage.setItem('propuesta_simulation_mode', simulationMode);
  localStorage.setItem('propuesta_gift_codes', JSON.stringify(giftCodes));

  updateCodeCardsDisplay();
  updatePanelsUI();
  alert("✅ Configuración guardada correctamente.");
  closeCreatorModal();
}

function updateCodeCardsDisplay() {
  for (let i = 1; i <= 3; i++) {
    const codeDisplay = document.getElementById(`displayCardCode${i}`);
    if (codeDisplay) {
      codeDisplay.textContent = giftCodes[i];
    }
  }
}

function resetAllProgress() {
  if (confirm("¿Deseas reiniciar todo el progreso a cero para volver a probar desde el inicio?")) {
    unlockedPanels = { 1: false, 2: false, 3: false };
    localStorage.removeItem('propuesta_mystery_unlocked');
    localStorage.removeItem('propuesta_lockout_until');
    location.reload();
  }
}

function unlockAllDirectPreview() {
  unlockedPanels = { 1: true, 2: true, 3: true };
  saveProgressState();
  updatePanelsUI();
  closeCreatorModal();
  setTimeout(() => {
    const prop = document.getElementById('finalProposalSection');
    if (prop) prop.scrollIntoView({ behavior: 'smooth' });
  }, 300);
}

// INICIALIZACIÓN
document.addEventListener('DOMContentLoaded', () => {
  loadProgressState();
  checkActiveLockout();
  checkCreatorAccess();
  updatePanelsUI();

  // Listener para el gesto secreto de 5 toques en el badge
  const secretBadge = document.getElementById('secretTriggerBadge');
  if (secretBadge) {
    secretBadge.addEventListener('click', handleSecretBadgeTap);
  }

  // Actualizar los contadores en tiempo real cada 1 segundo
  countdownTickerInterval = setInterval(updateCountdowns, 1000);

  // Configurar evasión del botón No para celular táctil y mouse
  const btnNo = document.getElementById('btnNoProposal');
  if (btnNo) {
    btnNo.addEventListener('touchstart', (e) => {
      e.preventDefault();
      handleNoButtonDodge();
    });
    btnNo.addEventListener('mouseenter', handleNoButtonDodge);
    btnNo.addEventListener('click', handleNoButtonDodge);
  }
});
