'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 w-full z-50" style={{ backgroundColor: 'rgba(247, 243, 238, 0.92)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #E2D9CE' }}>
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-baseline gap-3" onClick={() => setMenuOpen(false)}>
            <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '18px', fontWeight: 300, letterSpacing: '0.3em', color: '#2C2218' }}>
              ECEM KEMAL
            </span>
            <span className="hidden md:inline" style={{ fontSize: '9px', fontWeight: 200, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#B5A08A' }}>
              Innenarchitektin
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-10" style={{ fontSize: '10px', fontWeight: 300, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#7A6B5A' }}>
            <Link href="/projects" className="hover:text-[#2C2218] transition-colors duration-200">Projekte</Link>
            <Link href="/about" className="hover:text-[#2C2218] transition-colors duration-200">Über mich</Link>
            <Link href="/contact" style={{ padding: '8px 20px', border: '1px solid #C4B09A', borderRadius: '2px', color: '#7A6B5A' }} className="hover:text-[#2C2218] hover:border-[#2C2218] transition-all duration-200">
              Kontakt
            </Link>
          </div>

          {/* Hamburger butonu */}
          <button
            className="md:hidden flex flex-col justify-center items-center gap-[5px] w-10 h-10"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menü"
          >
            <span style={{ display: 'block', width: '22px', height: '1px', backgroundColor: '#2C2218', transition: 'all 0.3s', transform: menuOpen ? 'rotate(45deg) translateY(6px)' : 'none' }} />
            <span style={{ display: 'block', width: '22px', height: '1px', backgroundColor: '#2C2218', transition: 'all 0.3s', opacity: menuOpen ? 0 : 1 }} />
            <span style={{ display: 'block', width: '22px', height: '1px', backgroundColor: '#2C2218', transition: 'all 0.3s', transform: menuOpen ? 'rotate(-45deg) translateY(-6px)' : 'none' }} />
          </button>

        </div>
      </nav>

      {/* Mobil Menü */}
      <div
        className="fixed inset-0 z-40 md:hidden flex flex-col justify-center items-center"
        style={{
          backgroundColor: '#F7F3EE',
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'auto' : 'none',
          transition: 'opacity 0.3s ease',
        }}
      >
        <div className="flex flex-col items-center gap-10">
          <p style={{ fontSize: '9px', letterSpacing: '0.5em', textTransform: 'uppercase', color: '#C4B09A', marginBottom: '8px' }}>
            — Navigation —
          </p>
          {[
            { href: '/', label: 'Startseite' },
            { href: '/projects', label: 'Projekte' },
            { href: '/about', label: 'Über mich' },
            { href: '/contact', label: 'Kontakt' },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '36px', fontWeight: 300, color: '#2C2218', textDecoration: 'none', letterSpacing: '0.05em' }}
              className="hover:text-[#8B7055] transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Alt sosyal linkler */}
        <div className="absolute bottom-12 flex gap-8" style={{ fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#B5A08A' }}>
          <a href="https://www.instagram.com/ecem.kemal/" target="_blank" rel="noreferrer" className="hover:text-[#2C2218] transition-colors">Instagram</a>
          <a href="https://www.linkedin.com/in/interiordesignerecemkemal/" target="_blank" rel="noreferrer" className="hover:text-[#2C2218] transition-colors">LinkedIn</a>
        </div>
      </div>
    </>
  );
}
