import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50" style={{ backgroundColor: 'rgba(247, 243, 238, 0.92)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #E2D9CE' }}>
      <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-baseline gap-3">
          <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '20px', fontWeight: 300, letterSpacing: '0.35em', color: '#2C2218' }}>
            ECEM KEMAL
          </span>
          <span className="hidden md:inline" style={{ fontSize: '9px', fontWeight: 200, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#B5A08A' }}>
            Innenarchitektin
          </span>
        </Link>

        {/* Links */}
        <div className="flex items-center gap-10" style={{ fontSize: '10px', fontWeight: 300, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#7A6B5A' }}>
          <Link href="/projects" className="hover:text-[#2C2218] transition-colors duration-200">
            Projekte
          </Link>
          <Link href="/about" className="hover:text-[#2C2218] transition-colors duration-200">
            Über mich
          </Link>
          <Link href="/contact" style={{ padding: '8px 20px', border: '1px solid #C4B09A', borderRadius: '2px', color: '#7A6B5A' }} className="hover:text-[#2C2218] hover:border-[#2C2218] transition-all duration-200">
            Kontakt
          </Link>
        </div>

      </div>
    </nav>
  );
}
