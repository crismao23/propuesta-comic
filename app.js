/* ============================================================
   LÓGICA INTERACTIVA - NUESTRA HISTORIA EN PIXEL ART ❤️
   Contadores en tiempo real (Días/Horas/Min/Seg), 
   Bloqueo de 30 min, códigos de 6 dígitos
   BANDA SONORA RETRO 8-BIT:
     1. Cabas - "Increíble" (Capítulo 1)
     2. System of a Down - "Toxicity" (Capítulo 2)
     3. Disclosure / Flume - "You & Me" (Capítulo 3 y Propuesta)
   ============================================================ */

// CÓDIGOS DE 6 DÍGITOS PARA CADA REGALO (Configurables)
const DEFAULT_CODES = {
  1: "140921", // Regalo 1 (Miércoles)
  2: "280419", // Regalo 2 (Viernes)
  3: "739105"  // Regalo 3 (Sábado)
};

// DÍAS REQUERIDOS
const DAY_REQUIREMENTS = {
  1: { dayIndex: 3, name: "Miércoles", label: "MIÉRCOLES" },
  2: { dayIndex: 5, name: "Viernes", label: "VIERNES" },
  3: { dayIndex: 6, name: "Sábado", label: "SÁBADO" }
};

// PREGUNTAS Y OPCIONES EXACTAS DE SU HISTORIA
const RETOS_DATA = [
  {
    id: 1,
    badge: "CAPÍTULO 1",
    dayLabel: "Miércoles",
    title: "El rechazo de 5 min, la pizza y la cara de ñoño 🍕",
    storyTitle: "Capítulo 1: El Primer Encuentro",
    storyText: "Todo empezó con ese mensaje de Facebook por la Maestría en Ciencias Químicas. El café terminó en pizza, risas, mini-hockey con cauchitos y la mirada puesta en ese Twingo blanco por la ventana.",
    sfx: "¡PIZZA! 🍕",
    songName: "Cabas - Increíble",
    question: "Todo empezó porque te agregué al Facebook al ver que compartíamos el grupo de Maestría en Ciencias Químicas. El plan original era ir solo por un café; ese día primero me rechazaste, pero a los pocos minutos aceptaste y en ese mismo sitio terminamos comiendo pizza. Mientras jugábamos mini-hockey con cauchitos, yo te dije que me parecían muy lindos tus ojos, ¿qué me dejaste muy claro que te gustaba de mí?",
    options: [
      { text: "Que te daba mucha ternura mi Twingo blanco.", correct: false },
      { text: "Hiciste mucho énfasis en que te encantaba mi cara de ñoño y mi sonrisa.", correct: true },
      { text: "Que te encantaba mi estilo competitivo para jugar.", correct: false }
    ]
  },
  {
    id: 2,
    badge: "CAPÍTULO 2",
    dayLabel: "Viernes",
    title: "Jenga, lágrimas y el afogato ☕",
    storyTitle: "Capítulo 2: Conexión Real y Lágrimas",
    storyText: "En esa segunda salida la conexión fue mágica e inevitable. Entre tanta charla profunda sobre la vida y la tensión de no tumbar el Jenga, supimos quién era la llorona de la relación mientras disfrutabas tu afogato.",
    sfx: "¡JENGA! ✨",
    songName: "SOAD - Toxicity",
    question: "En esa segunda salida a tomar alguito la conexión se volvió real. Hablamos de la vida, de nuestras familias y terminaste llorando un montón (ya sabemos quién es la llorona de la relación). Entre tanta charla profunda y la tensión de no tumbar el Jenga, ¿qué te pediste para acompañar el momento?",
    options: [
      { text: "Un afogato.", correct: true },
      { text: "Un capuchino de arequipe.", correct: false },
      { text: "Otra porción de pizza, porque ya había confianza.", correct: false }
    ]
  },
  {
    id: 3,
    badge: "CAPÍTULO 3",
    dayLabel: "Sábado",
    title: "La radio agropecuaria y el primer beso 📻",
    storyTitle: "Capítulo 3: Nuestro Primer Beso",
    storyText: "En el carro de noche, con la música agropecuaria de fondo. Te quedaste profunda de sueño, pero al abrir los ojos, el universo conspiró para sellar nuestro primer beso.",
    sfx: "¡BESO! 💋",
    songName: "You & Me",
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
let simulationMode = "ALL"; // "ALL" = Pruebas, "REAL" = Días reales, o "3","5","6"
let currentPinInput = "";
let currentActiveRetoId = null;
let noButtonDodgeCount = 0;
let lockoutIntervalId = null;
let countdownTickerInterval = null;

// ============================================================
// SISTEMA DE AUDIO MULTI-CANAL (STUDIO 16/24-BIT & CHIPTUNE)
// ============================================================
class StudioAudioEngine {
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
      osc.type = 'sine';
      osc.frequency.setValueAtTime(520, this.ctx.currentTime);
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
      osc.frequency.setValueAtTime(160, this.ctx.currentTime);
      osc.frequency.setValueAtTime(110, this.ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
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
      osc.frequency.exponentialRampToValueAtTime(320, this.ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.12);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.13);
    } catch(e){}
  }

  // 1. CABAS - "INCREÍBLE" (Sintetizador 16/24-bit Cálido estilo Piano y Guitarra Acústica)
  playCabasIncreibleSynth() {
    try {
      this.init();
      // Armónicos suaves y envolvente acústica de piano/guitarra
      const cabasMelody = [
        // "Que in-cre-í-ble..."
        { f: 392.00, d: 0.35, chord: [196, 246.94, 293.66] }, // G4 + Sol Mayor
        { f: 493.88, d: 0.35, chord: null },                   // B4
        { f: 587.33, d: 0.45, chord: null },                   // D5
        { f: 659.25, d: 0.85, chord: [164.81, 246.94, 329.63] }, // E5 + Mi menor
        { f: 0,      d: 0.15, chord: null },
        // "...como siento el corazón cuando te pienso"
        { f: 659.25, d: 0.28, chord: null },                   // E5
        { f: 587.33, d: 0.28, chord: null },                   // D5
        { f: 493.88, d: 0.35, chord: null },                   // B4
        { f: 392.00, d: 0.35, chord: null },                   // G4
        { f: 440.00, d: 0.85, chord: [146.83, 220.00, 293.66] }, // A4 + Re Mayor
        { f: 0,      d: 0.15, chord: null },
        // "...increíble el color del cielo"
        { f: 440.00, d: 0.25, chord: null },                   // A4
        { f: 493.88, d: 0.25, chord: null },                   // B4
        { f: 523.25, d: 0.32, chord: [130.81, 196.00, 261.63] }, // C5 + Do Mayor
        { f: 493.88, d: 0.25, chord: null },                   // B4
        { f: 440.00, d: 0.25, chord: null },                   // A4
        { f: 392.00, d: 0.65, chord: null },                   // G4
        { f: 0,      d: 0.15, chord: null },
        // "...pero hoy contigo todo me lo creo"
        { f: 392.00, d: 0.25, chord: null },                   // G4
        { f: 493.88, d: 0.25, chord: null },                   // B4
        { f: 587.33, d: 0.35, chord: null },                   // D5
        { f: 523.25, d: 0.28, chord: null },                   // C5
        { f: 493.88, d: 0.28, chord: null },                   // B4
        { f: 440.00, d: 0.35, chord: null },                   // A4
        { f: 392.00, d: 1.25, chord: [196, 246.94, 293.66, 392] } // G4 (Final cálido)
      ];

      let t = this.ctx.currentTime + 0.05;
      cabasMelody.forEach(item => {
        if (item.f > 0) {
          // Nota principal (sonido redondo de piano acústico)
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.value = item.f;
          gain.gain.setValueAtTime(0.24, t);
          gain.gain.exponentialRampToValueAtTime(0.001, t + item.d);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(t);
          osc.stop(t + item.d);

          // Armónico sutil
          const osc2 = this.ctx.createOscillator();
          const gain2 = this.ctx.createGain();
          osc2.type = 'sine';
          osc2.frequency.value = item.f * 2;
          gain2.gain.setValueAtTime(0.06, t);
          gain2.gain.exponentialRampToValueAtTime(0.001, t + item.d * 0.7);
          osc2.connect(gain2);
          gain2.connect(this.ctx.destination);
          osc2.start(t);
          osc2.stop(t + item.d);
        }

        // Si hay acorde de acompañamiento
        if (item.chord) {
          item.chord.forEach(cFreq => {
            const oscC = this.ctx.createOscillator();
            const gainC = this.ctx.createGain();
            oscC.type = 'sine';
            oscC.frequency.value = cFreq;
            gainC.gain.setValueAtTime(0.12, t);
            gainC.gain.exponentialRampToValueAtTime(0.001, t + 1.2);
            oscC.connect(gainC);
            gainC.connect(this.ctx.destination);
            oscC.start(t);
            oscC.stop(t + 1.25);
          });
        }

        t += item.d;
      });
    } catch(e){}
  }
}

