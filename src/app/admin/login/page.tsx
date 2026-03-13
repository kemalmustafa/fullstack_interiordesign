'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError('E-posta veya şifre hatalı.');
      setLoading(false);
    } else {
      window.location.href = '/admin';
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-6" style={{ backgroundColor: '#f5f5f3' }}>

      <div className="relative w-full max-w-sm bg-white border border-gray-200 rounded-2xl p-12 shadow-sm">

        {/* Başlık */}
        <div className="text-center mb-12">
          <p className="text-[10px] tracking-[0.4em] uppercase text-gray-400 mb-4">
            — Geschützter Bereich —
          </p>
          <h1 className="text-xl font-medium tracking-[0.35em] uppercase text-black">
            ECEM KEMAL
          </h1>
          <p className="text-[11px] tracking-[0.25em] uppercase text-gray-500 mt-2 italic">
            Admin Panel
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-7">

          <div className="space-y-2">
            <label className="text-[11px] uppercase tracking-[0.25em] text-gray-600 font-medium block">
              E-Posta
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="ornek@email.com"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm font-light outline-none focus:border-black transition-colors duration-200 bg-gray-50 placeholder:text-gray-400"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[11px] uppercase tracking-[0.25em] text-gray-600 font-medium block">
              Şifre
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Şifrenizi giriniz"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm font-light outline-none focus:border-black transition-colors duration-200 bg-gray-50 placeholder:text-gray-400"
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3">
              <p className="text-[11px] text-red-600 tracking-wide text-center">
                {error}
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-4 bg-black text-white rounded-lg text-[11px] uppercase tracking-[0.4em] font-medium hover:bg-gray-800 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading ? 'Giriş yapılıyor...' : 'Login'}
          </button>
        </form>

        <p className="text-center text-[10px] text-gray-400 tracking-widest uppercase mt-10">
          © {new Date().getFullYear()} Mustafa Kemal
        </p>
      </div>
    </main>
  );
}
