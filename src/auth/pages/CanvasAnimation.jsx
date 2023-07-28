import React, { useEffect, useRef } from 'react';
import "./canvas.css";
const CanvasAnimation = () => {
  const canvasRef = useRef(null);
  const dpi = window.devicePixelRatio || 1;
  const particleCount = 70;
  const particles = [];
  const couleurs = ["#C42189", "#4AADDA", "#fff", "#ffbd39"];

  function fixDPI() {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const styleHeight = +getComputedStyle(canvas).getPropertyValue("height").slice(0, -2);
    const styleWidth = +getComputedStyle(canvas).getPropertyValue("width").slice(0, -2);

    canvas.setAttribute('height', styleHeight * dpi);
    canvas.setAttribute('width', styleWidth * dpi);
  }

  function Particle() {
    this.radius = Math.round((Math.random() * 3) + 5);
    this.x = Math.floor((Math.random() * ((+getComputedStyle(canvasRef.current).getPropertyValue("width").slice(0, -2) * dpi) - this.radius + 1) + this.radius));
    this.y = Math.floor((Math.random() * ((+getComputedStyle(canvasRef.current).getPropertyValue("height").slice(0, -2) * dpi) - this.radius + 1) + this.radius));
    this.color = couleurs[Math.floor(Math.random() * couleurs.length)];
    this.speedx = Math.round((Math.random() * 201) + 0) / 100;
    this.speedy = Math.round((Math.random() * 201) + 0) / 100;

    switch (Math.round(Math.random() * couleurs.length)) {
      case 1:
        this.speedx *= 1;
        this.speedy *= 1;
        break;
      case 2:
        this.speedx *= -1;
        this.speedy *= 1;
        break;
      case 3:
        this.speedx *= 1;
        this.speedy *= -1;
        break;
      case 4:
        this.speedx *= -1;
        this.speedy *= -1;
        break;
    }

    this.move = function () {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      context.beginPath();
      context.globalCompositeOperation = 'source-over';
      context.fillStyle = this.color;
      context.globalAlpha = 1;
      context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      context.fill();
      context.closePath();

      this.x = this.x + this.speedx;
      this.y = this.y + this.speedy;

      if (this.x <= 0 + this.radius) {
        this.speedx *= -1;
      }
      if (this.x >= canvas.width - this.radius) {
        this.speedx *= -1;
      }
      if (this.y <= 0 + this.radius) {
        this.speedy *= -1;
      }
      if (this.y >= canvas.height - this.radius) {
        this.speedy *= -1;
      }

      for (let j = 0; j < particleCount; j++) {
        const particleActuelle = particles[j];
        const yd = particleActuelle.y - this.y;
        const xd = particleActuelle.x - this.x;
        const d = Math.sqrt(xd * xd + yd * yd);

        if (d < 200) {
          context.beginPath();
          context.globalAlpha = (200 - d) / (200 - 0);
          context.globalCompositeOperation = 'destination-over';
          context.lineWidth = 1;
          context.moveTo(this.x, this.y);
          context.lineTo(particleActuelle.x, particleActuelle.y);
          context.strokeStyle = this.color;
          context.lineCap = "round";
          context.stroke();
          context.closePath();
        }
      }
    };
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    fixDPI();

    for (let i = 0; i < particleCount; i++) {
      const particle = new Particle();
      particles.push(particle);
    }

    function animate() {
      fixDPI();
      context.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particleCount; i++) {
        particles[i].move();
      }
      requestAnimationFrame(animate);
    }

    animate();
  }, []);

  return <canvas ref={canvasRef}  id="canvas"></canvas>;
};

export default CanvasAnimation;
