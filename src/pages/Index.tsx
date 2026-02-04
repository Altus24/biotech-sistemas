import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Navbar } from '@/components/Navbar';
import { SkipLinks } from '@/components/SkipLinks';
import { Hero } from '@/components/Hero';
import { ProductCatalog } from '@/components/ProductCatalog';
import { AboutUs } from '@/components/AboutUs';
import { TechnicalService } from '@/components/TechnicalService';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';

const Index = () => {
  const location = useLocation();

  useEffect(() => {
    // Si hay un estado de scroll en la navegación, hacer scroll a esa sección
    if (location.state?.scrollTo) {
      const element = document.getElementById(location.state.scrollTo);
      if (element) {
        // Pequeño delay para asegurar que la página se haya renderizado completamente
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  return (
    <>
      <Helmet>
        <html lang="es" />
        <title>Biotech Sistemas - Equipos de Laboratorio | Venta y Servicio Técnico</title>
        <meta
          name="description"
          content="Biotech Sistemas: venta de equipos de laboratorio nuevos y usados. Microscopios, centrífugas, autoclaves y más. Servicio técnico especializado con garantía. Envíos a todo Argentina."
        />
        <meta name="keywords" content="equipos laboratorio, microscopios, centrífugas, autoclaves, espectrofotómetros, servicio técnico laboratorio, Argentina" />
        <link rel="canonical" href="https://labequip.com" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Biotech Sistemas - Equipos de Laboratorio" />
        <meta property="og:description" content="Venta de equipos de laboratorio nuevos y usados. Microscopios, centrífugas, autoclaves y más. Servicio técnico especializado con garantía." />
        <meta property="og:url" content="https://labequip.com" />
        <meta property="og:image" content="https://labequip.com/og-image.jpg" />
        <meta property="og:site_name" content="Biotech Sistemas" />
        <meta property="og:locale" content="es_AR" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Biotech Sistemas - Equipos de Laboratorio" />
        <meta name="twitter:description" content="Venta de equipos de laboratorio nuevos y usados. Servicio técnico especializado con garantía." />
        <meta name="twitter:image" content="https://labequip.com/twitter-image.jpg" />

        {/* Additional SEO */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Biotech Sistemas" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/logo.ico" />

        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Biotech Sistemas",
            "url": "https://labequip.com",
            "logo": "https://labequip.com/logo.png",
            "description": "Venta de equipos de laboratorio nuevos y usados. Servicio técnico especializado.",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Godoy Cruz",
              "addressRegion": "Mendoza",
              "addressCountry": "Argentina"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+54-9-261-264-6209",
              "contactType": "customer service",
              "availableLanguage": "Spanish"
            },
            "sameAs": [
              "https://wa.me/5492612646209",
              "https://instagram.com/biotech_sistemas"
            ]
          })}
        </script>
      </Helmet>
      
      <div className="min-h-screen">
        <SkipLinks />
        <Navbar />
        <main id="main-content">
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
