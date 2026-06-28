// Quando o DOM estiver pronto, chama render()
document.addEventListener('DOMContentLoaded', render);

document.getElementById("language-select").addEventListener("change", (e) => {
  state.language = e.target.value;
  render();
});

// Dark mode toggle
document.addEventListener('DOMContentLoaded', () => {
  const toggleButton = document.getElementById("toggle-theme");
  if (toggleButton) {
    toggleButton.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      toggleButton.textContent = document.body.classList.contains("dark-mode")
        ? "☀️ Light Mode"
        : "🌙 Dark Mode";
    });
  }
});

function updateGradient() {
  const scrollTop = window.scrollY;
  const windowHeight = window.innerHeight;
  const docHeight = document.documentElement.scrollHeight;

  const progress = scrollTop / (docHeight - windowHeight);
  const angle = 135 + (180 * progress);

  const borderElements = document.querySelectorAll(
    ".card, .social-button, .textoOculto, .logo-image, .languages, .progress-fill , .video-wrapper, .simbolos, .logo-foto"
  );

  borderElements.forEach(el => {
    el.style.border = "3px solid transparent";
    el.style.borderImage = `linear-gradient(${angle}deg, var(--primary), var(--secondary)) 1`;
    el.style.transition = "border-image 0.3s ease";
  });

  const backgroundElements = document.querySelectorAll(
    ".logo-icon, .logo-text, .nav-button.active, .progress-fill"
  );

  backgroundElements.forEach(el => {
    el.style.backgroundImage = `linear-gradient(${angle}deg, var(--primary), var(--secondary))`;
    el.style.transition = "background-image 0.3s ease";
  });

  const titles = document.querySelectorAll("h1");
  titles.forEach(el => {
    el.style.backgroundImage = `linear-gradient(${angle}deg, var(--primary), var(--secondary))`;
    el.style.backgroundClip = "text";
    el.style.webkitBackgroundClip = "text";
    el.style.color = "transparent";
  });

  const headers = document.querySelectorAll("header, .header-container, .skills, h4, h3");
  headers.forEach(el => {
    el.style.borderBottom = "3px solid transparent";
    el.style.borderImage = `linear-gradient(${angle}deg, var(--primary), var(--secondary)) 1`;
    el.style.borderImageSlice = 1;
  });
}

// Aufruf beim Scrollen
window.addEventListener("scroll", updateGradient);

// Aufruf beim Laden der Seite
window.addEventListener("DOMContentLoaded", updateGradient);
