/* ============================================================
   MOTOR DE MINIJUEGOS 2D PIXEL ART RETRO (CRHIS & MADE)
   ============================================================ */

const PixelSprites = {
  // 1. CRHIS: Peinado de lado, gafitas de marco grueso negro, buso con capota (hoodie), jeans y tenis.
  drawCrhis(ctx, x, y, dir = 'DOWN', walkFrame = 0, withBeers = false) {
    const legOffset = (walkFrame % 2 === 0) ? 0 : ((walkFrame % 4 === 1) ? 2 : -2);
    const isBack = dir.includes('UP');
    const isFacingLeft = dir.includes('LEFT');
    const isFacingRight = dir.includes('RIGHT');
    const isDiagonal = (dir === 'UP_LEFT' || dir === 'UP_RIGHT' || dir === 'DOWN_LEFT' || dir === 'DOWN_RIGHT');

    ctx.save();
    ctx.translate(x, y);

    // Sombra en el suelo
    ctx.fillStyle = 'rgba(0, 0, 0, 0.28)';
    ctx.beginPath();
    ctx.ellipse(0, 18, 9, 4, 0, 0, Math.PI * 2);
    ctx.fill();

    // Piernas / Jeans
    ctx.fillStyle = '#1e293b';
    if (isFacingLeft && !isDiagonal) {
      ctx.fillRect(-3, 11, 4, 6 + legOffset);
      ctx.fillRect(1, 11, 3, 6 - legOffset);
    } else if (isFacingRight && !isDiagonal) {
      ctx.fillRect(-4, 11, 3, 6 - legOffset);
      ctx.fillRect(-1, 11, 4, 6 + legOffset);
    } else {
      ctx.fillRect(-5, 11, 4, 6 + legOffset);
      ctx.fillRect(1, 11, 4, 6 - legOffset);
    }

    // Tenis blancos
    ctx.fillStyle = '#f8fafc';
    if (isFacingLeft && !isDiagonal) {
      ctx.fillRect(-5, 17 + legOffset, 5, 2);
      ctx.fillRect(0, 17 - legOffset, 4, 2);
    } else if (isFacingRight && !isDiagonal) {
      ctx.fillRect(-4, 17 - legOffset, 4, 2);
      ctx.fillRect(0, 17 + legOffset, 5, 2);
    } else {
      ctx.fillRect(-5, 17 + legOffset, 4, 2);
      ctx.fillRect(1, 17 - legOffset, 4, 2);
    }

    // Torso: Buso con capota gris/azulado
    ctx.fillStyle = '#334155';
    ctx.fillRect(-6, -2, 12, 13);
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(-6, 10, 12, 1);

    if (isBack) {
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(-5, -3, 10, 6);
      ctx.fillStyle = '#475569';
      ctx.fillRect(-3, -2, 6, 2);
    } else {
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(-3, -1, 1, 5);
      ctx.fillRect(2, -1, 1, 5);
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(-4, 5, 8, 4);
    }

    // Brazos / Cervezas
    if (withBeers) {
      ctx.fillStyle = '#fed7aa';
      ctx.fillRect(-10, -11, 3, 12);
      ctx.fillRect(7, -11, 3, 12);

      // Cerveza Izquierda
      ctx.fillStyle = '#f59e0b';
      ctx.fillRect(-13, -21, 8, 10);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(-14, -24, 10, 3);
      ctx.fillStyle = '#ca8a04';
      ctx.fillRect(-13, -11, 8, 1);

      // Cerveza Derecha
      ctx.fillStyle = '#f59e0b';
      ctx.fillRect(5, -21, 8, 10);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(4, -24, 10, 3);
      ctx.fillStyle = '#ca8a04';
      ctx.fillRect(5, -11, 8, 1);
    } else {
      ctx.fillStyle = '#334155';
      if (isFacingLeft) ctx.fillRect(-7, -1, 3, 9);
      else if (isFacingRight) ctx.fillRect(4, -1, 3, 9);
      else {
        ctx.fillRect(-8, -1, 3, 9);
        ctx.fillRect(5, -1, 3, 9);
      }
    }

    // Cabeza
    ctx.fillStyle = '#fed7aa';
    ctx.fillRect(-5, -14, 10, 12);

    // Cabello peinado de lado
    ctx.fillStyle = '#18181b';
    ctx.fillRect(-6, -17, 12, 6);
    ctx.fillStyle = '#3f3f46';
    ctx.fillRect(-3, -16, 5, 1);

    if (isBack) {
      ctx.fillStyle = '#18181b';
      ctx.fillRect(-6, -15, 12, 6);
      ctx.fillRect(-5, -9, 10, 2);
    } else if (dir === 'LEFT' || dir === 'UP_LEFT') {
      ctx.fillStyle = '#18181b';
      ctx.fillRect(-6, -14, 4, 5);
      ctx.fillRect(-4, -16, 6, 3);
    } else if (dir === 'RIGHT' || dir === 'UP_RIGHT') {
      ctx.fillStyle = '#18181b';
      ctx.fillRect(2, -14, 5, 5);
      ctx.fillRect(-2, -13, 7, 3);
    } else {
      ctx.fillStyle = '#18181b';
      ctx.fillRect(-6, -13, 3, 4);
      ctx.fillRect(0, -13, 6, 3);
    }

    // Gafitas y rostro
    if (!isBack) {
      if (dir === 'LEFT' || dir === 'DOWN_LEFT') {
        ctx.fillStyle = '#000000';
        ctx.fillRect(-5, -10, 4, 4);
        ctx.fillStyle = '#38bdf8';
        ctx.fillRect(-4, -9, 2, 2);
        ctx.fillStyle = '#e11d48';
        ctx.fillRect(-3, -4, 2, 1);
      } else if (dir === 'RIGHT' || dir === 'DOWN_RIGHT') {
        ctx.fillStyle = '#000000';
        ctx.fillRect(1, -10, 4, 4);
        ctx.fillStyle = '#38bdf8';
        ctx.fillRect(2, -9, 2, 2);
        ctx.fillStyle = '#e11d48';
        ctx.fillRect(1, -4, 2, 1);
      } else {
        ctx.fillStyle = '#000000';
        ctx.fillRect(-5, -10, 4, 4);
        ctx.fillRect(1, -10, 4, 4);
        ctx.fillRect(-1, -9, 2, 1);
        ctx.fillStyle = '#38bdf8';
        ctx.fillRect(-4, -9, 2, 2);
        ctx.fillRect(2, -9, 2, 2);
        ctx.fillStyle = '#e11d48';
        ctx.fillRect(-2, -4, 4, 1);
      }
    }

    ctx.restore();
  },

  // 2. MADE: Cabello negro largo, aretes de aro dorados, vestidito celeste campesino.
  drawMade(ctx, x, y, dir = 'DOWN', walkFrame = 0) {
    const legOffset = (walkFrame % 2 === 0) ? 0 : ((walkFrame % 4 === 1) ? 2 : -2);
    const isBack = dir.includes('UP');
    const isFacingLeft = dir.includes('LEFT');
    const isFacingRight = dir.includes('RIGHT');

    ctx.save();
    ctx.translate(x, y);

    // Sombra
    ctx.fillStyle = 'rgba(0, 0, 0, 0.28)';
    ctx.beginPath();
    ctx.ellipse(0, 18, 8, 4, 0, 0, Math.PI * 2);
    ctx.fill();

    // Piernas y zapatos
    ctx.fillStyle = '#fed7aa';
    ctx.fillRect(-4, 12, 3, 5 + legOffset);
    ctx.fillRect(1, 12, 3, 5 - legOffset);
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(-4, 17 + legOffset, 3, 2);
    ctx.fillRect(1, 17 - legOffset, 3, 2);

    // Vestido celeste
    ctx.fillStyle = '#7dd3fc';
    ctx.fillRect(-6, -1, 12, 10);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(-6, -2, 12, 2);
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(-8, 8, 16, 5);

    // Brazos
    ctx.fillStyle = '#fed7aa';
    if (isFacingLeft) ctx.fillRect(-7, 0, 2, 8);
    else if (isFacingRight) ctx.fillRect(5, 0, 2, 8);
    else {
      ctx.fillRect(-8, 0, 2, 8);
      ctx.fillRect(6, 0, 2, 8);
    }

    // Cabeza
    ctx.fillStyle = '#fed7aa';
    ctx.fillRect(-5, -14, 10, 12);

    // Cabello negro largo
    ctx.fillStyle = '#111827';
    ctx.fillRect(-6, -17, 12, 6);

    if (isBack) {
      ctx.fillStyle = '#111827';
      ctx.fillRect(-7, -14, 14, 15);
      ctx.fillStyle = '#1f2937';
      ctx.fillRect(-4, -10, 8, 2);
    } else {
      ctx.fillRect(-8, -13, 3, 14);
      ctx.fillRect(5, -13, 3, 14);

      // Aretes dorados
      ctx.fillStyle = '#facc15';
      if (!isFacingRight) ctx.fillRect(-7, -7, 2, 3);
      if (!isFacingLeft) ctx.fillRect(5, -7, 2, 3);

      if (isFacingLeft) {
        ctx.fillStyle = '#111827';
        ctx.fillRect(-4, -8, 2, 3);
        ctx.fillStyle = '#f43f5e';
        ctx.fillRect(-3, -3, 2, 1);
      } else if (isFacingRight) {
        ctx.fillStyle = '#111827';
        ctx.fillRect(2, -8, 2, 3);
        ctx.fillStyle = '#f43f5e';
        ctx.fillRect(1, -3, 2, 1);
      } else {
        ctx.fillStyle = '#111827';
        ctx.fillRect(-4, -8, 2, 3);
        ctx.fillRect(2, -8, 2, 3);
        ctx.fillStyle = '#f43f5e';
        ctx.fillRect(-1, -3, 2, 1);
      }
    }

    ctx.restore();
  },

  // 3. ANIMACIÓN DE BESO EN PIXEL ART (CRHIS Y MADE BESÁNDOSE CON CORAZONES)
  drawKissingCouple(ctx, x, y, animFrame = 0, withBeers = false) {
    const bob = Math.sin(animFrame * 0.2) * 1.5;
    ctx.save();
    ctx.translate(x, y + bob);

    ctx.fillStyle = 'rgba(0, 0, 0, 0.32)';
    ctx.beginPath();
    ctx.ellipse(0, 18, 16, 5, 0, 0, Math.PI * 2);
    ctx.fill();

    // Crhis
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(-11, 11, 4, 7);
    ctx.fillRect(-6, 11, 4, 7);
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(-12, 17, 5, 2);
    ctx.fillRect(-6, 17, 5, 2);

    ctx.fillStyle = '#334155';
    ctx.fillRect(-12, -2, 12, 13);
    ctx.fillStyle = '#334155';
    ctx.fillRect(-4, 3, 8, 3);
    ctx.fillStyle = '#fed7aa';
    ctx.fillRect(4, 3, 3, 3);

    if (withBeers) {
      ctx.fillStyle = '#f59e0b';
      ctx.fillRect(-17, -9, 6, 8);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(-18, -12, 8, 3);
    }

    ctx.fillStyle = '#fed7aa';
    ctx.fillRect(-10, -14, 10, 12);
    ctx.fillStyle = '#18181b';
    ctx.fillRect(-11, -17, 11, 6);
    ctx.fillRect(-5, -14, 6, 3);
    ctx.fillStyle = '#000000';
    ctx.fillRect(-3, -10, 3, 4);
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(-2, -9, 2, 2);
    ctx.fillStyle = '#f43f5e';
    ctx.fillRect(-4, -5, 3, 2);

    // Made
    ctx.fillStyle = '#fed7aa';
    ctx.fillRect(2, 12, 3, 6);
    ctx.fillRect(7, 12, 3, 6);
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(2, 17, 4, 2);
    ctx.fillRect(7, 17, 4, 2);

    ctx.fillStyle = '#7dd3fc';
    ctx.fillRect(-1, -1, 12, 10);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(-1, -2, 12, 2);
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(-1, 8, 14, 5);

    ctx.fillStyle = '#fed7aa';
    ctx.fillRect(-4, 0, 7, 3);

    if (withBeers) {
      ctx.fillStyle = '#f59e0b';
      ctx.fillRect(11, -9, 6, 8);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(10, -12, 8, 3);
    }

    ctx.fillStyle = '#fed7aa';
    ctx.fillRect(0, -14, 10, 12);
    ctx.fillStyle = '#111827';
    ctx.fillRect(1, -17, 10, 6);
    ctx.fillRect(5, -13, 6, 16);
    ctx.fillStyle = '#facc15';
    ctx.fillRect(6, -8, 2, 3);
    ctx.fillStyle = '#f43f5e';
    ctx.fillRect(1, -5, 3, 2);

    // Labios juntos
    ctx.fillStyle = '#e11d48';
    ctx.fillRect(-1, -6, 2, 2);

    // Corazones
    const floatY = (animFrame * 2) % 40;
    ctx.font = '13px sans-serif';
    ctx.fillText('💋', -6, -18);
    ctx.fillText('❤️', -16, -20 - (floatY * 0.4));
    ctx.fillText('💖', 8, -24 - (floatY * 0.5));
    ctx.fillText('✨', -3, -34 - (floatY * 0.3));

    ctx.restore();
  },

  drawPunkCresta(ctx, x, y, animFrame = 0, withBeer = true) {
    const sway = Math.sin(animFrame * 0.2) * 2;
    ctx.save();
    ctx.translate(x, y);

    ctx.fillStyle = '#09090b';
    ctx.fillRect(-6, -1, 12, 13);
    ctx.fillStyle = '#cbd5e1';
    ctx.fillRect(-5, 1, 1, 1);
    ctx.fillRect(4, 1, 1, 1);

    ctx.fillStyle = '#fed7aa';
    ctx.fillRect(-5, -13, 10, 11);
    ctx.fillStyle = '#27272a';
    ctx.fillRect(-6, -13, 2, 6);
    ctx.fillRect(4, -13, 2, 6);

    ctx.fillStyle = '#f43f5e';
    ctx.fillRect(-2 + sway * 0.3, -22, 4, 11);
    ctx.fillRect(-1 + sway * 0.3, -24, 2, 3);

    ctx.fillStyle = '#000';
    ctx.fillRect(-3, -8, 2, 2);
    ctx.fillRect(1, -8, 2, 2);

    if (withBeer) {
      ctx.fillStyle = '#f59e0b';
      ctx.fillRect(7, sway, 6, 8);
      ctx.fillStyle = '#fff';
      ctx.fillRect(6, -2 + sway, 8, 3);
    }

    ctx.fillStyle = '#1e293b';
    ctx.fillRect(-4, 12, 3, 6);
    ctx.fillRect(1, 12, 3, 6);
    ctx.restore();
  },

  drawMelenudo(ctx, x, y, animFrame = 0, withBeer = true) {
    const sway = Math.sin(animFrame * 0.18) * 2;
    ctx.save();
    ctx.translate(x, y);

    ctx.fillStyle = '#18181b';
    ctx.fillRect(-6, -1, 12, 13);
    ctx.fillStyle = '#dc2626';
    ctx.fillRect(-3, 3, 6, 4);

    ctx.fillStyle = '#fed7aa';
    ctx.fillRect(-5, -13, 10, 11);

    ctx.fillStyle = '#1c1917';
    ctx.fillRect(-7, -16, 14, 6);
    ctx.fillRect(-8 + sway * 0.4, -12, 4, 16);
    ctx.fillRect(4 - sway * 0.4, -12, 4, 16);

    ctx.fillStyle = '#000';
    ctx.fillRect(-3, -8, 2, 2);
    ctx.fillRect(1, -8, 2, 2);

    if (withBeer) {
      ctx.fillStyle = '#f59e0b';
      ctx.fillRect(-12, sway, 6, 8);
      ctx.fillStyle = '#fff';
      ctx.fillRect(-13, -2 + sway, 8, 3);
    }

    ctx.fillStyle = '#0f172a';
    ctx.fillRect(-4, 12, 3, 6);
    ctx.fillRect(1, 12, 3, 6);
    ctx.restore();
  },

  drawPeloRojo(ctx, x, y, animFrame = 0, withBeer = true) {
    const sway = Math.sin(animFrame * 0.22) * 2;
    ctx.save();
    ctx.translate(x, y);

    ctx.fillStyle = '#881337';
    ctx.fillRect(-5, -1, 10, 12);
    ctx.fillStyle = '#000000';
    ctx.fillRect(-1, 1, 2, 8);

    ctx.fillStyle = '#fed7aa';
    ctx.fillRect(-5, -13, 10, 11);

    ctx.fillStyle = '#ea580c';
    ctx.fillRect(-7, -16, 14, 6);
    ctx.fillRect(-8 + sway * 0.3, -12, 3, 15);
    ctx.fillRect(5 - sway * 0.3, -12, 3, 15);

    ctx.fillStyle = '#000';
    ctx.fillRect(-3, -8, 2, 2);
    ctx.fillRect(1, -8, 2, 2);
    ctx.fillRect(-4, -2, 8, 1);

    if (withBeer) {
      ctx.fillStyle = '#f59e0b';
      ctx.fillRect(6, sway, 5, 7);
      ctx.fillStyle = '#fff';
      ctx.fillRect(5, -2 + sway, 7, 3);
    }

    ctx.fillStyle = '#0f172a';
    ctx.fillRect(-6, 10, 12, 5);
    ctx.fillRect(-4, 15, 3, 4);
    ctx.fillRect(1, 15, 3, 4);
    ctx.restore();
  },

  drawPeloVioleta(ctx, x, y, animFrame = 0, withBeer = true) {
    const sway = Math.sin(animFrame * 0.2) * 2;
    ctx.save();
    ctx.translate(x, y);

    ctx.fillStyle = '#1e1b4b';
    ctx.fillRect(-5, -1, 10, 12);
    ctx.fillStyle = '#2563eb';
    ctx.fillRect(-6, -1, 3, 10);
    ctx.fillRect(3, -1, 3, 10);

    ctx.fillStyle = '#fed7aa';
    ctx.fillRect(-5, -13, 10, 11);

    ctx.fillStyle = '#a855f7';
    ctx.fillRect(-7, -16, 14, 6);
    ctx.fillRect(-8 + sway * 0.4, -12, 3, 14);
    ctx.fillRect(5 - sway * 0.4, -12, 3, 14);
    ctx.fillStyle = '#c084fc';
    ctx.fillRect(-2, -15, 4, 2);

    ctx.fillStyle = '#000';
    ctx.fillRect(-3, -8, 2, 2);
    ctx.fillRect(1, -8, 2, 2);

    if (withBeer) {
      ctx.fillStyle = '#f59e0b';
      ctx.fillRect(-11, sway, 5, 7);
      ctx.fillStyle = '#fff';
      ctx.fillRect(-12, -2 + sway, 7, 3);
    }

    ctx.fillStyle = '#1e293b';
    ctx.fillRect(-4, 12, 3, 6);
    ctx.fillRect(1, 12, 3, 6);
    ctx.restore();
  },

  drawMargaritaFan(ctx, x, y, animFrame = 0, variant = 0) {
    const sway = Math.sin(animFrame * 0.2 + variant) * 2;
    ctx.save();
    ctx.translate(x, y);

    const shirtColors = ['#1e293b', '#334155', '#0f172a', '#475569'];
    ctx.fillStyle = shirtColors[variant % 4];
    ctx.fillRect(-5, -1, 10, 12);

    ctx.fillStyle = '#fed7aa';
    ctx.fillRect(-5, -13, 10, 11);

    // Cabello 100% negro
    ctx.fillStyle = '#0f172a';
    if (variant === 0) {
      ctx.fillRect(-6, -17, 12, 6);
      ctx.fillRect(-7 + sway * 0.2, -14, 3, 7);
      ctx.fillRect(4 - sway * 0.2, -14, 3, 7);
    } else if (variant === 1) {
      ctx.fillRect(-7, -17, 14, 6);
      ctx.fillRect(-8 + sway * 0.4, -13, 4, 15);
      ctx.fillRect(4 - sway * 0.4, -13, 4, 15);
    } else if (variant === 2) {
      ctx.fillRect(-6, -17, 12, 6);
      ctx.fillRect(-6, -12, 12, 3);
      ctx.fillRect(-7 + sway * 0.3, -12, 3, 14);
      ctx.fillRect(4 - sway * 0.3, -12, 3, 14);
    } else {
      ctx.fillRect(-7, -18, 14, 8);
      ctx.fillRect(-8, -15, 3, 8);
      ctx.fillRect(5, -15, 3, 8);
    }

    ctx.fillStyle = '#000';
    ctx.fillRect(-3, -8, 2, 2);
    ctx.fillRect(1, -8, 2, 2);

    ctx.fillStyle = '#1e293b';
    ctx.fillRect(-4, 11, 3, 6);
    ctx.fillRect(1, 11, 3, 6);

    ctx.restore();
  }
};

