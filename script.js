const btn = document.getElementById('celebrateBtn');

btn.addEventListener('click', () => {
  showYouTube();
  launchFireworks();
});

function showYouTube() {
  const container = document.getElementById('video-container');
  const iframe = document.createElement('iframe');
  iframe.src = "https://www.youtube.com/embed/zbPt9LkPT4c?si=-cajgcEezTGPYEud?autoplay=1&rel=0";
  container.appendChild(iframe);
}

// Firework effect (simple)
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

function Particle(x, y) {
  this.x = x;
  this.y = y;
  this.radius = Math.random() * 3 + 2;
  this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
  this.speedX = (Math.random() - 0.5) * 8;
  this.speedY = (Math.random() - 0.5) * 8;
  this.life = 100;
}

Particle.prototype.update = function () {
  this.x += this.speedX;
  this.y += this.speedY;
  this.life--;
};

Particle.prototype.draw = function () {
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
  ctx.fillStyle = this.color;
  ctx.fill();
};

function handleParticles() {
  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].draw();

    if (particles[i].life <= 0) {
      particles.splice(i, 1);
      i--;
    }
  }
}

function animate() {
  ctx.fillStyle = "rgba(0,0,0,0.1)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  handleParticles();
  requestAnimationFrame(animate);
}

function launchFireworks() {
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  for (let i = 0; i < 100; i++) {
    particles.push(new Particle(centerX, centerY));
  }
}

animate();

function createConfetti() {
  const container = document.getElementById('confetti-container');
  const confetti = document.createElement('div');
  confetti.classList.add('confetti');

  // Random warna & posisi
  const colors = ['#ff0', '#f0f', '#0ff', '#0f0', '#f00', '#00f'];
  confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
  confetti.style.left = `${Math.random() * 100}%`;
  confetti.style.animationDuration = `${2 + Math.random() * 3}s`;

  container.appendChild(confetti);

  // Hapus setelah jatuh
  setTimeout(() => confetti.remove(), 5000);
}

// Buat konfeti tiap beberapa ms
setInterval(createConfetti, 150);