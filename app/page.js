"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

export default function Home() {
  const [form, setForm] = useState({
    full_name: "",
    phone: "",
    email: "",
    governorate: "",
    age: "",
    talent_fields: "",
    skills: "",
    experience: "",
    portfolio_links: "",
    availability: ""
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  function update(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function submit(e) {
    e.preventDefault();
    setMessage("");

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();

    if (!supabaseUrl || !/^https?:\/\/.+/.test(supabaseUrl) || !supabaseKey) {
      setMessage("إعدادات الاتصال بقاعدة البيانات غير صحيحة.");
      return;
    }

    const supabase = createClient(supabaseUrl, supabaseKey);
    setLoading(true);

    const { error } = await supabase.from("talents").insert([{
      ...form,
      age: Number(form.age),
      email: form.email || null
    }]);

    setLoading(false);

    if (error) {
      setMessage("تعذر إرسال التسجيل. راجع البيانات وحاول مرة أخرى.");
    } else {
      setMessage("تم تسجيل بياناتك بنجاح! شكرًا لانضمامك.");
      setForm({
        full_name: "",
        phone: "",
        email: "",
        governorate: "",
        age: "",
        talent_fields: "",
        skills: "",
        experience: "",
        portfolio_links: "",
        availability: ""
      });
    }
  }

  return (
    <>
      <header>
        <div className="container">
          <div className="logo">EY | مواهب فريق شباب مصر</div>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="container">
            <h1>كل موهبة تستحق فرصة</h1>
            <p>
              منصة اكتشاف واستقطاب وتطوير المواهب
              <br />
              فريق شباب مصر
            </p>
            <a href="#register" className="btn gold">
              سجّل موهبتك الآن
            </a>
          </div>
        </section>

        <section className="section container">
          <h2>اكتشف مكانك في فريقنا</h2>
          <div className="cards">
            <div className="card">
              <h3 style={{ color: "#d4af37" }}>اكتشاف المواهب</h3>
              <p>نبحث عن أصحاب القدرات والأفكار المتميزة.</p>
            </div>
            <div className="card">
              <h3 style={{ color: "#d4af37" }}>تطوير المهارات</h3>
              <p>نساعد المواهب على تنمية قدراتها وخبراتها.</p>
            </div>
            <div className="card">
              <h3 style={{ color: "#d4af37" }}>فرص للمشاركة</h3>
              <p>نفتح آفاقًا جديدة للمشاركة والعمل الجماعي.</p>
            </div>
          </div>
        </section>

        <section className="section container" id="register">
          <div className="card">
            <h2>استمارة تسجيل المواهب</h2>
            <p>املأ البيانات التالية للتعريف بموهبتك.</p>

            <form onSubmit={submit}>
              <label>الاسم بالكامل *</label>
              <input name="full_name" value={form.full_name} onChange={update} required />

              <label>رقم الهاتف *</label>
              <input name="phone" type="tel" value={form.phone} onChange={update} required />

              <label>البريد الإلكتروني</label>
              <input name="email" type="email" value={form.email} onChange={update} />

              <label>المحافظة *</label>
              <input name="governorate" value={form.governorate} onChange={update} required />

              <label>العمر *</label>
              <input name="age" type="number" min="1" max="120" value={form.age} onChange={update} required />

              <label>مجال الموهبة *</label>
              <input name="talent_fields" value={form.talent_fields} onChange={update} placeholder="مثل: البرمجة، التصميم، الإعلام" required />

              <label>المهارات</label>
              <textarea name="skills" rows="3" value={form.skills} onChange={update} />

              <label>الخبرات السابقة</label>
              <textarea name="experience" rows="3" value={form.experience} onChange={update} />

              <label>روابط الأعمال أو نماذج من موهبتك</label>
              <input name="portfolio_links" value={form.portfolio_links} onChange={update} placeholder="رابط أعمالك إن وجد" />

              <label>مدى التفرغ أو الاستعداد للمشاركة</label>
              <textarea name="availability" rows="2" value={form.availability} onChange={update} />

              <button className="btn gold" type="submit" disabled={loading}>
                {loading ? "جارٍ الإرسال..." : "إرسال التسجيل"}
              </button>

              {message && (
                <p role="status" style={{ color: "#d4af37" }}>{message}</p>
              )}
            </form>
          </div>
        </section>
      </main>

      <footer>
        <div>فريق شباب مصر - اللجنة الفنية</div>
        <strong>تصميم وبرمجة محمد الخرادلي</strong>
      </footer>
    </>
  );
}