// ============================================================
// GESTOR DE MINIJUEGOS
// ============================================================
class MinijuegosManager {
  constructor() {
    this.canvas = document.getElementById('gameCanvas');
    this.ctx = this.canvas.getContext('2d');
    
    this.width = 320;
    this.height = 426;
    this.canvas.width = this.width;
    this.canvas.height = this.height;

    this.currentLevel = 1;
    this.gameState = 'INTRO';
    this.lastTime = 0;
    this.animationFrameId = null;
    this.walkCycle = 0;

    this.keys = {
      left: false,
      right: false,
      up: false,
      down: false,
      action: false,
      walk: false
    };

    this.audioKraken = new Audio('audio/kraken.mp3');
    this.audioMargarita = new Audio('audio/margarita.mp3');
    this.currentActiveAudio = null;

    // Web Audio Context y sintetizadores 8-bit para Nivel 1 (Tráfico/Carros) y Nivel 2 (Museo del Oro)
    this.audioCtx = null;
    this.trafficAudioNodes = null;
    this.trafficHornTimer = null;
    this.museumAudioTimer = null;

    // Logos oficiales precargados para los escenarios de concierto
    this.logoKraken = new Image();
    this.logoKraken.src = 'images/logo_kraken.png';
    this.logoMargarita = new Image();
    this.logoMargarita.src = 'images/logo_margarita.png';

    // Factor de aceleración / velocidad de juego (1.7 = 170% por defecto)
    let initialSpeed = localStorage.getItem('arcade_speed_multiplier');
    if (!initialSpeed || initialSpeed === '1.2' || initialSpeed === '1') {
      initialSpeed = '1.7';
      try { localStorage.setItem('arcade_speed_multiplier', '1.7'); } catch (e) {}
    }
    this.speedMultiplier = parseFloat(initialSpeed || '1.7');

    this.deathData = null;

    this.game1 = null;
    this.game2 = null;
    this.game3 = null;
    this.game4 = null;

    this.initEventListeners();
    this.setupLevel(1);
    this.startLoop();
  }

  setSpeedMultiplier(multiplier) {
    this.speedMultiplier = Math.max(0.6, Math.min(2.5, parseFloat(multiplier) || 1.7));
    try {
      localStorage.setItem('arcade_speed_multiplier', this.speedMultiplier.toString());
    } catch (e) {}
  }

  initEventListeners() {
    window.addEventListener('keydown', (e) => {
      if (['ArrowLeft', 'KeyA'].includes(e.code)) {
        if (!this.keys.left && this.currentLevel === 1) this.handleLaneShift(-1);
        this.keys.left = true;
      }
      if (['ArrowRight', 'KeyD'].includes(e.code)) {
        if (!this.keys.right && this.currentLevel === 1) this.handleLaneShift(1);
        this.keys.right = true;
      }
      if (['ArrowUp', 'KeyW'].includes(e.code)) { this.keys.up = true; this.keys.walk = true; }
      if (['ArrowDown', 'KeyS'].includes(e.code)) this.keys.down = true;
      if (['Space', 'KeyB'].includes(e.code)) this.keys.action = true;
    });

    window.addEventListener('keyup', (e) => {
      if (['ArrowLeft', 'KeyA'].includes(e.code)) this.keys.left = false;
      if (['ArrowRight', 'KeyD'].includes(e.code)) this.keys.right = false;
      if (['ArrowUp', 'KeyW'].includes(e.code)) { this.keys.up = false; this.keys.walk = false; }
      if (['ArrowDown', 'KeyS'].includes(e.code)) this.keys.down = false;
      if (['Space', 'KeyB'].includes(e.code)) this.keys.action = false;
    });

    const bindBtn = (id, onStart, onEnd) => {
      const el = document.getElementById(id);
      if (!el) return;
      const start = (e) => { 
        if (e.cancelable) e.preventDefault(); 
        onStart(); 
        el.classList.add('pressed'); 
      };
      const end = (e) => { 
        if (e.cancelable) e.preventDefault(); 
        onEnd(); 
        el.classList.remove('pressed'); 
      };
      el.addEventListener('touchstart', start, { passive: false });
      el.addEventListener('touchend', end, { passive: false });
      el.addEventListener('touchcancel', end, { passive: false });
      el.addEventListener('mousedown', start);
      el.addEventListener('mouseup', end);
      el.addEventListener('mouseleave', end);
    };

    bindBtn('dpadLeft', 
      () => { if (this.currentLevel === 1) this.handleLaneShift(-1); this.keys.left = true; }, 
      () => { this.keys.left = false; }
    );
    bindBtn('dpadRight', 
      () => { if (this.currentLevel === 1) this.handleLaneShift(1); this.keys.right = true; }, 
      () => { this.keys.right = false; }
    );
    bindBtn('dpadUp', () => { this.keys.up = true; }, () => { this.keys.up = false; });
    bindBtn('dpadDown', () => { this.keys.down = true; }, () => { this.keys.down = false; });

    this.canvas.addEventListener('touchstart', (e) => {
      e.preventDefault();
      const rect = this.canvas.getBoundingClientRect();
      const touch = e.touches[0];
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;

      if (this.currentLevel === 1) {
        if (x < rect.width * 0.5) this.handleLaneShift(-1);
        else this.handleLaneShift(1);
      } else {
        const relX = (x / rect.width) * this.width;
        const relY = (y / rect.height) * this.height;
        let player = null;
        if (this.currentLevel === 2) player = this.game2.player;
        else if (this.currentLevel === 3) player = this.game3.player;
        else if (this.currentLevel === 4) player = this.game4.player;

        if (!player) return;
        if (Math.abs(relX - player.x) > Math.abs(relY - player.y)) {
          if (relX > player.x) this.keys.right = true;
          else this.keys.left = true;
        } else {
          if (relY > player.y) this.keys.down = true;
          else { this.keys.up = true; this.keys.walk = true; }
        }
      }
    }, { passive: false });

    this.canvas.addEventListener('touchend', () => {
      this.keys.left = false;
      this.keys.right = false;
      this.keys.up = false;
      this.keys.down = false;
      this.keys.walk = false;
    });
  }

  handleLaneShift(dir) {
    if (this.currentLevel !== 1 || !this.game1) return;
    const g = this.game1;
    const nextLane = Math.max(0, Math.min(2, g.player.currentLane + dir));
    if (nextLane !== g.player.currentLane) {
      this.play8BitSwerveScreech();
    }
    g.player.currentLane = nextLane;
    g.player.targetX = g.lanes[nextLane];
  }

  initAudioContext() {
    if (!this.audioCtx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.audioCtx = new AudioCtx();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  // ============================================================
  // SONIDO 8-BIT NIVEL 1: MOTORES, TRÁFICO Y BOCINAS DE CARROS
  // ============================================================
  startTrafficAudio() {
    this.stopTrafficAudio();
    this.initAudioContext();
    if (!this.audioCtx) return;

    try {
      const ctx = this.audioCtx;

      // 1. Motor retro 8-bit con zumbido continuo modulado (vroom vroom)
      const engineOsc = ctx.createOscillator();
      const engineGain = ctx.createGain();
      const engineFilter = ctx.createBiquadFilter();

      engineOsc.type = 'sawtooth';
      engineOsc.frequency.setValueAtTime(56, ctx.currentTime);

      engineFilter.type = 'lowpass';
      engineFilter.frequency.setValueAtTime(220, ctx.currentTime);

      // LFO para modular la aceleración del motor
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.setValueAtTime(4.2, ctx.currentTime);
      lfoGain.gain.setValueAtTime(12, ctx.currentTime);
      lfo.connect(engineOsc.frequency);
      lfo.start();

      engineGain.gain.setValueAtTime(0.045, ctx.currentTime);

      engineOsc.connect(engineFilter);
      engineFilter.connect(engineGain);
      engineGain.connect(ctx.destination);
      engineOsc.start();

      // 2. Ruido de asfalto / viento de alta velocidad (ruido blanco filtrado)
      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      const noiseFilter = ctx.createBiquadFilter();
      noiseFilter.type = 'bandpass';
      noiseFilter.frequency.setValueAtTime(320, ctx.currentTime);
      noiseFilter.Q.setValueAtTime(2.2, ctx.currentTime);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.022, ctx.currentTime);

      whiteNoise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(ctx.destination);
      whiteNoise.start();

      this.trafficAudioNodes = {
        engineOsc,
        engineGain,
        lfo,
        whiteNoise,
        noiseGain
      };

      // 3. Bocinas / pitos de carros lejanos cada 3 a 5.5 segundos
      const scheduleHorn = () => {
        const nextTime = 2800 + Math.random() * 3200;
        this.trafficHornTimer = setTimeout(() => {
          if (this.trafficAudioNodes && this.gameState === 'PLAYING' && this.currentLevel === 1) {
            this.play8BitCarHorn();
            scheduleHorn();
          }
        }, nextTime);
      };
      scheduleHorn();
    } catch (e) {
      console.log('Error starting traffic audio:', e);
    }
  }

  play8BitCarHorn() {
    if (!this.audioCtx) return;
    try {
      const ctx = this.audioCtx;
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = 'square';
      osc2.type = 'square';
      // Tono dual de bocina vehicular retro 8-bit (La y Do#)
      osc1.frequency.setValueAtTime(440, ctx.currentTime);
      osc2.frequency.setValueAtTime(554.37, ctx.currentTime);

      gain.gain.setValueAtTime(0.035, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start();
      osc2.start();
      osc1.stop(ctx.currentTime + 0.19);
      osc2.stop(ctx.currentTime + 0.19);
    } catch (e) {}
  }

  play8BitSwerveScreech() {
    if (!this.audioCtx) return;
    try {
      const ctx = this.audioCtx;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(750, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(240, ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.025, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.09);
    } catch (e) {}
  }

  stopTrafficAudio() {
    if (this.trafficHornTimer) {
      clearTimeout(this.trafficHornTimer);
      this.trafficHornTimer = null;
    }
    if (this.trafficAudioNodes) {
      try {
        if (this.trafficAudioNodes.engineOsc) this.trafficAudioNodes.engineOsc.stop();
        if (this.trafficAudioNodes.lfo) this.trafficAudioNodes.lfo.stop();
        if (this.trafficAudioNodes.whiteNoise) this.trafficAudioNodes.whiteNoise.stop();
      } catch (e) {}
      this.trafficAudioNodes = null;
    }
  }

  // ============================================================
  // SONIDO 8-BIT NIVEL 2: AMBIENTE MÍSTICO DEL MUSEO DEL ORO
  // ============================================================
  startMuseumAudio() {
    this.stopMuseumAudio();
    this.initAudioContext();
    if (!this.audioCtx) return;

    try {
      const ctx = this.audioCtx;

      // Melodía mística y atmosférica de campanas de oro en escala pentatónica menor
      // Tonos solemnes y pacíficos 8-bit con eco suave
      const notes = [
        220.00, // A3 (solemne)
        0,
        329.63, // E4
        0,
        440.00, // A4
        0,
        523.25, // C5 (brillo de oro)
        392.00, // G4
        329.63, // E4
        0,
        293.66, // D4
        329.63, // E4
        440.00, // A4
        0,
        659.25, // E5 (destello)
        0
      ];

      let noteIndex = 0;
      const stepDuration = 380; // ms por nota

      const playMuseumStep = () => {
        if (this.gameState !== 'PLAYING' || this.currentLevel !== 2) return;

        const freq = notes[noteIndex];
        noteIndex = (noteIndex + 1) % notes.length;

        if (freq > 0) {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();

          osc.type = 'triangle'; // Tono suave tipo campana o flauta ancestral
          osc.frequency.setValueAtTime(freq, ctx.currentTime);

          // Ataque suave y decaimiento largo tipo eco en salón de museo
          gain.gain.setValueAtTime(0.001, ctx.currentTime);
          gain.gain.linearRampToValueAtTime(0.045, ctx.currentTime + 0.05);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.85);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start();
          osc.stop(ctx.currentTime + 0.90);
        }

        // Cada vuelta completa, añadir un destello cristalino del Poporo
        if (noteIndex === 0) {
          this.playPoporoGoldChime();
        }

        this.museumAudioTimer = setTimeout(playMuseumStep, stepDuration);
      };

      playMuseumStep();
    } catch (e) {
      console.log('Error starting museum audio:', e);
    }
  }

  playPoporoGoldChime() {
    if (!this.audioCtx) return;
    try {
      const ctx = this.audioCtx;
      const chimes = [1318.51, 1760.00]; // Mi6 y La6 cristalinos
      chimes.forEach((f, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, ctx.currentTime + idx * 0.12);

        gain.gain.setValueAtTime(0.001, ctx.currentTime + idx * 0.12);
        gain.gain.linearRampToValueAtTime(0.025, ctx.currentTime + idx * 0.12 + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.12 + 0.7);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + idx * 0.12);
        osc.stop(ctx.currentTime + idx * 0.12 + 0.75);
      });
    } catch (e) {}
  }

  stopMuseumAudio() {
    if (this.museumAudioTimer) {
      clearTimeout(this.museumAudioTimer);
      this.museumAudioTimer = null;
    }
  }

  stopAudio() {
    this.stopTrafficAudio();
    this.stopMuseumAudio();
    if (this.currentActiveAudio) {
      try {
        this.currentActiveAudio.pause();
        this.currentActiveAudio.currentTime = 0;
      } catch(e){}
      this.currentActiveAudio = null;
    }
  }

