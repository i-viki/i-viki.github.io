// Select the heading element
const heading = document.getElementById('heading');

// Function to update the text based on screen size
function updateText() {
  if (window.innerWidth <= 768) {
    heading.innerHTML = 'J<span class="color">V</span>'; // Mobile-specific content with color
  } else {
    heading.innerHTML = 'JayaV<span class="color">i</span>gnesh'; // Desktop content
  }
}

// Call the function initially to set the correct text
updateText();

// Add event listener to handle screen resize
window.addEventListener('resize', updateText);
