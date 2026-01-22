/**
   * Apply .scrolled class to the body as the page is scrolled down
   */
document.addEventListener('DOMContentLoaded', function(){
    const duration = 1200; // ms

    function animateNumber(el, start, end, duration){
        const startTime = performance.now();
        function step(now){
            const t = Math.min((now - startTime)/duration, 1);
            const value = Math.round(start + (end - start) * t);
            el.textContent = value + '%';
            if(t < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
    }

    function animateFill(fillEl, percent, textEl){
        fillEl.style.width = percent + '%';
        if(textEl){
            animateNumber(textEl, 0, percent, duration);
        }
    }

    // Handle modern .progress-item[data-percent]
    const items = Array.from(document.querySelectorAll('.progress-item[data-percent]'));

    // Handle legacy .progress-bar with aria-valuenow
    const legacyBars = Array.from(document.querySelectorAll('.progress-bar'));

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if(!entry.isIntersecting) return;
            const target = entry.target;

            if(target.classList.contains('progress-item')){
                const percent = parseInt(target.getAttribute('data-percent')) || 0;
                const fill = target.querySelector('.bar-fill');
                const text = target.querySelector('.percent-text');
                animateFill(fill, percent, text);
                obs.unobserve(target);
            }

            if(target.classList.contains('progress-bar')){
                const percent = parseInt(target.getAttribute('aria-valuenow')) || 0;
                target.style.width = percent + '%';
                // If sibling shows a numeric value, try to update it
                const maybeLabel = target.closest('.progress')?.querySelector('.val');
                if(maybeLabel){
                    animateNumber(maybeLabel, 0, percent, duration);
                }
                obs.unobserve(target);
            }
        });
    }, {threshold: 0.2});

    items.forEach(i => observer.observe(i));
    legacyBars.forEach(b => observer.observe(b));

    // Fallback: if IntersectionObserver isn't supported, animate immediately
    if(!('IntersectionObserver' in window)){
        items.forEach(i => {
            const p = parseInt(i.getAttribute('data-percent'))||0;
            animateFill(i.querySelector('.bar-fill'), p, i.querySelector('.percent-text'));
        });
        legacyBars.forEach(b => {
            const p = parseInt(b.getAttribute('aria-valuenow'))||0;
            b.style.width = p + '%';
            const maybeLabel = b.closest('.progress')?.querySelector('.val');
            if(maybeLabel) animateNumber(maybeLabel, 0, p, duration);
        });
    }
});






function toggleScrolled() {
  const selectBody = document.querySelector('body');
  const selectHeader = document.querySelector('#header');
  if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
  window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
}

document.addEventListener('scroll', toggleScrolled);
window.addEventListener('load', toggleScrolled);

/**
 * Mobile nav toggle
 */
const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

function mobileNavToogle() {
  document.querySelector('body').classList.toggle('mobile-nav-active');
  mobileNavToggleBtn.classList.toggle('bi-list');
  mobileNavToggleBtn.classList.toggle('bi-x');
}
mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

/**
 * Hide mobile nav on same-page/hash links
 */
document.querySelectorAll('#navmenu a').forEach(navmenu => {
  navmenu.addEventListener('click', () => {
    if (document.querySelector('.mobile-nav-active')) {
      mobileNavToogle();
    }
  });

});

/**
 * Toggle mobile nav dropdowns
 */
document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
  navmenu.addEventListener('click', function(e) {
    e.preventDefault();
    this.parentNode.classList.toggle('active');
    this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
    e.stopImmediatePropagation();
  });
});

/**
 * Preloader
 */
const preloader = document.querySelector('#preloader');
if (preloader) {
  window.addEventListener('load', () => {
    preloader.remove();
  });
}

/**
 * Scroll top button
 */
let scrollTop = document.querySelector('.scroll-top');

function toggleScrollTop() {
  if (scrollTop) {
    window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
  }
}
scrollTop.addEventListener('click', (e) => {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

window.addEventListener('load', toggleScrollTop);
document.addEventListener('scroll', toggleScrollTop);

/**
 * Animation on scroll function and init
 */
function aosInit() {
  AOS.init({
    duration: 600,
    easing: 'ease-in-out',
    once: true,
    mirror: false
  });
}
window.addEventListener('load', aosInit);


const selectTyped = document.querySelector('.typed');
if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
}

/**
   * Animate the skills items on reveal
   */
let skillsAnimation = document.querySelectorAll('.skills-animation');
skillsAnimation.forEach((item) => {
  new Waypoint({
    element: item,
    offset: '80%',
    handler: function(direction) {
      let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
    }
  });
});


window.addEventListener('load', toggleScrollTop);
document.addEventListener('scroll', toggleScrollTop);

/**
 * Animation on scroll function and init
 */
function aosInit() {
  AOS.init({
    duration: 600,
    easing: 'ease-in-out',
    once: true,
    mirror: false
  });
}
window.addEventListener('load', aosInit);


let navmenulinks = document.querySelectorAll('.navmenu a');

function navmenuScrollspy() {
  navmenulinks.forEach(navmenulink => {
    if (!navmenulink.hash) return;
    let section = document.querySelector(navmenulink.hash);
    if (!section) return;
    let position = window.scrollY + 200;
    if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
      document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
      navmenulink.classList.add('active');
    } else {
      navmenulink.classList.remove('active');
    }
  })
}
window.addEventListener('load', navmenuScrollspy);
document.addEventListener('scroll', navmenuScrollspy);

function displayError(thisForm, error) {
  thisForm.querySelector('.loading').classList.remove('d-block');
  thisForm.querySelector('.error-message').innerHTML = error;
  thisForm.querySelector('.error-message').classList.add('d-block');
}