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

      function selectChip(el) {
        document
          .querySelectorAll(".chip")
          .forEach((c) => c.classList.remove("selected"));
        el.classList.add("selected");
      }

      function sendToWhatsapp() {
        const name = document.getElementById("fname").value.trim();
        const phone = document.getElementById("fphone").value.trim();
        const email = document.getElementById("femail").value.trim();
        const msg = document.getElementById("fmsg").value.trim();
        const chip = document.querySelector(".chip.selected");
        const service = chip ? chip.textContent.trim() : "";

        if (!name || !phone) {
          alert("الرجاء إدخال الاسم ورقم الهاتف على الأقل");
          return;
        }

        let text = `مرحباً! 👋\n`;
        text += `الاسم: ${name}\n`;
        text += `الهاتف: ${phone}\n`;
        if (email) text += `الإيميل: ${email}\n`;
        if (service) text += `الخدمة المطلوبة: ${service}\n`;
        if (msg) text += `\nتفاصيل: ${msg}`;

        window.open(
          "https://wa.me/972599763676?text=" + encodeURIComponent(text),
          "_blank",
        );
      }