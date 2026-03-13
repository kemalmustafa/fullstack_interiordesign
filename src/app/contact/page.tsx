'use client';

import { useState } from 'react';
import PageTransition from '@/components/PageTransition';

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('https://formspree.io/f/FORM_ID_BURAYA', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setSent(true);
    } else {
      alert('Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.');
    }
  };

  return (
    <PageTransition>
      <main style={{ backgroundColor: '#F7F3EE', minHeight: '100vh', paddingBottom: '120px' }}>
        <div className="max-w-6xl mx-auto px-8">

          {/* Başlık */}
          <div className="pt-40 pb-16" style={{ borderBottom: '1px solid #E2D9CE', marginBottom: '80px' }}>
            <p style={{ fontSize: '9px', letterSpacing: '0.55em', textTransform: 'uppercase', color: '#B5A08A', marginBottom: '16px', fontWeight: 300 }}>
              Kontakt
            </p>
            <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(48px, 6vw, 80px)', fontWeight: 300, color: '#2C2218', lineHeight: 1 }}>
              Lassen Sie uns<br /><em style={{ color: '#8B7055' }}>reden.</em>
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-16">

            {/* Sol: İletişim bilgileri */}
            <div className="md:col-span-4 space-y-10">
              <div>
                <p style={{ fontSize: '9px', letterSpacing: '0.4em', textTransform: 'uppercase', color: '#B5A08A', marginBottom: '20px', fontWeight: 300 }}>
                  Direkt erreichen
                </p>
                <a href="mailto:ecemkemal55@hotmail.com"
                  style={{ display: 'block', fontSize: '13px', fontWeight: 200, color: '#4A3728', textDecoration: 'none', letterSpacing: '0.05em' }}
                  className="hover:text-[#8B7055] transition-colors duration-200">
                  ecemkemal55@hotmail.com
                </a>
              </div>

              <div style={{ borderTop: '1px solid #E2D9CE', paddingTop: '32px' }}>
                <p style={{ fontSize: '9px', letterSpacing: '0.4em', textTransform: 'uppercase', color: '#B5A08A', marginBottom: '20px', fontWeight: 300 }}>
                  Social Media
                </p>
                <div className="space-y-3">
                  <a href="https://www.instagram.com/ecem.kemal/" target="_blank" rel="noreferrer"
                    style={{ display: 'block', fontSize: '13px', fontWeight: 200, color: '#4A3728', textDecoration: 'none' }}
                    className="hover:text-[#8B7055] transition-colors duration-200">
                    Instagram →
                  </a>
                  <a href="https://www.linkedin.com/in/interiordesignerecemkemal/" target="_blank" rel="noreferrer"
                    style={{ display: 'block', fontSize: '13px', fontWeight: 200, color: '#4A3728', textDecoration: 'none' }}
                    className="hover:text-[#8B7055] transition-colors duration-200">
                    LinkedIn →
                  </a>
                </div>
              </div>
            </div>

            {/* Sağ: Form */}
            <div className="md:col-span-8">
              {sent ? (
                <div className="flex flex-col items-center justify-center py-24 text-center">
                  <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '36px', fontWeight: 300, fontStyle: 'italic', color: '#8B7055', marginBottom: '16px' }}>
                    Vielen Dank.
                  </p>
                  <p style={{ fontSize: '13px', fontWeight: 200, color: '#9C8572' }}>
                    Ich melde mich so schnell wie möglich bei Ihnen.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label style={{ fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#B5A08A', fontWeight: 300, display: 'block' }}>
                        Name
                      </label>
                      <input
                        type="text" required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Ihr Name"
                        style={{ width: '100%', borderBottom: '1px solid #D9CEC0', padding: '12px 0', fontSize: '14px', fontWeight: 200, color: '#2C2218', background: 'transparent', outline: 'none', fontFamily: 'Jost, sans-serif' }}
                        className="placeholder:text-[#C4B09A] placeholder:text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <label style={{ fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#B5A08A', fontWeight: 300, display: 'block' }}>
                        E-Mail
                      </label>
                      <input
                        type="email" required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="ihre@email.com"
                        style={{ width: '100%', borderBottom: '1px solid #D9CEC0', padding: '12px 0', fontSize: '14px', fontWeight: 200, color: '#2C2218', background: 'transparent', outline: 'none', fontFamily: 'Jost, sans-serif' }}
                        className="placeholder:text-[#C4B09A] placeholder:text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label style={{ fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#B5A08A', fontWeight: 300, display: 'block' }}>
                      Nachricht
                    </label>
                    <textarea
                      required rows={6}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Erzählen Sie mir von Ihrem Projekt..."
                      style={{ width: '100%', borderBottom: '1px solid #D9CEC0', padding: '12px 0', fontSize: '14px', fontWeight: 200, color: '#2C2218', background: 'transparent', outline: 'none', resize: 'none', lineHeight: 1.8, fontFamily: 'Jost, sans-serif' }}
                      className="placeholder:text-[#C4B09A] placeholder:text-sm"
                    />
                  </div>

                  <button
                    type="submit"
                    style={{ padding: '14px 40px', border: '1px solid #2C2218', backgroundColor: 'transparent', fontSize: '10px', letterSpacing: '0.4em', textTransform: 'uppercase', color: '#2C2218', fontWeight: 300, cursor: 'pointer', fontFamily: 'Jost, sans-serif' }}
                    className="hover:bg-[#2C2218] hover:text-[#F7F3EE] transition-all duration-300"
                  >
                    Nachricht senden
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>
    </PageTransition>
  );
}
