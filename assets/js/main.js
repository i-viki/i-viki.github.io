(function () {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)

    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function (e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '#navbar .nav-link', function (e) {
    let section = select(this.hash)
    if (section) {
      e.preventDefault()

      let navbar = select('#navbar')
      let header = select('#header')
      let sections = select('section', true)
      let navlinks = select('#navbar .nav-link', true)

      navlinks.forEach((item) => {
        item.classList.remove('active')
      })

      this.classList.add('active')

      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }

      if (this.hash == '#header') {
        header.classList.remove('header-top')
        sections.forEach((item) => {
          item.classList.remove('section-show')
        })
        return;
      }

      if (!header.classList.contains('header-top')) {
        header.classList.add('header-top')
        setTimeout(function () {
          sections.forEach((item) => {
            item.classList.remove('section-show')
          })
          section.classList.add('section-show')

        }, 350);
      } else {
        sections.forEach((item) => {
          item.classList.remove('section-show')
        })
        section.classList.add('section-show')
      }

      scrollto(this.hash)
    }
  }, true)

  /**
   * Activate/show sections on load with hash links
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      let initial_nav = select(window.location.hash)

      if (initial_nav) {
        let header = select('#header')
        let navlinks = select('#navbar .nav-link', true)

        header.classList.add('header-top')

        navlinks.forEach((item) => {
          if (item.getAttribute('href') == window.location.hash) {
            item.classList.add('active')
          } else {
            item.classList.remove('active')
          }
        })

        setTimeout(function () {
          initial_nav.classList.add('section-show')
        }, 350);

        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function (direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      delay: 50,
      once: true,
      mirror: true,
      anchorPlacement: 'top-bottom',
      offset: 120,
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Preloader
   */
  const preloader = document.querySelector('.preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }
  document.addEventListener("DOMContentLoaded", () => {
    const waveImg = document.getElementById("wave-img");

    // Change to emoji after 3 seconds (first load)
    setTimeout(() => {
      waveImg.src = "./assets/img/wave-still.gif"; // Static emoji image
    }, 300);

    // Show GIF on hover
    waveImg.addEventListener("mouseenter", () => {
      waveImg.src = "./assets/img/wave.gif";
    });

    // Switch back to emoji when not hovering
    waveImg.addEventListener("mouseleave", () => {
      waveImg.src = "./assets/img/wave-still.gif";
    });
  });
  /**
   * Typed
   */
  document.addEventListener("DOMContentLoaded", function () {
    const extraText = document.getElementById('extra-text');
    new Typed('.typed', {
      strings: ['Programmer', 'Tech Geek', 'Developer'],
      loop: false,
      cursorChar: '',
      typeSpeed: 100,
      backSpeed: 5,
      backDelay: 1000,
      onComplete: () => {
        setTimeout(() => {
          extraText.classList.add('show-text');
        }, 100);
      }
    });
  });

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function (e) {
        e.preventDefault();
        portfolioFilters.forEach(function (el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Initiate portfolio details lightbox 
   */
  const portfolioDetailsLightbox = GLightbox({
    selector: '.portfolio-details-lightbox',
    width: '90%',
    height: '90vh'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

  document.addEventListener("DOMContentLoaded", function () {
    const contextMenu = document.getElementById("context-menu");
    const copyTextItem = document.getElementById("copy-text");
    let selectedText = ""; // Store selected text

    document.addEventListener("contextmenu", (event) => {
        event.preventDefault();
        
        selectedText = window.getSelection().toString().trim();
        updateCopyState();

        contextMenu.style.top = `${event.clientY}px`;
        contextMenu.style.left = `${event.clientX}px`;
        contextMenu.classList.add("active");
    });

    document.addEventListener("click", (event) => {
        if (!contextMenu.contains(event.target)) {
            hideContextMenu();
        }
    });

    document.getElementById("refresh").addEventListener("click", () => {
        location.reload();
        hideContextMenu();
    });

    document.getElementById("go-back").addEventListener("click", () => {
        history.back();
        hideContextMenu();
    });

    document.getElementById("scroll-top").addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        hideContextMenu();
    });

    function updateCopyState() {
        if (selectedText.length > 0) {
            copyTextItem.classList.remove("disabled");
            copyTextItem.onclick = () => {
                copyText();
                hideContextMenu();
            };
        } else {
            copyTextItem.classList.add("disabled");
            copyTextItem.onclick = null;
        }
    }

    function copyText() {
        if (selectedText.length > 0) {
            navigator.clipboard.writeText(selectedText)
                .then(() => {
                   console.log(`Copied: "${selectedText}"`); 
                })
                .catch(err => {
                    console.error("Failed to copy text: ", err);
                });
        }
    }

    function hideContextMenu() {
        contextMenu.classList.remove("active");
    }
});







//   /**
//  * This script updates the accent color of the page based on the current day. 
//  * It generates a new random color each day, stores it in localStorage, and applies it as the CSS variable.
//  */
//   window.addEventListener("load", () => {
//     localStorage.removeItem("accentColor");
//     updateAccentColor();
//   });

//   function updateAccentColor() {
//     let today = new Date(Date.now() + 86400000).toISOString().split("T")[0];

//     let storedDate = localStorage.getItem("accentColorDate");
//     let storedColor = localStorage.getItem("accentColor");

//     if (!storedDate || storedDate !== today || !storedColor) {
//       let randomColor = Math.floor(Math.random() * 16777215).toString(16);
//       let newColor = "#" + randomColor.padStart(6, "0");

//       document.documentElement.style.setProperty("--accent-color", newColor);
//       localStorage.setItem("accentColorDate", today);
//       localStorage.setItem("accentColor", newColor);
//     } else {
//       document.documentElement.style.setProperty("--accent-color", storedColor);
//     }
//   }

window.changeAccentColor = function () {
  let newColor = getRandomColor();
  document.documentElement.style.setProperty('--accent-color', newColor);

  // Update the small color circle
  const colorIndicator = document.querySelector(".color-indicator");
  if (colorIndicator) {
    colorIndicator.style.backgroundColor = newColor;
  }
};

function getRandomColor() {
  let randomColor = Math.floor(Math.random() * 16777215).toString(16);
  return "#" + randomColor.padStart(6, "0"); // Ensures a valid 6-digit hex code
}

  document.addEventListener("DOMContentLoaded", () => {
    const button = document.querySelector(".floating-button");
    if (button) {
      button.addEventListener("click", changeAccentColor);
    }
  });

  /**
 * Initialize and update IST time display
 */

  function updateTime() {
    const now = new Date();

    const options = { timeZone: "Asia/Kolkata", hour12: true, hour: "2-digit", minute: "2-digit", second: "2-digit" };
    const istTime = now.toLocaleTimeString("en-US", options);

    const utcTime = now.getTime() + now.getTimezoneOffset() * 60000;
    const istOffset = 5.5 * 60 * 60 * 1000;
    const gmtDifference = `GMT+${(istOffset / 3600000).toFixed(1)}`;

    const timeElement = document.getElementById("time");
    if (timeElement) {
      timeElement.innerText = `${istTime} ${gmtDifference}`;
    }
  }

  setInterval(updateTime, 1000);
  updateTime();

  /**
   * Calculate and update real-time age display
   */

  function calculateAge() {
    const birthDate = new Date("2002-02-27T00:00:00");
    const now = new Date();

    const diffMilliseconds = now - birthDate;
    const years = (diffMilliseconds / (1000 * 60 * 60 * 24 * 365.2425)).toFixed(9);

    const ageElement = document.getElementById("age");
    if (ageElement) {
      ageElement.innerText = years + " years";
    }
  }

  setInterval(calculateAge, 100);
  calculateAge();

  /**
   * Initializes ScrollReveal for the element with the ID "sr" if it exists.
   */

  document.addEventListener('DOMContentLoaded', function () {
    const element = document.getElementById('sr');
    if (element) {
      ScrollReveal({
        reset: false
      }).reveal('#sr', {
        delay: 300,
        duration: 1000,
      });
    }
  });


  /**
     * Handle form submission 
     */
  const encodedUrl = "aHR0cHM6Ly93b3JrZXJmb3IuZm9ybXdvcmtlci53b3JrZXJzLmRldi8=";
  document.querySelector(".php-email-form").addEventListener("submit", function (e) {
    e.preventDefault();

    let form = new FormData(this);
    let formEntries = new URLSearchParams();

    for (let pair of form.entries()) {
      formEntries.append(pair[0], pair[1]);
    }

    let submitButton = this.querySelector("button[type='submit']");
    let loadingMessage = document.querySelector(".loading");
    let errorMessage = document.querySelector(".error-message");
    let successMessage = document.querySelector(".sent-message");

    loadingMessage.style.display = "block";
    errorMessage.style.display = "none";
    successMessage.style.display = "none";
    submitButton.disabled = true;

    fetch(atob(encodedUrl), {
      method: "POST",
      body: formEntries,
      mode: "no-cors"
    }).then(() => {
      loadingMessage.style.display = "none";
      successMessage.style.display = "block";
      this.reset();
      setTimeout(() => {
        successMessage.style.transition = "opacity 1s ease-out";
        successMessage.style.opacity = "0";
        setTimeout(() => {
          successMessage.style.display = "none";
          successMessage.style.opacity = "1";
        }, 1000);
      }, 3000);
    }).catch(error => {
      loadingMessage.style.display = "none";
      errorMessage.style.display = "block";
      console.error("❌ Form submission error:", error);
    }).finally(() => {
      submitButton.disabled = false;
    });
  });

})()