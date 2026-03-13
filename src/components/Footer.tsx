import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-100 pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          
          {/* Sol: İsim ve Ünvan */}
          <div className="flex flex-col space-y-4">
            <h2 className="text-lg font-medium tracking-[0.3em] uppercase">ECEM KEMAL</h2>
            <p className="text-xs text-gray-400 tracking-widest uppercase italic">
              Innenarchitektin
            </p>
          </div>

          {/* Orta: Linkler */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-900">Navigation</h3>
            <div className="flex flex-col space-y-2 text-xs text-gray-500 tracking-wide">
              <Link href="/projects" className="hover:text-black transition-colors">Projekte</Link>
              <Link href="/renders" className="hover:text-black transition-colors">Visualisierungen</Link>
              <Link href="/about" className="hover:text-black transition-colors">Über mich</Link>
              <Link href="/contact" className="hover:text-black transition-colors">Kontakt</Link>
            </div>
          </div>

          {/* Sağ: İletişim */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-900">Social / Kontakt</h3>
            <div className="flex flex-col space-y-2 text-xs text-gray-500 tracking-wide">
              <a href="mailto:ecemkemal55@hotmail.com" className="hover:text-black transition-colors">ecemkemal55@hotmail.com</a>
              <a href="https://www.instagram.com/ecem.kemal/" target="_blank" className="hover:text-black transition-colors">Instagram</a>
              <a href="https://www.linkedin.com/in/interiordesignerecemkemal/" target="_blank" className="hover:text-black transition-colors">LinkedIn</a>
            </div>
          </div>
        </div>

        {/* Alt Çizgi ve Telif */}
        <div className="pt-8 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-[10px] text-gray-400 tracking-[0.2em] uppercase">
          <p>© {currentYear} ECEM KEMAL. Alle Rechte vorbehalten.</p>
          <p>Designed with passion in Turkey</p>
        </div>
      </div>
    </footer>
  );
}