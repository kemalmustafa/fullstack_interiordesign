import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export default async function ProjectsPage() {
  const { data: projects, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#F7F3EE' }}>
        <p style={{ fontSize: '11px', letterSpacing: '0.3em', color: '#B5A08A', textTransform: 'uppercase' }}>
          Fehler beim Laden.
        </p>
      </div>
    );
  }

  return (
    <main style={{ backgroundColor: '#F7F3EE', minHeight: '100vh', paddingBottom: '120px' }}>
      <div className="max-w-7xl mx-auto px-8">

        {/* Başlık */}
        <div className="pt-40 pb-16" style={{ borderBottom: '1px solid #E2D9CE', marginBottom: '64px' }}>
          <p style={{ fontSize: '9px', letterSpacing: '0.55em', textTransform: 'uppercase', color: '#B5A08A', marginBottom: '16px', fontWeight: 300 }}>
            Portfolio
          </p>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(48px, 6vw, 80px)', fontWeight: 300, color: '#2C2218', lineHeight: 1 }}>
            Projekte
          </h1>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects?.map((project, index) => (
            <Link
              href={`/projects/${project.id}`}
              key={project.id}
              className="group flex flex-col"
              style={{ textDecoration: 'none' }}
            >
              {/* Görsel */}
              <div className="relative overflow-hidden" style={{ aspectRatio: '4/5', backgroundColor: '#E8DDD1', borderRadius: '16px' }}>
                <img
                  src={project.thumbnail_url}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6"
                  style={{ background: 'linear-gradient(to top, rgba(44,34,24,0.6) 0%, transparent 60%)' }}>
                  <span style={{ fontSize: '10px', letterSpacing: '0.4em', textTransform: 'uppercase', color: '#F7F3EE', fontWeight: 200 }}>
                    Ansehen →
                  </span>
                </div>
                {/* İndeks numarası */}
                <div className="absolute top-5 right-5" style={{ fontSize: '10px', letterSpacing: '0.2em', color: 'rgba(247,243,238,0.7)', fontWeight: 200 }}>
                  0{index + 1}
                </div>
              </div>

              {/* Bilgi */}
              <div className="mt-5 space-y-1">
                <h3 style={{ fontSize: '13px', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 300, color: '#2C2218' }}>
                  {project.title}
                </h3>
                <div className="flex justify-between items-center">
                  <span style={{ fontSize: '11px', color: '#9C8572', fontWeight: 200, letterSpacing: '0.1em' }}>
                    {project.location}
                  </span>
                  <span style={{ fontSize: '11px', color: '#C4B09A', fontWeight: 200 }}>
                    {project.year}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Boş durum */}
        {(!projects || projects.length === 0) && (
          <div className="text-center py-32">
            <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '24px', fontWeight: 300, color: '#C4B09A', fontStyle: 'italic' }}>
              Noch keine Projekte vorhanden.
            </p>
          </div>
        )}

      </div>
    </main>
  );
}
