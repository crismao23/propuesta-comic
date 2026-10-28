/* ============================================================
   LÓGICA INTERACTIVA - NUESTRA HISTORIA EN PIXEL ART ❤️
   Personalizada con códigos de 6 dígitos, días y penalización
   ============================================================ */

// CÓDIGOS DE 6 DÍGITOS PARA CADA REGALO (Configurables)
const DEFAULT_CODES = {
  1: "140921", // Regalo 1 (Miércoles)
  2: "280419", // Regalo 2 (Viernes)
  3: "739105"  // Regalo 3 (Sábado)
};

// DÍAS REQUERIDOS (0 = Domingo, 1 = Lunes, ..., 3 = Miércoles, 5 = Viernes, 6 = Sábado)
const DAY_REQUIREMENTS = {
  1: { dayIndex: 3, name: "Miércoles" },
  2: { dayIndex: 5, name: "Viernes" },
  3: { dayIndex: 6, name: "Sábado" }
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
    storyText: "En esa segunda salida la conexión fue mágica e inevitable. Entre tanta charla profunda sobre la vida y la tensión de no tumbar el Jenga, supimos quién era la llorona oficial de la relación.",
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
    badge: "CAPÍTULO 3",
    dayLabel: "Sábado",
    title: "La radio agropecuaria y el primer beso 📻",
    storyTitle: "Capítulo 3: Nuestro Primer Beso",
    storyText: "En el carro de noche, con la música agropecuaria de fondo. Te quedaste profunda de sueño, pero al abrir los ojos, el universo conspiró para sellar nuestro primer beso.",
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
let simulationMode = "ALL"; // "ALL" = Pruebas (Todo libre), "REAL" = Días reales, o "3","5","6"
let currentPinInput = "";
let currentActiveRetoId = null;
let noButtonDodgeCount = 0;
let lockoutIntervalId = null;

// ============================================================
// SISTEMA DE AUDIO CHIPTUNE (8-BIT "YOU & ME") & SFX RETRO
// ============================================================
class ChiptuneAudio {
  constructor() {
    this.ctx = null;
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

  playSuccess() {
    try {
      this.init();
      // Fanfarria pixel retro estilo subida de nivel
      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'square';
        osc.frequency.value = freq;
        const start = this.ctx.currentTime + (i * 0.09);
        gain.gain.setValueAtTime(0.18, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.18);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(start);
        osc.stop(start + 0.2);
      });
    } catch(e){}
  }

  playErrorBuzz() {
    try {
      this.init();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(150, this.ctx.currentTime);
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
      osc.frequency.setValueAtTime(600, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.12);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.13);
    } catch(e){}
  }

  // Fragmento Chiptune 8-bit / 2-bit de "You and Me"
  playYouAndMeChiptune() {
    try {
      this.init();
      // Melodía romántica retro 8-bit
      const melody = [
        { f: 659.25, d: 0.28 }, // E5 (You...)
        { f: 587.33, d: 0.28 }, // D5
        { f: 523.25, d: 0.5 },  // C5 (...and me)
        { f: 0,      d: 0.15 }, // pausa
        { f: 523.25, d: 0.25 }, // C5
        { f: 659.25, d: 0.25 }, // E5
        { f: 783.99, d: 0.55 }, // G5 (always...)
        { f: 659.25, d: 0.3 },  // E5
        { f: 880.00, d: 0.4 },  // A5 (together)
        { f: 783.99, d: 0.6 },  // G5
        { f: 1046.50, d: 0.8 }  // C6 (final feliz)
      ];

      let now = this.ctx.currentTime;
      melody.forEach(item => {
        if (item.f > 0) {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'square';
          osc.frequency.value = item.f;
          gain.gain.setValueAtTime(0.2, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + item.d);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(now);
          osc.stop(now + item.d);
        }
        now += item.d;
      });
    } catch(e){}
  }
}

const audio = new ChiptuneAudio();

