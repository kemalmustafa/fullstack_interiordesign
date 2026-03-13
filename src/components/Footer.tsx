import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ backgroundColor: '#2C2218', color: '#B5A08A' }} className="pt-20 pb-10 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-16">

          {/* Sol: İsim */}
          <div className="space-y-4">
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '22px', fontWeight: 300, letterSpacing: '0.3em', color: '#F7F3EE' }}>
              ECEM KEMAL
            </h2>
            <p style={{ fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#8B7055', fontStyle: 'italic' }}>
              Innenarchitektin
            </p>
            <p style={{ fontSize: '12px', fontWeight: 200, color: '#9C8572', lineHeight: 1.8, marginTop: '16px' }}>
              Moderne Räume mit Seele —<br />gestaltet in der Türkei.
            </p>
          </div>

          {/* Orta: Linkler */}
          <div className="space-y-5">
            <h3 style={{ fontSize: '9px', letterSpacing: '0.4em', textTransform: 'uppercase', color: '#8B7055', fontWeight: 300 }}>
              Navigation
            </h3>
            <div className="flex flex-col gap-3" style={{ fontSize: '11px', fontWeight: 200, letterSpacing: '0.15em' }}>
              <Link href="/projects" className="hover:text-[#F7F3EE] transition-colors duration-200" style={{ color: '#9C8572' }}>Projekte</Link>
              <Link href="/about" className="hover:text-[#F7F3EE] transition-colors duration-200" style={{ color: '#9C8572' }}>Über mich</Link>
              <Link href="/contact" className="hover:text-[#F7F3EE] transition-colors duration-200" style={{ color: '#9C8572' }}>Kontakt</Link>
            </div>
          </div>

          {/* Sağ: İletişim */}
          <div className="space-y-5">
            <h3 style={{ fontSize: '9px', letterSpacing: '0.4em', textTransform: 'uppercase', color: '#8B7055', fontWeight: 300 }}>
              Kontakt
            </h3>
            <div className="flex flex-col gap-3" style={{ fontSize: '11px', fontWeight: 200, letterSpacing: '0.15em' }}>
              <a href="mailto:ecemkemal55@hotmail.com" className="hover:text-[#F7F3EE] transition-colors duration-200" style={{ color: '#9C8572' }}>
                ecemkemal55@hotmail.com
              </a>
              <a href="https://www.instagram.com/ecem.kemal/" target="_blank" rel="noreferrer" className="hover:text-[#F7F3EE] transition-colors duration-200" style={{ color: '#9C8572' }}>
                Instagram
              </a>
              <a href="https://www.linkedin.com/in/interiordesignerecemkemal/" target="_blank" rel="noreferrer" className="hover:text-[#F7F3EE] transition-colors duration-200" style={{ color: '#9C8572' }}>
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* Alt */}
        <div style={{ borderTop: '1px solid #3D2E22', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '9px', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#5A4535' }}>
          <span>© {currentYear} Ecem Kemal. Alle Rechte vorbehalten.</span>
          <span>Designed with passion in Turkey</span>
        </div>
      </div>
    </footer>
  );
}
