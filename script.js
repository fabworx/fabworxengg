/* ======================================================================== 
   FABWORX - SAFE JS WITH ERROR HANDLING
   ======================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    console.log('FabWorx JS loading...');

    try {
        initHeader();
        initHeroSlider();
        initStatsCounter();
        initProgressBars();
        initScrollEffects();
        initSidePanel();
        initScrollToTop();
        initSmoothScroll();
        initGalleryFilter();

        console.log('FabWorx JS loaded successfully');
    } catch (error) {
        console.error('Error loading FabWorx JS:', error);
    }
});

/* Header Function */
function initHeader() {
    const header = document.querySelector('.top_panel');
    if (!header) return;

    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        header.classList.toggle('scrolled', currentScroll > 100);

        if (currentScroll > lastScroll && currentScroll > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        lastScroll = currentScroll;
    });
}

/* Hero Slider */
function initHeroSlider() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.nav-dot');
    const prev = document.querySelector('.slider-prev');
    const next = document.querySelector('.slider-next');

    if (!slides.length) return;

    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        if (slides[index]) slides[index].classList.add('active');
        if (dots[index]) dots[index].classList.add('active');
        currentSlide = index;
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    // Auto-play
    function startSlideShow() {
        slideInterval = setInterval(nextSlide, 6000);
    }

    function stopSlideShow() {
        clearInterval(slideInterval);
    }

    // Event listeners
    if (next) next.addEventListener('click', () => {
        stopSlideShow();
        nextSlide();
        startSlideShow();
    });

    if (prev) prev.addEventListener('click', () => {
        stopSlideShow();
        prevSlide();
        startSlideShow();
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            stopSlideShow();
            showSlide(index);
            startSlideShow();
        });
    });

    // Initialize
    showSlide(0);
    startSlideShow();
}

/* Stats Counter */
function initStatsCounter() {
    const nums = document.querySelectorAll('.stat-number[data-target]');
    if (!nums.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                observer.unobserve(entry.target);
                animateNumber(entry.target);
            }
        });
    }, { threshold: 0.5 });

    nums.forEach(num => observer.observe(num));
}

function animateNumber(element) {
    const target = parseInt(element.dataset.target);
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 16);
}

/* Progress Bars */
function initProgressBars() {
    const bars = document.querySelectorAll('.skill-bar');
    if (!bars.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.dataset.width;
                entry.target.style.setProperty('--skill-width', `${width}%`);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    bars.forEach(bar => observer.observe(bar));
}

/* Scroll Effects */
function initScrollEffects() {
    // Parallax effect
    window.addEventListener('scroll', () => {
        const y = window.pageYOffset;
        const big = document.querySelector('.stain-big');
        const small = document.querySelector('.stain-small');

        if (big) big.style.transform = `translateY(${y * 0.05}px)`;
        if (small) small.style.transform = `translateY(${y * -0.05}px)`;
    });

    // Fade in sections
    const sections = document.querySelectorAll('section');
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => sectionObserver.observe(section));
}

/* Side Panel */
function initSidePanel() {
    const panel = document.querySelector('.sc_layouts_panel');
    const toggle = document.querySelector('.mobile-menu-toggle a');
    const close = document.querySelector('.sc_layouts_panel_close');

    if (!panel || !toggle) return;

    toggle.addEventListener('click', (e) => {
        e.preventDefault();
        panel.classList.add('open');
        document.body.style.overflow = 'hidden';
    });

    if (close) {
        close.addEventListener('click', () => {
            panel.classList.remove('open');
            document.body.style.overflow = '';
        });
    }

    // Close on escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && panel.classList.contains('open')) {
            panel.classList.remove('open');
            document.body.style.overflow = '';
        }
    });
}

/* Scroll to Top */
function initScrollToTop() {
    const button = document.createElement('button');
    button.className = 'scroll_to_top';
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(button);

    window.addEventListener('scroll', () => {
        button.classList.toggle('visible', window.pageYOffset > 300);
    });

    button.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/* Smooth Scroll */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (!target) return;

            e.preventDefault();
            const top = target.getBoundingClientRect().top + window.pageYOffset - 80;
            window.scrollTo({ top, behavior: 'smooth' });
        });
    });
}

/* Gallery Filter */
function initGalleryFilter() {
    const filterBtns = document.querySelectorAll('.category-btn');
    const items = document.querySelectorAll('.gallery-item');

    if (!filterBtns.length || !items.length) return;

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const category = btn.dataset.filter;

            items.forEach(item => {
                const itemCategory = item.dataset.category;
                if (category === 'all' || itemCategory === category) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}


/* ----------  MOBILE PANEL SUB-MENU TOGGLE  ---------- */
document.addEventListener('DOMContentLoaded', () => {
    const parents = document.querySelectorAll('.panel-menu-item-has-children');
    parents.forEach(li => {
        const anchor = li.querySelector('a');
        anchor.addEventListener('click', e => {
            e.preventDefault(); // stop page jump
            li.classList.toggle('active'); // open / close
        });
    });
});