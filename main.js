(function() {
    "use strict";


    const select = (el, all = false) => {
        el = el.trim()
        if (all) {
            return [...document.querySelectorAll(el)]
        } else {
            return document.querySelector(el)
        }
    }


    const on = (type, el, listener, all = false) => {
        let selectEl = select(el, all);
        if (selectEl) {
            if (all) {
                selectEl.forEach(e => e.addEventListener(type, listener))
            } else {
                selectEl.addEventListener(type, listener)
            }
        }
    }


    const onscroll = (el, listener) => el.addEventListener('scroll', listener)


    const scrollto = (el) => {
        let header = select('#header')
        let offset = header.offsetHeight

        let elementPos = select(el).offsetTop
        window.scrollTo({
            top: elementPos - offset,
            behavior: 'smooth'
        })
    }


    let selectHeader = select('#header')
    if (selectHeader) {
        const headerScrolled = () => {
            (window.scrollY > 100) ?
            selectHeader.classList.add('header-scrolled'):
                selectHeader.classList.remove('header-scrolled')
        }
        window.addEventListener('load', headerScrolled)
        onscroll(document, headerScrolled)
    }


    let backtotop = select('.back-to-top')
    if (backtotop) {
        const toggleBacktotop = () => {
            (window.scrollY > 100) ?
            backtotop.classList.add('active'):
                backtotop.classList.remove('active')
        }
        window.addEventListener('load', toggleBacktotop)
        onscroll(document, toggleBacktotop)
    }


    on('click', '.mobile-nav-toggle', function(e) {
        select('#navbar').classList.toggle('navbar-mobile')
        this.classList.toggle('bi-list')
        this.classList.toggle('bi-x')
    })


    on('click', '.navbar .dropdown > a', function(e) {
        if (select('#navbar').classList.contains('navbar-mobile')) {
            e.preventDefault()
            this.nextElementSibling.classList.toggle('dropdown-active')
        }
    }, true)


    on('click', '.scrollto', function(e) {
        if (select(this.hash)) {
            e.preventDefault()

            let navbar = select('#navbar')
            if (navbar.classList.contains('navbar-mobile')) {
                navbar.classList.remove('navbar-mobile')
                let navbarToggle = select('.mobile-nav-toggle')
                navbarToggle.classList.toggle('bi-list')
                navbarToggle.classList.toggle('bi-x')
            }
            scrollto(this.hash)
        }
    }, true)


    window.addEventListener('load', () => {
        if (window.location.hash) {
            if (select(window.location.hash)) scrollto(window.location.hash)
        }
    });


    const glightbox = GLightbox({
        selector: '.glightbox'
    });

    let skilsContent = select('.skills-content');
    if (skilsContent) {
        new Waypoint({
            element: skilsContent,
            offset: '80%',
            handler: function(direction) {
                let progress = select('.progress .progress-bar', true);
                progress.forEach((el) => {
                    el.style.width = el.getAttribute('aria-valuenow') + '%'
                });
            }
        })
    }


    new Swiper('.clients-slider', {
        speed: 400,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false
        },
        slidesPerView: 'auto',
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true
        },
        breakpoints: {
            320: {
                slidesPerView: 2,
                spaceBetween: 40
            },
            480: {
                slidesPerView: 3,
                spaceBetween: 60
            },
            640: {
                slidesPerView: 4,
                spaceBetween: 80
            },
            992: {
                slidesPerView: 6,
                spaceBetween: 120
            }
        }
    });


    window.addEventListener('load', () => {
        let projectsContainer = select('.projects-container');
        if (projectsContainer) {
            let projectsIsotope = new Isotope(projectsContainer, {
                itemSelector: '.projects-item',
                layoutMode: 'fitRows'
            });

            let projectsFilters = select('#projects-filters li', true);

            on('click', '#projects-filters li', function(e) {
                e.preventDefault();
                projectsFilters.forEach(el => el.classList.remove('filter-active'));
                this.classList.add('filter-active');

                projectsIsotope.arrange({
                    filter: this.getAttribute('data-filter')
                });
                projectsIsotope.on('arrangeComplete', () => AOS.refresh());
            }, true);
        }

    });


    const projectsLightbox = GLightbox({
        selector: '.projects-lightbox'
    });


    new Swiper('.projects-details-slider', {
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


    window.addEventListener('load', () => {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true,
            mirror: false
        })
    });

})()