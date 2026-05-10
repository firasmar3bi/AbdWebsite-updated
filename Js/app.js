// ============================================
// app.js — جلب وعرض بيانات العملاء (portfolio)
// ============================================

import { supabase } from '../Js/supabaseConfig'

// 1. جلب البيانات من Supabase
async function fetchOurWork() {
    const { data, error } = await supabase
        .from('clients')
        .select(`*, portfolio_media (*)`)

    if (error) {
        console.error('Error fetching clients:', error)
        return
    }
    displayClients(data)
}

// 2. عرض البيانات في الـ HTML
function displayClients(clients) {
    const container = document.getElementById('clients-container')
    if (!container) return

    container.innerHTML = ''

    clients.forEach(client => {
        const reels   = client.portfolio_media.filter(m => m.media_type === 'Reels')
        const designs = client.portfolio_media.filter(m => m.media_type === 'Post')

        const reelsHtml = reels.length > 0 ? `
            <div class="reels-section">
                <div class="work-label">الريلز والفيديوهات</div>
                <div class="reels-grid">
                    ${reels.map(reel => `
                        <div class="reel-item">
                            <video src="${reel.media_url}" controls loop muted playsinline></video>
                            <div class="reel-placeholder"><div class="icon">🎬</div><p>تحميل الفيديو...</p></div>
                        </div>
                    `).join('')}
                </div>
            </div>` : ''

        const designsHtml = designs.length > 0 ? `
            <div class="designs-section">
                <div class="work-label">التصاميم</div>
                <div class="designs-grid">
                    ${designs.map(img => `
                        <div class="design-item">
                            <img src="${img.media_url}" alt="${img.title}" onclick="openFullImage('${img.media_url}')">
                            <div class="design-placeholder"><div class="icon">🖼️</div><p>تحميل...</p></div>
                        </div>
                    `).join('')}
                </div>
            </div>` : ''

        container.innerHTML += `
            <div class="client-block visible">
                <div class="client-header">
                    <div class="client-logo">
                        <img src="${client.logo_url}" alt="شعار ${client.name}">
                        <div class="placeholder-text">Logo</div>
                    </div>
                    <div class="client-info">
                        <div class="client-name">${client.name}</div>
                        <span class="client-category">${client.category}</span>
                    </div>
                </div>
                <p class="client-desc">${client.description}</p>
                ${reelsHtml}
                ${designsHtml}
                <div class="client-social">
                    ${client.instagram_url ? `<a href="${client.instagram_url}" target="_blank" class="social-link ig">إنستقرام</a>` : ''}
                    ${client.facebook_url  ? `<a href="${client.facebook_url}"  target="_blank" class="social-link fb">فيسبوك</a>`  : ''}
                </div>
            </div>
            <div class="client-divider"></div>
        `
    })

    initMediaLogic()
}

// 3. إظهار الصور والفيديوهات بعد التحميل
function initMediaLogic() {
    document.querySelectorAll('.client-logo img, .design-item img').forEach(img => {
        img.onload = function () {
            this.style.display = 'block'
            if (this.nextElementSibling) this.nextElementSibling.style.display = 'none'
        }
        if (img.complete) img.onload()
    })

    document.querySelectorAll('.reel-item video').forEach(video => {
        video.onloadeddata = function () {
            this.style.display = 'block'
            if (this.nextElementSibling) this.nextElementSibling.style.display = 'none'
        }
    })
}

// 4. Lightbox لتكبير الصور
window.openFullImage = function (url) {
    const lightbox    = document.getElementById('lightbox')
    const lightboxImg = document.getElementById('lightbox-img')
    if (lightbox && lightboxImg) {
        lightboxImg.src = url
        lightbox.style.display = 'flex'
    }
}

// تشغيل
fetchOurWork()
