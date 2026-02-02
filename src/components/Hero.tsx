import { Button } from '@/components/ui/button';
import { ArrowRight, Award, Truck, Headphones } from 'lucide-react';
import heroImage from '@/assets/hero-lab.jpg';

const scrollToSection = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
};

const openWhatsApp = (message: string) => {
  window.open(`https://wa.me/5492612646209?text=${encodeURIComponent(message)}`, '_blank');
};

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Equipos de laboratorio profesional"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 gradient-hero opacity-90" />
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 right-10 w-72 h-72 bg-accent/20 rounded-full blur-3xl animate-float" aria-hidden="true" />
      <div className="absolute bottom-1/4 left-10 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} aria-hidden="true" />

      {/* Content */}
      <div className="relative container mx-auto px-4 py-20 md:py-32 mt-8 md:mt-16 ">
        <div className="max-w-3xl ">
          <div className="inline-flex items-center gap-2 px-3 md:px-4 py-2 rounded-full bg-primary-foreground/0 backdrop-blur-sm border border-primary-foreground/20 text-primary-foreground text-xs md:text-sm mb-4 md:mb-6 animate-fade-in sm:visibility: hidden">
            <Award className="w-4 h-4" />
            <span className="text-center ">+20 años de experiencia en equipamiento científico</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-4 md:mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            Equipos de Laboratorio de{' '}
            <span className="text-gradient">Alta Calidad</span>
          </h1>

          <p className="text-base md:text-lg lg:text-xl text-primary-foreground/80 mb-6 md:mb-8 max-w-2xl animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Ofrecemos equipamiento científico de primer nivel con garantía y soporte técnico especializado.
            Nuevos y usados seleccionados para laboratorios clínicos, industriales y de investigación.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-8 md:mb-12 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <Button variant="hero" size="lg" className="group text-sm md:text-base" onClick={() => scrollToSection('catalogo')}>
              Ver Catálogo
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="heroOutline" size="lg" className="text-sm md:text-base" onClick={() => openWhatsApp('Hola, me gustaría recibir asesoramiento sobre equipos de laboratorio.')}>
              Contactar Asesor
            </Button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 animate-fade-in " style={{ animationDelay: '0.4s' }}>
            <div className="flex items-center gap-3 text-primary-foreground/80">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-primary-foreground/10 flex items-center justify-center shrink-0">
                <Truck className="w-5 h-5 md:w-6 md:h-6 text-accent" />
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-primary-foreground text-sm md:text-base">Envío Nacional</p>
                <p className="text-xs md:text-sm">A todo el país</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-primary-foreground/80">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-primary-foreground/10 flex items-center justify-center shrink-0">
                <Award className="w-5 h-5 md:w-6 md:h-6 text-accent" />
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-primary-foreground text-sm md:text-base">Garantía</p>
                <p className="text-xs md:text-sm">En todos los equipos</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-primary-foreground/80">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-primary-foreground/10 flex items-center justify-center shrink-0">
                <Headphones className="w-5 h-5 md:w-6 md:h-6 text-accent" />
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-primary-foreground text-sm md:text-base">Soporte</p>
                <p className="text-xs md:text-sm">Técnico especializado</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-primary-foreground/60 animate-bounce" aria-hidden="true">
        <span className="text-xs md:text-sm">Descubre más</span>
        <div className="w-5 h-8 md:w-6 md:h-10 rounded-full border-2 border-primary-foreground/30 flex items-start justify-center p-1.5 md:p-2">
          <div className="w-1 h-2.5 md:w-1.5 md:h-3 bg-primary-foreground/60 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
}
