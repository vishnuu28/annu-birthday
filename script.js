/**
 * ============================================================================
 * ANNU'S BIRTHDAY GALAXY - INTERACTIVE SCRIPT
 * Dedicated with infinite love to Anakha (Annu / Babydoll)
 * Birthday: 30th November
 * Features: Starry Canvas, Synthesized Audio, Bow & Arrow Game,
 *           The Impossible "No" Game, 30 Days Love Advent,
 *           Biryani Catcher Arcade, 100 Love Reasons, Interactive Cake.
 * ============================================================================
 */

(function () {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. SYNTHESIZED WEB AUDIO ENGINE (Zero external files, 100% reliable)
  // --------------------------------------------------------------------------
  let audioCtx = null;
  let isSoundEnabled = true;

  function initAudio() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        audioCtx = new AudioContext();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  const Sound = {
    playTone(freq, type = 'sine', duration = 0.15, gainVal = 0.1) {
      if (!isSoundEnabled) return;
      initAudio();
      if (!audioCtx) return;

      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

      gain.gain.setValueAtTime(gainVal, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    },

    playChime() {
      if (!isSoundEnabled) return;
      initAudio();
      if (!audioCtx) return;
      [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
        setTimeout(() => Sound.playTone(freq, 'sine', 0.4, 0.12), i * 80);
      });
    },

    playBowDraw() {
      Sound.playTone(180, 'triangle', 0.1, 0.06);
    },

    playBowRelease() {
      if (!isSoundEnabled) return;
      initAudio();
      if (!audioCtx) return;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(320, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(80, audioCtx.currentTime + 0.18);
      gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
      gain.gain.linearRampToValueAtTime(0.001, audioCtx.currentTime + 0.18);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.18);
    },

    playTargetHit() {
      if (!isSoundEnabled) return;
      initAudio();
      if (!audioCtx) return;
      [587.33, 739.99, 880.00, 1174.66].forEach((freq, i) => {
        setTimeout(() => Sound.playTone(freq, 'triangle', 0.35, 0.15), i * 60);
      });
    },

    playDodgeWhoosh() {
      if (!isSoundEnabled) return;
      initAudio();
      if (!audioCtx) return;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(300, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(700, audioCtx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
      gain.gain.linearRampToValueAtTime(0.001, audioCtx.currentTime + 0.15);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.15);
    },

    playCatch() {
      Sound.playTone(880, 'sine', 0.12, 0.1);
      setTimeout(() => Sound.playTone(1320, 'sine', 0.18, 0.12), 70);
    },

    playVictoryFanfare() {
      if (!isSoundEnabled) return;
      initAudio();
      if (!audioCtx) return;
      const notes = [
        { f: 523.25, d: 0.15 },
        { f: 659.25, d: 0.15 },
        { f: 783.99, d: 0.2 },
        { f: 1046.50, d: 0.5 }
      ];
      let delay = 0;
      notes.forEach(n => {
        setTimeout(() => Sound.playTone(n.f, 'triangle', n.d, 0.2), delay);
        delay += 160;
      });
    },

    playHappyBirthdayTune() {
      if (!isSoundEnabled) return;
      initAudio();
      if (!audioCtx) return;
      // Traditional melody notes: C4, C4, D4, C4, F4, E4
      const song = [
        { f: 261.63, d: 250 },
        { f: 261.63, d: 250 },
        { f: 293.66, d: 500 },
        { f: 261.63, d: 500 },
        { f: 349.23, d: 500 },
        { f: 329.63, d: 800 },
        { f: 261.63, d: 250 },
        { f: 261.63, d: 250 },
        { f: 293.66, d: 500 },
        { f: 261.63, d: 500 },
        { f: 392.00, d: 500 },
        { f: 349.23, d: 900 }
      ];
      let t = 0;
      song.forEach(note => {
        setTimeout(() => Sound.playTone(note.f, 'triangle', note.d / 1000, 0.18), t);
        t += note.d;
      });
    }
  };

  // Sound Toggle Control
  const soundToggleBtn = document.getElementById('soundToggleBtn');
  const soundIcon = document.getElementById('soundIcon');
  const soundStatusText = document.getElementById('soundStatusText');

  if (soundToggleBtn) {
    soundToggleBtn.addEventListener('click', () => {
      isSoundEnabled = !isSoundEnabled;
      if (isSoundEnabled) {
        initAudio();
        soundIcon.textContent = '🔊';
        soundStatusText.textContent = 'ON';
        Sound.playChime();
      } else {
        soundIcon.textContent = '🔇';
        soundStatusText.textContent = 'OFF';
      }
    });
  }

  // Ensure audio is initialized on first user interaction anywhere
  window.addEventListener('click', () => initAudio(), { once: true });
  window.addEventListener('touchstart', () => initAudio(), { once: true });


  // --------------------------------------------------------------------------
  // 2. BACKGROUND CANVAS: STARRY NIGHT & FLOATING HEARTS
  // --------------------------------------------------------------------------
  const starryCanvas = document.getElementById('starryCanvas');
  if (starryCanvas) {
    const ctx = starryCanvas.getContext('2d');
    let width = (starryCanvas.width = window.innerWidth);
    let height = (starryCanvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = starryCanvas.width = window.innerWidth;
      height = starryCanvas.height = window.innerHeight;
    });

    const stars = Array.from({ length: 90 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 0.5,
      alpha: Math.random() * 0.8 + 0.2,
      twinkleSpeed: (Math.random() * 0.02 + 0.005) * (Math.random() < 0.5 ? 1 : -1)
    }));

    const floatingHearts = Array.from({ length: 18 }, () => ({
      x: Math.random() * width,
      y: height + Math.random() * 200,
      size: Math.random() * 14 + 10,
      speedY: Math.random() * 0.6 + 0.4,
      sway: Math.random() * 2,
      swaySpeed: Math.random() * 0.02 + 0.01,
      angle: 0,
      opacity: Math.random() * 0.5 + 0.2,
      color: Math.random() < 0.6 ? '#f472b6' : (Math.random() < 0.5 ? '#fbbf24' : '#c084fc')
    }));

    function drawHeart(x, y, size, color, alpha) {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(size / 30, size / 30);
      ctx.fillStyle = color;
      ctx.globalAlpha = alpha;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-15, -15, -30, 5, 0, 26);
      ctx.bezierCurveTo(30, 5, 15, -15, 0, 0);
      ctx.fill();
      ctx.restore();
    }

    function animateStars() {
      ctx.clearRect(0, 0, width, height);

      // Render stars
      stars.forEach(star => {
        star.alpha += star.twinkleSpeed;
        if (star.alpha > 0.95 || star.alpha < 0.2) {
          star.twinkleSpeed *= -1;
        }
        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Render floating hearts
      floatingHearts.forEach(heart => {
        heart.y -= heart.speedY;
        heart.angle += heart.swaySpeed;
        heart.x += Math.sin(heart.angle) * 0.5;

        if (heart.y < -50) {
          heart.y = height + 40;
          heart.x = Math.random() * width;
        }

        drawHeart(heart.x, heart.y, heart.size, heart.color, heart.opacity);
      });

      requestAnimationFrame(animateStars);
    }
    animateStars();
  }


  // --------------------------------------------------------------------------
  // 3. COUNTDOWN TIMER TO 30TH NOVEMBER
  // --------------------------------------------------------------------------
  const countDaysEl = document.getElementById('countDays');
  const countHoursEl = document.getElementById('countHours');
  const countMinEl = document.getElementById('countMinutes');
  const countSecEl = document.getElementById('countSeconds');

  function updateCountdown() {
    const now = new Date();
    let currentYear = now.getFullYear();
    // Birthday is Nov 30 (Month is 0-indexed: 10 = November)
    let bdayDate = new Date(currentYear, 10, 30, 0, 0, 0);

    // If current date has passed Nov 30 of this year, target next year
    if (now > bdayDate) {
      bdayDate = new Date(currentYear + 1, 10, 30, 0, 0, 0);
    }

    const diff = bdayDate - now;

    if (diff <= 0) {
      if (countDaysEl) countDaysEl.textContent = '00';
      if (countHoursEl) countHoursEl.textContent = '00';
      if (countMinEl) countMinEl.textContent = '00';
      if (countSecEl) countSecEl.textContent = '00';
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    if (countDaysEl) countDaysEl.textContent = String(days).padStart(2, '0');
    if (countHoursEl) countHoursEl.textContent = String(hours).padStart(2, '0');
    if (countMinEl) countMinEl.textContent = String(minutes).padStart(2, '0');
    if (countSecEl) countSecEl.textContent = String(seconds).padStart(2, '0');
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);


  // --------------------------------------------------------------------------
  // 4. GAME 1: CUPID'S BOW & ARROW SHOOTER
  // --------------------------------------------------------------------------
  const arrowCanvas = document.getElementById('arrowCanvas');
  const arrowScoreEl = document.getElementById('arrowScore');
  const arrowHitsEl = document.getElementById('arrowHits');
  const arrowStreakEl = document.getElementById('arrowStreak');
  const resetArrowGameBtn = document.getElementById('resetArrowGameBtn');
  const arrowRewardBox = document.getElementById('arrowRewardBox');
  const rewardIcon = document.getElementById('rewardIcon');
  const rewardTitle = document.getElementById('rewardTitle');
  const rewardText = document.getElementById('rewardText');
  const arrowHintOverlay = document.getElementById('arrowHintOverlay');

  if (arrowCanvas) {
    const actx = arrowCanvas.getContext('2d');
    let cw = (arrowCanvas.width = 900);
    let ch = (arrowCanvas.height = 460);

    let score = 0;
    let hits = 0;
    let streak = 1;

    // Bow position (left side center)
    const bowPos = { x: 90, y: ch / 2 };
    let isPulling = false;
    let pullPos = { x: bowPos.x, y: bowPos.y };
    let maxPull = 90;

    // Active Arrows
    const arrows = [];
    const particles = [];

    // Targets
    const targetMessages = [
      {
        icon: '💖',
        title: 'BULLSEYE IN MY HEART!',
        text: 'Babydoll, from the first day I laid eyes on you, you took my heart and made it your home forever! 🥰'
      },
      {
        icon: '🛡️',
        title: 'CAPTAIN AMERICA APPROVED!',
        text: '"I can love you all day!" Cap’s Vibranium shield has nothing on the strength and softness of our love, Annu! ✨'
      },
      {
        icon: '🎶',
        title: 'TAYLOR SWIFT ERAS VIBE!',
        text: 'Taylor definitely wrote "Lover" with you in mind: "Can I go where you go? Can we always be this close forever and ever?" 🎵'
      },
      {
        icon: '🍲',
        title: 'BIRYANI LOVE TOKEN UNLOCKED!',
        text: '1x VIP Candlelight Dum Biryani Date night with extra raita and sweet gulab jamuns for my gorgeous Babydoll! 😋'
      },
      {
        icon: '💃',
        title: 'BAJIRAO-MASTANI ROMANCE!',
        text: 'Deepika and Ranveer have serious competition! No Bollywood love story can match the passion we share! ❤️'
      },
      {
        icon: '🌟',
        title: 'YOU ARE MY SUPERSTAR!',
        text: 'You light up every room you enter, Annu. The prettiest girl, the kindest heart, and the best girlfriend ever!'
      }
    ];

    let targets = [];

    function initTargets() {
      targets = [
        {
          id: 1,
          type: 'heart',
          x: 480,
          y: 120,
          baseY: 120,
          radius: 36,
          speed: 1.2,
          phase: 0,
          color: '#f472b6',
          icon: '💖',
          points: 100
        },
        {
          id: 2,
          type: 'shield',
          x: 680,
          y: 220,
          baseY: 220,
          radius: 40,
          speed: 1.5,
          phase: Math.PI / 2,
          color: '#38bdf8',
          icon: '🛡️',
          points: 150
        },
        {
          id: 3,
          type: 'star',
          x: 560,
          y: 330,
          baseY: 330,
          radius: 34,
          speed: 1.0,
          phase: Math.PI,
          color: '#fbbf24',
          icon: '✨',
          points: 200
        },
        {
          id: 4,
          type: 'biryani',
          x: 780,
          y: 150,
          baseY: 150,
          radius: 38,
          speed: 1.8,
          phase: Math.PI * 1.5,
          color: '#fb923c',
          icon: '🍲',
          points: 250
        }
      ];
    }
    initTargets();

    function addHitParticles(x, y, color) {
      for (let i = 0; i < 28; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 5 + 2;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: Math.random() * 5 + 3,
          color: color,
          alpha: 1,
          decay: Math.random() * 0.03 + 0.015
        });
      }
    }

    function getCanvasCoordinates(e) {
      const rect = arrowCanvas.getBoundingClientRect();
      const scaleX = arrowCanvas.width / rect.width;
      const scaleY = arrowCanvas.height / rect.height;

      let clientX = e.clientX;
      let clientY = e.clientY;

      if (e.touches && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      }

      return {
        x: (clientX - rect.left) * scaleX,
        y: (clientY - rect.top) * scaleY
      };
    }

    // Input handlers
    function handleStart(e) {
      const pos = getCanvasCoordinates(e);
      // Check if near the bow
      const dist = Math.hypot(pos.x - bowPos.x, pos.y - bowPos.y);
      if (dist < 140) {
        isPulling = true;
        pullPos = { x: pos.x, y: pos.y };
        Sound.playBowDraw();
        if (arrowHintOverlay) arrowHintOverlay.style.opacity = '0';
      }
    }

    function handleMove(e) {
      if (!isPulling) return;
      e.preventDefault();
      const pos = getCanvasCoordinates(e);
      let dx = pos.x - bowPos.x;
      let dy = pos.y - bowPos.y;
      let dist = Math.hypot(dx, dy);

      if (dist > maxPull) {
        dx = (dx / dist) * maxPull;
        dy = (dy / dist) * maxPull;
      }
      pullPos = { x: bowPos.x + dx, y: bowPos.y + dy };
    }

    function handleEnd() {
      if (!isPulling) return;
      isPulling = false;

      const dx = bowPos.x - pullPos.x;
      const dy = bowPos.y - pullPos.y;
      const pullDist = Math.hypot(dx, dy);

      if (pullDist > 15) {
        const speed = (pullDist / maxPull) * 22 + 8;
        const angle = Math.atan2(dy, dx);

        arrows.push({
          x: bowPos.x,
          y: bowPos.y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          angle: angle,
          life: 0
        });

        Sound.playBowRelease();
      }
    }

    arrowCanvas.addEventListener('mousedown', handleStart);
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleEnd);

    arrowCanvas.addEventListener('touchstart', handleStart, { passive: false });
    window.addEventListener('touchmove', handleMove, { passive: false });
    window.addEventListener('touchend', handleEnd);

    if (resetArrowGameBtn) {
      resetArrowGameBtn.addEventListener('click', () => {
        score = 0;
        hits = 0;
        streak = 1;
        arrowScoreEl.textContent = '0';
        arrowHitsEl.textContent = '0 / 5 Target';
        arrowStreakEl.textContent = '1x Combo 🔥';
        initTargets();
        Sound.playChime();
      });
    }

    // Main Game Render Loop
    function renderArrowGame() {
      actx.clearRect(0, 0, cw, ch);

      // 1. Draw Bow
      actx.save();
      actx.strokeStyle = '#f59e0b';
      actx.lineWidth = 6;
      actx.lineCap = 'round';

      // Bow Arc
      actx.beginPath();
      actx.arc(bowPos.x - 20, bowPos.y, 60, -Math.PI / 2.5, Math.PI / 2.5);
      actx.stroke();

      // Golden bow ornaments
      actx.fillStyle = '#f472b6';
      actx.beginPath();
      actx.arc(bowPos.x - 20 + 60 * Math.cos(-Math.PI / 2.5), bowPos.y + 60 * Math.sin(-Math.PI / 2.5), 6, 0, Math.PI * 2);
      actx.arc(bowPos.x - 20 + 60 * Math.cos(Math.PI / 2.5), bowPos.y + 60 * Math.sin(Math.PI / 2.5), 6, 0, Math.PI * 2);
      actx.fill();

      // Bowstring
      const upperTip = {
        x: bowPos.x - 20 + 60 * Math.cos(-Math.PI / 2.5),
        y: bowPos.y + 60 * Math.sin(-Math.PI / 2.5)
      };
      const lowerTip = {
        x: bowPos.x - 20 + 60 * Math.cos(Math.PI / 2.5),
        y: bowPos.y + 60 * Math.sin(Math.PI / 2.5)
      };

      const nockPos = isPulling ? pullPos : { x: bowPos.x - 10, y: bowPos.y };

      actx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
      actx.lineWidth = 2;
      actx.beginPath();
      actx.moveTo(upperTip.x, upperTip.y);
      actx.lineTo(nockPos.x, nockPos.y);
      actx.lineTo(lowerTip.x, lowerTip.y);
      actx.stroke();

      // Trajectory Guideline if pulling
      if (isPulling) {
        const aimAngle = Math.atan2(bowPos.y - pullPos.y, bowPos.x - pullPos.x);
        const aimDist = Math.hypot(bowPos.x - pullPos.x, bowPos.y - pullPos.y);
        actx.fillStyle = 'rgba(244, 114, 182, 0.6)';
        for (let step = 40; step < 260; step += 24) {
          const dotX = bowPos.x + Math.cos(aimAngle) * step;
          const dotY = bowPos.y + Math.sin(aimAngle) * step;
          actx.beginPath();
          actx.arc(dotX, dotY, 3, 0, Math.PI * 2);
          actx.fill();
        }

        // Draw nocked arrow
        actx.save();
        actx.translate(nockPos.x, nockPos.y);
        actx.rotate(aimAngle);
        actx.strokeStyle = '#fef08a';
        actx.lineWidth = 3;
        actx.beginPath();
        actx.moveTo(0, 0);
        actx.lineTo(55, 0);
        actx.stroke();
        // Arrowhead
        actx.fillStyle = '#f43f5e';
        actx.beginPath();
        actx.moveTo(55, -6);
        actx.lineTo(68, 0);
        actx.lineTo(55, 6);
        actx.closePath();
        actx.fill();
        actx.restore();
      }
      actx.restore();

      // 2. Render & Update Floating Targets
      targets.forEach(tgt => {
        tgt.phase += 0.03 * tgt.speed;
        tgt.y = tgt.baseY + Math.sin(tgt.phase) * 35;

        actx.save();
        actx.translate(tgt.x, tgt.y);

        // Target Aura Glow
        const glow = actx.createRadialGradient(0, 0, 10, 0, 0, tgt.radius + 15);
        glow.addColorStop(0, tgt.color);
        glow.addColorStop(1, 'transparent');
        actx.fillStyle = glow;
        actx.beginPath();
        actx.arc(0, 0, tgt.radius + 15, 0, Math.PI * 2);
        actx.fill();

        // Target Body
        if (tgt.type === 'shield') {
          // Captain America Shield Rings
          actx.fillStyle = '#ef4444';
          actx.beginPath();
          actx.arc(0, 0, tgt.radius, 0, Math.PI * 2);
          actx.fill();

          actx.fillStyle = '#ffffff';
          actx.beginPath();
          actx.arc(0, 0, tgt.radius * 0.75, 0, Math.PI * 2);
          actx.fill();

          actx.fillStyle = '#ef4444';
          actx.beginPath();
          actx.arc(0, 0, tgt.radius * 0.5, 0, Math.PI * 2);
          actx.fill();

          actx.fillStyle = '#2563eb';
          actx.beginPath();
          actx.arc(0, 0, tgt.radius * 0.3, 0, Math.PI * 2);
          actx.fill();

          // Star in center
          actx.fillStyle = '#ffffff';
          actx.font = '16px sans-serif';
          actx.textAlign = 'center';
          actx.textBaseline = 'middle';
          actx.fillText('★', 0, 0);
        } else {
          // Glowing orb with emoji
          actx.fillStyle = 'rgba(20, 10, 45, 0.7)';
          actx.strokeStyle = tgt.color;
          actx.lineWidth = 3;
          actx.beginPath();
          actx.arc(0, 0, tgt.radius, 0, Math.PI * 2);
          actx.fill();
          actx.stroke();

          actx.font = `${tgt.radius * 1.1}px sans-serif`;
          actx.textAlign = 'center';
          actx.textBaseline = 'middle';
          actx.fillText(tgt.icon, 0, 2);
        }

        actx.restore();
      });

      // 3. Render & Update Arrows
      for (let i = arrows.length - 1; i >= 0; i--) {
        const arr = arrows[i];
        arr.x += arr.vx;
        arr.y += arr.vy;
        arr.vy += 0.12; // Slight gravity
        arr.angle = Math.atan2(arr.vy, arr.vx);
        arr.life++;

        // Draw arrow
        actx.save();
        actx.translate(arr.x, arr.y);
        actx.rotate(arr.angle);
        actx.strokeStyle = '#fbbf24';
        actx.lineWidth = 3;
        actx.beginPath();
        actx.moveTo(-40, 0);
        actx.lineTo(15, 0);
        actx.stroke();

        // Arrowhead
        actx.fillStyle = '#f43f5e';
        actx.beginPath();
        actx.moveTo(15, -6);
        actx.lineTo(26, 0);
        actx.lineTo(15, 6);
        actx.closePath();
        actx.fill();

        // Feathers
        actx.fillStyle = '#38bdf8';
        actx.fillRect(-42, -5, 8, 10);
        actx.restore();

        // Hit Detection against targets
        let hitMade = false;
        targets.forEach(tgt => {
          const dist = Math.hypot(arr.x - tgt.x, arr.y - tgt.y);
          if (dist < tgt.radius + 15) {
            hitMade = true;
            addHitParticles(tgt.x, tgt.y, tgt.color);
            Sound.playTargetHit();

            // Update stats
            hits++;
            const earned = tgt.points * streak;
            score += earned;
            streak++;

            if (arrowScoreEl) arrowScoreEl.textContent = score;
            if (arrowHitsEl) arrowHitsEl.textContent = `${hits} Target${hits > 1 ? 's' : ''}`;
            if (arrowStreakEl) arrowStreakEl.textContent = `${streak}x Combo 🔥`;

            // Display romantic message
            const randomMsg = targetMessages[Math.floor(Math.random() * targetMessages.length)];
            if (rewardIcon) rewardIcon.textContent = tgt.icon;
            if (rewardTitle) rewardTitle.textContent = `${randomMsg.title} (+${earned} pts!)`;
            if (rewardText) rewardText.textContent = randomMsg.text;

            // Bounce target position
            tgt.baseY = Math.random() * (ch - 180) + 90;
            tgt.x = Math.random() * 320 + 460;
          }
        });

        if (hitMade || arr.x > cw + 50 || arr.y > ch + 50) {
          arrows.splice(i, 1);
        }
      }

      // 4. Render & Update Hit Particles
      for (let p = particles.length - 1; p >= 0; p--) {
        const pt = particles[p];
        pt.x += pt.vx;
        pt.y += pt.vy;
        pt.alpha -= pt.decay;

        if (pt.alpha <= 0) {
          particles.splice(p, 1);
        } else {
          actx.fillStyle = pt.color;
          actx.globalAlpha = pt.alpha;
          actx.beginPath();
          actx.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2);
          actx.fill();
          actx.globalAlpha = 1;
        }
      }

      requestAnimationFrame(renderArrowGame);
    }
    renderArrowGame();
  }


  // --------------------------------------------------------------------------
  // 5. GAME 2: THE IMPOSSIBLE "NO" GAME (RUNAWAY BUTTON)
  // --------------------------------------------------------------------------
  const runawayArena = document.getElementById('runawayArena');
  const runawayYesBtn = document.getElementById('runawayYesBtn');
  const runawayNoBtn = document.getElementById('runawayNoBtn');
  const runawayStatusMsg = document.getElementById('runawayStatusMsg');
  const victoryModal = document.getElementById('victoryModal');
  const closeVictoryModalBtn = document.getElementById('closeVictoryModalBtn');
  const victoryCloseBtn = document.getElementById('victoryCloseBtn');

  if (runawayNoBtn && runawayArena) {
    let dodgeCount = 0;
    let yesScale = 1;

    const dodgeMessages = [
      "Nice try, Babydoll! 🏃‍♂️💨",
      "Error 404: 'No' not found! 😂",
      "Are you sure? Cap is watching! 🛡️",
      "Deepika wouldn't say no to Ranveer! 💃",
      "I'll bribe you with warm Biryani! 🍲",
      "Taylor Swift is singing: 'Say Yes!' 🎶",
      "Your finger slipped, didn't it? 😜",
      "There is no escaping my love, Annu! 🥰",
      "Nope! You're stuck with me forever! 💖",
      "Click YES already, cutie! ✨"
    ];

    function dodgeNoButton(e) {
      if (e) e.preventDefault();
      dodgeCount++;
      Sound.playDodgeWhoosh();

      // Compute arena bounds
      const arenaRect = runawayArena.getBoundingClientRect();
      const btnRect = runawayNoBtn.getBoundingClientRect();

      // Safe bounds inside the arena
      const maxX = arenaRect.width - btnRect.width - 40;
      const maxY = arenaRect.height - btnRect.height - 40;

      // Pick a random spot that isn't directly at current spot
      const randomX = Math.floor(Math.random() * Math.max(maxX, 120)) - (maxX / 2);
      const randomY = Math.floor(Math.random() * Math.max(maxY, 80)) - (maxY / 2);

      runawayNoBtn.style.position = 'relative';
      runawayNoBtn.style.left = `${randomX}px`;
      runawayNoBtn.style.top = `${randomY}px`;

      // Change button text
      const funnyText = dodgeMessages[dodgeCount % dodgeMessages.length];
      runawayNoBtn.querySelector('span').textContent = funnyText;
      if (runawayStatusMsg) {
        runawayStatusMsg.textContent = `Dodge #${dodgeCount}: ${funnyText}`;
      }

      // Grow the YES button
      yesScale = Math.min(yesScale + 0.12, 1.8);
      if (runawayYesBtn) {
        runawayYesBtn.style.transform = `scale(${yesScale})`;
        runawayYesBtn.style.boxShadow = `0 0 ${20 * yesScale}px rgba(16, 185, 129, 0.8)`;
      }
    }

    // Trigger on mouse hover, touch, pointer
    runawayNoBtn.addEventListener('mouseenter', dodgeNoButton);
    runawayNoBtn.addEventListener('touchstart', dodgeNoButton, { passive: false });
    runawayNoBtn.addEventListener('click', dodgeNoButton);

    // When she clicks YES!
    if (runawayYesBtn) {
      runawayYesBtn.addEventListener('click', () => {
        Sound.playVictoryFanfare();
        if (victoryModal) {
          victoryModal.classList.add('active');
        }
      });
    }

    // Close Victory Dialog
    const closeVictory = () => {
      if (victoryModal) victoryModal.classList.remove('active');
    };
    if (closeVictoryModalBtn) closeVictoryModalBtn.addEventListener('click', closeVictory);
    if (victoryCloseBtn) victoryCloseBtn.addEventListener('click', closeVictory);
  }


  // --------------------------------------------------------------------------
  // 6. FEATURE: 30 DAYS OF LOVE ADVENT CALENDAR (NOV 1 - NOV 30)
  // --------------------------------------------------------------------------
  const calendarGrid = document.getElementById('calendarGrid');
  const calendarModal = document.getElementById('calendarModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const modalActionBtn = document.getElementById('modalActionBtn');
  const modalDayBadge = document.getElementById('modalDayBadge');
  const modalTitle = document.getElementById('modalTitle');
  const modalBadgeIcon = document.getElementById('modalBadgeIcon');
  const modalText = document.getElementById('modalText');
  const modalGiftContent = document.getElementById('modalGiftContent');
  const unlockAllDaysBtn = document.getElementById('unlockAllDaysBtn');

  // Complete, personalized 30 days of love messages tailored specifically for Annu / Babydoll
  const daysData = [
    {
      day: 1,
      title: "Welcome to Your Birthday Month, Babydoll!",
      badge: "🎉",
      tag: "Day 1 Kickoff",
      text: "Happy 1st November, my precious Annu! Today marks the beginning of the most special 30 days of the year. You bring so much sunshine into my world, and this entire month is dedicated to showing you how loved, cherished, and treasured you truly are.",
      gift: "✨ 1x Official Golden Passport to 30 Days of Pampering & Surprises ✨"
    },
    {
      day: 2,
      title: "Taylor Swift Era: You're My 'Lover'",
      badge: "💖",
      tag: "Swiftie Special",
      text: "“Can I go where you go? Can we always be this close forever and ever?” Listening to Taylor Swift always reminds me of the magic we have. You turned my whole universe into a pastel dream, Babydoll.",
      gift: "🎵 1x Dedication: A private acoustic dance session to our favorite Taylor songs! 🎵"
    },
    {
      day: 3,
      title: "The Biryani Treaty of Love",
      badge: "🍲",
      tag: "Foodie Special",
      text: "Seeing your eyes light up when a hot pot of Dum Biryani arrives is honestly one of the cutest sights in the world. You deserve the best biryani feasts in town, and I promise to always let you have the best piece!",
      gift: "🍲 1x Unlimited Candlelight Biryani Date Night with extra fried onions & gulab jamuns! 🍲"
    },
    {
      day: 4,
      title: "Captain America’s Shield: My Real Hero",
      badge: "🛡️",
      tag: "Marvel Universe",
      text: "Steve Rogers had the Vibranium shield, but I have something far more indestructible: your love and unwavering kindness. You're my superhero, Annu, and I can love you all day!",
      gift: "🛡️ 1x Lifetime Guarantee: I will always protect your smile and happiness! 🛡️"
    },
    {
      day: 5,
      title: "Deepika & Ranveer: Unstoppable Passion",
      badge: "💃",
      tag: "Bollywood Romance",
      text: "“Agar tum mujhe aise hi dekhte rahoge, toh mujhe tumse pyaar ho jayega!” When Ranveer looks at Deepika, that’s exactly how I look at you every single second. Pure awe and admiration for my Babydoll.",
      gift: "🎬 1x Bollywood Movie Night Marathon with cozy blankets and popcorn! 🍿"
    },
    {
      day: 6,
      title: "Sweet Memory: The First Time You Smiled",
      badge: "✨",
      tag: "Cherished Moment",
      text: "I still remember the first time you flashed that radiant smile of yours. My heart skipped about ten beats, and I knew right there and then that you were someone extraordinarily rare.",
      gift: "📸 1x Nostalgia Coupon: Let’s look back at our sweetest photos together! 📸"
    },
    {
      day: 7,
      title: "Babydoll's Royal Pamper Day",
      badge: "💆‍♀️",
      tag: "Relaxation",
      text: "You work so hard and care for everyone around you. Today, sit back, relax, and let me pamper you like the absolute queen you are.",
      gift: "💆‍♀️ 1x Voucher for a soothing head massage, foot massage, and hot tea! ☕"
    },
    {
      day: 8,
      title: "Midnight Cravings & Sweet Treats",
      badge: "🍰",
      tag: "Sweet Tooth",
      text: "Nothing beats our late-night talks and impromptu dessert cravings. Whether it’s chocolate pastry, ice cream, or waffles, you make every bite taste sweeter.",
      gift: "🍨 1x Redeemable Midnight Dessert Run (Whatever sweet Annu craves!) 🍨"
    },
    {
      day: 9,
      title: "Steve Rogers' Oath: By Your Side",
      badge: "⭐",
      tag: "Heroic Love",
      text: "True love isn't just for sunny days—it's standing together through every storm. Annu, whatever life throws at us, I've got your back. Always and without hesitation.",
      gift: "🌟 1x Unbreakable Promise of Loyalty, Respect, and Infinite Support 🌟"
    },
    {
      day: 10,
      title: "Taylor’s '1989' Era: Wildest Dreams",
      badge: "🎶",
      tag: "Swiftie Vibe",
      text: "“Say you'll remember me, standing in a nice dress, staring at the sunset...” Even in my wildest dreams, I could never have imagined a girlfriend as beautiful and wonderful as you, Babydoll.",
      gift: "🌅 1x Sunset Stroll & Hand-Holding Date Voucher 🌅"
    },
    {
      day: 11,
      title: "The Hyderabadi Dum Biryani Feast",
      badge: "🍛",
      tag: "Feast Day",
      text: "Today’s rule: zero diets allowed! Only royal fragrant basmati rice, tender pieces, spicy aroma, and cool raita. Because good food tastes best with my favorite person.",
      gift: "🍛 1x Home-Delivered or Dine-In Biryani Feast on Me! 🍛"
    },
    {
      day: 12,
      title: "The Dimple & Laughter Appreciation Day",
      badge: "😊",
      tag: "Pure Joy",
      text: "Deepika Padukone may have famous dimples, but Annu's laugh has a magical power to instantly cure any bad day. Hearing your giggle is music to my ears.",
      gift: "😂 1x Promise to make you laugh until your stomach hurts today! 😂"
    },
    {
      day: 13,
      title: "Lucky Number 13: Swiftie Special",
      badge: "🍀",
      tag: "Taylor’s Favorite",
      text: "13 is Taylor Swift's lucky number, and having you in my life makes me the luckiest guy in the universe. “You belong with me” will forever be our anthem!",
      gift: "🎸 1x Custom Romantic Playlist crafted exclusively for Annu! 🎸"
    },
    {
      day: 14,
      title: "Halfway There: 14 Reasons I Adore Annu",
      badge: "💌",
      tag: "Milestone Day",
      text: "We are two weeks into your birthday month! 14 reasons why you're irreplaceable: your kindness, your beauty, your sense of humor, your cute pout, and how adorable you look when you're sleepy!",
      gift: "💌 1x Hand-written Digital Love Letter sealed with a kiss 💌"
    },
    {
      day: 15,
      title: "Movie Night: Annu’s Absolute Choice",
      badge: "🍿",
      tag: "Cozy Night",
      text: "Tonight, you hold the remote! Whether it’s Marvel superheroes, Bollywood drama, or a romantic comedy, your wish is my command.",
      gift: "🍿 1x All-Inclusive Movie Night with Snacks & Zero Interruptions 🍿"
    },
    {
      day: 16,
      title: "The Ultimate 5-Minute Bear Hug",
      badge: "🧸",
      tag: "Warmth",
      text: "Sometimes, words aren't enough. That's why today you get an unlimited supply of long, warm, comforting bear hugs whenever you want them.",
      gift: "🧸 1x Redeemable 5-Minute Continuous Warm Bear Hug Coupon 🧸"
    },
    {
      day: 17,
      title: "Multiverse Theory: I’d Choose You Every Time",
      badge: "🌌",
      tag: "Multiverse",
      text: "In Marvel’s infinite multiverse of infinite dimensions, in every single reality, my soul would find yours and fall deeply in love with you all over again, Babydoll.",
      gift: "🌌 1x Cosmic Certificate: My One and Only in Every Universe 🌌"
    },
    {
      day: 18,
      title: "Bajirao-Mastani Romance: Fierce & True",
      badge: "🌹",
      tag: "Epic Love",
      text: "“Ishq, jo toofani dariya se baaghawat kar le woh ishq...” Our love is fierce, deep, and unshakeable. Thank you for being the queen of my heart, Annu.",
      gift: "🌹 1x Red Rose & Romantic Compliment Bouquet 🌹"
    },
    {
      day: 19,
      title: "Morning Sunshine: My First Thought",
      badge: "☀️",
      tag: "Daily Love",
      text: "Every morning when I wake up, the very first thought in my mind is your face and your sweet voice. Starting the day with you makes everything brighter.",
      gift: "☀️ 1x Cute Good Morning Audio / Message Surprise ☀️"
    },
    {
      day: 20,
      title: "Biryani & Chill: The Foodie Oath",
      badge: "🍗",
      tag: "Food & Love",
      text: "They say couples who eat together stay together. And couples who love Biryani together conquer the world! Here's to countless more foodie dates, Babydoll.",
      gift: "🍗 1x Golden Food Voucher for Annu’s favorite takeaway spot! 🍗"
    },
    {
      day: 21,
      title: "Taylor’s 'Fearless': Head Over Heels",
      badge: "✨",
      tag: "Fearless",
      text: "“There's somethin' 'bout the way the street looks when it's just rained... and I don't know why, but with you I'd dance in a storm in my best dress, fearless.” Loving you is completely fearless.",
      gift: "💃 1x Spontaneous Slow Dance in the Living Room 💃"
    },
    {
      day: 22,
      title: "Captain's Honor: My Favorite Companion",
      badge: "🎖️",
      tag: "Avengers",
      text: "You have that same pure heart that made Steve Rogers worthy of the shield and Mjolnir. You are worthy of every happiness, respect, and celebration in life.",
      gift: "🎖️ 1x 'Most Worthy Girlfriend in the World' Medal 🎖️"
    },
    {
      day: 23,
      title: "Why 'Babydoll' Fits You Perfectly",
      badge: "🎀",
      tag: "Cute Nicknames",
      text: "Calling you Babydoll isn’t just a nickname—it’s how you make me want to protect you, cherish you, and hold you close. You will always be my precious babydoll.",
      gift: "🎀 1x Lifetime Pass of sweet, cheesy nicknames anytime! 🎀"
    },
    {
      day: 24,
      title: "Ram-Leela Sparks: Fireworks In My Heart",
      badge: "🎆",
      tag: "Bollywood Flame",
      text: "Every time we talk, there are sparks and laughter. You bring so much energy and color into my life, just like a vibrant Bollywood festival!",
      gift: "🎆 1x Romantic Fireworks & Star-Gazing Night Plan 🎆"
    },
    {
      day: 25,
      title: "5 Days To Go! Pre-Birthday Pampering",
      badge: "⏳",
      tag: "Countdown",
      text: "Only 5 days left until the 30th of November! The countdown is reaching fever pitch. I hope you're ready for the grand celebrations!",
      gift: "🎁 1x Pre-Birthday Teaser: Special gift delivery incoming! 🎁"
    },
    {
      day: 26,
      title: "The Biryani Masterpiece Date",
      badge: "🍲",
      tag: "Special Feast",
      text: "4 days left! Let’s celebrate the home stretch with Annu's undisputed favorite meal. Cooked with love, eaten with joy!",
      gift: "🍲 1x Gourmet Biryani Dinner with sweet dessert treats! 🍲"
    },
    {
      day: 27,
      title: "Taylor’s 'Daylight': No More Dark",
      badge: "🌅",
      tag: "Daylight",
      text: "“I once believed love would be burning red, but it's golden, like daylight.” You brought warmth and peace into my world, Annu. Everything is brighter with you.",
      gift: "🌅 1x Handwritten Letter of Gratitude & Love 🌅"
    },
    {
      day: 28,
      title: "48 Hours to Birthday: The Grand Excitement",
      badge: "🚀",
      tag: "Almost There",
      text: "Only two days to go! The world should honestly take a national holiday on 30th November to celebrate the day you were born.",
      gift: "✨ 1x Full Day of Zero Chores: Annu does only what she loves! ✨"
    },
    {
      day: 29,
      title: "Birthday Eve: Rest Well, My Queen",
      badge: "🌙",
      tag: "Eve",
      text: "Tomorrow is YOUR day, Annu. As you sleep tonight under the stars, know that you are loved beyond words. Tomorrow the whole universe celebrates you!",
      gift: "🌙 1x Sweet Dreams & Midnight Birthday Call at 12:00 AM! 🌙"
    },
    {
      day: 30,
      title: "👑 HAPPY BIRTHDAY ANNU! (30th November)",
      badge: "🎂",
      tag: "THE GRAND DAY",
      text: "HAPPY BIRTHDAY TO MY WHOLE WORLD! 🎉 Today on 30th November, my gorgeous Babydoll, my Annu, I want to thank the stars for giving me YOU. You are the kindest, most radiant, most captivating girl on this planet. May this year bring you all the success, joy, biryani feasts, Taylor Swift concerts, and endless love your heart can hold. I love you to the moon, across the multiverse, and back! Forever & Always! 💖👑✨",
      gift: "👑 1x Grand Birthday Gift & Infinite Love for the Entire Year Ahead! 👑"
    }
  ];

  const todayStatusPill = document.getElementById('todayStatusPill');
  const claimedBadgeCounter = document.getElementById('claimedBadgeCounter');
  const claimedBadgesTrack = document.getElementById('claimedBadgesTrack');
  const badgeClaimStatus = document.getElementById('badgeClaimStatus');
  const claimBtnIcon = document.getElementById('claimBtnIcon');
  const claimBtnText = document.getElementById('claimBtnText');
  const modalDoneBtn = document.getElementById('modalDoneBtn');
  const toastNotification = document.getElementById('toastNotification');

  let previewMode = false;
  let activeModalItem = null;

  // Persistent badge storage helpers
  function getClaimedBadges() {
    try {
      const data = localStorage.getItem('annu_claimed_badges');
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  function saveClaimedBadge(dayNum) {
    const list = getClaimedBadges();
    if (!list.includes(dayNum)) {
      list.push(dayNum);
      localStorage.setItem('annu_claimed_badges', JSON.stringify(list));
    }
    return list;
  }

  let toastTimer = null;
  function showToast(msg) {
    if (!toastNotification) return;
    toastNotification.textContent = msg;
    toastNotification.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastNotification.classList.remove('show');
    }, 3800);
  }

  function getOrdinal(n) {
    const s = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return s[(v - 20) % 10] || s[v] || s[0];
  }

  // Calculate active day of November
  const now = new Date();
  const currentMonth = now.getMonth(); // 10 = November
  let currentActiveDay = 1;
  if (currentMonth === 10) {
    currentActiveDay = now.getDate();
  } else if (currentMonth > 10) {
    currentActiveDay = 30;
  }

  if (todayStatusPill) {
    todayStatusPill.innerHTML = `📍 Today is <strong>Day ${currentActiveDay} (${currentActiveDay}${getOrdinal(currentActiveDay)} Nov)</strong> ✨`;
  }

  function renderTrophyShowcase() {
    if (!claimedBadgesTrack || !claimedBadgeCounter) return;
    const claimedList = getClaimedBadges();
    claimedBadgeCounter.textContent = `${claimedList.length} / 30 Claimed`;

    claimedBadgesTrack.innerHTML = '';
    if (claimedList.length === 0) {
      claimedBadgesTrack.innerHTML = `
        <div class="claimed-badges-empty">
          ✨ You haven't claimed any badges yet! Open any unlocked day card below and click <strong>"Claim Badge"</strong>, Babydoll! 💖
        </div>
      `;
      return;
    }

    // Sort ascending by day
    claimedList.sort((a, b) => a - b);

    claimedList.forEach(dayNum => {
      const item = daysData.find(d => d.day === dayNum);
      if (!item) return;

      const badgeItem = document.createElement('div');
      badgeItem.className = 'claimed-badge-item';
      badgeItem.setAttribute('role', 'button');
      badgeItem.setAttribute('tabindex', '0');
      badgeItem.setAttribute('title', `Click to view Day ${item.day}: ${item.title}`);
      badgeItem.innerHTML = `
        <span class="badge-emoji">${item.badge}</span>
        <span class="badge-day-label">Day ${item.day}</span>
      `;

      badgeItem.addEventListener('click', () => {
        openDayModal(item);
      });
      badgeItem.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openDayModal(item);
        }
      });

      claimedBadgesTrack.appendChild(badgeItem);
    });
  }

  function renderCalendar() {
    if (!calendarGrid) return;
    calendarGrid.innerHTML = '';
    const claimedList = getClaimedBadges();

    daysData.forEach(item => {
      const isClaimed = claimedList.includes(item.day);
      const isToday = item.day === currentActiveDay;
      const isUnlocked = previewMode || item.day <= currentActiveDay;

      const card = document.createElement('div');
      card.className = `cal-card ${isToday ? 'today' : ''} ${item.day === 30 ? 'birthday-grand' : ''} ${isClaimed ? 'claimed' : ''}`;
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');
      card.setAttribute('aria-label', `Open Day ${item.day}: ${item.title}`);

      let pillText = `Day ${item.day}`;
      if (item.day === 30) {
        pillText = '👑 GRAND FINALE';
      } else if (isToday) {
        pillText = '📍 Today';
      }

      card.innerHTML = `
        <div class="cal-card-top">
          <span class="cal-card-day">Nov ${item.day}</span>
          <span class="cal-card-pill">${pillText}</span>
        </div>
        <div class="cal-card-icon">${item.badge}</div>
        <h4 class="cal-card-title">${item.title}</h4>
        <span class="cal-card-tag">${item.tag}</span>
        ${isClaimed 
          ? '<span class="cal-card-claimed-tag">⭐ CLAIMED</span>' 
          : (isUnlocked 
              ? '<span class="cal-card-tag" style="color:#38bdf8;font-weight:700;">✨ Tap to Claim</span>' 
              : '<span class="cal-card-tag" style="color:#94a3b8;">🔒 Locked</span>')}
      `;

      card.addEventListener('click', () => openDayModal(item));
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openDayModal(item);
        }
      });

      calendarGrid.appendChild(card);
    });

    renderTrophyShowcase();
  }

  function updateClaimUIState(item) {
    const isClaimed = getClaimedBadges().includes(item.day);
    if (isClaimed) {
      if (claimBtnIcon) claimBtnIcon.textContent = '✅';
      if (claimBtnText) claimBtnText.textContent = 'Badge Claimed! (In Your Collection) 💖';
      if (badgeClaimStatus) badgeClaimStatus.textContent = '🌟 CLAIMED! Safely preserved in your Trophy Case! 💖';
      if (modalActionBtn) {
        modalActionBtn.classList.remove('pulse-btn');
        modalActionBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
      }
    } else {
      if (claimBtnIcon) claimBtnIcon.textContent = '🏆';
      if (claimBtnText) claimBtnText.textContent = 'Claim Badge & Voucher! 💖';
      if (badgeClaimStatus) badgeClaimStatus.textContent = '✨ Tap badge icon or button below to claim! ✨';
      if (modalActionBtn) {
        modalActionBtn.classList.add('pulse-btn');
        modalActionBtn.style.background = '';
      }
    }
  }

  function openDayModal(item) {
    activeModalItem = item;
    Sound.playChime();

    if (modalDayBadge) modalDayBadge.textContent = `Day ${item.day} • November ${item.day}`;
    if (modalTitle) modalTitle.textContent = item.title;
    if (modalBadgeIcon) {
      modalBadgeIcon.textContent = item.badge;
      modalBadgeIcon.classList.remove('animate-claim');
    }
    if (modalText) modalText.textContent = item.text;
    if (modalGiftContent) modalGiftContent.textContent = item.gift;

    updateClaimUIState(item);

    if (calendarModal) {
      calendarModal.classList.add('active');
    }
  }

  function closeDayModal() {
    if (calendarModal) {
      calendarModal.classList.remove('active');
    }
  }

  function claimActiveBadge() {
    if (!activeModalItem) return;
    const claimedList = getClaimedBadges();
    const isAlreadyClaimed = claimedList.includes(activeModalItem.day);

    if (modalBadgeIcon) {
      modalBadgeIcon.classList.remove('animate-claim');
      void modalBadgeIcon.offsetWidth; // trigger reflow
      modalBadgeIcon.classList.add('animate-claim');
    }

    if (!isAlreadyClaimed) {
      saveClaimedBadge(activeModalItem.day);
      Sound.playVictoryFanfare();
      updateClaimUIState(activeModalItem);
      renderCalendar();
      showToast(`🎉 Yay Babydoll! Day ${activeModalItem.day} (${activeModalItem.badge}) claimed and added to your Trophy Case! 💖`);
    } else {
      Sound.playCatch();
      showToast(`💖 Babydoll, you already collected Day ${activeModalItem.day}'s badge! It's shining in your collection! ✨`);
    }
  }

  if (closeModalBtn) closeModalBtn.addEventListener('click', closeDayModal);
  if (modalDoneBtn) modalDoneBtn.addEventListener('click', closeDayModal);
  if (modalActionBtn) modalActionBtn.addEventListener('click', claimActiveBadge);
  if (modalBadgeIcon) {
    modalBadgeIcon.addEventListener('click', claimActiveBadge);
    modalBadgeIcon.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        claimActiveBadge();
      }
    });
  }

  if (unlockAllDaysBtn) {
    unlockAllDaysBtn.addEventListener('click', () => {
      previewMode = !previewMode;
      Sound.playChime();
      unlockAllDaysBtn.querySelector('span').textContent = previewMode 
        ? '🔓 All 30 Days Unlocked! (Click any to read & claim)' 
        : '✨ Unlock All Days (Preview Mode)';
      unlockAllDaysBtn.classList.toggle('btn-primary');
      renderCalendar();
    });
  }

  renderCalendar();


  // --------------------------------------------------------------------------
  // 7. GAME 3: BABDYDOLL'S BIRYANI & LOVE CATCHER
  // --------------------------------------------------------------------------
  const biryaniCanvas = document.getElementById('biryaniCanvas');
  const biryaniScoreVal = document.getElementById('biryaniScoreVal');
  const biryaniHighScoreVal = document.getElementById('biryaniHighScoreVal');
  const startBiryaniGameBtn = document.getElementById('startBiryaniGameBtn');
  const overlayStartBtn = document.getElementById('overlayStartBtn');
  const biryaniStartOverlay = document.getElementById('biryaniStartOverlay');
  const biryaniMsgBar = document.getElementById('biryaniMsgBar');

  if (biryaniCanvas) {
    const bctx = biryaniCanvas.getContext('2d');
    let bcw = (biryaniCanvas.width = 800);
    let bch = (biryaniCanvas.height = 420);

    let bScore = 0;
    let bHighScore = parseInt(localStorage.getItem('annu_biryani_highscore') || '0', 10);
    if (biryaniHighScoreVal) biryaniHighScoreVal.textContent = bHighScore;

    let isGameRunning = false;
    let basketX = bcw / 2;
    const basketWidth = 110;
    const basketHeight = 30;

    let fallingItems = [];
    let spawnTimer = 0;

    const itemsConfig = [
      { type: 'biryani', icon: '🍲', pts: 20, color: '#fb923c', speed: 2.5 },
      { type: 'shield', icon: '🛡️', pts: 15, color: '#38bdf8', speed: 2.8 },
      { type: 'swift', icon: '🎵', pts: 15, color: '#c084fc', speed: 2.6 },
      { type: 'heart', icon: '💖', pts: 10, color: '#f472b6', speed: 2.2 },
      { type: 'alarm', icon: '⏰', pts: -5, color: '#ef4444', speed: 3.2 }
    ];

    function spawnItem() {
      const proto = itemsConfig[Math.floor(Math.random() * itemsConfig.length)];
      fallingItems.push({
        x: Math.random() * (bcw - 80) + 40,
        y: -30,
        type: proto.type,
        icon: proto.icon,
        pts: proto.pts,
        color: proto.color,
        speed: proto.speed + Math.random() * 0.8,
        radius: 20
      });
    }

    function updateBasketPosition(clientX) {
      const rect = biryaniCanvas.getBoundingClientRect();
      const scaleX = biryaniCanvas.width / rect.width;
      const x = (clientX - rect.left) * scaleX;
      basketX = Math.max(basketWidth / 2, Math.min(bcw - basketWidth / 2, x));
    }

    biryaniCanvas.addEventListener('mousemove', (e) => {
      if (isGameRunning) updateBasketPosition(e.clientX);
    });

    biryaniCanvas.addEventListener('touchmove', (e) => {
      if (isGameRunning && e.touches.length > 0) {
        e.preventDefault();
        updateBasketPosition(e.touches[0].clientX);
      }
    }, { passive: false });

    // Keyboard support
    window.addEventListener('keydown', (e) => {
      if (!isGameRunning) return;
      if (e.key === 'ArrowLeft') {
        basketX = Math.max(basketWidth / 2, basketX - 25);
      } else if (e.key === 'ArrowRight') {
        basketX = Math.min(bcw - basketWidth / 2, basketX + 25);
      }
    });

    function startBiryaniGame() {
      bScore = 0;
      fallingItems = [];
      isGameRunning = true;
      if (biryaniScoreVal) biryaniScoreVal.textContent = '0';
      if (biryaniStartOverlay) biryaniStartOverlay.style.display = 'none';
      if (biryaniMsgBar) biryaniMsgBar.textContent = 'Catch all the Biryani, Shields, and Hearts! 🍲✨';
      Sound.playChime();
    }

    if (startBiryaniGameBtn) startBiryaniGameBtn.addEventListener('click', startBiryaniGame);
    if (overlayStartBtn) overlayStartBtn.addEventListener('click', startBiryaniGame);

    function renderBiryaniGame() {
      bctx.clearRect(0, 0, bcw, bch);

      if (isGameRunning) {
        spawnTimer++;
        if (spawnTimer > 45) {
          spawnItem();
          spawnTimer = 0;
        }

        // Draw Player's Golden Bowl / Basket
        bctx.save();
        bctx.translate(basketX, bch - 24);

        // Glow
        const bglow = bctx.createRadialGradient(0, 0, 5, 0, 0, basketWidth / 2 + 10);
        bglow.addColorStop(0, 'rgba(251, 191, 36, 0.4)');
        bglow.addColorStop(1, 'transparent');
        bctx.fillStyle = bglow;
        bctx.fillRect(-basketWidth / 2 - 10, -basketHeight - 10, basketWidth + 20, basketHeight + 20);

        // Bowl Body
        bctx.fillStyle = 'linear-gradient(180deg, #fbbf24 0%, #b45309 100%)';
        bctx.beginPath();
        bctx.roundRect(-basketWidth / 2, -basketHeight, basketWidth, basketHeight, [0, 0, 16, 16]);
        bctx.fill();
        bctx.strokeStyle = '#fef08a';
        bctx.lineWidth = 3;
        bctx.stroke();

        // Label on bowl
        bctx.fillStyle = '#fff';
        bctx.font = 'bold 12px sans-serif';
        bctx.textAlign = 'center';
        bctx.textBaseline = 'middle';
        bctx.fillText('💖 ANNU\'S BOWL 💖', 0, -basketHeight / 2);

        bctx.restore();

        // Update & Render falling items
        for (let i = fallingItems.length - 1; i >= 0; i--) {
          const item = fallingItems[i];
          item.y += item.speed;

          // Render item
          bctx.save();
          bctx.font = '28px sans-serif';
          bctx.textAlign = 'center';
          bctx.textBaseline = 'middle';
          bctx.fillText(item.icon, item.x, item.y);
          bctx.restore();

          // Catch collision with basket
          const basketTop = bch - 24 - basketHeight;
          if (
            item.y >= basketTop &&
            item.y <= bch - 10 &&
            item.x >= basketX - basketWidth / 2 - 15 &&
            item.x <= basketX + basketWidth / 2 + 15
          ) {
            // Caught!
            bScore += item.pts;
            if (item.pts > 0) {
              Sound.playCatch();
            } else {
              Sound.playTone(150, 'sawtooth', 0.2, 0.1);
            }

            if (biryaniScoreVal) biryaniScoreVal.textContent = Math.max(0, bScore);

            if (bScore > bHighScore) {
              bHighScore = bScore;
              localStorage.setItem('annu_biryani_highscore', bHighScore);
              if (biryaniHighScoreVal) biryaniHighScoreVal.textContent = bHighScore;
            }

            if (bScore >= 100) {
              if (biryaniMsgBar) {
                biryaniMsgBar.innerHTML = '🎉 <strong>FEAST ACQUIRED!</strong> Babydoll, you scored 100+ points! You win unlimited Biryani for life! 👑🍲';
              }
            }

            fallingItems.splice(i, 1);
            continue;
          }

          // Off bottom of screen
          if (item.y > bch + 40) {
            fallingItems.splice(i, 1);
          }
        }
      }

      requestAnimationFrame(renderBiryaniGame);
    }
    renderBiryaniGame();
  }


  // --------------------------------------------------------------------------
  // 8. 100 REASONS WHY ANNU IS IRREPLACEABLE GENERATOR
  // --------------------------------------------------------------------------
  const generateReasonBtn = document.getElementById('generateReasonBtn');
  const nextReasonBtn = document.getElementById('nextReasonBtn');
  const reasonText = document.getElementById('reasonText');
  const reasonCounter = document.getElementById('reasonCounter');

  const loveReasons = [
    "Babydoll, from the way your eyes sparkle when you smile to how you make every ordinary day feel like a fairytale—loving you is the easiest thing in the world.",
    "Because whenever you start singing Taylor Swift songs, your enthusiasm is cuter than anything else on earth.",
    "Because no one in this universe looks more adorable eating a plate of hot Dum Biryani than my Annu.",
    "Because you have the courage of Captain America and the sweetest, gentlest heart of any human alive.",
    "Because the way we look at each other has more drama, passion, and chemistry than Ranveer and Deepika in Bajirao Mastani.",
    "Because when you hold my hand, all the stress in the world completely melts away.",
    "Because calling you 'Babydoll' will always be my absolute favorite word in the English language.",
    "Because you remember the little things that make me happy, even when I forget them myself.",
    "Because your laugh is my personal favorite soundtrack.",
    "Because you look breathtaking whether you are dressed up for a party or lounging in oversized pajamas.",
    "Because even if I had Steve Rogers' shield and Thor's hammer, your love would still be my greatest superpower.",
    "Because you make me want to be the best version of myself every single day.",
    "Because our late-night conversations are the most peaceful hours of my week.",
    "Because your hugs feel like coming home after a very long journey.",
    "Because you are kind to strangers, gentle with animals, and generous with your love.",
    "Because whenever you get excited about something, your whole face lights up with sheer joy.",
    "Because you always know how to turn a gloomy day into an adventure.",
    "Because I could search all 14,000,605 outcomes in the multiverse and I would still choose you in every single one.",
    "Because your voice is the sweetest sound to fall asleep to.",
    "Because you are my girlfriend, my best friend, my confidante, and my favorite person all rolled into one."
  ];

  let currentReasonIndex = 0;

  function showNextReason() {
    Sound.playChime();
    currentReasonIndex = (currentReasonIndex + 1) % loveReasons.length;

    if (reasonText) {
      reasonText.style.opacity = '0';
      reasonText.style.transform = 'translateY(10px)';

      setTimeout(() => {
        reasonText.textContent = loveReasons[currentReasonIndex];
        reasonText.style.transition = 'all 0.4s ease';
        reasonText.style.opacity = '1';
        reasonText.style.transform = 'translateY(0)';
      }, 200);
    }

    if (reasonCounter) {
      reasonCounter.textContent = `Reason #${currentReasonIndex + 1} of ${loveReasons.length}`;
    }
  }

  if (generateReasonBtn) {
    generateReasonBtn.addEventListener('click', showNextReason);
    generateReasonBtn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        showNextReason();
      }
    });
  }
  if (nextReasonBtn) nextReasonBtn.addEventListener('click', showNextReason);


  // --------------------------------------------------------------------------
  // 9. INTERACTIVE CAKE & CANDLE BLOWING
  // --------------------------------------------------------------------------
  const blowCandlesBtn = document.getElementById('blowCandlesBtn');
  const relightCandlesBtn = document.getElementById('relightCandlesBtn');
  const cakeWishBanner = document.getElementById('cakeWishBanner');
  const flames = [
    document.getElementById('flame1'),
    document.getElementById('flame2'),
    document.getElementById('flame3')
  ];

  let blownCount = 0;

  function blowSingleCandle(flame) {
    if (!flame || flame.classList.contains('blown-out')) return;
    flame.classList.add('blown-out');
    blownCount++;
    Sound.playTone(400, 'sine', 0.2, 0.08);

    if (blownCount >= 3) {
      celebrateAllCandlesBlown();
    }
  }

  // Allow clicking on each individual flame
  flames.forEach(flame => {
    if (flame) {
      flame.parentElement.addEventListener('click', () => blowSingleCandle(flame));
    }
  });

  function celebrateAllCandlesBlown() {
    Sound.playHappyBirthdayTune();
    if (cakeWishBanner) cakeWishBanner.style.display = 'block';
    if (blowCandlesBtn) blowCandlesBtn.style.display = 'none';
    if (relightCandlesBtn) relightCandlesBtn.style.display = 'inline-flex';
  }

  if (blowCandlesBtn) {
    blowCandlesBtn.addEventListener('click', () => {
      flames.forEach(flame => {
        if (flame) flame.classList.add('blown-out');
      });
      blownCount = 3;
      celebrateAllCandlesBlown();
    });
  }

  if (relightCandlesBtn) {
    relightCandlesBtn.addEventListener('click', () => {
      flames.forEach(flame => {
        if (flame) flame.classList.remove('blown-out');
      });
      blownCount = 0;
      Sound.playChime();
      if (cakeWishBanner) cakeWishBanner.style.display = 'none';
      if (blowCandlesBtn) blowCandlesBtn.style.display = 'inline-flex';
      if (relightCandlesBtn) relightCandlesBtn.style.display = 'none';
    });
  }

  console.log("Annu's Birthday Galaxy successfully loaded with infinite love! 💖");
})();
