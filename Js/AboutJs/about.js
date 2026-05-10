      window.addEventListener("scroll", () => {
        document
          .getElementById("navbar")
          .classList.toggle("scrolled", window.scrollY > 20);
      });
      function toggleMenu() {
        document.getElementById("mobileMenu").classList.toggle("open");
      }
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) e.target.classList.add("visible");
          });
        },
        { threshold: 0.08 },
      );
      document
        .querySelectorAll(".fade-in")
        .forEach((el) => observer.observe(el));