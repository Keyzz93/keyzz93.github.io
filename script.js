// Particules de fond
const canvas = document.getElementById('bg');
const ctx = canvas.getContext('2d');

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

let particles = [];
class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.vx = (Math.random() - 0.5) * 0.8;
    this.vy = (Math.random() - 0.5) * 0.8;
    this.size = Math.random() * 2 + 1;
    this.color = Math.random() > 0.5 ? '#ff4fff' : '#66e0ff';
  }
  update() {
    this.x += this.vx; this.y += this.vy;
    if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
    if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.shadowBlur = 10; ctx.shadowColor = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
    ctx.fill();
  }
}

function init() {
  particles = [];
  for (let i=0;i<160;i++) particles.push(new Particle());
}

function animate() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.globalCompositeOperation = 'lighter';
  particles.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animate);
}
init(); animate();

// Formulaire contact
const form = document.getElementById('contactForm');
form.addEventListener('submit', function(e){
  e.preventDefault();
  const name = form.name.value;
  const email = form.email.value;
  const message = form.message.value;

  // Ouvre Gmail avec nouveau mail
  const mailto = `mailto:tonemail@gmail.com?subject=Message de ${name}&body=${encodeURIComponent(message + "\n\nDe: " + email)}`;
  window.location.href = mailto;

  document.getElementById('msgConfirm').style.display = 'block';
  form.reset();
});
