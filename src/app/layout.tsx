import "./globals.css";

// Dosya yollarını (import path) senin projedeki klasör yapına göre ayarlaman gerekebilir.
// Ben şimdilik bileşenlerin 'src/components' klasöründe olduğunu varsayarak yazıyorum.
import Navbar from "@/components/Navbar"; 
import Footer from "@/components/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body className="antialiased font-light bg-white text-black flex flex-col min-h-screen">
        
        {/* Senin Navbar bileşenin */}
        <Navbar />

        {/* Ana İçerik - Navbar altında kalmaması için 'pt-28' üst boşluğu eklendi */}
        <main className="flex-grow pt-28 bg-white">{children}</main>

        {/* Senin Footer bileşenin */}
        <Footer />
        
      </body>
    </html>
  );
}