const audio = new StudioAudioEngine();

// REPRODUCCIÓN INTELIGENTE: Archivo Real HD (16/24-bit) con Fallback a Sintetizador
function playVignetteSong(stageId) {
  audio.stopAll();

  if (stageId === 1) {
    const el1 = document.getElementById('audioVignette1');
    if (el1 && el1.src && el1.duration > 0) {
      audio.currentPlayingAudio = el1;
      el1.currentTime = 0;
      el1.play().catch(() => audio.playCabasIncreibleSynth());
    } else {
      audio.playCabasIncreibleSynth();
    }
  } else if (stageId === 2) {
    const el2 = document.getElementById('audioVignette2');
    if (el2) {
      audio.currentPlayingAudio = el2;
      el2.currentTime = 0;
      el2.play().catch(e => console.warn("Error reproduciendo audio 2:", e));
    }
  } else if (stageId === 3) {
    playLoveSong();
  }
}

// ============================================================
// CÁLCULO DE FECHAS Y CONTADORES EN TIEMPO REAL
// ============================================================
function getStageReleaseTimestamp(stageId) {
  if (simulationMode === "ALL") return Date.now() - 1000;
  if (simulationMode === "3" && stageId === 1) return Date.now() - 1000;
  if (simulationMode === "5" && stageId <= 2) return Date.now() - 1000;
  if (simulationMode === "6") return Date.now() - 1000;

  // Fechas: Miércoles 28 Oct, Viernes 30 Oct, Sábado 31 Oct
  const targets = {
    1: new Date("2026-10-28T00:00:00").getTime(),
    2: new Date("2026-10-30T00:00:00").getTime(),
    3: new Date("2026-10-31T00:00:00").getTime()
  };

  return targets[stageId] || (Date.now() - 1000);
}

