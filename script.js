const canvas = document.getElementById('canvas-bg');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const stars = [];
const starCount = 100;

class Star {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.brightness = Math.random();
    }
    
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        if (this.x < 0 || this.x > canvas.width) this.speedX = -this.speedX;
        if (this.y < 0 || this.y > canvas.height) this.speedY = -this.speedY;
        
        this.brightness += (Math.random() - 0.5) * 0.1;
        this.brightness = Math.max(0.3, Math.min(1, this.brightness));
    }
    
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(233, 69, 96, ${this.brightness})`;
        ctx.fill();
    }
}

for (let i = 0; i < starCount; i++) {
    stars.push(new Star());
}

function connectStars() {
    for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
            const dx = stars[i].x - stars[j].x;
            const dy = stars[i].y - stars[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(233, 69, 96, ${0.2 * (1 - distance / 100)})`;
                ctx.lineWidth = 0.5;
                ctx.moveTo(stars[i].x, stars[i].y);
                ctx.lineTo(stars[j].x, stars[j].y);
                ctx.stroke();
            }
        }
    }
}

function animateCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    stars.forEach(star => {
        star.update();
        star.draw();
    });
    
    connectStars();
    requestAnimationFrame(animateCanvas);
}

animateCanvas();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (10 + Math.random() * 10) + 's';
        particlesContainer.appendChild(particle);
    }
}

const texts = [
    "Web Developer",
    "UI/UX Designer",
    "Creative Thinker",
    "Problem Solver"
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 100;
const deletingSpeed = 50;
const pauseTime = 2000;

function typeText() {
    const currentText = texts[textIndex];
    const typedTextElement = document.getElementById('typed-text');
    
    if (!isDeleting) {
        typedTextElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        
        if (charIndex === currentText.length) {
            isDeleting = true;
            setTimeout(typeText, pauseTime);
            return;
        }
    } else {
        typedTextElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        
        if (charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
        }
    }
    
    setTimeout(typeText, isDeleting ? deletingSpeed : typingSpeed);
}

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            if (entry.target.id === 'skills-grid') {
                const progressBars = entry.target.querySelectorAll('.skill-progress-bar');
                progressBars.forEach((bar, index) => {
                    const skill = bar.getAttribute('data-skill');
                    setTimeout(() => {
                        bar.style.width = skill + '%';
                    }, index * 200);
                });
            }
        }
    });
}, observerOptions);

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const toastHtml = `
        <div class="position-fixed top-0 end-0 p-3" style="z-index: 11">
            <div class="toast show" role="alert">
                <div class="toast-header" style="background: linear-gradient(135deg, #e94560, #0f3460); color: white;">
                    <strong class="me-auto">Success!</strong>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast"></button>
                </div>
                <div class="toast-body" style="background: var(--glass-bg); color: white;">
                    Thank you for your message! I will get back to you soon.
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', toastHtml);
    this.reset();
    
    setTimeout(() => {
        const toast = document.querySelector('.toast');
        if (toast) toast.remove();
    }, 3000);
});

window.addEventListener('scroll', () => {
    const navbar = document.querySelector('nav');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(15, 15, 35, 0.98)';
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(15, 15, 35, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    typeText();
    
    document.querySelectorAll('#skills-grid, #portfolio-grid').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = 'all 0.8s ease';
        observer.observe(el);
    });
});

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});