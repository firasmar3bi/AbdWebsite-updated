import { supabase } from '../supabaseConfig.js';

// 1. دالة جلب البيانات من الداتا بيس
async function loadFeedback() {
  const { data, error } = await supabase
    .from("feedback")
    .select("*")
    .order("display_order", { ascending: true });

  if (error) {
    console.error("Error fetching feedback:", error.message);
    return;
  }

  if (data) {
    renderFeedback(data);
  }
}

// 2. دالة بناء الكروت داخل الـ HTML وتفعيل الميزات
function renderFeedback(feedbacks) {
  const grid = document.getElementById("feedback-container");
  if (!grid) return;

  grid.innerHTML = ""; // تنظيف الحاوية قبل الحقن

  feedbacks.forEach((item) => {
    grid.innerHTML += `
            <div class="feedback-card fade-in">
                <video class="feedback-video" poster="${item.thumbnail_url || ""}" preload="metadata" playsinline>
                    <source src="${item.video_url}#t=0.001" type="video/mp4">
                </video>
                <div class="feedback-client">
                    <div class="feedback-logo">
                        <img src="${item.logo_url || ""}" alt="شعار ${item.client_name}">
                    </div>
                </div>
                <button class="feedback-play" aria-label="تشغيل الفيدباك">
                    <svg viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z"/></svg>
                </button>
            </div>
        `;
  });

  // تشغيل منطق الـ Play/Pause بعد بناء الكروت
  setupVideoControls();

  // تشغيل مراقب الحركة (Animation) لظهور الكروت بسلاسة
  observeFeedbackCards(); 
}

// 3. دالة التحكم بالفيديوهات (إظهار وإخفاء أدوات التحكم الذكية)
function setupVideoControls() {
  document.querySelectorAll(".feedback-card").forEach((card) => {
    const video = card.querySelector(".feedback-video");
    const playBtn = card.querySelector(".feedback-play");

    playBtn.addEventListener("click", (e) => {
      e.stopPropagation();

      if (video.paused) {
        // أوقف باقي الفيديوهات واخفِ شريط التحكم منها لمنع التداخل
        document.querySelectorAll(".feedback-video").forEach((v) => {
          if (v !== video) {
            v.pause();
            v.removeAttribute("controls"); 
            v.closest(".feedback-card").classList.remove("playing");
          }
        });

        // أضف شريط التحكم للمشغل الأصلي للفيديو الحالي وشغله
        video.setAttribute("controls", "controls");
        video.play();
        card.classList.add("playing");
      } else {
        video.pause();
        card.classList.remove("playing");
      }
    });

    video.addEventListener("ended", () => {
      card.classList.remove("playing");
      video.removeAttribute("controls"); // إخفاء شريط التحكم عند الانتهاء ليعود شكل الكارد نظيفاً
      video.currentTime = 0;
    });

    video.addEventListener("pause", () => {
      card.classList.remove("playing");
    });
  });
}

// 4. دالة مراقب الحركة (Intersection Observer) للـ fade-in
function observeFeedbackCards() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // أول ما يظهر الكارد على الشاشة بنسبة 10%
            if (entry.isIntersecting) {
                entry.target.classList.add('visible'); // تفعيل أنيميشن الـ CSS
                observer.unobserve(entry.target); // إيقاف المراقبة للكارد الحالي لتجنب تكرار الحركة
            }
        });
    }, { 
        threshold: 0.1 
    });

    // مراقبة جميع الكروت التي تم حقنها حديثاً
    document.querySelectorAll('.feedback-card.fade-in').forEach(card => {
        observer.observe(card);
    });
}

// البدء بتشغيل العملية كاملة بمجرد تحميل الملف
loadFeedback();