// ============================================================
// BLOQUEO REAL DE 30 MINUTOS POR RESPUESTA INCORRECTA
// ============================================================
function activateLockoutPenalty() {
  audio.playErrorBuzz();
  // 30 minutos a partir de ahora
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
    // Ya expiró
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
// COMPROBACIÓN DE DÍAS Y MODO SIMULACIÓN
// ============================================================
function isStageDayAvailable(stageId) {
  // En modo simulación "ALL", todo está habilitado
  if (simulationMode === "ALL") return true;

  // Si se está simulando un día específico
  let currentDay = new Date().getDay();
  if (simulationMode === "3") currentDay = 3; // Miércoles
  else if (simulationMode === "5") currentDay = 5; // Viernes
  else if (simulationMode === "6") currentDay = 6; // Sábado

  // Días de requisitos:
  // Etapa 1: Miércoles (3), Jueves (4), Viernes (5), Sábado (6)
  // Etapa 2: Viernes (5), Sábado (6)
  // Etapa 3: Sábado (6)
  if (stageId === 1) {
    return currentDay >= 3;
  } else if (stageId === 2) {
    return currentDay >= 5;
  } else if (stageId === 3) {
    return currentDay >= 6;
  }
  return false;
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
  const isAvailable = isStageDayAvailable(stageId);

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

  // Si se completaron los 6 dígitos, verificar automáticamente
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
    // Sacudir cajas
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

  // Código correcto: verificar si ya es el día
  const isAvailable = isStageDayAvailable(currentActiveRetoId);
  const req = DAY_REQUIREMENTS[currentActiveRetoId];

  if (!isAvailable) {
    audio.playBeep();
    errorEl.innerHTML = `<span style="color:#ffd166">¡Código correcto! Pero este reto se activa el día <strong>${req.name}</strong>. ¡Paciencia, pequeña impaciente! ❤️</span>`;
    return;
  }

  // Todo correcto y día habilitado -> Abrir reto
  audio.playSuccess();
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
    audio.playSuccess();
    btnElement.classList.add('correct');
    feedback.innerHTML = `<span style="color:#2e7d32; font-weight:700;">🎉 ¡ACERTASTE! Desbloqueando viñeta...</span>`;
    
    triggerHeartsConfetti();
    unlockedPanels[retoId] = true;
    saveProgressState();

    setTimeout(() => {
      closeQuizModal();
      updatePanelsUI();
      
      const panel = document.getElementById(`panelCard${retoId}`);
      if (panel) {
        panel.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }

      // Si se desbloquearon las 3, mostrar propuesta
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
    // RESPUESTA INCORRECTA: BLOQUEO DE 30 MINUTOS
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
    // Moverse a una posición aleatoria táctil
    const randomX = (Math.random() - 0.5) * 160;
    const randomY = (Math.random() - 0.5) * 80;
    btnNo.style.transform = `translate(${randomX}px, ${randomY}px)`;
    btnNo.textContent = dodgePhrases[noButtonDodgeCount - 1];

    if (noButtonDodgeCount === 3) {
      // Tras el 3er intento, transformarlo en otro botón SÍ
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
// CLÍMAX FINAL: SÍ ACEPTO + 8-BIT "YOU & ME" + CONFETI
// ============================================================
function acceptProposalFinal() {
  audio.playYouAndMeChiptune();
  triggerRomanticConfetti();

  const proposalSec = document.getElementById('finalProposalSection');
  const victorySec = document.getElementById('successScreen');

  if (proposalSec) proposalSec.style.display = 'none';
  if (victorySec) {
    victorySec.classList.add('revealed');
    victorySec.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  // Lluvia de corazones continua
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
    const dayNotice = document.getElementById(`dayNoticeText${i}`);
    const isDayAvail = isStageDayAvailable(i);
    const req = DAY_REQUIREMENTS[i];

    if (dayNotice) {
      if (isDayAvail) {
        dayNotice.textContent = `📅 Habilitado hoy (${req.name})`;
        dayNotice.style.color = '#06d6a0';
      } else {
        dayNotice.textContent = `📅 Se habilita el ${req.name}`;
        dayNotice.style.color = '#ffd166';
      }
    }

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

  // Barra de progreso
  const percent = Math.round((unlockedCount / 3) * 100);
  const bar = document.getElementById('progressBarInner');
  const countText = document.getElementById('progressCountText');
  if (bar) bar.style.width = `${percent}%`;
  if (countText) countText.textContent = `${unlockedCount} de 3 Capítulos`;

  // Revelar sección final si los 3 están desbloqueados
  const proposalSection = document.getElementById('finalProposalSection');
  if (unlockedCount === 3) {
    if (proposalSection) proposalSection.classList.add('revealed');
  }
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
  
  // Rellenar valores en el panel
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
