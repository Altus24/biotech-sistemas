import { Helmet } from 'react-helmet-async';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { ProductCatalog } from '@/components/ProductCatalog';
import { AboutUs } from '@/components/AboutUs';
import { TechnicalService } from '@/components/TechnicalService';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Biotech Sistemas - Equipos de Laboratorio | Venta y Servicio Técnico</title>
        <meta 
          name="description" 
          content="Biotech Sistemas: venta de equipos de laboratorio nuevos y usados. Microscopios, centrífugas, autoclaves y más. Servicio técnico especializado con garantía. Envíos a todo Argentina." 
        />
        <meta name="keywords" content="equipos laboratorio, microscopios, centrífugas, autoclaves, espectrofotómetros, servicio técnico laboratorio, Argentina" />
        <link rel="canonical" href="https://labequip.com" />
      </Helmet>
      
      <div className="min-h-screen">
        <Navbar />
        <main>
          <Hero />
          <ProductCatalog />
          <AboutUs />
          <TechnicalService />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
