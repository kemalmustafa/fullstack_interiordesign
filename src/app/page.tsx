import PageTransition from '@/components/PageTransition';

export default function HomePage() {
  return (
    <PageTransition>
      <div style={{ backgroundColor: '#F7F3EE' }} className="w-full">

        {/* HERO */}
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">

          {/* Sol: Görsel */}
          <div className="relative overflow-hidden" style={{ minHeight: '60vh' }}>
            <img
              src="/anasayfa.jpeg"
              alt="Ecem Kemal Interior Design"
              className="w-full h-full object-cover"
              style={{ minHeight: '60vh' }}
            />
            <div className="absolute inset-0 md:hidden" style={{ background: 'linear-gradient(to right, transparent 60%, #F7F3EE)' }} />
          </div>

          {/* Sağ: Metin */}
          <div className="flex flex-col justify-center px-10 md:px-16 py-20" style={{ backgroundColor: '#F7F3EE' }}>
            <p style={{ fontSize: '9px', letterSpacing: '0.55em', textTransform: 'uppercase', color: '#B5A08A', marginBottom: '32px', fontWeight: 300 }}>
              Portfolio · Innenarchitektur
            </p>

            <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(44px, 5vw, 72px)', fontWeight: 300, lineHeight: 1.05, color: '#2C2218', marginBottom: '8px' }}>
              Räume, die
            </h1>
            <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(44px, 5vw, 72px)', fontWeight: 300, fontStyle: 'italic', lineHeight: 1.05, color: '#8B7055', marginBottom: '36px' }}>
              atmen.
            </h1>

            <p style={{ fontSize: '13px', fontWeight: 200, color: '#9C8572', lineHeight: 1.9, maxWidth: '320px', marginBottom: '48px', letterSpacing: '0.03em' }}>
              Moderne Innenarchitektur mit warmen Materialien und zeitloser Ästhetik — für gewerbliche und private Kunden.
            </p>

            <div className="flex items-center gap-6 flex-wrap">
              <a href="/projects"
                style={{ fontSize: '10px', letterSpacing: '0.4em', textTransform: 'uppercase', fontWeight: 300, padding: '14px 32px', border: '1px solid #2C2218', color: '#2C2218', backgroundColor: 'transparent', textDecoration: 'none' }}
                className="hover:bg-[#2C2218] hover:text-[#F7F3EE] transition-all duration-300">
                Projekte ansehen
              </a>
              <a href="/about"
                style={{ fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', fontWeight: 200, color: '#B5A08A', textDecoration: 'none' }}
                className="hover:text-[#2C2218] transition-colors duration-200">
                Über mich →
              </a>
            </div>
          </div>
        </div>

        {/* İstatistik çizgisi */}
        <div style={{ backgroundColor: '#F0EAE1', borderTop: '1px solid #E2D9CE', borderBottom: '1px solid #E2D9CE' }}>
          <div className="max-w-7xl mx-auto px-8 py-10 grid grid-cols-3 gap-8 text-center">
            {[
              { sayi: '3+', etiket: 'Jahre Erfahrung' },
              { sayi: '20+', etiket: 'Abgeschlossene Projekte' },
              { sayi: '100%', etiket: 'Kundenzufriedenheit' },
            ].map((item) => (
              <div key={item.etiket}>
                <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(28px, 4vw, 36px)', fontWeight: 300, color: '#2C2218', lineHeight: 1 }}>
                  {item.sayi}
                </p>
                <p style={{ fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#B5A08A', marginTop: '8px', fontWeight: 200 }}>
                  {item.etiket}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Yaklaşım bölümü */}
        <div className="max-w-7xl mx-auto px-8 py-24 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <p style={{ fontSize: '9px', letterSpacing: '0.5em', textTransform: 'uppercase', color: '#B5A08A', marginBottom: '24px', fontWeight: 300 }}>
              Mein Ansatz
            </p>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(32px, 3.5vw, 52px)', fontWeight: 300, color: '#2C2218', lineHeight: 1.15, marginBottom: '24px' }}>
              Ästhetik trifft<br /><em style={{ color: '#8B7055' }}>Funktion.</em>
            </h2>
            <p style={{ fontSize: '13px', fontWeight: 200, color: '#9C8572', lineHeight: 1.9, marginBottom: '16px' }}>
              Ich glaube, dass großartiges Design nicht nur schön aussieht, sondern auch das tägliche Leben bereichert.
            </p>
            <p style={{ fontSize: '13px', fontWeight: 200, color: '#9C8572', lineHeight: 1.9 }}>
              Jedes Projekt beginnt mit dem Zuhören — um zu verstehen, wie Sie leben, was Sie lieben und was Sie brauchen.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { baslik: 'Visualisierung', deger: '3ds Max + Corona' },
              { baslik: 'Modellierung', deger: 'SketchUp' },
              { baslik: 'Post-Produktion', deger: 'Photoshop' },
              { baslik: 'Stil', deger: 'Modern & Warm' },
            ].map((kart) => (
              <div key={kart.baslik}
                style={{ backgroundColor: '#F0EAE1', border: '1px solid #E2D9CE', borderRadius: '4px', padding: '20px' }}
                className="hover:border-[#C4B09A] transition-colors duration-300">
                <p style={{ fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#B5A08A', marginBottom: '10px', fontWeight: 300 }}>
                  {kart.baslik}
                </p>
                <p style={{ fontSize: '13px', fontWeight: 300, color: '#2C2218', letterSpacing: '0.05em' }}>
                  {kart.deger}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </PageTransition>
  );
}
