'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function AdminPage() {
  // Form Verileri (State)
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState(''); // Yeni eklenen açıklama alanı
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [gallery, setGallery] = useState<FileList | null>(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!thumbnail || !gallery) return alert('Lütfen tüm dosyaları seçin!');
    
    setLoading(true);

    try {
      // 1. THUMBNAIL (KAPAK) YÜKLEME
      const thumbPath = `thumbnails/${Date.now()}-${thumbnail.name}`;
      const { error: thumbError } = await supabase.storage
        .from('portfolio')
        .upload(thumbPath, thumbnail);

      if (thumbError) throw thumbError;
      const { data: thumbUrlData } = supabase.storage.from('portfolio').getPublicUrl(thumbPath);
      const thumbnailUrl = thumbUrlData.publicUrl;

      // 2. GALERİ YÜKLEME (DÖNGÜ)
      const galleryUrls = [];
      const files = Array.from(gallery);

      for (const file of files) {
        const path = `galleries/${Date.now()}-${file.name}`;
        const { error: uploadError } = await supabase.storage
          .from('portfolio')
          .upload(path, file);

        if (!uploadError) {
          const { data: urlData } = supabase.storage.from('portfolio').getPublicUrl(path);
          galleryUrls.push(urlData.publicUrl);
        }
      }

      // 3. VERİTABANINA KAYIT (Description Dahil)
      const { error: dbError } = await supabase.from('projects').insert([
        {
          title,
          year,
          location,
          description, // Yeni alan burada kaydediliyor
          thumbnail_url: thumbnailUrl,
          images: galleryUrls,
        },
      ]);

      if (dbError) throw dbError;

      alert('Proje başarıyla yüklendi!');
      
      // Formu Sıfırla
      setTitle(''); setYear(''); setLocation(''); setDescription('');
      setThumbnail(null); setGallery(null);
      
    } catch (error: any) {
      alert('Hata: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white pt-40 pb-20 px-6 font-light">
      <div className="max-w-xl mx-auto space-y-12">
        <header className="text-center space-y-2">
          <h1 className="text-3xl font-light tracking-[0.4em] uppercase text-black">Admin Panel</h1>
          <p className="text-[10px] text-gray-400 uppercase tracking-widest italic">Inhalte verwalten</p>
        </header>
        
        <form onSubmit={handleUpload} className="space-y-8">
          {/* Proje Temel Bilgileri */}
          <div className="space-y-6">
            <div className="space-y-1 text-left">
              <label className="text-[9px] uppercase tracking-widest text-gray-400 ml-1">Projekt Name</label>
              <input 
                value={title} onChange={(e) => setTitle(e.target.value)}
                type="text" placeholder="MODERN RESIDENCE" required
                className="w-full border-b border-gray-100 py-3 outline-none focus:border-black transition-colors uppercase text-xs tracking-[0.2em]"
              />
            </div>

            <div className="grid grid-cols-2 gap-10">
              <div className="space-y-1 text-left">
                <label className="text-[9px] uppercase tracking-widest text-gray-400 ml-1">Jahr</label>
                <input 
                  value={year} onChange={(e) => setYear(e.target.value)}
                  type="text" placeholder="2026"
                  className="w-full border-b border-gray-100 py-3 outline-none focus:border-black transition-colors uppercase text-xs tracking-[0.2em]"
                />
              </div>
              <div className="space-y-1 text-left">
                <label className="text-[9px] uppercase tracking-widest text-gray-400 ml-1">Standort</label>
                <input 
                  value={location} onChange={(e) => setLocation(e.target.value)}
                  type="text" placeholder="BERLIN, DE"
                  className="w-full border-b border-gray-100 py-3 outline-none focus:border-black transition-colors uppercase text-xs tracking-[0.2em]"
                />
              </div>
            </div>

            {/* AÇIKLAMA ALANI (Description) */}
            <div className="space-y-1 text-left">
              <label className="text-[9px] uppercase tracking-widest text-gray-400 ml-1">Projektbeschreibung (Story)</label>
              <textarea 
                value={description} onChange={(e) => setDescription(e.target.value)}
                placeholder="PROJE HİKAYESİNİ ANLATIN..." 
                className="w-full border-b border-gray-100 py-3 outline-none focus:border-black transition-colors uppercase text-xs tracking-[0.15em] min-h-[120px] resize-none leading-relaxed"
              />
            </div>
          </div>

          {/* Dosya Yükleme Alanları */}
          <div className="grid grid-cols-1 gap-6 pt-4">
            <div className="p-8 border-2 border-dashed border-gray-50 rounded-[2rem] text-center relative hover:bg-gray-50 transition-all group">
              <p className="text-[9px] text-gray-400 uppercase tracking-widest group-hover:text-black transition-colors">Titelbild (Thumbnail)</p>
              <input 
                type="file" accept="image/*" required
                onChange={(e) => setThumbnail(e.target.files?.[0] || null)}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              {thumbnail && <p className="mt-3 text-[9px] text-green-600 font-medium truncate italic">{thumbnail.name}</p>}
            </div>

            <div className="p-8 border-2 border-dashed border-gray-50 rounded-[2rem] text-center relative hover:bg-gray-50 transition-all group">
              <p className="text-[9px] text-gray-400 uppercase tracking-widest group-hover:text-black transition-colors">Galerie (Mehrfachauswahl)</p>
              <input 
                type="file" multiple accept="image/*" required
                onChange={(e) => setGallery(e.target.files)}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              {gallery && <p className="mt-3 text-[9px] text-green-600 font-medium italic">{gallery.length} Bilder ausgewählt</p>}
            </div>
          </div>

          {/* Yayınla Butonu */}
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-black text-white py-5 rounded-full text-[10px] uppercase tracking-[0.5em] hover:bg-gray-800 transition-all disabled:bg-gray-200 mt-4 shadow-lg shadow-black/5"
          >
            {loading ? 'DATEN WERDEN GELADEN...' : 'PROJEKT VERÖFFENTLICHEN'}
          </button>
        </form>
      </div>
    </main>
  );
}