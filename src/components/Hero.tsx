import { Button } from '@/components/ui/button';
import { ArrowRight, Award, Truck, Headphones } from 'lucide-react';
import heroImage from '@/assets/hero-lab.jpg';

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
      <div className="absolute top-1/4 right-10 w-72 h-72 bg-accent/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 left-10 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />

      {/* Content */}
      <div className="relative container mx-auto px-4 py-32 mt-16">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 text-primary-foreground text-sm mb-6 animate-fade-in">
            <Award className="w-4 h-4" />
            <span>+20 años de experiencia en equipamiento científico</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            Equipos de Laboratorio de{' '}
            <span className="text-gradient">Alta Calidad</span>
          </h1>

          <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-2xl animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Ofrecemos equipamiento científico de primer nivel con garantía y soporte técnico especializado. 
            Nuevos y usados seleccionados para laboratorios clínicos, industriales y de investigación.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <Button variant="hero" size="xl" className="group">
              Ver Catálogo
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="heroOutline" size="xl">
              Contactar Asesor
            </Button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="flex items-center gap-3 text-primary-foreground/80">
              <div className="w-12 h-12 rounded-lg bg-primary-foreground/10 flex items-center justify-center">
                <Truck className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="font-semibold text-primary-foreground">Envío Nacional</p>
                <p className="text-sm">A todo el país</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-primary-foreground/80">
              <div className="w-12 h-12 rounded-lg bg-primary-foreground/10 flex items-center justify-center">
                <Award className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="font-semibold text-primary-foreground">Garantía</p>
                <p className="text-sm">En todos los equipos</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-primary-foreground/80">
              <div className="w-12 h-12 rounded-lg bg-primary-foreground/10 flex items-center justify-center">
                <Headphones className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="font-semibold text-primary-foreground">Soporte</p>
                <p className="text-sm">Técnico especializado</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-primary-foreground/60 animate-bounce">
        <span className="text-sm">Descubre más</span>
        <div className="w-6 h-10 rounded-full border-2 border-primary-foreground/30 flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-primary-foreground/60 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
}
