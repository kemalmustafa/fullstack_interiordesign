export default function AboutPage() {
  return (
    <main style={{ backgroundColor: '#F7F3EE', minHeight: '100vh', paddingBottom: '120px' }}>
      <div className="max-w-6xl mx-auto px-8">

        {/* Başlık */}
        <div className="pt-40 pb-16" style={{ borderBottom: '1px solid #E2D9CE', marginBottom: '80px' }}>
          <p style={{ fontSize: '9px', letterSpacing: '0.55em', textTransform: 'uppercase', color: '#B5A08A', marginBottom: '16px', fontWeight: 300 }}>
            Profil
          </p>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(48px, 6vw, 80px)', fontWeight: 300, color: '#2C2218', lineHeight: 1 }}>
            Über mich
          </h1>
        </div>

        {/* İçerik */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-start">

          {/* Sol: Profil bilgisi */}
          <div className="md:col-span-4" style={{ position: 'sticky', top: '120px' }}>
            {/* Profil kutusu */}
            <div style={{ backgroundColor: '#F0EAE1', border: '1px solid #E2D9CE', borderRadius: '12px', padding: '32px', marginBottom: '32px' }}>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '28px', fontWeight: 300, color: '#2C2218', lineHeight: 1.2, marginBottom: '8px' }}>
                Ecem Kemal
              </h2>
              <p style={{ fontSize: '11px', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#8B7055', fontStyle: 'italic', marginBottom: '28px' }}>
                Innenarchitektin
              </p>
              <div style={{ borderTop: '1px solid #E2D9CE', paddingTop: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  { etiket: 'Standort', deger: 'Türkei' },
                  { etiket: 'Alter', deger: '27 Jahre' },
                  { etiket: 'Abschluss', deger: 'ESTU' },
                ].map((item) => (
                  <div key={item.etiket} className="flex justify-between items-center">
                    <span style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#B5A08A', fontWeight: 200 }}>
                      {item.etiket}
                    </span>
                    <span style={{ fontSize: '12px', color: '#4A3728', fontWeight: 300 }}>
                      {item.deger}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* İletişim */}
            <a href="/contact" style={{ display: 'block', textAlign: 'center', padding: '14px', border: '1px solid #C4B09A', borderRadius: '4px', fontSize: '10px', letterSpacing: '0.4em', textTransform: 'uppercase', color: '#8B7055', textDecoration: 'none', fontWeight: 300 }}
              className="hover:bg-[#2C2218] hover:text-[#F7F3EE] hover:border-[#2C2218] transition-all duration-300">
              Kontakt aufnehmen
            </a>
          </div>

          {/* Sağ: Hikaye */}
          <div className="md:col-span-8">
            {/* Alıntı */}
            <blockquote style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(20px, 2.5vw, 28px)', fontWeight: 300, fontStyle: 'italic', color: '#8B7055', lineHeight: 1.5, borderLeft: '2px solid #C4B09A', paddingLeft: '28px', marginBottom: '48px' }}>
              "Design ist nicht nur das, was man sieht, sondern das, was man fühlt."
            </blockquote>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '64px' }}>
              <p style={{ fontSize: '15px', fontWeight: 200, color: '#4A3728', lineHeight: 1.9 }}>
                Ich bin fest davon überzeugt, dass Innendesign weit mehr ist als die bloße Gestaltung von Räumen. Seit meinem Abschluss an der <strong style={{ fontWeight: 400 }}>Technischen Universität Eskişehir</strong> verleihe ich Räumen eine einzigartige Identität.
              </p>
              <p style={{ fontSize: '15px', fontWeight: 200, color: '#4A3728', lineHeight: 1.9 }}>
                Dieses Portfolio dient als digitale Präsentation meiner Projekte, in denen ich technische Präzision mit kreativer Vision für gewerbliche und private Kunden verbinde.
              </p>
            </div>

            {/* Uzmanlık */}
            <div style={{ borderTop: '1px solid #E2D9CE', paddingTop: '48px' }}>
              <p style={{ fontSize: '9px', letterSpacing: '0.5em', textTransform: 'uppercase', color: '#B5A08A', marginBottom: '32px', fontWeight: 300 }}>
                Technische Expertise
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { baslik: 'Visualisierung', deger: '3ds Max + Corona' },
                  { baslik: 'Modellierung', deger: 'SketchUp' },
                  { baslik: 'Post-Produktion', deger: 'Adobe Photoshop' },
                  { baslik: 'Philosophie', deger: 'Modern & Funktional' },
                ].map((kart) => (
                  <div key={kart.baslik} style={{ backgroundColor: '#F0EAE1', border: '1px solid #E2D9CE', borderRadius: '6px', padding: '20px 24px' }}
                    className="hover:border-[#C4B09A] transition-colors duration-300">
                    <p style={{ fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#B5A08A', marginBottom: '10px', fontWeight: 300 }}>
                      {kart.baslik}
                    </p>
                    <p style={{ fontSize: '14px', fontWeight: 300, color: '#2C2218' }}>
                      {kart.deger}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
