/**
 * CITY EYES — Radar & Constellation Urbaine Canvas
 * Animation d'arrière-plan du Hero : points reliés et faisceau radar
 */
(function initRadarCanvas() {
  'use strict';

  const canvas = document.getElementById('radar-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let width = 0;
  let height = 0;
  let points = [];
  let radarAngle = 0;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  function resizeCanvas() {
    const parent = canvas.parentElement;
    width = parent ? parent.clientWidth : window.innerWidth;
    height = parent ? parent.clientHeight : window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const count = Math.min(Math.floor((width * height) / 14000), 65);
    points = [];
    for (let i = 0; i < count; i++) {
      points.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 2 + 1.2
      });
    }
  }

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  function drawHeroCanvas() {
    ctx.clearRect(0, 0, width, height);
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const nodeColor = isDark ? 'rgba(142, 205, 247, 0.7)' : 'rgba(47, 128, 237, 0.6)';
    const linkBase = isDark ? '142, 205, 247' : '47, 128, 237';

    // Déplacement des points
    points.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;
    });

    // Tracé des connexions réseau
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        const dx = points[i].x - points[j].x;
        const dy = points[i].y - points[j].y;
        const dist = Math.hypot(dx, dy);
        if (dist < 130) {
          const alpha = (1 - dist / 130) * 0.28;
          ctx.strokeStyle = `rgba(${linkBase}, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(points[i].x, points[i].y);
          ctx.lineTo(points[j].x, points[j].y);
          ctx.stroke();
        }
      }
      // Nœud
      ctx.fillStyle = nodeColor;
      ctx.beginPath();
      ctx.arc(points[i].x, points[i].y, points[i].radius, 0, Math.PI * 2);
      ctx.fill();
    }

    // Balayage radar giratoire
    const centerX = width * 0.75;
    const centerY = height * 0.5;
    const radarRadius = Math.min(width, height) * 0.5;

    radarAngle += 0.008;
    const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radarRadius);
    gradient.addColorStop(0, isDark ? 'rgba(47, 128, 237, 0.06)' : 'rgba(47, 128, 237, 0.035)');
    gradient.addColorStop(1, 'transparent');

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radarRadius, 0, Math.PI * 2);
    ctx.fill();

    if (!reducedMotion) {
      requestAnimationFrame(drawHeroCanvas);
    }
  }

  drawHeroCanvas();
})();
