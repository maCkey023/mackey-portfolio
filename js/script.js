document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Dynamic Typing Effect ---
    const texts = [
        "MERN Stack Apps",
        "Python Backend Systems",
        "RAG AI Assistants",
        "Scalable Architectures"
    ];
    let count = 0;
    let index = 0;
    let currentText = "";
    let letter = "";
    let isDeleting = false;

    const typeElement = document.getElementById("typing-text");

    function type() {
        if (!typeElement) return;

        if (count === texts.length) {
            count = 0;
        }
        currentText = texts[count];

        if (isDeleting) {
            letter = currentText.slice(0, --index);
        } else {
            letter = currentText.slice(0, ++index);
        }

        typeElement.textContent = letter;

        let typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && letter.length === currentText.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && letter.length === 0) {
            isDeleting = false;
            count++;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }
    setTimeout(type, 1000);


    // --- 2. Exclusive Accordion Logic (Hover Open, Hover Leave Close) ---
    const accordions = document.querySelectorAll('.accordion-item');

    accordions.forEach(accordion => {
        const headerBtn = accordion.querySelector('.accordion-header');

        const openAccordion = () => {
            const isActive = accordion.classList.contains('active');
            if (!isActive) {
                accordions.forEach(acc => acc.classList.remove('active'));
                accordion.classList.add('active');
            }
        };

        const closeAccordion = () => {
            accordion.classList.remove('active');
        };

        headerBtn.addEventListener('mouseenter', openAccordion);
        accordion.addEventListener('mouseleave', closeAccordion);

        headerBtn.addEventListener('click', () => {
            if (accordion.classList.contains('active')) {
                closeAccordion();
            } else {
                openAccordion();
            }
        });
    });

    // --- 3. Netflix-Style PERFECT CIRCULAR Auto-Scrolling ---
    const personalCarousel = document.querySelector('.personal-carousel');

    if (personalCarousel) {
        setInterval(() => {
            // 1. Smoothly scroll right by one image width
            personalCarousel.style.scrollBehavior = 'smooth';
            personalCarousel.scrollBy({
                left: personalCarousel.clientWidth,
                behavior: 'smooth'
            });

            // 2. Wait for the smooth scroll animation to finish (~600ms)
            setTimeout(() => {
                const maxScroll = personalCarousel.scrollWidth - personalCarousel.clientWidth;

                // 3. If we are now looking at the CLONED image at the very end
                if (personalCarousel.scrollLeft >= maxScroll - 5) {
                    // Instantly teleport back to the REAL first image invisibly
                    personalCarousel.style.scrollBehavior = 'auto';
                    personalCarousel.scrollLeft = 0;
                }
            }, 600);

        }, 3000); // Transitions every 3 seconds
    }

    // --- 4. Shrink Navbar & Hide Name on Scroll ---
    const headerEl = document.querySelector('header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            headerEl.classList.add('scrolled');
        } else {
            headerEl.classList.remove('scrolled');
        }
    });

});

// --- 5. Scroll Gallery Logic for < > Buttons (Global Function) ---
function scrollGallery(galleryId, direction) {
    const gallery = document.getElementById(galleryId);
    if (gallery) {
        const firstImg = gallery.querySelector('img');
        if (firstImg) {
            const scrollAmount = firstImg.clientWidth + 15;
            gallery.scrollBy({ left: scrollAmount * direction, behavior: 'smooth' });
        }
    }
}