// main.js

document.addEventListener('DOMContentLoaded', () => {
  const heading = document.getElementById('heading');

  function updateText() {
    if (window.innerWidth <= 768) {
      heading.innerHTML = 'J<span class="color">V</span>'; // Mobile-specific
    } else {
      heading.innerHTML = 'JayaV<span class="color">i</span>gnesh'; // Desktop
    }
  }

  // Initial call
  updateText();

  // Listen to screen resize
  window.addEventListener('resize', updateText);
});
