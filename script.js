const highlight = document.querySelector('.nav-highlight');
const navItems = document.querySelectorAll('.nav-item');
const menuToggle = document.getElementById('menuToggle');
const menuClose = document.getElementById('menuClose');
const mobileMenu = document.getElementById('mobileMenu');

// Highlight active nav item
function moveHighlightTo(element) {
  const rect = element.getBoundingClientRect();
  const parentRect = element.parentElement.getBoundingClientRect();
  highlight.style.left = (rect.left - parentRect.left) + 'px';
  highlight.style.width = rect.width + 'px';
}

// Handle nav item clicks
navItems.forEach(item => {
  item.addEventListener('click', () => {
    navItems.forEach(i => i.classList.remove('active'));
    item.classList.add('active');
    moveHighlightTo(item);
  });
});

// Open mobile menu
menuToggle.addEventListener('click', () => {
  mobileMenu.classList.add('show');
});

// Close mobile menu
menuClose.addEventListener('click', () => {
  mobileMenu.classList.remove('show');
});

// On load: position highlight under active item
window.addEventListener('load', () => {
  const activeItem = document.querySelector('.nav-item.active');
  if (activeItem) {
    moveHighlightTo(activeItem);
  }
});

// Smooth page transition
document.querySelectorAll('a[href^="/"]').forEach(link => {
  // Exclude external links and anchors
  const isSameTab = link.target !== '_blank' && !link.href.includes('#');

  if (isSameTab) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const href = this.getAttribute('href');

      document.body.classList.add('fade-out');

      setTimeout(() => {
        window.location.href = href;
      }, 400); // Match the CSS transition time
    });
  }
});

// Fade in when page loads
window.addEventListener('DOMContentLoaded', () => {
  document.body.classList.remove('fade-out');
});
