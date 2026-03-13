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

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#F7F3EE' }}>
      <p style={{ fontSize: '10px', letterSpacing: '0.4em', color: '#B5A08A', textTransform: 'uppercase' }}>Wird geladen...</p>
    </div>
  );

  if (!project) return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#F7F3EE' }}>
      <p style={{ fontSize: '10px', letterSpacing: '0.4em', color: '#B5A08A', textTransform: 'uppercase' }}>Projekt nicht gefunden.</p>
    </div>
  );

  return (
    <main style={{ backgroundColor: '#F7F3EE', minHeight: '100vh', paddingBottom: '120px' }}>

      {/* HERO */}
      <div className="relative overflow-hidden" style={{ height: '70vh' }}>
        <img
          src={project.images?.[0] || project.thumbnail_url}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(44,34,24,0.75) 0%, transparent 50%)' }} />

        {/* Hero metin */}
        <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-8 pb-16">
          <p style={{ fontSize: '9px', letterSpacing: '0.5em', textTransform: 'uppercase', color: 'rgba(247,243,238,0.6)', marginBottom: '12px', fontWeight: 200 }}>
            {project.location} · {project.year}
          </p>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(40px, 6vw, 80px)', fontWeight: 300, color: '#F7F3EE', lineHeight: 1.05 }}>
            {project.title}
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8">

        {/* Açıklama */}
        {project.description && (
          <div className="py-20 grid grid-cols-1 md:grid-cols-12 gap-12" style={{ borderBottom: '1px solid #E2D9CE' }}>
            <div className="md:col-span-3">
              <p style={{ fontSize: '9px', letterSpacing: '0.4em', textTransform: 'uppercase', color: '#B5A08A', fontWeight: 300 }}>
                Beschreibung
              </p>
            </div>
            <div className="md:col-span-7">
              <p style={{ fontSize: '15px', fontWeight: 200, color: '#4A3728', lineHeight: 1.9, fontStyle: 'italic', fontFamily: 'Cormorant Garamond, serif' }}>
                {project.description}
              </p>
            </div>
          </div>
        )}

        {/* Galeri */}
        <div className="pt-16">
          <p style={{ fontSize: '9px', letterSpacing: '0.5em', textTransform: 'uppercase', color: '#B5A08A', marginBottom: '40px', fontWeight: 300 }}>
            Galerie — {project.images?.length || 0} Bilder
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {project.images?.map((imgUrl: string, index: number) => (
              <div
                key={index}
                onClick={() => setSelectedImage(imgUrl)}
                className="group cursor-zoom-in overflow-hidden"
                style={{ aspectRatio: '4/3', backgroundColor: '#E8DDD1', borderRadius: '12px' }}
              >
                <img
                  src={imgUrl}
                  alt={`${project.title} ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Alt navigasyon */}
        <div className="mt-24 pt-10 flex justify-between items-center" style={{ borderTop: '1px solid #E2D9CE' }}>
          <Link href="/projects" style={{ fontSize: '10px', letterSpacing: '0.35em', textTransform: 'uppercase', color: '#9C8572', textDecoration: 'none', fontWeight: 300 }}
            className="hover:text-[#2C2218] transition-colors duration-200">
            ← Alle Projekte
          </Link>
          <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '13px', fontStyle: 'italic', color: '#C4B09A' }}>
            Ecem Kemal
          </span>
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-12 cursor-zoom-out"
          style={{ backgroundColor: 'rgba(44, 34, 24, 0.95)', backdropFilter: 'blur(8px)' }}
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            className="max-w-full max-h-full object-contain"
            style={{ borderRadius: '8px' }}
            alt="Enlarged view"
          />
          <button
            className="absolute top-6 right-8"
            style={{ fontSize: '10px', letterSpacing: '0.4em', textTransform: 'uppercase', color: 'rgba(247,243,238,0.5)', background: 'none', border: 'none', cursor: 'pointer' }}
            onClick={() => setSelectedImage(null)}
          >
            Schließen ×
          </button>
        </div>
      )}
    </main>
  );
}
