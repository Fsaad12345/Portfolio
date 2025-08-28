gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
  // Animate loader line
  gsap.to(".loader-line", {
    width: 200,
    duration: 1,
    repeat: -1,
    yoyo: true,
    ease: "power2.inOut"
  });

  // Pulse loader name
  gsap.to(".loader-name", {
    opacity: 0.5,
    duration: 1,
    repeat: -1,
    yoyo: true
  });

  // ---- MENU TOGGLE ----
  const toggleBtn = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector(".nav-menu");
  let menuOpen = false;

  const menuTimeline = gsap.timeline({ paused: true })
    .to(navMenu, {
      left: 0,
      duration: 0.5,
      ease: "power3.out"
    });

  toggleBtn.addEventListener("click", () => {
    if (!menuOpen) {
      menuTimeline.play();
    } else {
      menuTimeline.reverse();
    }
    menuOpen = !menuOpen;
  });

  document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
      if (menuOpen) {
        menuTimeline.reverse();
        menuOpen = false;
      }
    });
  });

  // ---- SCROLL ANIMATIONS ----
  gsap.utils.toArray(".scroll-content p").forEach((p, i) => {
    gsap.from(p, {
      scrollTrigger: {
        trigger: p,
        start: "top 90%",
      },
      y: 40,
      opacity: 0,
      duration: 0.6,
      delay: i * 0.1,
    });
  });

  gsap.to(wrapper, {
  rotateY: dx * 8,
  rotateX: -dy * 8,
  transformPerspective: 600,
  ease: "power2.out",
  duration: 0.3
});


  gsap.from(".hero-content", {
    opacity: 0,
    y: 50,
    duration: 1,
    delay: 0.5
  });

  gsap.from(".focus-content", {
    scrollTrigger: {
      trigger: ".focus-section",
      start: "top 80%"
    },
    opacity: 0,
    y: 40,
    duration: 1
  });

  gsap.from(".business-logos a", {
    scrollTrigger: {
      trigger: ".businesses-section",
      start: "top 80%"
    },
    opacity: 0,
    y: 40,
    stagger: 0.2,
    duration: 1
  });

  gsap.utils.toArray(".timeline-item").forEach((item) => {
    gsap.from(item, {
      scrollTrigger: {
        trigger: item,
        start: "top 50%"
      },
      opacity: 0,
      y: 50,
      duration: 1
    });
  });

  gsap.utils.toArray(".skills-list li").forEach((item, i) => {
    gsap.from(item, {
      scrollTrigger: {
        trigger: item,
        start: "top 90%"
      },
      opacity: 0,
      y: 30,
      delay: i * 0.2,
      duration: 0.6
    });
  });

  gsap.from(".social-icons a", {
    scrollTrigger: {
      trigger: ".social-section",
      start: "top 80%"
    },
    opacity: 0,
    scale: 0.5,
    stagger: 0.2,
    duration: 1
  });
});

// ---- LOADER CONTROL ----
window.addEventListener("load", function () {
  const loader = document.getElementById("loader");

  const MIN_TIME = 3000; // 3 seconds minimum
  const startTime = performance.now();

  const hideLoader = () => {
    const elapsed = performance.now() - startTime;
    const remaining = Math.max(0, MIN_TIME - elapsed);

    setTimeout(() => {
      gsap.to(loader, {
        opacity: 0,
        duration: 0.8,
        onComplete: () => loader.style.display = "none"
      });
      document.body.style.overflow = "auto"; // allow scroll after loader
    }, remaining);
  };

  hideLoader();
}); 

window.onload = function() {
  const wrapper = document.querySelector('.hoverImageWrapper');
  if (wrapper) {
    wrapper.addEventListener('mousemove', (e) => {
      let rect = wrapper.getBoundingClientRect();
      let x = e.clientX - rect.left;
      let y = e.clientY - rect.top;

      let dx = (x - rect.width / 2) / (rect.width / 2);
      let dy = (y - rect.height / 2) / (rect.height / 2);

      wrapper.style.transform = `perspective(600px) rotateY(${dx * 8}deg) rotateX(${-dy * 8}deg)`;
    });

    wrapper.addEventListener('mouseleave', () => {
      wrapper.style.transform = "";
    });
  }
};
