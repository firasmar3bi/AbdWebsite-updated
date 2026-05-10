// ============================================
// supabaseConfig.js — إعدادات Supabase المشتركة
// ملف واحد لكل إعدادات قاعدة البيانات
// ============================================

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const SUPABASE_URL = 'https://ujxbixqsmghpmlkmcbgb.supabase.co'
const SUPABASE_KEY = 'sb_publishable_Qss0Syee5W2idvhGZA09nw_7yJtvMmp'

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
