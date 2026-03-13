import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export default async function ProjectsPage() {
  // Projeleri çekiyoruz
  const { data: projects, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return <div className="pt-40 text-center uppercase tracking-widest text-[10px]">Fehler beim Laden: {error.message}</div>;
  }

  return (
    <main className="min-h-screen bg-white pb-32 pt-20">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        
        <header className="mb-20 pt-10">
          <h2 className="text-[10px] tracking-[0.8em] uppercase text-gray-400 mb-4">Portfolio</h2>
          <h1 className="text-5xl font-light tracking-tight text-black uppercase">Projekte</h1>
        </header>

        {/* --- 3'LÜ IZGARA (GRID) --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {projects?.map((project) => (
            <Link 
              href={`/projects/${project.id}`} 
              key={project.id} 
              className="group flex flex-col"
            >
              {/* Thumbnail Alanı */}
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] bg-gray-50 mb-6">
                {/* İnce Çerçeve */}
                <div className="absolute inset-0 border border-black/5 z-10 pointer-events-none rounded-[2.5rem] scale-[0.96]"></div>
                
                <img
                  src={project.thumbnail_url}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
              </div>
              
              {/* Proje Bilgisi */}
              <div className="space-y-2">
                <h3 className="text-xs tracking-[0.3em] uppercase font-medium text-black">
                  {project.title}
                </h3>
                <div className="flex justify-between items-center text-[9px] tracking-[0.2em] uppercase text-gray-400 italic">
                  <span>{project.location}</span>
                  <span>{project.year}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </main>
  );
}