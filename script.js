// script.js - Particles + smooth scroll + small reveals

const canvas = document.getElementById('bg');
const ctx = canvas.getContext('2d');

function fitCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', fitCanvas);
fitCanvas();

// Particle system (colorful neon orbs connected faintly)
let particles = [];
const PARTICLE_COUNT = Math.max(80, Math.floor(window.innerWidth / 12));

class Particle {
  constructor(){
    this.reset();
  }
  reset(){
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.vx = (Math.random()-0.5) * 0.8;
    this.vy = (Math.random()-0.5) * 0.8;
    this.r = Math.random()*1.6 + 0.6;
    this.h = Math.random()*360;
    this.alpha = 0.6 + Math.random()*0.4;
  }
  update(){
    this.x += this.vx; this.y += this.vy;
    if(this.x < -10 || this.x > canvas.width + 10 || this.y < -10 || this.y > canvas.height + 10){
      // respawn on opposite side for better flow
      if(Math.random() > 0.5) this.x = Math.random()*canvas.width;
      this.y = Math.random()*canvas.height;
    }
  }
  draw(){
    ctx.beginPath();
    ctx.fillStyle = `hsla(${this.h},90%,60%,${this.alpha})`;
    ctx.shadowBlur = 18;
    ctx.shadowColor = `hsla(${this.h},90%,60%,${this.alpha})`;
    ctx.arc(this.x, this.y, this.r, 0, Math.PI*2);
    ctx.fill();
    ctx.closePath();
  }
}

function initParticles(){
  particles = [];
  for(let i=0;i<PARTICLE_COUNT;i++) particles.push(new Particle());
}
initParticles();

function connect() {
  for(let i=0;i<particles.length;i++){
    for(let j=i+1;j<particles.length;j++){
      const a = particles[i], b = particles[j];
      const dx = a.x - b.x, dy = a.y - b.y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      if(dist < 120){
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = `rgba(100,180,255,${(120-dist)/260})`;
        ctx.lineWidth = 0.6;
        ctx.stroke();
        ctx.closePath();
      }
    }
  }
}

function anim(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.globalCompositeOperation = 'lighter';
  particles.forEach(p => { p.update(); p.draw(); });
  ctx.globalCompositeOperation = 'source-over';
  connect();
  requestAnimationFrame(anim);
}
anim();

// small interactive: smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', (e)=>{
    const href = a.getAttribute('href');
    if(href.length > 1){
      e.preventDefault();
      const target = document.querySelector(href);
      if(target) target.scrollIntoView({behavior:'smooth', block:'start'});
    }
  });
});

// reveal on scroll (simple)
const revealItems = document.querySelectorAll('.preview-card, .card, .content section, .preview-grid article');
const revealOnScroll = () => {
  const top = window.innerHeight * 0.85;
  revealItems.forEach(el=>{
    const rect = el.getBoundingClientRect();
    if(rect.top < top) el.style.transform = 'translateY(0)'; 
  });
};
window.addEventListener('scroll', revealOnScroll);
// initial tiny transform
revealItems.forEach(el=>{el.style.transform='translateY(18px)';el.style.transition='all 700ms ease';});
revealOnScroll();
