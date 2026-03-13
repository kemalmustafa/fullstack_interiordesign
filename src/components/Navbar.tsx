import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo / İsim Alanı */}
        <Link href="/" className="group">
          {/* text-black ekledik ki normalde simsiyah ve net dursun */}
          <h1 className="text-xl font-medium tracking-[0.3em] uppercase text-black transition-colors duration-300 group-hover:text-gray-400">
            ECEM KEMAL
            <span className="hidden md:inline-block ml-3 text-xs font-extralight text-gray-400 tracking-widest group-hover:text-gray-300">
              INNENARCHITEKTIN
            </span>
          </h1>
        </Link>

        {/* Menü Linkleri */}
        <div className="flex space-x-10 text-[10px] md:text-xs uppercase tracking-[0.2em] font-medium text-gray-500">
          <Link href="/projects" className="hover:text-black transition-colors border-b border-transparent hover:border-black pb-1">
            Projekte
          </Link>
        <div className="flex space-x-10 text-[10px] md:text-xs uppercase tracking-[0.2em] font-medium text-gray-500">
            <Link href="/renders" className="hover:text-black transition-colors border-b border-transparent hover:border-black pb-1">
            VISUALISIERUNGEN
            </Link>
        {/* Diğer linkler... */}
        </div>
          <Link href="/about" className="hover:text-black transition-colors border-b border-transparent hover:border-black pb-1">
            ÜBER MICH
          </Link>
          <Link href="/contact" className="hover:text-black transition-colors border-b border-transparent hover:border-black pb-1">
            Kontakt
          </Link>
        </div>
      </div>
    </nav>
  );
}