  stopAllExternalMusic() {
    if (window.audio && typeof window.audio.stopAll === 'function') {
      window.audio.stopAll();
    }
    ['localAudio1', 'localAudio2', 'localAudio3'].forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        try {
          el.pause();
          el.currentTime = 0;
        } catch(e){}
      }
    });
  }

  playLevelAudio(level) {
    this.stopAudio();
    this.stopAllExternalMusic();
    if (level === 1) {
      this.startTrafficAudio();
    } else if (level === 2) {
      this.startMuseumAudio();
    } else if (level === 3) {
      this.currentActiveAudio = this.audioKraken;
      this.audioKraken.currentTime = 120; // Minuto 2:00
      this.audioKraken.volume = 0.15;
      this.audioKraken.play().catch(e => console.log('Audio wait user gesture'));
    } else if (level === 4) {
      this.currentActiveAudio = this.audioMargarita;
      this.audioMargarita.currentTime = 34; // Minuto 0:34
      this.audioMargarita.volume = 0.15;
      this.audioMargarita.play().catch(e => console.log('Audio wait user gesture'));
    }
  }

  updateAudioVolume(progressRatio) {
    if (!this.currentActiveAudio) return;
    const clamped = Math.max(0, Math.min(1, progressRatio));
    const vol = 0.15 + (clamped * 0.85);
    this.currentActiveAudio.volume = Math.min(1.0, Math.max(0.1, vol));
  }

  // Reproduce y mantiene la canción de Margarita Siempre Viva en bucle para la propuesta final
  playMargaritaInLoop() {
    if (!this.audioMargarita) return;
    this.currentActiveAudio = this.audioMargarita;
    this.audioMargarita.loop = true;
    this.audioMargarita.volume = 0.85;

    // Respaldo para repetir en bucle automáticamente en cualquier navegador
    this.audioMargarita.onended = () => {
      this.audioMargarita.currentTime = 0;
      this.audioMargarita.play().catch(e => console.log('Loop margarita error:', e));
    };

    if (this.audioMargarita.paused) {
      this.audioMargarita.play().catch(e => console.log('Play margarita error:', e));
    }
  }

  setupLevel(levelNumber) {
    this.currentLevel = levelNumber;
    this.deathData = null;
    this.stopAudio();
    this.stopAllExternalMusic();

    document.getElementById('hudLevelTag').textContent = `NIVEL ${levelNumber}/4`;

    // Ocultar HUD flotante en los niveles 3 y 4 (conciertos) para no tapar el escenario
    const hudOverlay = document.querySelector('.game-hud-overlay');
    if (hudOverlay) {
      hudOverlay.style.display = (levelNumber >= 3) ? 'none' : 'flex';
    }

    for (let i = 1; i <= 4; i++) {
      const btn = document.getElementById(`devBtnLevel${i}`);
      if (btn) btn.classList.toggle('active', i === levelNumber);
    }

    if (levelNumber === 1) {
      this.initGame1();
      this.showOverlay('intro', '🚗 NIVEL 1: RUMBO A LA TERMINAL', 
        '¡Hora de viajar a Bogotá!<br><br>Primero conduce el inDrive de Crhis hacia la Terminal de Pereira, y luego esquiva el tráfico en el inDrive Moto de Made para encontrarse en la estación antes de abordar el bus.<br><br>👉 <strong>Toca izquierda o derecha</strong> para esquivar los vehículos.', 
        '¡ARRANCAR!');
    } else if (levelNumber === 2) {
      this.initGame2();
      this.showOverlay('intro', '🏺 NIVEL 2: EL POPORO DEL MUSEO DEL ORO', 
        'Guía a los dos enamorados para llegar a ver el <strong>Poporo Quimbaya</strong>.<br><br>🛡️ <strong>El truco:</strong> Detente en las <em>alfombras rojas protegidas</em> para que las flechas y rocas pasen de largo sin tocarlos.<br>¡Avanza con cuidado hasta la meta!', 
        '¡EXPLORAR EL MUSEO!');
    } else if (levelNumber === 3) {
      this.initGame3();
      this.showOverlay('intro', '🍺 NIVEL 3: MISIÓN BBC & KRAKEN', 
        'Lleva las dos cervezas BBC bien frías esquivando a los rockeros para que no se riegue la pola y llega directo hasta la primera fila donde está Made para brindar.', 
        '¡A LLEVAR LA POLA!');
    } else if (levelNumber === 4) {
      this.initGame4();
      this.showOverlay('intro', '🌸 NIVEL 4: EL CONCIERTO DE MARGARITA', 
        '¡Margarita Siempre Viva está tocando en vivo!<br><br>Guía el camino hacia la primera fila pasando a través de las aperturas de las ruedas de slam y esquiva el pogo hasta llegar al frente.', 
        '¡IR A PRIMERA FILA!');
    }
  }

  showOverlay(type, title, desc, btnText) {
    this.gameState = 'INTRO';
    const overlay = document.getElementById('gameOverlay');
    const titleEl = document.getElementById('overlayTitle');
    const descEl = document.getElementById('overlayDesc');
    const btn = document.getElementById('overlayStartBtn');

    titleEl.className = `game-msg-title ${type}`;
    titleEl.innerHTML = title;
    descEl.innerHTML = desc;
    btn.textContent = btnText;

    btn.onclick = () => {
      this.hideOverlay();
      this.startGameplay();
    };

    overlay.classList.remove('hidden');
  }

  hideOverlay() {
    document.getElementById('gameOverlay').classList.add('hidden');
  }

  startGameplay() {
    this.gameState = 'PLAYING';
    this.stopAllExternalMusic();
    this.playLevelAudio(this.currentLevel);
  }

  handleFail(reasonText) {
    this.gameState = 'GAMEOVER';
    this.stopAudio();

    const overlay = document.getElementById('gameOverlay');
    const titleEl = document.getElementById('overlayTitle');
    const descEl = document.getElementById('overlayDesc');
    const btn = document.getElementById('overlayStartBtn');

    titleEl.className = 'game-msg-title fail';
    titleEl.innerHTML = '💥 ¡FALLÓ EL RETO!';
    descEl.innerHTML = `${reasonText}<br><br>Para superar el reto completo, <strong>toca reiniciar desde el Nivel 1</strong>. ¡Ánimo Made, tú puedes! ❤️`;
    btn.textContent = '🔄 REINTENTAR DESDE NIVEL 1';

    btn.onclick = () => {
      this.hideOverlay();
      this.setupLevel(1);
    };

    overlay.classList.remove('hidden');
  }

  // ============================================================
  // EFECTO DE DERROTA TIERNO: DOS FANTASMITAS JUNTITOS CON CORAZÓN
  // ============================================================
  playMarioDeathSound() {
    this.initAudioContext();
    if (!this.audioCtx) return;

    try {
      const ctx = this.audioCtx;
      const now = ctx.currentTime;

      // Jingle retro clásico estilo Mario (NES APU Square Wave)
      // B4 -> pausa breve -> F5 -> F5 -> F5 -> E5 -> D5 -> C5
      const notes = [
        { freq: 493.88, start: 0.00, dur: 0.09 }, // B4
        { freq: 698.46, start: 0.15, dur: 0.11 }, // F5
        { freq: 698.46, start: 0.29, dur: 0.11 }, // F5
        { freq: 698.46, start: 0.43, dur: 0.11 }, // F5
        { freq: 659.25, start: 0.57, dur: 0.12 }, // E5
        { freq: 587.33, start: 0.72, dur: 0.12 }, // D5
        { freq: 523.25, start: 0.87, dur: 0.38 }  // C5
      ];

      notes.forEach(n => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'square';
        osc.frequency.setValueAtTime(n.freq, now + n.start);

        gain.gain.setValueAtTime(0.001, now + n.start);
        gain.gain.linearRampToValueAtTime(0.08, now + n.start + 0.015);
        gain.gain.setValueAtTime(0.07, now + n.start + n.dur - 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + n.start + n.dur);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + n.start);
        osc.stop(now + n.start + n.dur + 0.02);
      });

      // Arpegio dulce de campana/arpa a medida que los fantasmitas ascienden al cielo
      const chimeNotes = [
        { freq: 523.25, start: 0.95, dur: 0.18 }, // C5
        { freq: 659.25, start: 1.10, dur: 0.18 }, // E5
        { freq: 783.99, start: 1.25, dur: 0.18 }, // G5
        { freq: 987.77, start: 1.40, dur: 0.20 }, // B5
        { freq: 1046.50, start: 1.55, dur: 0.45 } // C6
      ];

      chimeNotes.forEach(cn => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(cn.freq, now + cn.start);

        gain.gain.setValueAtTime(0.001, now + cn.start);
        gain.gain.linearRampToValueAtTime(0.045, now + cn.start + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + cn.start + cn.dur);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + cn.start);
        osc.stop(now + cn.start + cn.dur + 0.02);
      });
    } catch (e) {
      console.log('Error playing death sounds:', e);
    }
  }

  triggerDeath(reasonText, deathX, deathY) {
    this.gameState = 'DYING';
    this.stopAudio();
    this.playMarioDeathSound();

    // Crear partículas tiernas de estrellas, brillitos y corazoncitos
    const sparkles = [];
    const colors = ['#f472b6', '#fb7185', '#fde047', '#38bdf8', '#ffffff', '#c084fc'];
    
    for (let i = 0; i < 32; i++) {
      const angle = (Math.PI * 2 * i) / 32 + (Math.random() - 0.5) * 0.4;
      const speed = 0.5 + Math.random() * 1.8;
      sparkles.push({
        x: deathX + (Math.random() - 0.5) * 22,
        y: deathY + (Math.random() - 0.5) * 12,
        vx: Math.cos(angle) * speed * 0.5,
        vy: -0.7 - Math.random() * 1.5, // Flotan hacia arriba
        size: Math.random() < 0.4 ? 3 : (Math.random() < 0.7 ? 2 : 4),
        type: Math.random() < 0.38 ? 'heart' : 'sparkle',
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 0.95,
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: 0.03 + Math.random() * 0.04
      });
    }

    this.deathData = {
      x: deathX,
      y: deathY,
      timer: 0,
      duration: 2300, // 2.3 segundos completos de animación tierna
      reasonText: reasonText,
      sparkles: sparkles,
      level: this.currentLevel,
      subPhase: this.game1 ? this.game1.subPhase : null
    };
  }

  updateDeath(dt) {
    if (!this.deathData) return;
    this.deathData.timer += dt;

    // Actualizar partículas tiernas ascendentes
    this.deathData.sparkles.forEach(p => {
      p.x += p.vx + Math.sin(p.wobble) * 0.45;
      p.y += p.vy;
      p.wobble += p.wobbleSpeed;
      if (this.deathData.timer > 1500) {
        p.alpha = Math.max(0, 1 - (this.deathData.timer - 1500) / 800);
      }
    });

    // Al terminar la animación, mostrar pantalla de reintentar
    if (this.deathData.timer >= this.deathData.duration) {
      const reason = this.deathData.reasonText;
      this.deathData = null;
      this.handleFail(reason);
    }
  }

  drawDeathEffect() {
    if (!this.deathData) return;
    const ctx = this.ctx;
    const d = this.deathData;

    // 1. Dibujar el cuerpo/vehículo en el suelo con efecto de mareo tierno
    if (d.level === 1) {
      if (d.subPhase === 'CRHIS_INDRIVE') {
        this.drawInDriveCar(d.x, d.y);
      } else {
        this.drawMadeInDriveMotorcycle(d.x, d.y);
      }
      // Estrellitas de mareo estilo caricatura sobre el vehículo
      const starTimer = d.timer * 0.008;
      for (let i = 0; i < 3; i++) {
        const ang = starTimer + (i * Math.PI * 2 / 3);
        const sx = d.x + Math.cos(ang) * 14;
        const sy = d.y - 10 + Math.sin(ang) * 5;
        this.drawMiniPixelStar(ctx, sx, sy, '#fde047');
      }
    } else {
      // Nivel 2 (Museo del Oro): Crhis y Made sentaditos dócilmente en el suelo
      PixelSprites.drawCrhis(ctx, d.x - 8, d.y + 4, 'DOWN', 0, false);
      PixelSprites.drawMade(ctx, d.x + 8, d.y + 4, 'DOWN', 0);
      
      // Estrellitas de mareo estilo caricatura girando sobre sus cabezas
      const starTimer = d.timer * 0.008;
      for (let i = 0; i < 3; i++) {
        const ang = starTimer + (i * Math.PI * 2 / 3);
        const sx = d.x + Math.cos(ang) * 16;
        const sy = d.y - 14 + Math.sin(ang) * 5;
        this.drawMiniPixelStar(ctx, sx, sy, '#fde047');
      }
    }

    // 2. Partículas tiernas flotando (corazones y destellos)
    d.sparkles.forEach(p => {
      if (p.alpha <= 0) return;
      ctx.save();
      ctx.globalAlpha = p.alpha;
      if (p.type === 'heart') {
        this.drawMiniPixelHeart(ctx, p.x, p.y, p.color);
      } else {
        this.drawMiniPixelStar(ctx, p.x, p.y, p.color);
      }
      ctx.restore();
    });

    // 3. Dos fantasmitas tiernos ascendiendo juntitos de la mano
    const progress = Math.min(1.0, d.timer / d.duration);
    const riseY = d.y - Math.pow(progress, 0.82) * 115;
    const sway = Math.sin(d.timer * 0.005) * 6;
    const ghostX = d.x + sway;
    const ghostY = riseY;
    const wave = d.timer * 0.009;

    let ghostAlpha = 1.0;
    if (d.timer < 300) {
      ghostAlpha = d.timer / 300; // Desvanecimiento suave al salir del cuerpo
    } else if (d.timer > 1900) {
      ghostAlpha = Math.max(0, 1 - (d.timer - 1900) / 400); // Se elevan hacia las nubes
    }

    ctx.save();
    ctx.globalAlpha = ghostAlpha;

    // Halo celestial cálido alrededor de la pareja
    const grad = ctx.createRadialGradient(ghostX, ghostY, 4, ghostX, ghostY, 32);
    grad.addColorStop(0, 'rgba(255, 255, 255, 0.35)');
    grad.addColorStop(0.6, 'rgba(244, 114, 182, 0.18)');
    grad.addColorStop(1, 'rgba(56, 189, 248, 0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(ghostX, ghostY, 32, 0, Math.PI * 2);
    ctx.fill();

    // Fantasmita Crhis (a la izquierda)
    this.drawTenderGhostCrhis(ctx, ghostX - 9, ghostY, wave);

    // Fantasmita Made (a la derecha)
    this.drawTenderGhostMade(ctx, ghostX + 9, ghostY, wave);

    // Destellito de luz dorada donde sus manitas se tocan en el centro
    ctx.fillStyle = '#fef08a';
    ctx.fillRect(Math.round(ghostX - 1), Math.round(ghostY), 2, 2);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(Math.round(ghostX), Math.round(ghostY), 1, 1);

    // Corazón pixel art tierno latiendo y flotando arriba de sus cabezas
    const heartBeat = 1.0 + Math.sin(d.timer * 0.011) * 0.18;
    const heartFloat = Math.sin(d.timer * 0.007) * 2;
    this.drawTenderPixelHeart(ctx, ghostX, ghostY - 20 + heartFloat, heartBeat);

    ctx.restore();

    // 4. Letrero arcade tierno y romántico
    const bannerAlpha = Math.min(1.0, d.timer / 300);
    ctx.save();
    ctx.globalAlpha = bannerAlpha;

    const bw = 210;
    const bh = 26;
    const bx = (this.width - bw) / 2;
    const by = 34;

    ctx.fillStyle = 'rgba(15, 23, 42, 0.88)';
    ctx.fillRect(bx, by, bw, bh);

    ctx.strokeStyle = '#f472b6';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(bx, by, bw, bh);

    // Esquinas decorativas
    ctx.fillStyle = '#fb7185';
    ctx.fillRect(bx - 1, by - 1, 3, 3);
    ctx.fillRect(bx + bw - 2, by - 1, 3, 3);
    ctx.fillRect(bx - 1, by + bh - 2, 3, 3);
    ctx.fillRect(bx + bw - 2, by + bh - 2, 3, 3);

    ctx.fillStyle = '#ffffff';
    ctx.font = '7px "Press Start 2P"';
    ctx.textAlign = 'center';
    ctx.fillText('💖 ¡JUNTITOS HASTA EL CIELO! 👻', this.width / 2, by + 16);
    ctx.textAlign = 'left';

    ctx.restore();
  }

  drawTenderGhostCrhis(ctx, x, y, wave) {
    ctx.save();
    ctx.translate(Math.round(x), Math.round(y));

    // Sombra suave en el aire
    ctx.fillStyle = 'rgba(56, 189, 248, 0.25)';
    ctx.beginPath();
    ctx.arc(0, 0, 10, 0, Math.PI * 2);
    ctx.fill();

    // Cuerpo de fantasmita (blanco con tinte celeste suave)
    ctx.fillStyle = '#f0f9ff';
    ctx.beginPath();
    ctx.arc(0, -3, 7, Math.PI, 0);
    ctx.lineTo(7, 6 + Math.sin(wave) * 1.5);
    ctx.quadraticCurveTo(3.5, 3 - Math.sin(wave) * 1.5, 0, 6 + Math.sin(wave + 1) * 1.5);
    ctx.quadraticCurveTo(-3.5, 3 - Math.sin(wave) * 1.5, -7, 6 + Math.sin(wave) * 1.5);
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Mechoncito de cabello negro de Crhis en la coronilla
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(-3, -11, 6, 2);
    ctx.fillRect(-1, -13, 3, 2);

    // Gafitas cuadradas negras de Crhis
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(-5, -5, 4, 3);
    ctx.fillRect(1, -5, 4, 3);
    ctx.fillRect(-1, -4, 2, 1);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(-4, -4, 1, 1);
    ctx.fillRect(2, -4, 1, 1);

    // Sonrisa tierna
    ctx.fillStyle = '#0284c7';
    ctx.fillRect(-1, 0, 2, 1);

    // Manita extendida hacia la derecha tomando la mano de Made
    ctx.fillStyle = '#f0f9ff';
    ctx.strokeStyle = '#38bdf8';
    ctx.fillRect(5, -1, 5, 3);
    ctx.strokeRect(5, -1, 5, 3);

    ctx.restore();
  }

  drawTenderGhostMade(ctx, x, y, wave) {
    ctx.save();
    ctx.translate(Math.round(x), Math.round(y));

    // Sombra suave en el aire
    ctx.fillStyle = 'rgba(244, 114, 182, 0.25)';
    ctx.beginPath();
    ctx.arc(0, 0, 10, 0, Math.PI * 2);
    ctx.fill();

    // Cuerpo de fantasmita (blanco con tinte rosa pastel)
    ctx.fillStyle = '#fff1f2';
    ctx.beginPath();
    ctx.arc(0, -3, 7, Math.PI, 0);
    ctx.lineTo(7, 6 + Math.sin(wave + 0.5) * 1.5);
    ctx.quadraticCurveTo(3.5, 3 - Math.sin(wave + 0.5) * 1.5, 0, 6 + Math.sin(wave + 1.5) * 1.5);
    ctx.quadraticCurveTo(-3.5, 3 - Math.sin(wave + 0.5) * 1.5, -7, 6 + Math.sin(wave + 0.5) * 1.5);
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = '#fb7185';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Moñito / flor rosa en el cabello de Made
    ctx.fillStyle = '#f43f5e';
    ctx.fillRect(2, -12, 4, 3);
    ctx.fillRect(0, -11, 2, 2);
    ctx.fillRect(6, -11, 2, 2);
    ctx.fillStyle = '#fef08a';
    ctx.fillRect(2, -11, 2, 2);

    // Ojos tiernos curvados felices (^ ^)
    ctx.fillStyle = '#4c0519';
    ctx.fillRect(-5, -4, 3, 1);
    ctx.fillRect(-4, -5, 1, 1);
    ctx.fillRect(2, -4, 3, 1);
    ctx.fillRect(3, -5, 1, 1);

    // Mejillas sonrojadas rosas
    ctx.fillStyle = '#fb7185';
    ctx.fillRect(-6, -2, 2, 2);
    ctx.fillRect(4, -2, 2, 2);

    // Sonrisa tierna
    ctx.fillStyle = '#e11d48';
    ctx.fillRect(-1, 0, 2, 1);

    // Manita extendida hacia la izquierda tomando la mano de Crhis
    ctx.fillStyle = '#fff1f2';
    ctx.strokeStyle = '#fb7185';
    ctx.fillRect(-10, -1, 5, 3);
    ctx.strokeRect(-10, -1, 5, 3);

    ctx.restore();
  }

  drawTenderPixelHeart(ctx, x, y, scale = 1) {
    ctx.save();
    ctx.translate(Math.round(x), Math.round(y));
    ctx.scale(scale, scale);

    // Halo cálido y brillante del corazón
    ctx.fillStyle = 'rgba(244, 63, 94, 0.3)';
    ctx.beginPath();
    ctx.arc(0, 0, 11, 0, Math.PI * 2);
    ctx.fill();

    // Matriz de corazón (7x6)
    const heartGrid = [
      [0, 1, 1, 0, 1, 1, 0],
      [1, 2, 1, 1, 1, 1, 1],
      [1, 2, 1, 1, 1, 1, 1],
      [0, 1, 1, 1, 1, 1, 0],
      [0, 0, 1, 1, 1, 0, 0],
      [0, 0, 0, 1, 0, 0, 0]
    ];

    const px = 2;
    const offX = -7;
    const offY = -6;

    for (let r = 0; r < 6; r++) {
      for (let c = 0; c < 7; c++) {
        const val = heartGrid[r][c];
        if (val === 1) {
          ctx.fillStyle = '#f43f5e';
          ctx.fillRect(offX + c * px, offY + r * px, px, px);
        } else if (val === 2) {
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(offX + c * px, offY + r * px, px, px);
        }
      }
    }

    ctx.restore();
  }

  drawMiniPixelStar(ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(Math.round(x) - 1, Math.round(y), 3, 1);
    ctx.fillRect(Math.round(x), Math.round(y) - 1, 1, 3);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(Math.round(x), Math.round(y), 1, 1);
  }

  drawMiniPixelHeart(ctx, x, y, color) {
    ctx.fillStyle = color;
    const rx = Math.round(x);
    const ry = Math.round(y);
    ctx.fillRect(rx - 1, ry - 1, 1, 1);
    ctx.fillRect(rx + 1, ry - 1, 1, 1);
    ctx.fillRect(rx - 1, ry, 3, 1);
    ctx.fillRect(rx, ry + 1, 1, 1);
  }

  handleLevelVictory() {
    this.gameState = 'VICTORY_LEVEL';

    if (this.currentLevel < 4) {
      this.stopAudio();
      const nextLvl = this.currentLevel + 1;
      this.showOverlay('success', '🎉 ¡NIVEL SUPERADO!', 
        `¡Excelente trabajo Made, nivel superado! 👏<br>Siguiente capítulo de la historia: <strong>Nivel ${nextLvl}</strong>.`, 
        `CONTINUAR A NIVEL ${nextLvl} ➡️`);
      
      const btn = document.getElementById('overlayStartBtn');
      btn.onclick = () => {
        this.hideOverlay();
        this.setupLevel(nextLvl);
      };
    } else {
      this.gameState = 'VICTORY_ALL';
      // En el nivel 4 (Margarita Siempre Viva), dejamos la música sonando en bucle para la propuesta final
      this.playMargaritaInLoop();
      this.showVictoryAllModal();
    }
  }

  // MENSAJE FINAL EXACTO SOLICITADO POR EL USUARIO
  showVictoryAllModal() {
    const overlay = document.getElementById('gameOverlay');
    const titleEl = document.getElementById('overlayTitle');
    const descEl = document.getElementById('overlayDesc');
    const btn = document.getElementById('overlayStartBtn');

    titleEl.className = 'game-msg-title success';
    titleEl.innerHTML = '💖 ¡TODOS LOS NIVELES COMPLETADOS!';
    descEl.innerHTML = `
      ¡Superaste todos los niveles! Llegaste a tiempo a la terminal, disfrutaste del parche cultural en el Museo del Oro, brindis con polas en el concierto de Kraken y momento de besos y abrazos en Margarita Siempre Viva. 🥰❤️<br><br>
      <strong>¡Ahora estás lista para lo que sigue!</strong> ✨❤️
    `;
    btn.textContent = 'SIGUIENTE';

    btn.onclick = () => {
      // La canción de Margarita sigue sonando de fondo en bucle para la propuesta final
      this.playMargaritaInLoop();
      this.hideOverlay();
      if (typeof window.onMinijuegosCompleted === 'function') {
        window.onMinijuegosCompleted();
      }
    };

    overlay.classList.remove('hidden');
  }

  // ============================================================
  // JUEGO 1: INDRIVE (CRHIS) ➔ INDRIVE MOTO (MADE) CON ANIMACIÓN DE ENCUENTRO, BESO Y ABORDAJE DEL BUS
  // ============================================================
  initGame1() {
    const lanes = [80, 160, 240];
    this.game1 = {
      lanes: lanes,
      subPhase: 'CRHIS_INDRIVE', // CRHIS_INDRIVE -> MADE_MOTO -> MEETING_ANIMATION -> BUS_BOARDING
      player: {
        currentLane: 1,
        x: lanes[1],
        targetX: lanes[1],
        y: this.height - 75,
        w: 28,
        h: 48
      },
      roadOffset: 0,
      roadSpeed: 5.4,
      distanceTraveled: 0,
      targetDistance: 450,
      traffic: [],
      spawnTimer: 0,
      terminalBuildingY: -130,
      // Variables para la animación de encuentro en la terminal
      crhisWaitingX: 195,
      crhisWaitingY: 90,
      madeArrivalX: 110,
      madeArrivalY: 90,
      animTimer: 0,
      busOffset: 0,
      busSpeed: 0,
      busShake: 0,
      busExhaustParticles: []
    };
  }

  updateGame1(dt, step = 1.0) {
    const g = this.game1;

    // Fase 3: Animación de encuentro, beso y abordaje al bus
    if (g.subPhase === 'MEETING_ANIMATION') {
      g.animTimer += dt;

      // Made y Crhis caminan hacia el centro del andén para encontrarse
      if (g.madeArrivalX < 155) g.madeArrivalX += 1.3 * step;
      if (g.crhisWaitingX > 168) g.crhisWaitingX -= 1.3 * step;

      document.getElementById('hudParam').textContent = `👩‍❤️‍💋‍👨 ¡Encuentro y beso en la Terminal!`;

      // Después de besarse durante 2.8 segundos, pasan a subirse al bus
      if (g.animTimer >= 2800) {
        g.subPhase = 'BUS_BOARDING';
        g.animTimer = 0;
      }
      return;
    }

    if (g.subPhase === 'BUS_BOARDING') {
      g.animTimer += dt;

      // Caminan juntos hacia la puerta lateral del bus
      if (g.animTimer < 1400) {
        if (g.madeArrivalX > 118) g.madeArrivalX -= 1.3 * step;
        if (g.crhisWaitingX > 124) g.crhisWaitingX -= 1.3 * step;
      }

      document.getElementById('hudParam').textContent = `🚌 ¡Abordando bus a Bogotá!`;

      // A los 1.7 segundos el bus cierra puertas y arranca hacia ARRIBA (hacia Bogotá)
      if (g.animTimer >= 1700) {
        g.busShake = Math.sin(g.animTimer * 0.08) * 1.5;
        g.busSpeed = Math.min(6.2, (g.busSpeed || 0.8) + 0.085 * step);
        g.busOffset += g.busSpeed * step;

        // Generar partículas de humo del exosto (situado abajo a la izquierda del bus)
        const busX = 70;
        const termY = 40;
        const busY = termY + 20 - g.busOffset;
        const exostoX = busX + 8;
        const exostoY = busY + 84;

        if (Math.random() < 0.75) {
          const colors = ['#f8fafc', '#e2e8f0', '#cbd5e1', '#94a3b8'];
          g.busExhaustParticles.push({
            x: exostoX + (Math.random() - 0.5) * 4,
            y: exostoY + Math.random() * 3,
            vx: -0.7 + (Math.random() - 0.5) * 1.4,
            vy: 2.2 + Math.random() * 2.4, // Humo impulsado hacia abajo/atrás
            size: 4 + Math.random() * 3,
            maxSize: 15 + Math.random() * 7,
            alpha: 0.85,
            color: colors[Math.floor(Math.random() * colors.length)],
            life: 0,
            maxLife: 38 + Math.random() * 22
          });
        }
      }

      // Actualizar partículas de humo del exosto
      for (let i = g.busExhaustParticles.length - 1; i >= 0; i--) {
        const p = g.busExhaustParticles[i];
        p.life += step;
        p.x += p.vx * step;
        p.y += p.vy * step;
        p.size = Math.min(p.maxSize, p.size + 0.38 * step);
        p.alpha = Math.max(0, 0.85 * (1 - p.life / p.maxLife));
        if (p.life >= p.maxLife) {
          g.busExhaustParticles.splice(i, 1);
        }
      }

      // Al salir el bus de la pantalla por arriba, superan el nivel
      if (g.animTimer >= 4600 || g.busOffset > 240) {
        this.handleLevelVictory();
      }
      return;
    }

    // Fases de conducción (Crhis inDrive o Made Moto)
    g.distanceTraveled += g.roadSpeed * 0.55 * step;
    g.roadOffset = (g.roadOffset + g.roadSpeed * step) % 40;

    g.player.x += (g.player.targetX - g.player.x) * Math.min(1, 0.35 * step);

    const distLeft = Math.max(0, Math.round(g.targetDistance - g.distanceTraveled));
    const conductorName = (g.subPhase === 'CRHIS_INDRIVE') ? 'Crhis inDrive' : 'Made inDrive Moto';
    document.getElementById('hudParam').textContent = `🏁 ${conductorName}: ${distLeft}m`;

    if (g.distanceTraveled >= g.targetDistance) {
      g.terminalBuildingY += g.roadSpeed * 0.75 * step;
      if (g.terminalBuildingY >= g.player.y - 65) {
        if (g.subPhase === 'CRHIS_INDRIVE') {
          g.subPhase = 'MADE_MOTO';
          g.distanceTraveled = 0;
          g.targetDistance = 450;
          g.terminalBuildingY = -130;
          g.traffic = [];
          g.player.currentLane = 1;
          g.player.x = g.lanes[1];
          g.player.targetX = g.lanes[1];
          g.player.w = 22;
          g.player.h = 44;
          this.showOverlay('intro', '🏍️ ¡TURNO DE MADE EN INDRIVE MOTO!', 
            '¡Crhis ya llegó a la Terminal de Pereira y te está esperando en el andén!<br><br>Ahora Made debe esquivar el tráfico en el inDrive Moto para llegar a tiempo y encontrarse con él.', 
            '¡ARRANCAR INDRIVE MOTO!');
          return;
        } else {
          // Made llega a la terminal: se inicia la animación de encuentro, beso y abordaje
          g.subPhase = 'MEETING_ANIMATION';
          g.animTimer = 0;
          g.madeArrivalX = 90;
          g.crhisWaitingX = 210;
          return;
        }
      }
    }

    if (g.distanceTraveled < g.targetDistance - 80) {
      g.spawnTimer += step;
      if (g.spawnTimer > 34) {
        g.spawnTimer = 0;
        const availableLanes = [0, 1, 2];
        const chosenLane = availableLanes[Math.floor(Math.random() * availableLanes.length)];
        const types = ['taxi', 'bus', 'suv'];
        const type = types[Math.floor(Math.random() * types.length)];
        g.traffic.push({
          lane: chosenLane,
          x: g.lanes[chosenLane],
          y: -65,
          w: (type === 'bus') ? 34 : 28,
          h: (type === 'bus') ? 66 : 48,
          speed: (type === 'bus') ? 2.4 : 3.2,
          type: type
        });
      }
    }

    for (let i = g.traffic.length - 1; i >= 0; i--) {
      const car = g.traffic[i];
      car.y += (car.speed + (g.roadSpeed * 0.35)) * step;

      if (
        Math.abs(g.player.x - car.x) < 22 &&
        g.player.y < car.y + car.h - 6 &&
        g.player.y + g.player.h > car.y + 6
      ) {
        const victim = (g.subPhase === 'CRHIS_INDRIVE') ? 'El inDrive de Crhis chocó' : 'El inDrive Moto de Made tropezó';
        this.triggerDeath(`¡${victim} en la autopista hacia la terminal! 💥`, g.player.x, g.player.y);
        return;
      }

      if (car.y > this.height + 80) {
        g.traffic.splice(i, 1);
      }
    }
  }

  drawGame1() {
    const g = this.game1;
    const ctx = this.ctx;

    // Fondo de prado verde a los lados de la autopista
    ctx.fillStyle = '#15803d';
    ctx.fillRect(0, 0, this.width, this.height);

    // Asfalto de la autopista
    ctx.fillStyle = '#334155';
    ctx.fillRect(40, 0, this.width - 80, this.height);

    // Bermas laterales de seguridad
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(36, 0, 4, this.height);
    ctx.fillRect(this.width - 40, 0, 4, this.height);

    // Líneas discontinuas de carril
    ctx.fillStyle = '#f8fafc';
    const dividers = [120, 200];
    for (const dx of dividers) {
      for (let y = -40 + g.roadOffset; y < this.height; y += 40) {
        ctx.fillRect(dx - 1.5, y, 3, 22);
      }
    }

    // Dibujar la Terminal de Pereira
    const termY = (g.subPhase === 'MEETING_ANIMATION' || g.subPhase === 'BUS_BOARDING') ? 40 : g.terminalBuildingY;

    if (termY > -120) {
      // Fachada superior del edificio de la Terminal
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(15, termY - 24, this.width - 30, 44);
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(18, termY - 21, this.width - 36, 6);

      // Letrero luminoso de la Terminal
      ctx.fillStyle = '#facc15';
      ctx.fillRect(25, termY - 12, this.width - 50, 22);
      ctx.strokeStyle = '#ca8a04';
      ctx.lineWidth = 2;
      ctx.strokeRect(25, termY - 12, this.width - 50, 22);
      ctx.fillStyle = '#000000';
      ctx.font = '7px "Press Start 2P"';
      ctx.textAlign = 'center';
      ctx.fillText('TERMINAL DE PEREIRA', this.width / 2, termY + 3);
      ctx.textAlign = 'left';

      // Andén de pasajeros de la Terminal (a la derecha de la bahía del bus)
      ctx.fillStyle = '#64748b';
      ctx.fillRect(125, termY + 18, this.width - 150, 105);
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 1;
      // Textura de adoquines en el andén
      for (let py = termY + 28; py < termY + 120; py += 14) {
        ctx.beginPath();
        ctx.moveTo(125, py);
        ctx.lineTo(this.width - 25, py);
        ctx.stroke();
      }

      // La moto de inDrive estacionada en el andén tras la llegada de Made
      if (g.subPhase === 'MEETING_ANIMATION' || g.subPhase === 'BUS_BOARDING') {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.fillRect(205, termY + 36, 24, 12);
        ctx.fillStyle = '#22c55e';
        ctx.fillRect(206, termY + 34, 22, 10);
        ctx.fillStyle = '#000';
        ctx.font = '5px "Press Start 2P"';
        ctx.fillText('inD', 208, termY + 42);
        ctx.fillStyle = '#09090b';
        ctx.fillRect(203, termY + 37, 4, 5);
        ctx.fillRect(227, termY + 37, 4, 5);
      }

      // ------------------------------------------------------------
      // BUS INTERMUNICIPAL EN EL SENTIDO CORRECTO (ORIENTADO HACIA ARRIBA A BOGOTÁ)
      // ------------------------------------------------------------
      const busW = 42;
      const busH = 92;
      const busX = 66 + (g.busShake || 0);
      const busY = termY + 22 - g.busOffset;

      // Partículas de humo denso del exosto (salen impulsadas hacia atrás / abajo)
      if (g.busExhaustParticles && g.busExhaustParticles.length > 0) {
        g.busExhaustParticles.forEach(p => {
          ctx.save();
          ctx.globalAlpha = p.alpha;
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(p.x - p.size * 0.25, p.y - p.size * 0.25, p.size * 0.45, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        });
      }

      // Sombra del bus en el asfalto
      ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
      ctx.fillRect(busX + 3, busY + 4, busW, busH);

      // Llantas del bus (visibles a los lados)
      ctx.fillStyle = '#09090b';
      ctx.fillRect(busX - 3, busY + 14, 4, 14); // Llanta delantera izq
      ctx.fillRect(busX + busW - 1, busY + 14, 4, 14); // Llanta delantera der
      ctx.fillRect(busX - 3, busY + busH - 26, 4, 16); // Llantas traseras dobles izq
      ctx.fillRect(busX + busW - 1, busY + busH - 26, 4, 16); // Llantas traseras dobles der

      // Carrocería verde esmeralda con acabado de bus intermunicipal
      ctx.fillStyle = '#15803d';
      ctx.fillRect(busX, busY, busW, busH);
      ctx.strokeStyle = '#052e16';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(busX, busY, busW, busH);

      // Franjas decorativas aerodinámicas (blanca y amarilla en los costados)
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(busX + 2, busY + 32, busW - 4, 4);
      ctx.fillStyle = '#facc15';
      ctx.fillRect(busX + 2, busY + 36, busW - 4, 3);

      // Aire acondicionado y claraboyas en el techo
      ctx.fillStyle = '#cbd5e1';
      ctx.fillRect(busX + 11, busY + 44, 20, 26);
      ctx.strokeStyle = '#64748b';
      ctx.lineWidth = 1;
      ctx.strokeRect(busX + 11, busY + 44, 20, 26);
      for (let ry = busY + 48; ry < busY + 68; ry += 5) {
        ctx.fillStyle = '#475569';
        ctx.fillRect(busX + 13, ry, 16, 2);
      }

      // Frente del bus: Parabrisas panorámico hacia ARRIBA
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(busX + 4, busY + 6, busW - 8, 20);
      // Reflejo diagonal de cristal en el parabrisas
      ctx.fillStyle = 'rgba(56, 189, 248, 0.7)';
      ctx.fillRect(busX + 7, busY + 8, 6, 16);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.fillRect(busX + 13, busY + 8, 2, 16);

      // Letrero electrónico LED en la visera frontal del bus: "BOGOTÁ"
      ctx.fillStyle = '#09090b';
      ctx.fillRect(busX + 3, busY + 1, busW - 6, 8);
      ctx.fillStyle = '#22c55e';
      ctx.font = '5px "Press Start 2P"';
      ctx.fillText('BOGOTÁ', busX + 6, busY + 7);

      // Faros delanteros potentes en las esquinas superiores proyectando luz hacia arriba
      ctx.fillStyle = '#fef08a';
      ctx.fillRect(busX + 2, busY, 6, 3);
      ctx.fillRect(busX + busW - 8, busY, 6, 3);

      // Haces de luz hacia arriba si el bus arranca
      if (g.busOffset > 0) {
        ctx.fillStyle = 'rgba(254, 240, 138, 0.18)';
        ctx.beginPath();
        ctx.moveTo(busX + 3, busY);
        ctx.lineTo(busX - 8, busY - 35);
        ctx.lineTo(busX + 16, busY - 35);
        ctx.closePath();
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(busX + busW - 5, busY);
        ctx.lineTo(busX + busW - 16, busY - 35);
        ctx.lineTo(busX + busW + 8, busY - 35);
        ctx.closePath();
        ctx.fill();
      }

      // Ventanillas laterales
      ctx.fillStyle = '#0284c7';
      ctx.fillRect(busX + 2, busY + 28, 4, 46);
      ctx.fillRect(busX + busW - 6, busY + 28, 4, 46);

      // Puerta lateral de abordaje (en el costado derecho hacia el andén)
      if (g.animTimer < 1400 && g.subPhase === 'BUS_BOARDING') {
        // Puerta abierta con luz interior
        ctx.fillStyle = '#fef08a';
        ctx.fillRect(busX + busW - 4, busY + 30, 4, 16);
      } else {
        // Puerta cerrada
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(busX + busW - 3, busY + 30, 3, 16);
      }

      // Stops traseros dobles rojos en la parte inferior
      ctx.fillStyle = (g.busOffset > 0) ? '#f43f5e' : '#dc2626';
      ctx.fillRect(busX + 2, busY + busH - 4, 8, 4);
      ctx.fillRect(busX + busW - 10, busY + busH - 4, 8, 4);

      // Tubo de exosto / escape (esquina inferior izquierda)
      ctx.fillStyle = '#334155';
      ctx.fillRect(busX + 5, busY + busH - 2, 5, 4);

      // Si ya abordaron el bus, dibujar a Crhis y Made saludando desde la ventanilla
      if (g.subPhase === 'BUS_BOARDING' && g.animTimer >= 1400) {
        // Carita de Crhis (con gafitas)
        ctx.fillStyle = '#fed7aa';
        ctx.fillRect(busX + busW - 13, busY + 12, 5, 5);
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(busX + busW - 13, busY + 11, 5, 2); // Cabello
        ctx.fillRect(busX + busW - 12, busY + 13, 2, 2); // Gafitas

        // Carita de Made (con moñito rosa)
        ctx.fillStyle = '#fed7aa';
        ctx.fillRect(busX + busW - 19, busY + 12, 5, 5);
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(busX + busW - 19, busY + 11, 5, 2); // Cabello
        ctx.fillStyle = '#f43f5e';
        ctx.fillRect(busX + busW - 20, busY + 10, 3, 3); // Moñito rosa

        // Corazoncito flotando sobre ambos
        ctx.fillStyle = '#f43f5e';
        ctx.font = '8px sans-serif';
        ctx.fillText('❤️', busX + busW - 18, busY + 8);
      }

      // Animación en el andén
      if (g.subPhase === 'MEETING_ANIMATION') {
        if (Math.abs(g.madeArrivalX - g.crhisWaitingX) <= 14) {
          // Beso romántico en la terminal
          PixelSprites.drawKissingCouple(ctx, (g.madeArrivalX + g.crhisWaitingX) / 2, termY + 85, this.walkCycle, false);
          ctx.fillStyle = 'rgba(0, 0, 0, 0.78)';
          ctx.fillRect(130, termY + 110, this.width - 150, 22);
          ctx.fillStyle = '#facc15';
          ctx.font = '6px "Press Start 2P"';
          ctx.fillText('👩‍❤️‍💋‍👨 ¡AL FIN JUNTOS! ❤️', 136, termY + 124);
        } else {
          // Corriendo a encontrarse
          PixelSprites.drawMade(ctx, g.madeArrivalX, termY + 85, 'RIGHT', this.walkCycle);
          PixelSprites.drawCrhis(ctx, g.crhisWaitingX, termY + 85, 'LEFT', this.walkCycle);
        }
      } else if (g.subPhase === 'BUS_BOARDING') {
        if (g.animTimer < 1400) {
          // Caminando de la mano hacia la puerta lateral del bus
          PixelSprites.drawCrhis(ctx, g.crhisWaitingX, termY + 68, 'LEFT', this.walkCycle);
          PixelSprites.drawMade(ctx, g.madeArrivalX, termY + 68, 'LEFT', this.walkCycle);
        }
      } else if (g.subPhase === 'MADE_MOTO') {
        // Crhis esperando en el andén con maleta
        PixelSprites.drawCrhis(ctx, 195, termY + 60, 'DOWN', 0);
        ctx.fillStyle = '#78350f';
        ctx.fillRect(205, termY + 62, 8, 10);
        ctx.fillStyle = '#f59e0b';
        ctx.fillRect(207, termY + 60, 4, 3); // Manija de la maleta
      }
    }

    // Tráfico y jugador durante la conducción
    if (g.subPhase === 'CRHIS_INDRIVE' || g.subPhase === 'MADE_MOTO') {
      g.traffic.forEach(car => {
        this.drawTrafficCar(car.x - car.w / 2, car.y, car.w, car.h, car.type);
      });

      if (this.gameState !== 'DYING') {
        if (g.subPhase === 'CRHIS_INDRIVE') {
          this.drawInDriveCar(g.player.x, g.player.y);
        } else {
          this.drawMadeInDriveMotorcycle(g.player.x, g.player.y);
        }
      }
    }
  }

  drawInDriveCar(cx, y) {
    const ctx = this.ctx;
    const w = 28;
    const h = 48;
    const x = cx - w / 2;

    // Sombra proyectada en el asfalto
    ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
    ctx.fillRect(x + 2, y + 4, w, h);

    // Llantas deportivas oscuras en las 4 esquinas con rines
    ctx.fillStyle = '#09090b';
    ctx.fillRect(x - 2, y + 6, 3, 10);
    ctx.fillRect(x + w - 1, y + 6, 3, 10);
    ctx.fillRect(x - 2, y + h - 16, 3, 10);
    ctx.fillRect(x + w - 1, y + h - 16, 3, 10);
    ctx.fillStyle = '#94a3b8';
    ctx.fillRect(x - 1, y + 9, 1, 4);
    ctx.fillRect(x + w - 1, y + 9, 1, 4);
    ctx.fillRect(x - 1, y + h - 13, 1, 4);
    ctx.fillRect(x + w - 1, y + h - 13, 1, 4);

    // Carrocería gris plateada / azul grafito
    ctx.fillStyle = '#94a3b8';
    ctx.fillRect(x, y, w, h);
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(x, y, w, h);

    // Capó delantero con brillo
    ctx.fillStyle = '#cbd5e1';
    ctx.fillRect(x + 4, y + 2, w - 8, 8);

    // Parabrisas delantero aerodinámico
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(x + 3, y + 10, w - 6, 9);
    // Reflejo de cristal celeste
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(x + 6, y + 11, 4, 7);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(x + 11, y + 11, 2, 7);

    // Techo del carro
    ctx.fillStyle = '#64748b';
    ctx.fillRect(x + 3, y + 19, w - 6, 17);

    // Logo / letrero verde inDrive en el techo
    ctx.fillStyle = '#22c55e';
    ctx.fillRect(x + 4, y + 22, w - 8, 8);
    ctx.strokeStyle = '#15803d';
    ctx.lineWidth = 1;
    ctx.strokeRect(x + 4, y + 22, w - 8, 8);
    ctx.fillStyle = '#ffffff';
    ctx.font = '5px "Press Start 2P"';
    ctx.fillText('inD', x + 6, y + 28);

    // Panorámica trasera
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(x + 3, y + 36, w - 6, 6);
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(x + 6, y + 37, 3, 4);

    // Espejos retrovisores
    ctx.fillStyle = '#64748b';
    ctx.fillRect(x - 3, y + 12, 3, 4);
    ctx.fillRect(x + w, y + 12, 3, 4);

    // Faros delanteros LED iluminando hacia arriba
    ctx.fillStyle = '#fef08a';
    ctx.fillRect(x + 2, y, 6, 3);
    ctx.fillRect(x + w - 8, y, 6, 3);

    // Stops traseros rojos con barra de freno
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(x + 2, y + h - 3, 6, 3);
    ctx.fillRect(x + w - 8, y + h - 3, 6, 3);
    ctx.fillStyle = '#f87171';
    ctx.fillRect(x + 10, y + h - 2, w - 20, 2);

    // Conductor y Crhis visibles adentro con gafitas
    ctx.fillStyle = '#fed7aa';
    ctx.fillRect(x + 6, y + 13, 4, 4);
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(x + 6, y + 12, 4, 2); // Cabello de Crhis
    ctx.fillRect(x + 8, y + 14, 2, 2); // Gafitas
  }

  drawMadeInDriveMotorcycle(cx, y) {
    const ctx = this.ctx;
    const w = 22;
    const h = 44;
    const x = cx - w / 2;

    // Sombra de la moto en el asfalto
    ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
    ctx.beginPath();
    ctx.ellipse(cx, y + h / 2 + 2, 8, 20, 0, 0, Math.PI * 2);
    ctx.fill();

    // Ruedas delantera y trasera
    ctx.fillStyle = '#09090b';
    ctx.fillRect(cx - 3, y, 6, 10);
    ctx.fillRect(cx - 3, y + h - 10, 6, 10);
    ctx.fillStyle = '#94a3b8';
    ctx.fillRect(cx - 1, y + 2, 2, 6);
    ctx.fillRect(cx - 1, y + h - 8, 2, 6);

    // Manillar / manetas con retrovisores
    ctx.fillStyle = '#64748b';
    ctx.fillRect(x + 1, y + 8, w - 2, 2);
    ctx.fillStyle = '#cbd5e1';
    ctx.fillRect(x, y + 7, 2, 2);
    ctx.fillRect(x + w - 2, y + 7, 2, 2);

    // Chasis de la moto
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(cx - 5, y + 10, 10, 22);

    // Conductor inDrive adelante
    // Casco
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(cx - 5, y + 7, 10, 8);
    ctx.fillStyle = '#22c55e';
    ctx.fillRect(cx - 4, y + 8, 8, 3);
    // Chaleco reflectivo verde inDrive
    ctx.fillStyle = '#22c55e';
    ctx.fillRect(cx - 6, y + 14, 12, 10);
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(cx - 6, y + 18, 12, 2); // Franja reflectiva
    ctx.fillStyle = '#000000';
    ctx.font = '4px "Press Start 2P"';
    ctx.fillText('inD', cx - 5, y + 17);

    // Made como pasajera atrás
    // Cabello de Made
    ctx.fillStyle = '#111827';
    ctx.fillRect(cx - 5, y + 24, 10, 8);
    // Moño / flor rosa icónico de Made
    ctx.fillStyle = '#f43f5e';
    ctx.fillRect(cx + 3, y + 23, 4, 3);
    ctx.fillStyle = '#fef08a';
    ctx.fillRect(cx + 4, y + 24, 2, 2);

    // Buzo celeste de Made
    ctx.fillStyle = '#7dd3fc';
    ctx.fillRect(cx - 6, y + 28, 12, 8);
    // Bracitos abrazando al conductor por la cintura
    ctx.fillStyle = '#fed7aa';
    ctx.fillRect(cx - 7, y + 22, 2, 8);
    ctx.fillRect(cx + 5, y + 22, 2, 8);

    // Faro delantero LED brillante proyectando luz hacia arriba
    ctx.fillStyle = '#fef08a';
    ctx.fillRect(cx - 3, y - 1, 6, 3);
    ctx.fillStyle = 'rgba(254, 240, 138, 0.22)';
    ctx.beginPath();
    ctx.moveTo(cx - 3, y);
    ctx.lineTo(cx - 14, y - 30);
    ctx.lineTo(cx + 14, y - 30);
    ctx.closePath();
    ctx.fill();

    // Stop trasero rojo
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(cx - 3, y + h - 2, 6, 3);
  }

  // ============================================================
  // JUEGO 2: MUSEO DEL ORO
  // ============================================================
  initGame2() {
    this.game2 = {
      player: {
        x: this.width / 2 - 12,
        y: this.height - 50,
        w: 26,
        h: 22,
        speed: 3.2,
        facingDir: 'UP'
      },
      timeLeft: 80,
      timerAcc: 0,
      poporo: {
        x: this.width / 2 - 16,
        y: 20,
        w: 32,
        h: 36
      },
      safeZones: [
        { y: 320, h: 46, name: 'Sala Muisca' },
        { y: 230, h: 46, name: 'Vitrinas Quimbaya' },
        { y: 145, h: 46, name: 'Sala Tayrona' },
        { y: 70, h: 44, name: 'Cámara Sagrada' }
      ],
      arrows: [],
      arrowCycle: 0,
      boulders: [
        { x: -30, y: 190, r: 14, speed: 2.2 },
        { x: this.width + 30, y: 105, r: 15, speed: -2.6 }
      ]
    };
  }

  updateGame2(dt, step = 1.0) {
    const g = this.game2;
    g.timerAcc += dt;
    if (g.timerAcc >= 1000) {
      g.timerAcc -= 1000;
      g.timeLeft--;
      if (g.timeLeft <= 0) {
        this.triggerDeath("¡Se agotó el tiempo en el Museo del Oro! ⏳💥", g.player.x + 11, g.player.y + 8);
        return;
      }
    }

    document.getElementById('hudParam').textContent = `⏳ ${g.timeLeft}s | Poporo`;

    let moveX = 0;
    let moveY = 0;
    if (this.keys.up && g.player.y > 18) { g.player.y -= g.player.speed * step; moveY -= 1; }
    if (this.keys.down && g.player.y < this.height - 28) { g.player.y += g.player.speed * step; moveY += 1; }
    if (this.keys.left && g.player.x > 45) { g.player.x -= g.player.speed * step; moveX -= 1; }
    if (this.keys.right && g.player.x < this.width - 45 - g.player.w) { g.player.x += g.player.speed * step; moveX += 1; }

    if (moveX !== 0 || moveY !== 0) {
      if (moveY < 0 && moveX < 0) g.player.facingDir = 'UP_LEFT';
      else if (moveY < 0 && moveX > 0) g.player.facingDir = 'UP_RIGHT';
      else if (moveY > 0 && moveX < 0) g.player.facingDir = 'DOWN_LEFT';
      else if (moveY > 0 && moveX > 0) g.player.facingDir = 'DOWN_RIGHT';
      else if (moveY < 0) g.player.facingDir = 'UP';
      else if (moveY > 0) g.player.facingDir = 'DOWN';
      else if (moveX < 0) g.player.facingDir = 'LEFT';
      else if (moveX > 0) g.player.facingDir = 'RIGHT';
    }

    const inSafeZone = g.safeZones.some(z => 
      g.player.y >= z.y && g.player.y + g.player.h <= z.y + z.h
    );

    g.arrowCycle = (g.arrowCycle + step) % 100;
    if (g.arrowCycle >= 35 && g.arrowCycle < 35 + step) {
      g.arrows.push({ x: 38, y: 285, speed: 5.2, dir: 1, w: 14, h: 4 });
      g.arrows.push({ x: this.width - 38, y: 125, speed: -5.2, dir: -1, w: 14, h: 4 });
    }

    for (let i = g.arrows.length - 1; i >= 0; i--) {
      const arr = g.arrows[i];
      arr.x += arr.speed * step;

      if (!inSafeZone && this.checkAABB(g.player, arr)) {
        this.triggerDeath("¡Una trampa ancestral de flechas los alcanzó! 🏹💥", g.player.x + 11, g.player.y + 8);
        return;
      }
      if (arr.x < -20 || arr.x > this.width + 20) g.arrows.splice(i, 1);
    }

    g.boulders.forEach(b => {
      b.x += b.speed * step;
      if (b.speed > 0 && b.x > this.width + 40) b.x = -40;
      if (b.speed < 0 && b.x < -40) b.x = this.width + 40;

      if (!inSafeZone) {
        const px = g.player.x + g.player.w / 2;
        const py = g.player.y + g.player.h / 2;
        if (Math.hypot(px - b.x, py - b.y) < b.r + 7) {
          this.triggerDeath("¡Cuidado con la bola de piedra gigante del templo! 🪨💥", px, py);
          return;
        }
      }
    });

    if (this.checkAABB(g.player, g.poporo)) {
      this.handleLevelVictory();
    }
  }

  drawGame2() {
    const g = this.game2;
    const ctx = this.ctx;
    const w = this.width;
    const h = this.height;

    // 1. Fondo elegante de sala del Museo del Oro (Bogotá)
    ctx.fillStyle = '#0f0e12';
    ctx.fillRect(0, 0, w, h);

    // 2. Baldosas de mármol negro/basalto pulido en el corredor central
    const tileSize = 32;
    for (let py = 0; py < h; py += tileSize) {
      for (let px = 38; px < w - 38; px += tileSize) {
        const isAlt = ((px + py) / tileSize) % 2 === 0;
        ctx.fillStyle = isAlt ? '#19181d' : '#131216';
        ctx.fillRect(px, py, tileSize, tileSize);
        // Junta dorada muy sutil entre baldosas de museo
        ctx.strokeStyle = 'rgba(217, 163, 24, 0.14)';
        ctx.lineWidth = 0.5;
        ctx.strokeRect(px, py, tileSize, tileSize);
        // Brillo de pulido en esquinas
        if (isAlt) {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.025)';
          ctx.fillRect(px + 1, py + 1, 8, 8);
        }
      }
    }

    // 3. Franjas arquitectónicas de pared en los laterales (galería arqueológica)
    ctx.fillStyle = '#0a0a0d';
    ctx.fillRect(0, 0, 38, h);
    ctx.fillRect(w - 38, 0, 38, h);

    // Zócalo de madera noble en paredes laterales
    ctx.fillStyle = '#1c1917';
    ctx.fillRect(34, 0, 4, h);
    ctx.fillRect(w - 38, 0, 4, h);

    // Columnas/pilastras talladas con capiteles dorados en los costados
    for (let py = 20; py < h; py += 75) {
      // Columna izquierda
      ctx.fillStyle = '#262626';
      ctx.fillRect(32, py, 6, 26);
      ctx.fillStyle = '#404040';
      ctx.fillRect(34, py + 2, 2, 22);
      ctx.fillStyle = '#ca8a04';
      ctx.fillRect(31, py - 3, 8, 4);
      ctx.fillRect(31, py + 25, 8, 4);
      ctx.fillStyle = '#facc15';
      ctx.fillRect(32, py - 2, 6, 2);
      ctx.fillRect(32, py + 26, 6, 2);

      // Columna derecha
      ctx.fillStyle = '#262626';
      ctx.fillRect(w - 38, py, 6, 26);
      ctx.fillStyle = '#404040';
      ctx.fillRect(w - 36, py + 2, 2, 22);
      ctx.fillStyle = '#ca8a04';
      ctx.fillRect(w - 39, py - 3, 8, 4);
      ctx.fillRect(w - 39, py + 25, 8, 4);
      ctx.fillStyle = '#facc15';
      ctx.fillRect(w - 38, py - 2, 6, 2);
      ctx.fillRect(w - 38, py + 26, 6, 2);
    }

    // Cordón de terciopelo rojo de seguridad con postes de bronce dorado
    for (let py = 0; py < h; py += 30) {
      ctx.fillStyle = '#eab308';
      ctx.fillRect(35, py + 12, 3, 10);
      ctx.beginPath();
      ctx.arc(36.5, py + 12, 2.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillRect(w - 38, py + 12, 3, 10);
      ctx.beginPath();
      ctx.arc(w - 36.5, py + 12, 2.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = '#b91c1c';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(36.5, py + 13);
      ctx.quadraticCurveTo(34, py + 27, 36.5, py + 42);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(w - 36.5, py + 13);
      ctx.quadraticCurveTo(w - 34, py + 27, w - 36.5, py + 42);
      ctx.stroke();
    }

    // 4. Vitrinas de orfebrería de las culturas prehispánicas de Colombia
    this.drawMuseumShowcase(5, 330, 'balsa', 'MUISCA');
    this.drawMuseumShowcase(w - 33, 330, 'pectoral', 'QUIMBAYA');
    this.drawMuseumShowcase(5, 240, 'mascara', 'CALIMA');
    this.drawMuseumShowcase(w - 33, 240, 'nariguera', 'SINÚ');
    this.drawMuseumShowcase(5, 150, 'figura', 'TOLIMA');
    this.drawMuseumShowcase(w - 33, 150, 'corona', 'TAYRONA');
    this.drawMuseumShowcase(5, 60, 'poporito', 'QUIMBAYA');
    this.drawMuseumShowcase(w - 33, 60, 'cuenco', 'SAN AGUSTÍN');

    // 5. Alfombras rojas ceremoniales protegidas (Zonas Seguras)
    const inSafeZone = g.safeZones.some(z => 
      g.player.y + g.player.h > z.y && g.player.y < z.y + z.h
    );

    g.safeZones.forEach(z => {
      ctx.fillStyle = '#7f1d1d';
      ctx.fillRect(40, z.y, w - 80, z.h);

      ctx.fillStyle = '#991b1b';
      ctx.fillRect(43, z.y + 3, w - 86, z.h - 6);

      ctx.strokeStyle = '#facc15';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(40, z.y, w - 80, z.h);

      ctx.strokeStyle = '#ca8a04';
      ctx.lineWidth = 1;
      ctx.strokeRect(43, z.y + 3, w - 86, z.h - 6);

      for (let sy = z.y + 6; sy < z.y + z.h - 6; sy += 7) {
        ctx.fillStyle = '#fef08a';
        ctx.fillRect(45, sy, 3, 3);
        ctx.fillRect(w - 48, sy, 3, 3);
      }

      ctx.fillStyle = '#fef08a';
      ctx.font = '6px "Press Start 2P"';
      ctx.fillText('🛡️ ZONA PROTEGIDA (ALTO)', 72, z.y + z.h / 2 + 3);
    });

    // 6. Trampas de flechas ancestrales del templo
    g.arrows.forEach(arr => {
      ctx.fillStyle = '#ca8a04';
      ctx.fillRect(arr.x, arr.y + 1, arr.w, arr.h - 2);
      ctx.fillStyle = '#1e293b';
      const tipX = (arr.dir > 0) ? arr.x + arr.w : arr.x - 3;
      ctx.fillRect(tipX, arr.y, 3, arr.h);
      ctx.fillStyle = '#ea580c';
      const fletchX = (arr.dir > 0) ? arr.x : arr.x + arr.w - 3;
      ctx.fillRect(fletchX, arr.y - 1, 3, arr.h + 2);
    });

    // 7. Bolas rodantes de piedra labrada
    g.boulders.forEach(b => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
      ctx.beginPath();
      ctx.ellipse(b.x, b.y + b.r - 2, b.r, 4, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#57534e';
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#292524';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.strokeStyle = '#78716c';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(b.x - 2, b.y - 2, b.r * 0.55, 0, Math.PI * 1.5);
      ctx.stroke();
    });

    // 8. Gran Altar y Santuario del Poporo Quimbaya
    this.drawPoporo(g.poporo.x, g.poporo.y);

    // 9. Crhis y Made explorando el museo juntos
    if (this.gameState !== 'DYING') {
      if (inSafeZone) {
        const auraTime = Date.now() * 0.005;
        const auraRadius = 24 + Math.sin(auraTime) * 2;
        const centerX = g.player.x + 13;
        const centerY = g.player.y + 12;

        const auraGrad = ctx.createRadialGradient(centerX, centerY, 6, centerX, centerY, auraRadius);
        auraGrad.addColorStop(0, 'rgba(250, 204, 21, 0.45)');
        auraGrad.addColorStop(0.7, 'rgba(234, 179, 8, 0.20)');
        auraGrad.addColorStop(1, 'rgba(254, 240, 138, 0)');
        ctx.fillStyle = auraGrad;
        ctx.beginPath();
        ctx.arc(centerX, centerY, auraRadius, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = 'rgba(254, 240, 138, 0.6)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(centerX, centerY, auraRadius - 2, 0, Math.PI * 2);
        ctx.stroke();
      }

      PixelSprites.drawCrhis(ctx, g.player.x + 4, g.player.y + 6, g.player.facingDir, this.walkCycle);
      PixelSprites.drawMade(ctx, g.player.x + 18, g.player.y + 6, g.player.facingDir, this.walkCycle);
      ctx.fillStyle = '#fed7aa';
      ctx.fillRect(g.player.x + 9, g.player.y + 8, 4, 3);
      ctx.fillStyle = '#f43f5e';
      ctx.font = '7px sans-serif';
      ctx.fillText('❤️', g.player.x + 9, g.player.y - 14);
    }
  }

  drawMuseumShowcase(x, y, type, cultureName) {
    const ctx = this.ctx;
    const w = 28;
    const h = 38;

    // Haz de luz suave desde arriba iluminando la vitrina
    const spotGrad = ctx.createLinearGradient(x + 14, y - 10, x + 14, y + h);
    spotGrad.addColorStop(0, 'rgba(254, 240, 138, 0.25)');
    spotGrad.addColorStop(0.6, 'rgba(250, 204, 21, 0.08)');
    spotGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = spotGrad;
    ctx.beginPath();
    ctx.moveTo(x + 14, y - 10);
    ctx.lineTo(x - 4, y + h);
    ctx.lineTo(x + w + 4, y + h);
    ctx.closePath();
    ctx.fill();

    // Pedestal inferior de caoba oscura
    ctx.fillStyle = '#1c1917';
    ctx.fillRect(x, y + 26, w, 12);
    ctx.fillStyle = '#292524';
    ctx.fillRect(x - 1, y + 26, w + 2, 2);
    // Plaquita dorada con el nombre de la cultura
    ctx.fillStyle = '#ca8a04';
    ctx.fillRect(x + 3, y + 30, w - 6, 6);
    ctx.fillStyle = '#fef08a';
    ctx.fillRect(x + 4, y + 31, w - 8, 4);

    // Caja de cristal de exhibición (vitrina blindada)
    ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
    ctx.fillRect(x, y, w, 26);
    ctx.strokeStyle = '#ca8a04';
    ctx.lineWidth = 1;
    ctx.strokeRect(x, y, w, 26);

    // Cojín de terciopelo negro interior para la joya
    ctx.fillStyle = '#09090b';
    ctx.fillRect(x + 2, y + 22, w - 4, 4);

    // Reflejo diagonal de luz sobre el cristal
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x + 4, y + 20);
    ctx.lineTo(x + 20, y + 4);
    ctx.stroke();

    // Joya u objeto de orfebrería de oro puro (Colombia Precolombina)
    ctx.fillStyle = '#facc15';
    if (type === 'balsa') {
      ctx.fillStyle = '#d97706';
      ctx.fillRect(x + 4, y + 17, 20, 4);
      ctx.fillStyle = '#facc15';
      ctx.fillRect(x + 5, y + 18, 18, 2);
      ctx.fillRect(x + 12, y + 8, 4, 9);
      ctx.fillStyle = '#fef08a';
      ctx.fillRect(x + 11, y + 6, 6, 3);
      ctx.fillStyle = '#fbbf24';
      ctx.fillRect(x + 7, y + 12, 2, 5);
      ctx.fillRect(x + 19, y + 12, 2, 5);
    } else if (type === 'pectoral') {
      ctx.fillStyle = '#facc15';
      ctx.beginPath();
      ctx.arc(x + 14, y + 13, 7, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ca8a04';
      ctx.fillRect(x + 11, y + 11, 6, 4);
      ctx.fillStyle = '#fef08a';
      ctx.fillRect(x + 13, y + 9, 2, 2);
    } else if (type === 'mascara') {
      ctx.fillStyle = '#facc15';
      ctx.fillRect(x + 8, y + 8, 12, 12);
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(x + 10, y + 11, 2, 2);
      ctx.fillRect(x + 16, y + 11, 2, 2);
      ctx.fillStyle = '#fbbf24';
      ctx.beginPath();
      ctx.arc(x + 6, y + 14, 3, 0, Math.PI * 2);
      ctx.arc(x + 22, y + 14, 3, 0, Math.PI * 2);
      ctx.fill();
    } else if (type === 'nariguera') {
      ctx.strokeStyle = '#facc15';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(x + 14, y + 13, 8, 0, Math.PI);
      ctx.stroke();
      ctx.fillStyle = '#fef08a';
      ctx.fillRect(x + 12, y + 11, 4, 3);
    } else if (type === 'figura') {
      ctx.fillStyle = '#facc15';
      ctx.fillRect(x + 12, y + 7, 4, 13);
      ctx.fillRect(x + 8, y + 10, 12, 3);
      ctx.fillRect(x + 8, y + 17, 12, 3);
      ctx.fillStyle = '#fef08a';
      ctx.fillRect(x + 13, y + 8, 2, 2);
    } else if (type === 'corona') {
      ctx.fillStyle = '#facc15';
      ctx.fillRect(x + 6, y + 13, 16, 5);
      ctx.fillStyle = '#fef08a';
      ctx.fillRect(x + 8, y + 8, 2, 5);
      ctx.fillRect(x + 11, y + 6, 2, 7);
      ctx.fillRect(x + 15, y + 6, 2, 7);
      ctx.fillRect(x + 18, y + 8, 2, 5);
    } else if (type === 'poporito') {
      ctx.fillStyle = '#facc15';
      ctx.fillRect(x + 11, y + 13, 6, 8);
      ctx.beginPath();
      ctx.arc(x + 14, y + 10, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#fef08a';
      ctx.fillRect(x + 13.5, y + 5, 1, 6);
    } else {
      ctx.fillStyle = '#facc15';
      ctx.beginPath();
      ctx.arc(x + 14, y + 14, 8, 0, Math.PI);
      ctx.fill();
      ctx.fillStyle = '#ca8a04';
      ctx.fillRect(x + 6, y + 13, 16, 2);
    }
  }

  // ============================================================
  // JUEGO 3: FESTIVAL DE ROCK - BBC Y KRAKEN (MINUTO 2:00)
  // JUGABILIDAD MEJORADA: CRHIS SUBE LIBREMENTE, METALEROS LENTOS
  // Y 5 SEGUNDOS DE MÚSICA AL LLEGAR Y BESARSE CON MADE
  // ============================================================
  initGame3() {
    this.game3 = {
      player: {
        x: this.width / 2,
        y: this.height - 55,
        speedX: 3.2,
        speedY: 2.8,
        facingDir: 'UP'
      },
      made: {
        x: this.width / 2 + 55,
        y: 118
      },
      distanceToStage: 550, // Trayecto ágil y entretenido
      totalDistance: 550,
      reachedFront: false,
      kissing: false,
      kissTimer: 0,
      drunkMetalheads: [],
      spawnTimer: 0,
      stageLightsTimer: 0,
      stageColor: '#dc2626'
    };
  }

  updateGame3(dt, step = 1.0, realDt = dt) {
    const g = this.game3;

    // Mini animación de beso de 8 segundos con música de Kraken al 100% (sin contador arriba)
    if (g.kissing) {
      g.kissTimer += realDt;

      if (g.kissTimer >= 8000) {
        this.handleLevelVictory();
      }
      return;
    }

    // JUGABILIDAD: Crhis avanza libremente en los 4 ejes
    let moveX = 0;
    let moveY = 0;

    // Subir / Avanzar hacia la tarima
    if (this.keys.up) {
      moveY -= 1;
      if (!g.reachedFront) {
        g.distanceToStage -= g.player.speedY * 3.4 * step;
        if (g.player.y > 170) g.player.y -= g.player.speedY * 0.7 * step;
      } else {
        if (g.player.y > 118) g.player.y -= g.player.speedY * step;
      }
    }

    // Retroceder / Bajar
    if (this.keys.down) {
      moveY += 1;
      if (g.player.y < this.height - 35) g.player.y += g.player.speedY * step;
      if (!g.reachedFront && g.distanceToStage < g.totalDistance) {
        g.distanceToStage += g.player.speedY * 1.2 * step;
      }
    }

    // Mover izquierda / derecha
    if (this.keys.left && g.player.x > 35) {
      g.player.x -= g.player.speedX * step;
      moveX -= 1;
    }
    if (this.keys.right && g.player.x < this.width - 35) {
      g.player.x += g.player.speedX * step;
      moveX += 1;
    }

    // Determinar dirección de mirada
    if (moveX !== 0 || moveY !== 0) {
      if (moveY < 0 && moveX < 0) g.player.facingDir = 'UP_LEFT';
      else if (moveY < 0 && moveX > 0) g.player.facingDir = 'UP_RIGHT';
      else if (moveY > 0 && moveX < 0) g.player.facingDir = 'DOWN_LEFT';
      else if (moveY > 0 && moveX > 0) g.player.facingDir = 'DOWN_RIGHT';
      else if (moveY < 0) g.player.facingDir = 'UP';
      else if (moveY > 0) g.player.facingDir = 'DOWN';
      else if (moveX < 0) g.player.facingDir = 'LEFT';
      else if (moveX > 0) g.player.facingDir = 'RIGHT';
    }

    const progress = (g.totalDistance - Math.max(0, g.distanceToStage)) / g.totalDistance;
    this.updateAudioVolume(progress);

    // En el concierto de Kraken se suprime el texto flotante para no obstruir el escenario
    const hudEl = document.getElementById('hudParam');
    if (hudEl) hudEl.textContent = '';

    g.stageLightsTimer += step;
    if (Math.floor(g.stageLightsTimer) % 25 === 0) {
      const colors = ['#dc2626', '#3b82f6', '#9333ea', '#eab308'];
      g.stageColor = colors[Math.floor(Math.random() * colors.length)];
    }

    if (!g.reachedFront) {
      g.spawnTimer += step;
      // Metaleros borrachos lentos y espaciados
      if (g.spawnTimer > 42 && g.distanceToStage > 25) {
        g.spawnTimer = 0;
        g.drunkMetalheads.push({
          x: 45 + Math.random() * (this.width - 90),
          y: 90,
          w: 20,
          h: 30,
          speedY: 0.60 + Math.random() * 0.25, // Paso lento y suave
          swaySpeed: 0.02 + Math.random() * 0.015,
          swayRange: 15 + Math.random() * 10,
          baseX: 0,
          time: Math.random() * 10,
          rockerType: Math.floor(Math.random() * 4)
        });
        g.drunkMetalheads[g.drunkMetalheads.length - 1].baseX = g.drunkMetalheads[g.drunkMetalheads.length - 1].x;
      }

      for (let i = g.drunkMetalheads.length - 1; i >= 0; i--) {
        const m = g.drunkMetalheads[i];
        m.y += m.speedY * step;
        m.time += m.swaySpeed * step;
        m.x = m.baseX + Math.sin(m.time) * m.swayRange;

        // Hitbox más permisiva para no chocar injustamente
        if (
          m.y > g.player.y - 24 && m.y < g.player.y + 8 &&
          Math.abs(m.x - g.player.x) < 15
        ) {
          this.handleFail("¡Tropezaste con un metalero y se regaron las cervezas de BBC! 🍺😱💥");
          return;
        }

        if (m.y > this.height + 40) g.drunkMetalheads.splice(i, 1);
      }

      // Al llegar a la tarima
      if (g.distanceToStage <= 0) {
        g.reachedFront = true;
        g.drunkMetalheads = [];
      }
    } else {
      // Frente a la tarima: Crhis camina directo hacia Made
      const distToMade = Math.hypot(g.player.x - g.made.x, g.player.y - g.made.y);
      if (distToMade < 26) {
        g.kissing = true;
        g.kissTimer = 0;
        this.updateAudioVolume(1.0); // 100% Kraken
      }
    }
  }

  drawGame3() {
    const g = this.game3;
    const ctx = this.ctx;

    // Prado y árboles de parque al aire libre (Simón Bolívar / Rock al Parque)
    this.drawParkFestivalScenery(g.stageColor);

    this.drawKrakenStageBanner();

    // Luces de escenario
    ctx.fillStyle = g.stageColor;
    ctx.globalAlpha = 0.20;
    ctx.beginPath();
    ctx.moveTo(40, 30); ctx.lineTo(0, 220); ctx.lineTo(130, 220); ctx.fill();
    ctx.beginPath();
    ctx.moveTo(this.width - 40, 30); ctx.lineTo(this.width - 130, 220); ctx.lineTo(this.width, 220); ctx.fill();
    ctx.globalAlpha = 1.0;

    // Banda en tarima
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(this.width / 2 - 14, 56, 28, 14);
    PixelSprites.drawPunkCresta(ctx, 55, 62, this.walkCycle, false);
    PixelSprites.drawMelenudo(ctx, this.width - 55, 62, this.walkCycle, false);
    PixelSprites.drawPeloRojo(ctx, this.width / 2, 62, this.walkCycle, false);

    // Valla divisoria entre escenario y público
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, 112);
    ctx.lineTo(this.width, 112);
    ctx.stroke();

    // Metaleros
    g.drunkMetalheads.forEach(m => {
      if (m.rockerType === 0) PixelSprites.drawPunkCresta(ctx, m.x, m.y, this.walkCycle, true);
      else if (m.rockerType === 1) PixelSprites.drawMelenudo(ctx, m.x, m.y, this.walkCycle, true);
      else if (m.rockerType === 2) PixelSprites.drawPeloRojo(ctx, m.x, m.y, this.walkCycle, true);
      else PixelSprites.drawPeloVioleta(ctx, m.x, m.y, this.walkCycle, true);
    });

    if (g.kissing) {
      const kissX = (g.player.x + g.made.x) / 2;
      const kissY = g.made.y + 4;
      PixelSprites.drawKissingCouple(ctx, kissX, kissY, this.walkCycle, true);

      ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
      ctx.fillRect(25, 210, this.width - 50, 52);
      ctx.strokeStyle = '#facc15';
      ctx.lineWidth = 2;
      ctx.strokeRect(25, 210, this.width - 50, 52);

      ctx.fillStyle = '#facc15';
      ctx.font = '8px "Press Start 2P"';
      ctx.fillText('👩‍❤️‍💋‍👨 ¡BESO ROCKERO! 🍻', 48, 228);

      ctx.fillStyle = '#f8fafc';
      ctx.font = '6px "Press Start 2P"';
      ctx.fillText('¡Polas entregadas y amor puro!', 34, 244);
    } else {
      PixelSprites.drawMade(ctx, g.made.x, g.made.y, 'DOWN', 0);

      if (g.reachedFront) {
        ctx.fillStyle = '#f43f5e';
        ctx.font = '12px sans-serif';
        ctx.fillText('❤️', g.made.x + 3, g.made.y - 10);
      }

      PixelSprites.drawCrhis(ctx, g.player.x, g.player.y, g.player.facingDir, this.walkCycle, true);
    }
  }

  // Dibuja el escenario del festival en parque al aire libre (prado y árboles laterales)
  drawParkFestivalScenery(stageColor = '#dc2626') {
    const ctx = this.ctx;
    const w = this.width;
    const h = this.height;

    // 1. Césped nocturno de base (prado del parque)
    ctx.fillStyle = '#0e381b';
    ctx.fillRect(0, 0, w, h);

    // Franjas de textura de pasto en el prado
    ctx.fillStyle = '#144c26';
    for (let y = 40; y < h; y += 18) {
      ctx.fillRect(0, y, w, 9);
    }

    // Briznas y matas de hierba verde esparcidas en el prado
    ctx.fillStyle = '#22783d';
    const grassSpots = [
      [42, 120], [75, 145], [115, 130], [185, 140], [225, 125], [270, 150],
      [55, 190], [140, 205], [210, 185], [260, 220],
      [48, 260], [105, 275], [175, 250], [235, 270],
      [60, 330], [120, 350], [190, 325], [255, 345],
      [45, 395], [110, 410], [180, 390], [240, 415]
    ];
    grassSpots.forEach(([gx, gy]) => {
      ctx.fillRect(gx, gy, 2, 4);
      ctx.fillRect(gx + 2, gy - 2, 2, 6);
      ctx.fillRect(gx + 4, gy + 1, 2, 3);
    });

    // 2. Iluminación nocturna de festival sobre el prado
    ctx.save();
    ctx.globalAlpha = 0.20;
    ctx.fillStyle = stageColor;
    ctx.beginPath();
    ctx.moveTo(w * 0.25, 45);
    ctx.lineTo(0, h);
    ctx.lineTo(w * 0.55, h);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(w * 0.75, 45);
    ctx.lineTo(w * 0.45, h);
    ctx.lineTo(w, h);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    // 3. Árboles frondosos de parque en los bordes laterales
    this.drawParkTrees();
  }

  drawParkTrees() {
    const ctx = this.ctx;
    const w = this.width;

    const drawTree = (x, y, scale = 1.0) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(scale, scale);

      // Sombra en el prado
      ctx.fillStyle = 'rgba(5, 25, 12, 0.45)';
      ctx.beginPath();
      ctx.ellipse(0, 30, 16, 6, 0, 0, Math.PI * 2);
      ctx.fill();

      // Tronco marrón
      ctx.fillStyle = '#451a03';
      ctx.fillRect(-4, 2, 8, 28);
      ctx.fillStyle = '#78350f';
      ctx.fillRect(-2, 2, 3, 26);

      // Raíces
      ctx.fillStyle = '#451a03';
      ctx.fillRect(-7, 26, 4, 3);
      ctx.fillRect(3, 26, 4, 3);

      // Copa frondosa exterior (verde profundo bosque nocturno)
      ctx.fillStyle = '#052e16';
      ctx.beginPath();
      ctx.arc(0, -6, 20, 0, Math.PI * 2);
      ctx.fill();

      // Copa frondosa media (verde parque)
      ctx.fillStyle = '#0f5132';
      ctx.beginPath();
      ctx.arc(-7, -8, 14, 0, Math.PI * 2);
      ctx.arc(7, -8, 14, 0, Math.PI * 2);
      ctx.arc(0, -18, 15, 0, Math.PI * 2);
      ctx.fill();

      // Hojas con iluminación suave
      ctx.fillStyle = '#198754';
      ctx.fillRect(-9, -23, 6, 5);
      ctx.fillRect(3, -25, 6, 5);
      ctx.fillRect(-14, -12, 5, 5);
      ctx.fillRect(8, -10, 6, 5);
      ctx.fillRect(-3, -15, 6, 6);

      ctx.restore();
    };

    // Árboles alineados en el borde izquierdo del parque
    drawTree(12, 90, 0.85);
    drawTree(14, 175, 0.95);
    drawTree(11, 265, 0.95);
    drawTree(15, 355, 0.9);
    drawTree(12, 420, 0.8);

    // Árboles alineados en el borde derecho del parque
    drawTree(w - 12, 90, 0.85);
    drawTree(w - 14, 175, 0.95);
    drawTree(w - 11, 265, 0.95);
    drawTree(w - 15, 355, 0.9);
    drawTree(w - 12, 420, 0.8);
  }

  drawKrakenStageBanner() {
    const ctx = this.ctx;
    const w = this.width;
    const cx = w / 2;

    // Estructura de tarima de festival
    ctx.fillStyle = '#0b0f19';
    ctx.fillRect(0, 0, w, 108);

    // Viga/truss superior de metal
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(0, 0, w, 6);
    ctx.fillStyle = '#334155';
    for (let tx = 4; tx < w; tx += 12) {
      ctx.fillRect(tx, 1, 6, 4);
    }

    // Pantalla LED central de fondo de Kraken
    const screenW = 124;
    const screenH = 46;
    const sx = cx - screenW / 2;
    const sy = 8;

    // Marco de pantalla con brillo dorado/metálico
    ctx.fillStyle = '#05070c';
    ctx.fillRect(sx - 3, sy - 2, screenW + 6, screenH + 4);
    ctx.strokeStyle = '#d97706';
    ctx.lineWidth = 2;
    ctx.strokeRect(sx - 2, sy - 1, screenW + 4, screenH + 2);

    // Contenido de la pantalla: Si la imagen oficial está lista, dibujarla con alta fidelidad
    let drewLogoImg = false;
    if (this.logoKraken && this.logoKraken.complete && this.logoKraken.naturalWidth > 0) {
      try {
        ctx.save();
        // Recortamos levemente el pie de copyright (sy 0 a 282) para resaltar el arte cósmico y logotipo
        ctx.drawImage(this.logoKraken, 0, 0, 399, 282, sx, sy, screenW, screenH);
        drewLogoImg = true;
        ctx.restore();
      } catch (e) {
        drewLogoImg = false;
      }
    }

    // Si aún no carga o fallback: renderizado 8-bit idéntico al logo oficial
    if (!drewLogoImg) {
      // Fondo espacial/estelar
      ctx.fillStyle = '#050814';
      ctx.fillRect(sx, sy, screenW, screenH);

      // Estrellas titilantes
      ctx.fillStyle = '#ffffff';
      const stars = [
        [sx + 10, sy + 6], [sx + 24, sy + 18], [sx + 95, sy + 8],
        [sx + 108, sy + 22], [sx + 15, sy + 38], [sx + 102, sy + 40]
      ];
      stars.forEach(([stX, stY]) => ctx.fillRect(stX, stY, 1, 1));

      // Bandera de Colombia estilizada detrás del medallón
      const flagY = sy + 6;
      ctx.fillStyle = '#facc15'; // Amarillo
      ctx.fillRect(sx + 12, flagY, screenW - 24, 7);
      ctx.fillStyle = '#2563eb'; // Azul
      ctx.fillRect(sx + 12, flagY + 7, screenW - 24, 4);
      ctx.fillStyle = '#dc2626'; // Rojo
      ctx.fillRect(sx + 12, flagY + 11, screenW - 24, 4);

      // Medallón circular con K ornamental
      const medX = cx;
      const medY = sy + 13;
      ctx.fillStyle = '#1c1917';
      ctx.beginPath();
      ctx.arc(medX, medY, 12, 0, Math.PI * 2);
      ctx.fill();

      // Borde de flama/tribal dorado
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 2;
      ctx.stroke();

      // "K" ornamental central
      ctx.fillStyle = '#fef08a';
      ctx.fillRect(medX - 4, medY - 6, 2, 12);
      ctx.fillRect(medX - 2, medY - 1, 2, 2);
      ctx.fillRect(medX, medY - 5, 2, 4);
      ctx.fillRect(medX + 2, medY - 3, 2, 3);
      ctx.fillRect(medX, medY + 2, 2, 4);
      ctx.fillRect(medX + 2, medY + 4, 3, 3);

      // Letras doradas K R A K E N en 3D
      ctx.fillStyle = '#000000';
      ctx.font = '9px "Press Start 2P"';
      ctx.fillText('K R A K E N', cx - 51, sy + 38);
      ctx.fillStyle = '#b45309';
      ctx.fillText('K R A K E N', cx - 53, sy + 37);
      ctx.fillStyle = '#fef08a';
      ctx.fillText('K R A K E N', cx - 53, sy + 36);
    }

    // Luces/spots estroboscópicos sobre el marco de la pantalla
    const spotColors = ['#ef4444', '#facc15', '#3b82f6', '#10b981'];
    for (let li = 0; li < 6; li++) {
      ctx.fillStyle = spotColors[(li + Math.floor(this.walkCycle * 0.1)) % spotColors.length];
      ctx.fillRect(sx + 6 + li * 20, sy - 4, 6, 2);
    }

    // Columnas de altavoces / line array a los lados del escenario
    const drawSpeakerStack = (stackX) => {
      ctx.fillStyle = '#020617';
      ctx.fillRect(stackX, 22, 20, 68);
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 1;
      ctx.strokeRect(stackX, 22, 20, 68);

      // Conos de altavoces
      for (let spY = 26; spY < 86; spY += 15) {
        ctx.fillStyle = '#1e293b';
        ctx.beginPath();
        ctx.arc(stackX + 10, spY + 6, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#090d16';
        ctx.beginPath();
        ctx.arc(stackX + 10, spY + 6, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // Luz piloto roja y verde
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(stackX + 2, 84, 2, 2);
      ctx.fillStyle = '#22c55e';
      ctx.fillRect(stackX + 6, 84, 2, 2);
    };

    drawSpeakerStack(6);
    drawSpeakerStack(w - 26);
  }

  // ============================================================
  // JUEGO 4: EL SLAM DE MARGARITA SIEMPRE VIVA
  // CÍRCULOS DE MOSH PIT NO ALINEADOS (EN DISTINTOS SITIOS DEL EJE X)
  // DEBEN PASAR POR DENTRO DE ELLOS POR SUS APERTURAS HASTA LLEGAR A LA TARIMA
  // ============================================================
  initGame4() {
    this.game4 = {
      player: {
        x: this.width / 2 - 10,
        y: this.height - 45,
        w: 22,
        h: 22,
        speed: 3.0,
        facingDir: 'UP'
      },
      distanceToStage: 900, // Trayecto dinámico y divertido
      totalDistance: 900,
      kissing: false,
      kissTimer: 0,
      // Círculos de slam NO ALINEADOS en X (distribuidos en distintos puntos)
      moshRings: [
        { x: 95, y: 310, radius: 44, angle: 0, rotSpeed: 0.012, gapWidth: 1.05 },             // Círculo 1 a la izquierda
        { x: this.width - 95, y: 205, radius: 44, angle: Math.PI / 2, rotSpeed: -0.012, gapWidth: 1.05 }, // Círculo 2 a la derecha
        { x: 120, y: 95, radius: 44, angle: 1.2, rotSpeed: 0.012, gapWidth: 1.05 }           // Círculo 3 al centro-izq
      ],
      humanChains: [
        { y: 255, xOffset: 0, speed: 0.8, dir: 1, gapX: 180 },
        { y: 150, xOffset: 30, speed: 0.9, dir: -1, gapX: 110 }
      ]
    };
  }

  updateGame4(dt, step = 1.0, realDt = dt) {
    const g = this.game4;

    // Mini animación de beso de 8 segundos al llegar (sin contador arriba)
    if (g.kissing) {
      g.kissTimer += realDt;

      if (g.kissTimer >= 8000) {
        this.handleLevelVictory();
      }
      return;
    }

    let moveX = 0;
    let moveY = 0;
    if (this.keys.up && g.player.y > 52) {
      g.player.y -= g.player.speed * step;
      g.distanceToStage -= g.player.speed * 3.5 * step;
      moveY -= 1;
    }
    if (this.keys.down && g.player.y < this.height - 30) {
      g.player.y += g.player.speed * step;
      g.distanceToStage += g.player.speed * 1.5 * step;
      moveY += 1;
    }
    if (this.keys.left && g.player.x > 25) {
      g.player.x -= g.player.speed * step;
      moveX -= 1;
    }
    if (this.keys.right && g.player.x < this.width - 25 - g.player.w) {
      g.player.x += g.player.speed * step;
      moveX += 1;
    }

    if (moveX !== 0 || moveY !== 0) {
      if (moveY < 0 && moveX < 0) g.player.facingDir = 'UP_LEFT';
      else if (moveY < 0 && moveX > 0) g.player.facingDir = 'UP_RIGHT';
      else if (moveY > 0 && moveX < 0) g.player.facingDir = 'DOWN_LEFT';
      else if (moveY > 0 && moveX > 0) g.player.facingDir = 'DOWN_RIGHT';
      else if (moveY < 0) g.player.facingDir = 'UP';
      else if (moveY > 0) g.player.facingDir = 'DOWN';
      else if (moveX < 0) g.player.facingDir = 'LEFT';
      else if (moveX > 0) g.player.facingDir = 'RIGHT';
    }

    const progress = 1.0 - (Math.max(0, g.distanceToStage) / g.totalDistance);
    this.updateAudioVolume(progress);

    // En el concierto de Margarita se suprime el texto flotante para no tapar el escenario
    const hudEl = document.getElementById('hudParam');
    if (hudEl) hudEl.textContent = '';

    // Rotación y verificación de paso a través de los círculos
    g.moshRings.forEach(ring => {
      ring.angle += ring.rotSpeed * step;

      const px = g.player.x + g.player.w / 2;
      const py = g.player.y + g.player.h / 2;
      const dist = Math.hypot(px - ring.x, py - ring.y);

      // Si están cruzando el perímetro del círculo de slam
      if (Math.abs(dist - ring.radius) < 6) {
        let playerAngle = Math.atan2(py - ring.y, px - ring.x);
        if (playerAngle < 0) playerAngle += Math.PI * 2;

        let curAngle1 = (ring.angle) % (Math.PI * 2);
        if (curAngle1 < 0) curAngle1 += Math.PI * 2;
        let curAngle2 = (ring.angle + Math.PI) % (Math.PI * 2);
        if (curAngle2 < 0) curAngle2 += Math.PI * 2;

        const inGap1 = Math.abs(this.angleDiff(playerAngle, curAngle1)) < ring.gapWidth;
        const inGap2 = Math.abs(this.angleDiff(playerAngle, curAngle2)) < ring.gapWidth;

        // Si intentan cruzar por donde hay personas en vez de la apertura, chocan
        if (!inGap1 && !inGap2) {
          this.handleFail("¡Los chocó la rueda de gente haciendo slam! Pasa por la apertura 🌀💥");
          return;
        }
      }
    });

    // Filas de rockeros en pogo
    g.humanChains.forEach(chain => {
      chain.xOffset += chain.speed * chain.dir * step;
      if (chain.xOffset > 35 || chain.xOffset < -35) chain.dir *= -1;

      if (Math.abs(g.player.y - chain.y) < 10) {
        const gapCenter = chain.gapX + chain.xOffset;
        const px = g.player.x + g.player.w / 2;
        if (Math.abs(px - gapCenter) > 36) {
          this.handleFail("¡Los empujó la fila de personas en el pogo! 🕺💥");
          return;
        }
      }
    });

    // Llegada a primera fila
    if (g.player.y <= 58 || g.distanceToStage <= 0) {
      g.kissing = true;
      g.kissTimer = 0;
      this.updateAudioVolume(1.0); // 100% Margarita Siempre Viva
    }
  }

  drawGame4() {
    const g = this.game4;
    const ctx = this.ctx;

    // Prado y árboles de parque al aire libre (Simón Bolívar / Rock al Parque)
    this.drawParkFestivalScenery('#38bdf8');

    this.drawMargaritaBandOnStage();

    // Ruedas de slam distribuidas en distintos puntos de X
    g.moshRings.forEach(ring => {
      this.drawDetailedMoshRing(ring);
    });

    // Filas de rockeros
    g.humanChains.forEach(chain => {
      this.drawHumanChain(chain);
    });

    if (g.kissing) {
      const kissX = this.width / 2;
      const kissY = 64;
      PixelSprites.drawKissingCouple(ctx, kissX, kissY, this.walkCycle, false);

      ctx.fillStyle = 'rgba(0, 0, 0, 0.82)';
      ctx.fillRect(25, 180, this.width - 50, 54);
      ctx.strokeStyle = '#d8c39d';
      ctx.lineWidth = 2;
      ctx.strokeRect(25, 180, this.width - 50, 54);

      ctx.fillStyle = '#d8c39d';
      ctx.font = '8px "Press Start 2P"';
      ctx.fillText('🌸 ¡BESO EN PRIMERA FILA! 🌸', 34, 198);

      ctx.fillStyle = '#f8fafc';
      ctx.font = '6px "Press Start 2P"';
      ctx.fillText('¡Juntos con Margarita Siempre Viva!', 31, 214);
    } else {
      PixelSprites.drawCrhis(ctx, g.player.x + 4, g.player.y + 4, g.player.facingDir, this.walkCycle);
      PixelSprites.drawMade(ctx, g.player.x + 18, g.player.y + 4, g.player.facingDir, this.walkCycle);
      ctx.fillStyle = '#fed7aa';
      ctx.fillRect(g.player.x + 9, g.player.y + 6, 4, 3);
    }
  }

  drawMargaritaBandOnStage() {
    const ctx = this.ctx;
    const w = this.width;
    const cx = w / 2;

    // Tarima de madera / base de escenario
    ctx.fillStyle = '#111827';
    ctx.fillRect(0, 0, w, 56);

    // Truss superior metálico
    ctx.fillStyle = '#1f2937';
    ctx.fillRect(0, 0, w, 4);

    // Pantalla LED central de fondo con el logo oficial
    const screenW = 124;
    const screenH = 34;
    const sx = cx - screenW / 2;
    const sy = 5;

    // Marco de pantalla con tono cálido / dorado retro
    ctx.fillStyle = '#182226'; // Fondo característico del logo
    ctx.fillRect(sx - 2, sy - 1, screenW + 4, screenH + 2);
    ctx.strokeStyle = '#c5a982';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(sx - 1, sy, screenW + 2, screenH);

    // Dibujar logo oficial si está cargado
    let drewMargaritaImg = false;
    if (this.logoMargarita && this.logoMargarita.complete && this.logoMargarita.naturalWidth > 0) {
      try {
        ctx.save();
        // Usamos el recorte exacto donde se ubica el texto: sx: 58, sy: 154, sw: 332, sh: 125
        ctx.drawImage(this.logoMargarita, 58, 154, 332, 125, sx + 2, sy + 2, screenW - 4, screenH - 4);
        drewMargaritaImg = true;
        ctx.restore();
      } catch (e) {
        drewMargaritaImg = false;
      }
    }

    // Si aún no carga o fallback 8-bit:
    if (!drewMargaritaImg) {
      ctx.fillStyle = '#182226';
      ctx.fillRect(sx, sy, screenW, screenH);

      // Tipografía idéntica al logo:
      // "MARGARITA"
      // "SIEMPRE VIVA" en beige dorado
      ctx.fillStyle = '#050709';
      ctx.font = '8px "Press Start 2P"';
      ctx.fillText('MARGARITA', cx - 39, sy + 14);
      ctx.fillText('SIEMPRE VIVA', cx - 51, sy + 26);

      ctx.fillStyle = '#c5a982'; // Color cálido beige original del logo
      ctx.fillText('MARGARITA', cx - 40, sy + 13);
      ctx.fillText('SIEMPRE VIVA', cx - 52, sy + 25);
    }

    // Altavoces laterales (torres de sonido del festival)
    const drawSpeaker = (spX) => {
      ctx.fillStyle = '#090d16';
      ctx.fillRect(spX, 8, 16, 42);
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 1;
      ctx.strokeRect(spX, 8, 16, 42);
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(spX + 2, 12, 12, 10);
      ctx.fillRect(spX + 2, 25, 12, 10);
      ctx.fillStyle = '#38bdf8';
      ctx.fillRect(spX + 3, 38, 2, 2);
    };
    drawSpeaker(6);
    drawSpeaker(w - 22);

    // Margaritas / flores decorativas a los lados de la tarima
    this.drawDaisyFlower(27, 20);
    this.drawDaisyFlower(w - 27, 20);

    // Batería en el centro de la tarima
    ctx.fillStyle = '#e2e8f0';
    ctx.fillRect(cx - 10, 36, 20, 10);
    ctx.fillStyle = '#facc15'; // Platillos dorados
    ctx.beginPath();
    ctx.arc(cx - 13, 37, 4, 0, Math.PI * 2);
    ctx.arc(cx + 13, 37, 4, 0, Math.PI * 2);
    ctx.fill();

    // Músicos de Margarita Siempre Viva en tarima (TODOS con cabello 100% negro)
    PixelSprites.drawMargaritaFan(ctx, cx, 43, this.walkCycle, 0);       // Baterista / Vocalista
    PixelSprites.drawMargaritaFan(ctx, cx - 42, 43, this.walkCycle, 1);  // Guitarrista
    PixelSprites.drawMargaritaFan(ctx, cx + 42, 43, this.walkCycle, 2);  // Bajista

    // Valla de contención frente a tarima (primera fila)
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, 56);
    ctx.lineTo(w, 56);
    ctx.stroke();
  }

  drawDaisyFlower(x, y) {
    const ctx = this.ctx;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(x - 4, y - 1, 8, 2);
    ctx.fillRect(x - 1, y - 4, 2, 8);
    ctx.fillStyle = '#facc15';
    ctx.fillRect(x - 2, y - 2, 4, 4);
  }

  drawDetailedMoshRing(ring) {
    const ctx = this.ctx;
    const countPeople = 20;

    for (let i = 0; i < countPeople; i++) {
      const pAngle = ring.angle + (i / countPeople) * Math.PI * 2;
      let normAngle = pAngle % (Math.PI * 2);
      if (normAngle < 0) normAngle += Math.PI * 2;

      let gap1 = (ring.angle) % (Math.PI * 2);
      if (gap1 < 0) gap1 += Math.PI * 2;
      let gap2 = (ring.angle + Math.PI) % (Math.PI * 2);
      if (gap2 < 0) gap2 += Math.PI * 2;

      const inGap1 = Math.abs(this.angleDiff(normAngle, gap1)) < ring.gapWidth;
      const inGap2 = Math.abs(this.angleDiff(normAngle, gap2)) < ring.gapWidth;

      // Si no es apertura, dibujar personas en la rueda
      if (!inGap1 && !inGap2) {
        const px = ring.x + Math.cos(pAngle) * ring.radius;
        const py = ring.y + Math.sin(pAngle) * ring.radius;
        PixelSprites.drawMargaritaFan(ctx, px, py, this.walkCycle, i % 4);
      } else {
        // En la apertura, dibujar un indicador verde de paso
        const px = ring.x + Math.cos(pAngle) * ring.radius;
        const py = ring.y + Math.sin(pAngle) * ring.radius;
        ctx.fillStyle = '#22c55e';
        ctx.beginPath();
        ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    ctx.strokeStyle = 'rgba(216, 195, 157, 0.4)';
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.arc(ring.x, ring.y, ring.radius - 8, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);
  }

  drawHumanChain(chain) {
    const ctx = this.ctx;
    const gapCenter = chain.gapX + chain.xOffset;

    let idx = 0;
    for (let x = 16; x < gapCenter - 32; x += 18) {
      PixelSprites.drawMargaritaFan(ctx, x, chain.y, this.walkCycle, (idx++) % 4);
    }
    for (let x = gapCenter + 32; x < this.width - 16; x += 18) {
      PixelSprites.drawMargaritaFan(ctx, x, chain.y, this.walkCycle, (idx++) % 4);
    }

    ctx.fillStyle = '#22c55e';
    ctx.font = '7px "Press Start 2P"';
    ctx.fillText('PASA', gapCenter - 14, chain.y + 4);
  }

  angleDiff(a, b) {
    let diff = (a - b + Math.PI) % (Math.PI * 2) - Math.PI;
    return (diff < -Math.PI) ? diff + Math.PI * 2 : diff;
  }

  checkAABB(a, b) {
    return (
      a.x < b.x + b.w &&
      a.x + a.w > b.x &&
      a.y < b.y + b.h &&
      a.y + a.h > b.y
    );
  }

  drawPoporo(x, y) {
    const ctx = this.ctx;
    const cx = x + 16;
    const cy = y + 18;

    // 1. Haz de luz dramático desde el techo hacia el Poporo
    const spotGrad = ctx.createLinearGradient(cx, 0, cx, y + 46);
    spotGrad.addColorStop(0, 'rgba(254, 240, 138, 0.40)');
    spotGrad.addColorStop(0.45, 'rgba(250, 204, 21, 0.22)');
    spotGrad.addColorStop(1, 'rgba(202, 138, 4, 0.04)');
    ctx.fillStyle = spotGrad;
    ctx.beginPath();
    ctx.moveTo(cx - 24, 0);
    ctx.lineTo(cx + 24, 0);
    ctx.lineTo(cx + 44, y + 46);
    ctx.lineTo(cx - 44, y + 46);
    ctx.closePath();
    ctx.fill();

    // 2. Halo radial dorado sagrado alrededor del Poporo
    const halo = ctx.createRadialGradient(cx, cy, 3, cx, cy, 32);
    halo.addColorStop(0, 'rgba(253, 224, 71, 0.48)');
    halo.addColorStop(0.5, 'rgba(234, 179, 8, 0.22)');
    halo.addColorStop(1, 'rgba(161, 98, 7, 0)');
    ctx.fillStyle = halo;
    ctx.beginPath();
    ctx.arc(cx, cy, 32, 0, Math.PI * 2);
    ctx.fill();

    // 3. Partículas flotantes de polvo de oro titilando en tiempo real
    const t = Date.now() * 0.003;
    for (let i = 0; i < 14; i++) {
      const spX = cx - 22 + ((i * 17 + Math.sin(t + i * 1.3) * 10 + 40) % 44);
      const spY = y - 4 + ((i * 11 + Math.cos(t * 0.8 + i) * 8 + 36) % 36);
      const alpha = 0.35 + 0.55 * Math.sin(t * 2.2 + i * 1.4);
      ctx.fillStyle = `rgba(254, 240, 138, ${Math.max(0, alpha)})`;
      ctx.fillRect(spX, spY, 1.5, 1.5);
    }

    // 4. Gran Pedestal de Exhibición del Museo
    // Nivel 1: Base de granito negro y caoba
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(cx - 36, y + 32, 72, 12);
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(cx - 38, y + 42, 76, 3);
    // Moldura dorada de la base
    ctx.fillStyle = '#ca8a04';
    ctx.fillRect(cx - 36, y + 32, 72, 2);
    ctx.fillRect(cx - 36, y + 41, 72, 1);

    // Placa de bronce dorada conmemorativa del Poporo Quimbaya
    ctx.fillStyle = '#ca8a04';
    ctx.fillRect(cx - 30, y + 35, 60, 6);
    ctx.fillStyle = '#fef08a';
    ctx.fillRect(cx - 28, y + 36, 56, 4);
    ctx.fillStyle = '#78350f';
    ctx.font = '4px "Press Start 2P", sans-serif';
    ctx.fillText('🏛️ POPORO QUIMBAYA', cx - 27, y + 39.5);

    // Nivel 2: Pedestal superior con almohadilla de terciopelo carmesí
    ctx.fillStyle = '#271206';
    ctx.fillRect(cx - 24, y + 26, 48, 6);
    ctx.fillStyle = '#7f1d1d';
    ctx.fillRect(cx - 22, y + 25, 44, 2);

    // 5. Vitrina de cristal blindado de seguridad
    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.fillRect(cx - 24, y, 48, 26);
    ctx.strokeStyle = '#ca8a04';
    ctx.lineWidth = 1;
    ctx.strokeRect(cx - 24, y, 48, 26);

    // Reflejo diagonal brillante en el cristal
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.38)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(cx - 20, y + 20);
    ctx.lineTo(cx + 8, y + 4);
    ctx.stroke();

    // 6. El Poporo Quimbaya en Pixel Art Auténtico (Oro Legendario)
    // Aguja / Alfiler ceremonial de orfebrería que sobresale arriba
    ctx.fillStyle = '#fef08a';
    ctx.fillRect(cx - 0.5, y + 2, 1.5, 9);
    ctx.fillStyle = '#facc15';
    ctx.beginPath();
    ctx.arc(cx + 0.25, y + 2, 1.5, 0, Math.PI * 2);
    ctx.fill();

    // Las Cuatro Esferas Superiores características del Poporo Quimbaya
    ctx.fillStyle = '#facc15';
    ctx.beginPath(); ctx.arc(cx - 6, y + 10, 3.8, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(cx + 6, y + 10, 3.8, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(cx, y + 11.5, 4.2, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(cx, y + 8, 3.5, 0, Math.PI * 2); ctx.fill();

    // Brillos especulares en las esferas
    ctx.fillStyle = '#fef08a';
    ctx.fillRect(cx - 7, y + 8, 2, 2);
    ctx.fillRect(cx + 5, y + 8, 2, 2);
    ctx.fillRect(cx - 1, y + 9.5, 2, 2);

    // Cuello estilizado del Poporo
    ctx.fillStyle = '#ca8a04';
    ctx.fillRect(cx - 3.5, y + 14, 7, 3);
    ctx.fillStyle = '#facc15';
    ctx.fillRect(cx - 2.5, y + 14, 5, 3);

    // Cuerpo bulboso (Vasija globular de doble curvatura)
    ctx.fillStyle = '#facc15';
    ctx.beginPath();
    ctx.arc(cx, y + 19, 7.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#d97706';
    ctx.beginPath();
    ctx.arc(cx, y + 23, 9, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#facc15';
    ctx.beginPath();
    ctx.arc(cx, y + 22.5, 8, 0, Math.PI * 2);
    ctx.fill();

    // Brillo dorado lustroso en el flanco izquierdo
    ctx.fillStyle = '#fef08a';
    ctx.fillRect(cx - 6, y + 18, 3, 4);
    ctx.fillRect(cx - 7, y + 21, 3, 3);
    // Destello blanco puro en el punto de máxima luz
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(cx - 5, y + 19, 1.5, 1.5);
  }

  drawTrafficCar(x, y, w, h, type) {
    const ctx = this.ctx;
    ctx.fillStyle = 'rgba(0, 0, 0, 0.32)';
    ctx.fillRect(x + 2, y + 3, w, h);

    if (type === 'taxi') {
      // 1. TAXI COLOMBIANO CLÁSICO (Amarillo con damero de cuadritos y letrero TAXI)
      // Llantas
      ctx.fillStyle = '#09090b';
      ctx.fillRect(x - 2, y + 5, 3, 9);
      ctx.fillRect(x + w - 1, y + 5, 3, 9);
      ctx.fillRect(x - 2, y + h - 14, 3, 9);
      ctx.fillRect(x + w - 1, y + h - 14, 3, 9);

      // Carrocería amarilla
      ctx.fillStyle = '#facc15';
      ctx.fillRect(x, y, w, h);
      ctx.strokeStyle = '#ca8a04';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(x, y, w, h);

      // Parabrisas frontal y trasero
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(x + 3, y + 9, w - 6, 8);
      ctx.fillStyle = '#38bdf8';
      ctx.fillRect(x + 5, y + 10, 4, 6); // Reflejo
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(x + 3, y + h - 13, w - 6, 6);

      // Franja de cuadritos estilo damero (ajedrez blanco y negro) en los costados
      for (let cy = y + 18; cy < y + h - 14; cy += 4) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(x + 1, cy, 3, 2);
        ctx.fillRect(x + w - 4, cy + 2, 3, 2);
        ctx.fillStyle = '#000000';
        ctx.fillRect(x + 1, cy + 2, 3, 2);
        ctx.fillRect(x + w - 4, cy, 3, 2);
      }

      // Letrero luminoso "TAXI" en el techo
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(x + 4, y + 20, w - 8, 7);
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 1;
      ctx.strokeRect(x + 4, y + 20, w - 8, 7);
      ctx.fillStyle = '#dc2626';
      ctx.font = '5px "Press Start 2P"';
      ctx.fillText('TAXI', x + 5, y + 26);

      // Faros y stops
      ctx.fillStyle = '#fef08a';
      ctx.fillRect(x + 2, y, 5, 2);
      ctx.fillRect(x + w - 7, y, 5, 2);
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(x + 2, y + h - 2, 5, 2);
      ctx.fillRect(x + w - 7, y + h - 2, 5, 2);

    } else if (type === 'bus') {
      // 2. BUS INTERMUNICIPAL DE TRÁFICO
      // Llantas
      ctx.fillStyle = '#09090b';
      ctx.fillRect(x - 2, y + 10, 3, 12);
      ctx.fillRect(x + w - 1, y + 10, 3, 12);
      ctx.fillRect(x - 2, y + h - 20, 3, 14);
      ctx.fillRect(x + w - 1, y + h - 20, 3, 14);

      // Carrocería verde esmeralda con franja blanca
      ctx.fillStyle = '#16a34a';
      ctx.fillRect(x, y, w, h);
      ctx.strokeStyle = '#14532d';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(x, y, w, h);

      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(x + 2, y + 24, w - 4, 4);

      // Claraboyas en el techo
      ctx.fillStyle = '#e2e8f0';
      ctx.fillRect(x + 10, y + 32, w - 20, 16);

      // Parabrisas frontal panorámico
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(x + 3, y + 5, w - 6, 12);
      ctx.fillStyle = '#38bdf8';
      ctx.fillRect(x + 6, y + 6, 5, 10);

      // Faros
      ctx.fillStyle = '#fef08a';
      ctx.fillRect(x + 2, y, 6, 3);
      ctx.fillRect(x + w - 8, y, 6, 3);
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(x + 2, y + h - 3, 6, 3);
      ctx.fillRect(x + w - 8, y + h - 3, 6, 3);

    } else {
      // 3. SUV / CAMIONETA FAMILIAR PARTICULAR
      // Llantas deportivas anchas
      ctx.fillStyle = '#09090b';
      ctx.fillRect(x - 2, y + 6, 3, 10);
      ctx.fillRect(x + w - 1, y + 6, 3, 10);
      ctx.fillRect(x - 2, y + h - 16, 3, 10);
      ctx.fillRect(x + w - 1, y + h - 16, 3, 10);

      // Carrocería roja cereza
      ctx.fillStyle = '#dc2626';
      ctx.fillRect(x, y, w, h);
      ctx.strokeStyle = '#7f1d1d';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(x, y, w, h);

      // Parabrisas delantero
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(x + 3, y + 10, w - 6, 8);
      ctx.fillStyle = '#38bdf8';
      ctx.fillRect(x + 6, y + 11, 4, 6);

      // Sunroof oscuro en el techo
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(x + 6, y + 20, w - 12, 10);

      // Barras de techo portaequipaje
      ctx.fillStyle = '#e2e8f0';
      ctx.fillRect(x + 3, y + 19, 2, 14);
      ctx.fillRect(x + w - 5, y + 19, 2, 14);

      // Faros LED afilados y stops traseros
      ctx.fillStyle = '#fef08a';
      ctx.fillRect(x + 2, y, 6, 3);
      ctx.fillRect(x + w - 8, y, 6, 3);
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(x + 2, y + h - 3, w - 4, 3);
    }
  }

  startLoop() {
    let frameCounter = 0;
    const loop = (timestamp) => {
      if (!this.lastTime) this.lastTime = timestamp;
      const rawDt = timestamp - this.lastTime;
      this.lastTime = timestamp;

      // Limitar dt para evitar saltos o tirones
      const dt = Math.max(8, Math.min(rawDt, 50));
      // Factor normalizado a 60 FPS estándar multiplicado por el factor de velocidad
      const baseStep = dt / 16.666;
      const step = baseStep * this.speedMultiplier;
      const gameDt = dt * this.speedMultiplier;

      frameCounter++;
      if (frameCounter % Math.max(1, Math.round(8 / step)) === 0) {
        this.walkCycle = (this.walkCycle + 1) % 4;
      }

      if (this.gameState === 'PLAYING') {
        if (this.currentLevel === 1) this.updateGame1(gameDt, step, dt);
        else if (this.currentLevel === 2) this.updateGame2(gameDt, step, dt);
        else if (this.currentLevel === 3) this.updateGame3(gameDt, step, dt);
        else if (this.currentLevel === 4) this.updateGame4(gameDt, step, dt);
      } else if (this.gameState === 'DYING') {
        this.updateDeath(rawDt || dt);
      }

      this.ctx.clearRect(0, 0, this.width, this.height);
      if (this.currentLevel === 1) this.drawGame1();
      else if (this.currentLevel === 2) this.drawGame2();
      else if (this.currentLevel === 3) this.drawGame3();
      else if (this.currentLevel === 4) this.drawGame4();

      if (this.gameState === 'DYING') {
        this.drawDeathEffect();
      }

      this.animationFrameId = requestAnimationFrame(loop);
    };

    this.animationFrameId = requestAnimationFrame(loop);
  }
}

let gameInstance = null;
window.addEventListener('DOMContentLoaded', () => {
  window.gameInstance = new MinijuegosManager();
  gameInstance = window.gameInstance;
});
