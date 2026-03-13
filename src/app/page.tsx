import Image from 'next/image';

export default function HomePage() {
  return (
    <div className="bg-white w-full pb-32">
      {/* Navbar ile aynı genişlikte (max-w-7xl) hizalıyoruz */}
      <div className="max-w-7xl mx-auto px-6">
        
        {/* --- OVAL KENARLI VE ÇERÇEVELİ GÖRSEL --- */}
        <div className="relative w-full overflow-hidden rounded-[2.5rem]">
          
          {/* İnce Çerçeve: Resmin üzerine binen o estetik hat */}
          <div className="absolute inset-0 border border-black/10 z-10 pointer-events-none rounded-[2.5rem] scale-[0.98]"></div>
          
          {/* Resmin Tamamı: h-auto ile hiçbir yerini kesmiyoruz */}
          <img
            src="/anasayfa.jpeg"
            alt="Ecem Kemal Interior Design"
            className="w-full h-auto block object-contain"
          />
        </div>

        {/* --- ALT KISIMDAKİ İÇERİK --- */}
        <div className="mt-20 text-center space-y-10">
          
          {/* Estetik Slogan */}
          <div className="flex justify-center items-center gap-6 text-[10px] md:text-xs tracking-[0.6em] uppercase text-gray-400 font-medium">
            <span>Ästhetik</span>
            <span className="text-gray-200">|</span>
            <span>Funktion</span>
            <span className="text-gray-200">|</span>
            <span>Seele</span>
          </div>
          
          {/* Başlık Grubu */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl text-[#1a1a1a] font-light tracking-tight leading-[1.1]">
              Moderne Akzente, die Ihren 
            </h1>
            <p className="text-4xl md:text-6xl text-[#1a1a1a] font-light italic leading-[1.1]">
              Lebensraum aufwerten.
            </p>
          </div>
          
        </div>

      </div>
    </div>
  );
}