function updateCountdowns() {
  for (let i = 1; i <= 3; i++) {
    const digitsEl = document.getElementById(`stageCountdownDigits${i}`);
    const pinBtn = document.getElementById(`pinBtn${i}`);
    if (!digitsEl) continue;

    const targetTime = getStageReleaseTimestamp(i);
    const diff = targetTime - Date.now();

    if (diff <= 0) {
      digitsEl.textContent = "✨ ¡YA DISPONIBLE!";
      digitsEl.classList.add("available");
      if (pinBtn) {
        pinBtn.disabled = false;
        pinBtn.style.opacity = "1";
      }
    } else {
      digitsEl.classList.remove("available");
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      digitsEl.textContent = `${days}d ${hours.toString().padStart(2, '0')}h ${minutes.toString().padStart(2, '0')}m ${seconds.toString().padStart(2, '0')}s`;
    }
  }
}

// ============================================================
// BLOQUEO REAL DE 30 MINUTOS POR RESPUESTA INCORRECTA
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
// TECLADO PIN DE 6 DÍGITOS PARA CADA REGALO
// ============================================================
function openPinModal(stageId) {
  audio.playBeep();
  if (checkActiveLockout()) return;

  currentActiveRetoId = stageId;
  currentPinInput = "";
  updatePinDisplay();

  const req = DAY_REQUIREMENTS[stageId];
  const targetTime = getStageReleaseTimestamp(stageId);
  const isAvailable = (targetTime - Date.now()) <= 0;

  const titleEl = document.getElementById('pinModalTitle');
  const noticeEl = document.getElementById('pinModalDayNotice');
  const errorEl = document.getElementById('pinModalError');

  titleEl.textContent = `Código del Regalo #${stageId} 🎁`;
  errorEl.textContent = "";

  if (isAvailable) {
    noticeEl.innerHTML = `<span style="color:#06d6a0;">✅ ¡Disponible hoy (${req.name})!</span>`;
  } else {
    noticeEl.innerHTML = `<span style="color:#ffd166;">⏳ Se habilita el día <strong>${req.name}</strong></span>`;
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
  const req = DAY_REQUIREMENTS[currentActiveRetoId];

  if (diff > 0) {
    audio.playBeep();
    errorEl.innerHTML = `<span style="color:#ffd166">¡Código correcto! Pero este reto se activa el <strong>${req.name}</strong>. ¡Paciencia, pequeña impaciente! ❤️</span>`;
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
  document.getElementById('modalRetoTitle').textContent = reto.title;
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
    feedback.innerHTML = `<span style="color:#2e7d32; font-weight:700;">🎉 ¡ACERTASTE! Desbloqueando viñeta y canción...</span>`;
    
    triggerHeartsConfetti();
    unlockedPanels[retoId] = true;
    saveProgressState();

    // Reproducir la canción 8-bit de esa viñeta
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
// CLÍMAX FINAL: SÍ ACEPTO + MÚSICA "YOU & ME" + CONFETI
// ============================================================
function playLoveSong() {
  audio.stopAll();
  const externalAudio = document.getElementById('externalLoveSong') || document.getElementById('audioVignette3');
  if (externalAudio) {
    audio.currentPlayingAudio = externalAudio;
    externalAudio.currentTime = 0;
    externalAudio.play().catch(e => {
      console.warn("Fallback to synth:", e);
      audio.playCabasIncreibleSynth();
    });
  }
}

function acceptProposalFinal() {
  playLoveSong();
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

function previewSong(trackNum) {
  playVignetteSong(trackNum);
}

// Confeti de corazones
function triggerHeartsConfetti() {
  if (typeof confetti === 'function') {
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff3366', '#ff758f', '#ffd166', '#06d6a0']
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
        colors: ['#ff3366', '#ff758f', '#ffd166', '#ffffff']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 60,
        origin: { x: 1 },
        colors: ['#ff3366', '#ff758f', '#ffd166', '#ffffff']
      });
      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  }
}

// ============================================================
// ACTUALIZACIÓN DE INTERFAZ Y PANELES
// ============================================================
function updatePanelsUI() {
  let unlockedCount = 0;

  for (let i = 1; i <= 3; i++) {
    const isUnlocked = unlockedPanels[i];
    const overlay = document.getElementById(`panelOverlay${i}`);
    const step = document.getElementById(`stepIndicator${i}`);

    if (isUnlocked) {
      unlockedCount++;
      if (overlay) overlay.style.display = 'none';
      if (step) {
        step.classList.add('unlocked');
        step.classList.remove('active');
        step.innerHTML = `<span>Viñeta #${i}</span><span style="color:#2e7d32">✅ Lista</span>`;
      }
    } else {
      if (overlay) overlay.style.display = 'flex';
      if (step) {
        step.classList.remove('unlocked');
        if (i === unlockedCount + 1) {
          step.classList.add('active');
          step.innerHTML = `<span>Viñeta #${i}</span><span style="color:#ff3366">✨ Siguiente</span>`;
        } else {
          step.classList.remove('active');
          step.innerHTML = `<span>Viñeta #${i}</span><span>🔒 Bloqueada</span>`;
        }
      }
    }
  }

  const percent = Math.round((unlockedCount / 3) * 100);
  const bar = document.getElementById('progressBarInner');
  const countText = document.getElementById('progressCountText');
  if (bar) bar.style.width = `${percent}%`;
  if (countText) countText.textContent = `${unlockedCount} de 3 Capítulos`;

  const proposalSection = document.getElementById('finalProposalSection');
  if (unlockedCount === 3) {
    if (proposalSection) proposalSection.classList.add('revealed');
  }

  updateCountdowns();
}

// Guardar y Cargar Estado
function loadProgressState() {
  try {
    const saved = localStorage.getItem('propuesta_pixel_unlocked');
    if (saved) unlockedPanels = JSON.parse(saved);

    const savedCodes = localStorage.getItem('propuesta_gift_codes');
    if (savedCodes) giftCodes = JSON.parse(savedCodes);

    const savedSim = localStorage.getItem('propuesta_simulation_mode');
    if (savedSim) simulationMode = savedSim;
  } catch(e){}
}

function saveProgressState() {
  try {
    localStorage.setItem('propuesta_pixel_unlocked', JSON.stringify(unlockedPanels));
  } catch(e){}
}

// ============================================================
// PANEL DEL CREADOR / MODO PRUEBAS
// ============================================================
function openCreatorModal() {
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
    localStorage.removeItem('propuesta_pixel_unlocked');
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
  updatePanelsUI();

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
