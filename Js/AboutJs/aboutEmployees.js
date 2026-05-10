// ============================================
// aboutEmployees.js — جلب وعرض بيانات الفريق
// ============================================

import { supabase } from '../supabaseConfig'

async function fetchTeam() {
    const { data, error } = await supabase
        .from('employees')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: true })

    if (error) {
        console.error('Error fetching team:', error)
        return
    }
    renderTeam(data)
}

function renderTeam(teamMembers) {
    const container = document.getElementById('team-container')
    if (!container) return

    container.innerHTML = ''

    teamMembers.forEach(member => {
        const skillsHtml = member.skills
            .map(skill => `<div class="skill-item">${skill}</div>`)
            .join('')

        const expMatch  = member.experience_years.match(/\d+/)
        const expNumber = expMatch ? expMatch[0] + '+' : '3+'
        const expText   = member.experience_years.replace(/[0-9+]/g, '').trim()

        container.innerHTML += `
            <div class="team-card fade-in">
                <div class="team-card-top">
                    <div class="team-photo-wrap">
                        <img src="${member.profile_image_url}" alt="${member.full_name}">
                    </div>
                    <div class="team-name-wrap">
                        <div class="team-name">${member.full_name}</div>
                        <span class="team-role">${member.job_title}</span>
                    </div>
                </div>
                <div class="team-card-body">
                    <div class="team-edu">
                        <span class="edu-icon">🎓</span>
                        <p>${member.education}</p>
                    </div>
                    <div class="team-skills">
                        ${skillsHtml}
                    </div>
                    <div class="team-exp">
                        <div class="exp-num">${expNumber}</div>
                        <div class="exp-text">${expText}</div>
                    </div>
                </div>
            </div>
        `
    })

    // تشغيل الأنيميشن بعد إضافة الكروت
    const observer = new IntersectionObserver(
        entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
        { threshold: 0.08 }
    )
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el))
}

fetchTeam()
