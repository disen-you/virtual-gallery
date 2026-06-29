```javascript
/* ==========================================
   DISEN.YOU
   SCRIPT.JS
========================================== */


/* ==============================
   LOADING SCREEN
============================== */

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    setTimeout(() => {

        loader.style.opacity = "0";

        loader.style.visibility = "hidden";

        loader.style.transition = "0.8s";

        document.body.style.overflow = "auto";

    }, 1800);

});



/* ==============================
   MEET THE ARTIST POPUP
============================== */

const popup = document.getElementById("artistPopup");

const closePopup = document.getElementById("closePopup");

const enterGallery = document.getElementById("enterGallery");


window.addEventListener("load", () => {

    setTimeout(() => {

        popup.classList.add("active");

    }, 2000);

});


closePopup.addEventListener("click", () => {

    popup.classList.remove("active");

});


enterGallery.addEventListener("click", () => {

    popup.classList.remove("active");

});



/* ==============================
   SMOOTH SCROLL
============================== */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function(e){

        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if(target){

            target.scrollIntoView({

                behavior:"smooth"

            });

        }

    });

});



/* ==============================
   ACTIVE NAVIGATION
============================== */

const sections = document.querySelectorAll("section");

const navLinks = document.querySelectorAll("nav ul li a");


window.addEventListener("scroll", ()=>{

    let current = "";

    sections.forEach(section=>{

        const sectionTop = section.offsetTop - 150;

        const sectionHeight = section.clientHeight;

        if(pageYOffset >= sectionTop){

            current = section.getAttribute("id");

        }

    });

    navLinks.forEach(link=>{

        link.classList.remove("active");

        if(link.getAttribute("href") === "#" + current){

            link.classList.add("active");

        }

    });

});



/* ==============================
   HEADER SHADOW
============================== */

const header = document.querySelector("header");

window.addEventListener("scroll",()=>{

    if(window.scrollY > 40){

        header.style.boxShadow="0 10px 30px rgba(0,0,0,.08)";

    }

    else{

        header.style.boxShadow="none";

    }

});



/* ==============================
   BUTTON RIPPLE EFFECT
============================== */

document.querySelectorAll(".btn").forEach(button=>{

button.addEventListener("mouseenter",()=>{

button.style.transform="translateY(-3px) scale(1.02)";

});

button.addEventListener("mouseleave",()=>{

button.style.transform="translateY(0)";

});

});



/* ==============================
   IMAGE HOVER ANIMATION
============================== */

document.querySelectorAll(".gallery-item img").forEach(image=>{

image.addEventListener("mouseover",()=>{

image.style.transform="scale(1.08)";

});

image.addEventListener("mouseout",()=>{

image.style.transform="scale(1)";

});

});



/* ==============================
   PREVENT EMPTY LINKS
============================== */

document.querySelectorAll("a[href='#']").forEach(link=>{

link.addEventListener("click",(e)=>{

e.preventDefault();

});

});

```javascript
/* ==========================================
   GALLERY FILTER
========================================== */

const filterButtons = document.querySelectorAll(".gallery-filter button");
const galleryItems = document.querySelectorAll(".gallery-item");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => btn.classList.remove("active"));

        button.classList.add("active");

        const filter = button.dataset.filter;

        galleryItems.forEach(item => {

            if (filter === "all" || item.classList.contains(filter)) {

                item.style.display = "block";

                setTimeout(() => {

                    item.style.opacity = "1";
                    item.style.transform = "scale(1)";

                }, 100);

            } else {

                item.style.opacity = "0";
                item.style.transform = "scale(.9)";

                setTimeout(() => {

                    item.style.display = "none";

                }, 250);

            }

        });

    });

});


/* ==========================================
   LIGHTBOX
========================================== */

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxCaption = document.getElementById("lightbox-caption");
const closeLightbox = document.querySelector(".close-lightbox");

galleryItems.forEach(item => {

    item.addEventListener("click", () => {

        const img = item.querySelector("img");

        const title = item.querySelector("h3").textContent;

        lightbox.style.display = "flex";

        lightboxImg.src = img.src;

        lightboxCaption.textContent = title;

        document.body.style.overflow = "hidden";

    });

});

closeLightbox.addEventListener("click", () => {

    lightbox.style.display = "none";

    document.body.style.overflow = "auto";

});

lightbox.addEventListener("click", e => {

    if (e.target === lightbox) {

        lightbox.style.display = "none";

        document.body.style.overflow = "auto";

    }

});


/* ==========================================
   SCROLL REVEAL
========================================== */

const revealElements = document.querySelectorAll(
    ".hero,.section-title,.featured-grid,.gallery-item,.service-card,.contact-grid"
);

function revealOnScroll() {

    revealElements.forEach(el => {

        const windowHeight = window.innerHeight;

        const revealTop = el.getBoundingClientRect().top;

        if (revealTop < windowHeight - 100) {

            el.classList.add("active");
            el.classList.add("reveal");

        }

    });

}

window.addEventListener("scroll", revealOnScroll);

revealOnScroll();


/* ==========================================
   PARALLAX HERO IMAGE
========================================== */

const heroImage = document.querySelector(".hero-image img");

window.addEventListener("scroll", () => {

    if (heroImage) {

        let offset = window.scrollY * 0.08;

        heroImage.style.transform =
            `translateY(${offset}px)`;

    }

});


/* ==========================================
   IMAGE FADE-IN
========================================== */

const images = document.querySelectorAll("img");

const imageObserver = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.style.opacity = "1";

            entry.target.style.transform = "translateY(0)";

        }

    });

});

images.forEach(img => {

    img.style.opacity = "0";

    img.style.transform = "translateY(25px)";

    img.style.transition = ".8s";

    imageObserver.observe(img);

});


/* ==========================================
   NUMBER OF ARTWORKS
========================================== */

console.log(
    "Total Gallery Items:",
    galleryItems.length
);




