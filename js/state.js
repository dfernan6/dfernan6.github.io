// Global state object
const state = {
  currentPage: 'home',
  mobileMenuOpen: false,
  language: 'pt' // valores possíveis: 'pt', 'en', 'es'
};


// Navigation helpers
function navigateTo(pageId) {
  state.currentPage = pageId;
  state.mobileMenuOpen = false;
  render(); // render() must be defined in render.js
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleMobileMenu() {
  state.mobileMenuOpen = !state.mobileMenuOpen;
  render();
}
