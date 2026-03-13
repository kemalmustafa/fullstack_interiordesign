'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function ProjectDetailPage() {
  const params = useParams();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProject() {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', params.id)
        .single();

      if (!error) setProject(data);
      setLoading(false);
    }
    if (params.id) fetchProject();
  }, [params.id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center uppercase tracking-[0.4em] text-[10px] text-gray-400">Wird geladen...</div>;
  if (!project) return <div className="min-h-screen flex items-center justify-center uppercase tracking-[0.4em] text-[10px] text-gray-400">Projekt nicht gefunden.</div>;

  return (
    <main className="min-h-screen bg-white pb-40 pt-20">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-20">
        
        {/* --- ÜST BİLGİ ALANI --- */}
        <header className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-24 items-start">
          <div className="md:col-span-8">
            <h1 className="text-5xl md:text-8xl font-light tracking-tight text-black uppercase leading-tight">
              {project.title}
            </h1>
            <div className="flex gap-8 mt-10 text-[10px] tracking-[0.5em] uppercase text-gray-400 font-medium">
              <span>{project.location}</span>
              <span className="text-gray-200">|</span>
              <span>{project.year}</span>
            </div>
          </div>
          
          <div className="md:col-span-4 mt-6 md:mt-0 pt-2">
            <div className="border-l border-gray-100 pl-8 space-y-4">
              <span className="text-[9px] tracking-[0.3em] uppercase text-gray-300 block font-medium">Beschreibung</span>
              <p className="text-[13px] md:text-sm text-gray-600 leading-relaxed font-light italic">
                {project.description}
              </p>
            </div>
          </div>
        </header>

        {/* --- 3'LÜ IZGARA (GALLERY GRID) --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {project.images?.map((imgUrl: string, index: number) => (
            <div 
              key={index} 
              onClick={() => setSelectedImage(imgUrl)}
              className="relative aspect-square overflow-hidden rounded-[2rem] group cursor-zoom-in bg-gray-50"
            >
              <div className="absolute inset-0 border border-black/5 z-10 pointer-events-none rounded-[2rem] scale-[0.96]"></div>
              <img 
                src={imgUrl} 
                alt={`${project.title} ${index}`} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Hover Efekti */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 z-0"></div>
            </div>
          ))}
        </div>

        {/* --- TAM EKRAN MODAL (LIGHTBOX) --- */}
        {selectedImage && (
          <div 
            className="fixed inset-0 z-[100] bg-white/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-10 cursor-zoom-out"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative w-full h-full flex items-center justify-center">
              <img 
                src={selectedImage} 
                className="max-w-full max-h-full object-contain rounded-[1rem] shadow-2xl"
                alt="Enlarged view"
              />
              <button 
                className="absolute top-0 right-0 p-4 text-black text-xs tracking-widest uppercase"
                onClick={() => setSelectedImage(null)}
              >
                Schließen [x]
              </button>
            </div>
          </div>
        )}

        {/* --- ALT NAVİGASYON --- */}
        <div className="mt-40 pt-20 border-t border-gray-50 flex justify-between items-center">
          <Link 
            href="/projects" 
            className="text-[10px] tracking-[0.4em] uppercase text-gray-400 hover:text-black transition-colors"
          >
            ← Alle Projekte
          </Link>
          <span className="text-[10px] tracking-[0.4em] uppercase text-gray-200">
            Ecem Kemal Interior Design
          </span>
        </div>
      </div>
    </main>
  );
}   