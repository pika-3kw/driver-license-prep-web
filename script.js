/* -------------------------------------------------------------
   GPLX 2026 - Interactive Script
   Author: GN Labs / Antigravity
   Features: Carousel, Lightbox, Scroll Reveal, Card Navigation
------------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // 2. Carousel Functionality
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(document.querySelectorAll('.carousel-slide'));
    const nextBtn = document.querySelector('.carousel-control.next');
    const prevBtn = document.querySelector('.carousel-control.prev');
    const indicators = Array.from(document.querySelectorAll('.indicator'));
    
    let currentIndex = 0;

    function getSlideWidth() {
        if (slides.length === 0) return 0;
        const slideStyle = window.getComputedStyle(slides[0]);
        const trackStyle = window.getComputedStyle(track);
        const gap = parseFloat(trackStyle.gap) || 0;
        // Sử dụng offsetWidth để lấy kích thước layout gốc chưa bị scale
        return slides[0].offsetWidth + gap;
    }

    function updateCarousel() {
        const slideWidthWithGap = getSlideWidth();
        
        // Tính toán khoảng cách dịch chuyển (offset)
        // Luôn căn giữa slide đang hoạt động (active)
        const containerWidth = document.querySelector('.carousel-container').getBoundingClientRect().width;
        const activeSlideWidth = slides[currentIndex].offsetWidth;
        const offset = (currentIndex * slideWidthWithGap) - (containerWidth / 2) + (activeSlideWidth / 2);
        
        track.style.transform = `translateX(${-offset}px)`;

        // Update active class on slides
        slides.forEach((slide, idx) => {
            if (idx === currentIndex) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });

        // Update active class on indicators
        indicators.forEach((indicator, idx) => {
            if (idx === currentIndex) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }

    // Next Button Click
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateCarousel();
    });

    // Prev Button Click
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateCarousel();
    });

    // Indicator Dot Clicks
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentIndex = index;
            updateCarousel();
        });
    });

    // Handle Window Resize
    window.addEventListener('resize', updateCarousel);

    // Initial position setup
    setTimeout(updateCarousel, 150);


    // 3. Lightbox Functionality (Zoom Screenshot)
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.querySelector('.lightbox-close');
    
    const screenshotImgs = document.querySelectorAll('.screenshot-img');

    screenshotImgs.forEach((img) => {
        img.addEventListener('click', (e) => {
            lightbox.style.display = 'block';
            // Trigger reflow for transition
            lightbox.offsetHeight;
            lightbox.classList.add('open');
            
            // Set image source and caption
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;
            
            // Extract caption from the slide structure
            const slide = img.closest('.carousel-slide');
            const captionText = slide.querySelector('.slide-caption').textContent;
            lightboxCaption.textContent = captionText;
            
            // Prevent scrolling on body
            document.body.style.overflow = 'hidden';
        });
    });

    function closeLightbox() {
        lightbox.classList.remove('open');
        setTimeout(() => {
            lightbox.style.display = 'none';
            document.body.style.overflow = '';
        }, 300);
    }

    closeBtn.addEventListener('click', closeLightbox);
    
    // Close lightbox on clicking outside the image
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox || e.target.classList.contains('lightbox-close')) {
            closeLightbox();
        }
    });

    // Close lightbox on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.style.display === 'block') {
            closeLightbox();
        }
    });


    // 4. Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Stop observing once revealed
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });


    // 5. Feature Card Links to Slides (Micro-interaction)
    const featureCards = document.querySelectorAll('.feature-card');
    
    // Mapping feature index to screenshots slide index:
    // Card 0 (Theory) -> Slide index 3 (screen3.jpg)
    // Card 1 (Quiz) -> Slide index 1 (screen4.jpg) or 4 (screen2.jpg)
    // Card 2 (Tips) -> Slide index 2 (screen5.jpg)
    const cardToSlideMap = {
        0: 3, 
        1: 1, 
        2: 2
    };

    featureCards.forEach(card => {
        card.addEventListener('click', () => {
            const cardIndex = parseInt(card.getAttribute('data-index'));
            const targetSlideIndex = cardToSlideMap[cardIndex];
            
            if (targetSlideIndex !== undefined) {
                // Scroll to screenshots section
                const screenshotsSection = document.getElementById('screenshots');
                screenshotsSection.scrollIntoView({ behavior: 'smooth' });
                
                // Change carousel to target slide after scroll starts
                setTimeout(() => {
                    currentIndex = targetSlideIndex;
                    updateCarousel();
                }, 300);
            }
        });
    });
});
