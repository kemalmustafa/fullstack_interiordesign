export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-6 py-24 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-start">
          
          {/* Sol Kısım: Profil */}
          <div className="md:col-span-4 lg:sticky lg:top-32">
            <h2 className="text-gray-400 text-[10px] tracking-[0.4em] uppercase mb-4">Profil</h2>
            <h1 className="text-4xl font-extralight tracking-tight text-gray-900 leading-tight">
              Ecem Kemal <br />
              <span className="text-gray-400 italic">Innenarchitektin</span>
            </h1>
            
            <div className="mt-12 space-y-3 text-[10px] tracking-[0.2em] uppercase text-gray-500 font-medium">
              <p>Wohnhaft in der Türkei</p>
              <p>27 Jahre alt</p>
              <p>Absolventin der ESTU</p>
            </div>
          </div>

          {/* Sağ Kısım: Hikaye ve Yetenekler */}
          <div className="md:col-span-8">
            <div className="max-w-none">
              <p className="text-xl md:text-2xl font-light leading-relaxed text-gray-800 mb-8 italic">
                "Design ist nicht nur das, was man sieht, sondern das, was man fühlt."
              </p>
              
              <div className="space-y-6 text-gray-600 font-light leading-relaxed text-lg">
                <p>
                  Ich bin fest davon überzeugt, dass Innendesign weit mehr ist als die bloße Gestaltung von Räumen. 
                  Seit meinem Abschluss an der <strong>Technischen Universität Eskişehir</strong> verleihe ich Räumen eine einzigartige Identität.
                </p>
                <p>
                  Dieses Portfolio dient als digitale Präsentation meiner Projekte, in denen ich technische Präzision 
                  mit kreativer Vision für gewerbliche und private Kunden verbinde.
                </p>
              </div>

              {/* Technische Expertise */}
              <div className="mt-20 pt-12 border-t border-gray-200">
  <h3 className="text-[11px] tracking-[0.3em] uppercase font-bold text-black mb-10">
    Technische Expertise
  </h3>
  
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {/* Kart 1: Visualisierung */}
    <div className="p-6 bg-[#f9f9f9] border border-gray-100 rounded-sm hover:border-black transition-colors duration-300">
      <span className="block text-[10px] text-gray-500 uppercase tracking-widest mb-3 font-semibold">Visualisierung</span>
      <p className="text-base font-medium tracking-wide text-black uppercase">3ds Max + Corona</p>
    </div>

    {/* Kart 2: Modellierung */}
    <div className="p-6 bg-[#f9f9f9] border border-gray-100 rounded-sm hover:border-black transition-colors duration-300">
      <span className="block text-[10px] text-gray-500 uppercase tracking-widest mb-3 font-semibold">Modellierung</span>
      <p className="text-base font-medium tracking-wide text-black uppercase">SketchUp</p>
    </div>

    {/* Kart 3: Post-Produktion */}
    <div className="p-6 bg-[#f9f9f9] border border-gray-100 rounded-sm hover:border-black transition-colors duration-300">
      <span className="block text-[10px] text-gray-500 uppercase tracking-widest mb-3 font-semibold">Post-Produktion</span>
      <p className="text-base font-medium tracking-wide text-black uppercase">Adobe Photoshop</p>
    </div>

    {/* Kart 4: Philosophie */}
    <div className="p-6 bg-[#f9f9f9] border border-gray-100 rounded-sm hover:border-black transition-colors duration-300">
      <span className="block text-[10px] text-gray-500 uppercase tracking-widest mb-3 font-semibold">Philosophie</span>
      <p className="text-base font-medium tracking-wide text-black uppercase">Modern & FunktIonal</p>
    </div>
  </div>
</div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}