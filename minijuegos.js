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

    // Logos oficiales precargados para los escenarios de concierto
    this.logoKraken = new Image();
    this.logoKraken.src = 'images/logo_kraken.png';
    this.logoMargarita = new Image();
    this.logoMargarita.src = 'images/logo_margarita.png';

    // Factor de aceleración / velocidad de juego (1.2 = +20% por defecto)
    this.speedMultiplier = parseFloat(localStorage.getItem('arcade_speed_multiplier') || '1.2');

    this.game1 = null;
    this.game2 = null;
    this.game3 = null;
    this.game4 = null;

    this.initEventListeners();
    this.setupLevel(1);
    this.startLoop();
  }

  setSpeedMultiplier(multiplier) {
    this.speedMultiplier = Math.max(0.6, Math.min(2.5, parseFloat(multiplier) || 1.2));
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
    g.player.currentLane = nextLane;
    g.player.targetX = g.lanes[nextLane];
  }

  stopAudio() {
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
    if (level === 3) {
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

  setupLevel(levelNumber) {
    this.currentLevel = levelNumber;
    this.stopAudio();
    this.stopAllExternalMusic();

    document.getElementById('hudLevelTag').textContent = `NIVEL ${levelNumber}/4`;

    for (let i = 1; i <= 4; i++) {
      const btn = document.getElementById(`devBtnLevel${i}`);
      if (btn) btn.classList.toggle('active', i === levelNumber);
    }

    if (levelNumber === 1) {
      this.initGame1();
      this.showOverlay('intro', '🚗 NIVEL 1: RUMBO A LA TERMINAL', 
        '¡Hora de viajar a Bogotá!<br><br>Primero Crhis viaja en inDrive hacia la Terminal de Pereira, y luego Made esquiva el tráfico en el inDrive Moto para encontrarse en la estación antes de abordar el bus.<br><br>👉 <strong>Toca izquierda o derecha</strong> para esquivar los vehículos.', 
        '¡ARRANCAR!');
    } else if (levelNumber === 2) {
      this.initGame2();
      this.showOverlay('intro', '🏺 NIVEL 2: EL POPORO DEL MUSEO DEL ORO', 
        'El par de enamorados quieren llegar a ver el <strong>Poporo Quimbaya</strong>.<br><br>🛡️ <strong>El truco:</strong> Deténganse en las <em>alfombras rojas protegidas</em> para que las flechas y rocas pasen de largo sin tocarlos.<br>¡Caminen juntos de la mano!', 
        '¡EXPLORAR EL MUSEO!');
    } else if (levelNumber === 3) {
      this.initGame3();
      this.showOverlay('intro', '🍺 NIVEL 3: MISIÓN BBC & KRAKEN', 
        'Crhis lleva dos cervezas BBC bien frías hacia la valla de la tarima donde Made lo está esperando.<br><br>Avanza esquivando a los rockeros para que no se riegue la pola y llega directo hasta Made para brindar juntos.', 
        '¡A LLEVAR LA POLA!');
    } else if (levelNumber === 4) {
      this.initGame4();
      this.showOverlay('intro', '🌸 NIVEL 4: EL CONCIERTO DE MARGARITA', 
        '¡Margarita Siempre Viva está tocando en vivo en la tarima!<br><br>Crhis y Made van juntos hacia la primera fila. Pasen a través de las aperturas de las ruedas de slam y esquiven el pogo hasta llegar al escenario.', 
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
    if (this.currentLevel === 3 || this.currentLevel === 4) {
      this.playLevelAudio(this.currentLevel);
    }
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
    descEl.innerHTML = `${reasonText}<br><br>Para superar esta historia juntos, <strong>toca reiniciar desde el Nivel 1</strong>. ¡Ánimo Made, tú puedes! ❤️`;
    btn.textContent = '🔄 REINTENTAR DESDE NIVEL 1';

    btn.onclick = () => {
      this.hideOverlay();
      this.setupLevel(1);
    };

    overlay.classList.remove('hidden');
  }

  handleLevelVictory() {
    this.gameState = 'VICTORY_LEVEL';
    this.stopAudio();

    if (this.currentLevel < 4) {
      const nextLvl = this.currentLevel + 1;
      this.showOverlay('success', '🎉 ¡NIVEL SUPERADO!', 
        `¡Excelente trabajo en equipo! 👏<br>Siguiente capítulo de su historia: <strong>Nivel ${nextLvl}</strong>.`, 
        `CONTINUAR A NIVEL ${nextLvl} ➡️`);
      
      const btn = document.getElementById('overlayStartBtn');
      btn.onclick = () => {
        this.hideOverlay();
        this.setupLevel(nextLvl);
      };
    } else {
      this.gameState = 'VICTORY_ALL';
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
      Superaron llegar a tiempo a la terminal, disfrutaron de un parche cultural en el Museo del Oro, brindis con polas en frente de la tarima de Kraken y momento de besos y abrazos en Margarita Siempre Viva. 🥰❤️<br><br>
      <strong>¡Ahora están juntos y listos para lo que sigue!</strong> ✨❤️
    `;
    btn.textContent = 'SIGUIENTE';

    btn.onclick = () => {
      this.stopAudio();
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
        w: 26,
        h: 46
      },
      roadOffset: 0,
      roadSpeed: 5.4,
      distanceTraveled: 0,
      targetDistance: 450,
      traffic: [],
      spawnTimer: 0,
      terminalBuildingY: -130,
      // Variables para la animación de encuentro en la terminal
      crhisWaitingX: 185,
      crhisWaitingY: 90,
      madeArrivalX: 110,
      madeArrivalY: 90,
      animTimer: 0,
      busOffset: 0
    };
  }

  updateGame1(dt, step = 1.0) {
    const g = this.game1;

    // Fase 3: Animación de encuentro, beso y abordaje al bus
    if (g.subPhase === 'MEETING_ANIMATION') {
      g.animTimer += dt;

      // Made y Crhis caminan hacia el centro del andén para encontrarse
      if (g.madeArrivalX < 145) g.madeArrivalX += 1.4 * step;
      if (g.crhisWaitingX > 155) g.crhisWaitingX -= 1.4 * step;

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

      // Caminan juntos hacia la puerta del bus
      if (g.madeArrivalX > 115) {
        g.madeArrivalX -= 1.2 * step;
        g.crhisWaitingX -= 1.2 * step;
      }

      document.getElementById('hudParam').textContent = `🚌 ¡Abordando bus a Bogotá!`;

      // A los 1.8 segundos, el bus cierra puertas y arranca
      if (g.animTimer > 1800) {
        g.busOffset += 3.4 * step;
      }

      if (g.animTimer >= 3600) {
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
          g.player.w = 20;
          g.player.h = 42;
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
          w: (type === 'bus') ? 34 : 26,
          h: (type === 'bus') ? 64 : 44,
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
        this.handleFail(`¡${victim} en la autopista hacia la terminal! 💥`);
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

    ctx.fillStyle = '#15803d';
    ctx.fillRect(0, 0, this.width, this.height);

    ctx.fillStyle = '#334155';
    ctx.fillRect(40, 0, this.width - 80, this.height);

    ctx.fillStyle = '#ef4444';
    ctx.fillRect(36, 0, 4, this.height);
    ctx.fillRect(this.width - 40, 0, 4, this.height);

    ctx.fillStyle = '#f8fafc';
    const dividers = [120, 200];
    for (const dx of dividers) {
      for (let y = -40 + g.roadOffset; y < this.height; y += 40) {
        ctx.fillRect(dx - 1.5, y, 3, 22);
      }
    }

    // Dibujar la Terminal de Pereira
    const termY = (g.subPhase === 'MEETING_ANIMATION' || g.subPhase === 'BUS_BOARDING') ? 40 : g.terminalBuildingY;

    if (termY > -110) {
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(20, termY, this.width - 40, 75);
      ctx.fillStyle = '#facc15';
      ctx.fillRect(30, termY + 8, this.width - 60, 18);
      ctx.fillStyle = '#000';
      ctx.font = '7px "Press Start 2P"';
      ctx.fillText('TERMINAL DE PEREIRA', 45, termY + 20);

      // Bus grande verde a Bogotá (se mueve al arrancar)
      const busY = termY + 32 - g.busOffset;
      ctx.fillStyle = '#16a34a';
      ctx.fillRect(65, busY, 95, 36);
      ctx.fillStyle = '#fff';
      ctx.font = '6px "Press Start 2P"';
      ctx.fillText('BUS BOGOTÁ', 74, busY + 16);

      // Ventanillas del bus
      ctx.fillStyle = '#38bdf8';
      ctx.fillRect(70, busY + 22, 16, 8);
      ctx.fillRect(92, busY + 22, 16, 8);
      ctx.fillRect(114, busY + 22, 16, 8);
      ctx.fillRect(136, busY + 22, 16, 8);

      // Puerta del bus
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(148, busY + 18, 10, 16);

      // Humo del bus si arranca
      if (g.busOffset > 0) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.beginPath();
        ctx.arc(60, busY + 30, 6, 0, Math.PI * 2);
        ctx.arc(52, busY + 34, 9, 0, Math.PI * 2);
        ctx.fill();
      }

      // Animación de Made llegando, beso y subida al bus
      if (g.subPhase === 'MEETING_ANIMATION' || g.subPhase === 'BUS_BOARDING') {
        // Andén de la terminal
        ctx.fillStyle = '#64748b';
        ctx.fillRect(30, termY + 70, this.width - 60, 48);

        // La moto de inDrive estacionada en el andén
        ctx.fillStyle = '#22c55e';
        ctx.fillRect(60, termY + 85, 20, 10);
        ctx.fillStyle = '#000';
        ctx.font = '5px "Press Start 2P"';
        ctx.fillText('inD', 62, termY + 93);

        if (g.subPhase === 'MEETING_ANIMATION') {
          // Si ya están cerca en el centro, se besan
          if (Math.abs(g.madeArrivalX - g.crhisWaitingX) <= 12) {
            PixelSprites.drawKissingCouple(ctx, (g.madeArrivalX + g.crhisWaitingX) / 2, termY + 95, this.walkCycle, false);

            ctx.fillStyle = 'rgba(0, 0, 0, 0.75)';
            ctx.fillRect(35, termY + 124, this.width - 70, 24);
            ctx.fillStyle = '#facc15';
            ctx.font = '6px "Press Start 2P"';
            ctx.fillText('👩‍❤️‍💋‍👨 ¡AL FIN JUNTOS! ❤️', 50, termY + 138);
          } else {
            // Corriendo a encontrarse
            PixelSprites.drawMade(ctx, g.madeArrivalX, termY + 95, 'RIGHT', this.walkCycle);
            PixelSprites.drawCrhis(ctx, g.crhisWaitingX, termY + 95, 'LEFT', this.walkCycle);
          }
        } else if (g.subPhase === 'BUS_BOARDING') {
          // Si el bus ya arrancó, van adentro
          if (g.busOffset > 20) {
            // Crhis y Made saludando desde la ventanilla del bus
            ctx.fillStyle = '#fed7aa';
            ctx.fillRect(94, busY + 23, 4, 4);
            ctx.fillRect(116, busY + 23, 4, 4);
            ctx.fillStyle = '#f43f5e';
            ctx.font = '8px sans-serif';
            ctx.fillText('❤️', 104, busY + 18);
          } else {
            // Caminando de la mano hacia la puerta del bus
            PixelSprites.drawCrhis(ctx, g.crhisWaitingX - 6, termY + 80, 'UP', this.walkCycle);
            PixelSprites.drawMade(ctx, g.madeArrivalX + 6, termY + 80, 'UP', this.walkCycle);
          }
        }
      } else if (g.subPhase === 'MADE_MOTO') {
        // Crhis esperando en el andén con maleta
        PixelSprites.drawCrhis(ctx, 185, termY + 50, 'DOWN', 0);
        ctx.fillStyle = '#78350f';
        ctx.fillRect(195, termY + 52, 7, 9);
      }
    }

    // Si aún están en carretera, dibujar tráfico y vehículo activo
    if (g.subPhase === 'CRHIS_INDRIVE' || g.subPhase === 'MADE_MOTO') {
      g.traffic.forEach(car => {
        this.drawTrafficCar(car.x - car.w / 2, car.y, car.w, car.h, car.type);
      });

      if (g.subPhase === 'CRHIS_INDRIVE') {
        this.drawInDriveCar(g.player.x, g.player.y);
      } else {
        this.drawMadeInDriveMotorcycle(g.player.x, g.player.y);
      }
    }
  }

  drawInDriveCar(cx, y) {
    const ctx = this.ctx;
    const x = cx - 13;
    ctx.fillStyle = 'rgba(0,0,0,0.3)';
    ctx.fillRect(x + 2, y + 4, 26, 44);

    ctx.fillStyle = '#94a3b8';
    ctx.fillRect(x, y, 26, 44);
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(x, y, 26, 44);

    ctx.fillStyle = '#1e293b';
    ctx.fillRect(x + 3, y + 6, 20, 7);
    ctx.fillStyle = '#cbd5e1';
    ctx.fillRect(x + 2, y + 13, 22, 20);

    ctx.fillStyle = '#22c55e';
    ctx.fillRect(x + 4, y + 16, 18, 7);
    ctx.fillStyle = '#000';
    ctx.font = '5px "Press Start 2P"';
    ctx.fillText('inD', x + 5, y + 22);

    ctx.fillStyle = '#18181b';
    ctx.fillRect(x + 5, y + 7, 14, 3);
    ctx.fillStyle = '#000';
    ctx.fillRect(x + 6, y + 8, 4, 3);
    ctx.fillRect(x + 14, y + 8, 4, 3);

    ctx.fillStyle = '#fef08a';
    ctx.fillRect(x + 2, y, 5, 3);
    ctx.fillRect(x + 19, y, 5, 3);
  }

  drawMadeInDriveMotorcycle(cx, y) {
    const ctx = this.ctx;
    const x = cx - 10;

    ctx.fillStyle = 'rgba(0,0,0,0.35)';
    ctx.fillRect(x + 1, y + 3, 18, 40);

    ctx.fillStyle = '#1e293b';
    ctx.fillRect(x + 6, y + 2, 8, 38);
    ctx.fillStyle = '#09090b';
    ctx.fillRect(x + 7, y, 6, 8);
    ctx.fillRect(x + 7, y + 34, 6, 8);

    ctx.fillStyle = '#94a3b8';
    ctx.fillRect(x + 1, y + 6, 18, 2);
    ctx.fillStyle = '#fef08a';
    ctx.fillRect(x + 8, y, 4, 3);

    // Conductor inDrive
    ctx.fillStyle = '#22c55e';
    ctx.fillRect(x + 4, y + 11, 12, 10);
    ctx.fillStyle = '#000000';
    ctx.fillRect(x + 7, y + 14, 6, 4);
    ctx.fillStyle = '#15803d';
    ctx.fillRect(x + 5, y + 5, 10, 8);
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(x + 6, y + 6, 8, 3);
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(x + 2, y + 8, 3, 6);
    ctx.fillRect(x + 15, y + 8, 3, 6);

    // Made como pasajera
    ctx.fillStyle = '#7dd3fc';
    ctx.fillRect(x + 3, y + 21, 14, 9);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(x + 4, y + 20, 12, 2);

    ctx.fillStyle = '#111827';
    ctx.fillRect(x + 4, y + 15, 12, 7);
    ctx.fillRect(x + 3, y + 21, 4, 10);
    ctx.fillRect(x + 13, y + 21, 4, 10);

    ctx.fillStyle = '#facc15';
    ctx.fillRect(x + 2, y + 18, 2, 2);
    ctx.fillRect(x + 16, y + 18, 2, 2);

    ctx.fillStyle = '#fed7aa';
    ctx.fillRect(x + 3, y + 18, 3, 3);
    ctx.fillRect(x + 14, y + 18, 3, 3);
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
        this.handleFail("¡Se agotó el tiempo en el Museo del Oro! ⏳🏛️");
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
        this.handleFail("¡Una trampa ancestral de flechas los alcanzó! 🏹💥");
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
          this.handleFail("¡Cuidado con la bola de piedra gigante del templo! 🪨💥");
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

    ctx.fillStyle = '#1c1917';
    ctx.fillRect(0, 0, this.width, this.height);

    for (let py = 0; py < this.height; py += 32) {
      for (let px = 40; px < this.width - 40; px += 32) {
        ctx.fillStyle = ((px + py) % 64 === 0) ? '#262220' : '#1f1b19';
        ctx.fillRect(px, py, 32, 32);
        ctx.strokeStyle = '#2f2b28';
        ctx.lineWidth = 0.5;
        ctx.strokeRect(px, py, 32, 32);
      }
    }

    for (let y = 0; y < this.height; y += 42) {
      ctx.fillStyle = '#78350f';
      ctx.fillRect(36, y, 4, 38);
      ctx.fillStyle = '#b45309';
      ctx.fillRect(37, y + 4, 2, 8);
      ctx.fillRect(37, y + 16, 2, 8);
      ctx.fillStyle = '#78350f';
      ctx.fillRect(this.width - 40, y, 4, 38);
      ctx.fillStyle = '#b45309';
      ctx.fillRect(this.width - 39, y + 4, 2, 8);
      ctx.fillRect(this.width - 39, y + 16, 2, 8);
    }

    ctx.strokeStyle = '#b91c1c';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(34, 0); ctx.lineTo(34, this.height);
    ctx.moveTo(this.width - 34, 0); ctx.lineTo(this.width - 34, this.height);
    ctx.stroke();

    for (let py = 20; py < this.height; py += 60) {
      ctx.fillStyle = '#facc15';
      ctx.fillRect(32, py, 4, 12);
      ctx.beginPath(); ctx.arc(34, py, 3, 0, Math.PI * 2); ctx.fill();
      ctx.fillRect(this.width - 36, py, 4, 12);
      ctx.beginPath(); ctx.arc(this.width - 34, py, 3, 0, Math.PI * 2); ctx.fill();
    }

    this.drawMuseumShowcase(6, 320, 'balsa', 'MUISCA');
    this.drawMuseumShowcase(this.width - 34, 320, 'pectoral', 'QUIMBAYA');
    this.drawMuseumShowcase(6, 230, 'mascara', 'CALIMA');
    this.drawMuseumShowcase(this.width - 34, 230, 'nariguera', 'SINÚ');
    this.drawMuseumShowcase(6, 140, 'figura', 'TOLIMA');
    this.drawMuseumShowcase(this.width - 34, 140, 'corona', 'TAYRONA');
    this.drawMuseumShowcase(6, 50, 'poporito', 'QUIMBAYA');
    this.drawMuseumShowcase(this.width - 34, 50, 'cuenco', 'SAN AGUSTÍN');

    g.safeZones.forEach(z => {
      ctx.fillStyle = '#7f1d1d';
      ctx.fillRect(42, z.y, this.width - 84, z.h);
      ctx.strokeStyle = '#facc15';
      ctx.lineWidth = 2;
      ctx.strokeRect(42, z.y, this.width - 84, z.h);

      ctx.strokeStyle = '#ca8a04';
      ctx.lineWidth = 1;
      ctx.strokeRect(46, z.y + 4, this.width - 92, z.h - 8);

      ctx.fillStyle = '#facc15';
      ctx.fillRect(44, z.y + 3, 3, z.h - 6);
      ctx.fillRect(this.width - 47, z.y + 3, 3, z.h - 6);

      ctx.fillStyle = '#fef08a';
      ctx.font = '6px "Press Start 2P"';
      ctx.fillText('🛡️ ZONA SEGURA (STOP)', 75, z.y + z.h / 2 + 3);
    });

    ctx.fillStyle = '#fef08a';
    g.arrows.forEach(arr => {
      ctx.fillRect(arr.x, arr.y, arr.w, arr.h);
      ctx.fillStyle = '#ea580c';
      ctx.fillRect((arr.dir > 0) ? arr.x + arr.w - 3 : arr.x, arr.y - 1, 3, 6);
    });

    g.boulders.forEach(b => {
      ctx.fillStyle = '#57534e';
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#292524';
      ctx.lineWidth = 2;
      ctx.stroke();
    });

    this.drawPoporo(g.poporo.x, g.poporo.y);

    PixelSprites.drawCrhis(ctx, g.player.x + 4, g.player.y + 6, g.player.facingDir, this.walkCycle);
    PixelSprites.drawMade(ctx, g.player.x + 18, g.player.y + 6, g.player.facingDir, this.walkCycle);
    ctx.fillStyle = '#fed7aa';
    ctx.fillRect(g.player.x + 9, g.player.y + 8, 4, 3);
    ctx.fillStyle = '#f43f5e';
    ctx.font = '7px sans-serif';
    ctx.fillText('❤️', g.player.x + 9, g.player.y - 14);
  }

  drawMuseumShowcase(x, y, type, cultureName) {
    const ctx = this.ctx;
    ctx.fillStyle = 'rgba(250, 204, 21, 0.08)';
    ctx.beginPath();
    ctx.moveTo(x + 14, y - 10);
    ctx.lineTo(x - 6, y + 36);
    ctx.lineTo(x + 34, y + 36);
    ctx.fill();

    ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
    ctx.fillRect(x, y, 28, 36);
    ctx.strokeStyle = '#ca8a04';
    ctx.lineWidth = 1;
    ctx.strokeRect(x, y, 28, 36);

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
    ctx.beginPath();
    ctx.moveTo(x + 4, y + 26);
    ctx.lineTo(x + 24, y + 6);
    ctx.stroke();

    ctx.fillStyle = '#fbbf24';
    if (type === 'balsa') {
      ctx.fillRect(x + 5, y + 20, 18, 4);
      ctx.fillRect(x + 12, y + 12, 4, 8);
      ctx.fillStyle = '#facc15';
      ctx.fillRect(x + 8, y + 15, 2, 5);
      ctx.fillRect(x + 18, y + 15, 2, 5);
    } else if (type === 'pectoral') {
      ctx.beginPath();
      ctx.arc(x + 14, y + 16, 7, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ca8a04';
      ctx.fillRect(x + 11, y + 14, 6, 4);
    } else if (type === 'mascara') {
      ctx.fillRect(x + 7, y + 10, 14, 14);
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(x + 9, y + 13, 3, 2);
      ctx.fillRect(x + 16, y + 13, 3, 2);
    } else if (type === 'nariguera') {
      ctx.beginPath();
      ctx.arc(x + 14, y + 16, 8, 0, Math.PI);
      ctx.fill();
    } else if (type === 'poporito') {
      ctx.fillRect(x + 11, y + 14, 6, 10);
      ctx.beginPath(); ctx.arc(x + 14, y + 11, 4, 0, Math.PI * 2); ctx.fill();
    } else {
      ctx.fillRect(x + 8, y + 12, 12, 12);
    }

    ctx.fillStyle = '#09090b';
    ctx.fillRect(x + 2, y + 34, 24, 6);
    ctx.fillStyle = '#facc15';
    ctx.fillRect(x + 6, y + 36, 16, 2);
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

    if (!g.reachedFront) {
      document.getElementById('hudParam').textContent = `🍺 Tarima: ${Math.max(0, Math.round(g.distanceToStage))}m`;
    } else {
      document.getElementById('hudParam').textContent = `🍻 ¡Llévale la pola a Made!`;
    }

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

    // Valla
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, 112);
    ctx.lineTo(this.width, 112);
    ctx.stroke();

    // Carpa BBC
    ctx.fillStyle = '#b91c1c';
    ctx.fillRect(8, 8, 62, 18);
    ctx.fillStyle = '#fff';
    ctx.font = '6px "Press Start 2P"';
    ctx.fillText('🍺 BBC', 14, 21);

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
        ctx.fillStyle = '#facc15';
        ctx.font = '7px "Press Start 2P"';
        ctx.fillText('👇 AQUÍ MADE', g.made.x - 30, g.made.y - 24);
        ctx.fillStyle = '#f43f5e';
        ctx.font = '10px sans-serif';
        ctx.fillText('❤️', g.made.x - 4, g.made.y - 12);
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

    document.getElementById('hudParam').textContent = `🌸 Tarima: ${Math.max(0, Math.round(g.distanceToStage))}m`;

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
    ctx.fillStyle = 'rgba(250, 204, 21, 0.35)';
    ctx.beginPath();
    ctx.arc(x + 16, y + 16, 24, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#0f172a';
    ctx.fillRect(x - 10, y + 30, 52, 10);
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(x - 6, y + 26, 44, 4);

    ctx.fillStyle = '#ca8a04';
    ctx.fillRect(x - 4, y + 32, 40, 6);
    ctx.fillStyle = '#fef08a';
    ctx.fillRect(x + 2, y + 34, 28, 2);

    ctx.fillStyle = '#fbbf24';
    ctx.fillRect(x + 8, y + 10, 16, 16);
    ctx.fillRect(x + 4, y + 14, 24, 8);
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.arc(x + 8, y + 6, 4, 0, Math.PI * 2);
    ctx.arc(x + 16, y + 4, 4, 0, Math.PI * 2);
    ctx.arc(x + 24, y + 6, 4, 0, Math.PI * 2);
    ctx.fill();
  }

  drawTrafficCar(x, y, w, h, type) {
    const ctx = this.ctx;
    ctx.fillStyle = 'rgba(0,0,0,0.3)';
    ctx.fillRect(x + 2, y + 3, w, h);

    if (type === 'taxi') {
      ctx.fillStyle = '#facc15';
      ctx.fillRect(x, y, w, h);
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(x, y, w, h);
      ctx.fillStyle = '#000';
      ctx.fillRect(x + w / 2 - 5, y + h / 2 - 3, 10, 6);
    } else if (type === 'bus') {
      ctx.fillStyle = '#16a34a';
      ctx.fillRect(x, y, w, h);
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 2;
      ctx.strokeRect(x, y, w, h);
      ctx.fillStyle = '#fff';
      ctx.fillRect(x + 4, y + 8, w - 8, 8);
    } else {
      ctx.fillStyle = '#dc2626';
      ctx.fillRect(x, y, w, h);
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(x, y, w, h);
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
      }

      this.ctx.clearRect(0, 0, this.width, this.height);
      if (this.currentLevel === 1) this.drawGame1();
      else if (this.currentLevel === 2) this.drawGame2();
      else if (this.currentLevel === 3) this.drawGame3();
      else if (this.currentLevel === 4) this.drawGame4();

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
