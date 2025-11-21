// Script pour le bouton "alert" dans le tuto
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', () => {
    console.log('Bouton cliqué !');
  });
});

// Formulaire contact
const form = document.getElementById('contactForm');
form?.addEventListener('submit', function(e){
  e.preventDefault();
  document.getElementById('confirmation').style.display = 'block';
  form.reset();
});

// Animation canvas (fond dynamique)
const canvas = document.getElementById('bg');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];
for(let i = 0; i < 100; i++){
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 1.5,
    speed: Math.random() * 0.5
  });
}

function animate(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'white';
  stars.forEach(star => {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI*2);
    ctx.fill();
    star.y += star.speed;
    if(star.y > canvas.height) star.y = 0;
  });
  requestAnimationFrame(animate);
}
animate();

// Resize canvas automatiquement
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

