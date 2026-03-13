import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Analytics } from '@vercel/analytics/react';

export const metadata = {
  title: 'Ecem Kemal — Innenarchitektin',
  description: 'Portfolio von Ecem Kemal, Innenarchitektin aus der Türkei.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body style={{ backgroundColor: '#F7F3EE', margin: 0 }}>
        <Navbar />
        <main style={{ paddingTop: '80px' }}>
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
