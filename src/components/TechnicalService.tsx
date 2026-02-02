import { Button } from '@/components/ui/button';
import { Wrench, Settings, CheckCircle, Shield, Zap, Clock, Phone, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const openWhatsApp = (message: string) => {
  window.open(`https://wa.me/5492612646209?text=${encodeURIComponent(message)}`, '_blank');
};

const services = [
  {
    icon: Settings,
    title: 'Mantenimiento Preventivo',
    description: 'Programas de mantenimiento para garantizar el óptimo funcionamiento de tus equipos.',
  },
  {
    icon: Wrench,
    title: 'Reparación de Equipos',
    description: 'Servicio de reparación especializado para todo tipo de equipamiento de laboratorio.',
  },
  {
    icon: Shield,
    title: 'Calibración Certificada',
    description: 'Calibración con trazabilidad y emisión de certificados según normativas vigentes.',
  },
  {
    icon: Zap,
    title: 'Instalación y Puesta en Marcha',
    description: 'Instalación profesional y capacitación para el uso correcto de los equipos.',
  },
];

const benefits = [
  'Técnicos especializados certificados',
  'Repuestos originales garantizados',
  'Tiempos de respuesta rápidos',
  'Cobertura en todo el país',
  'Presupuestos sin cargo',
  'Contratos de mantenimiento anuales',
];

export function TechnicalService() {
  const { toast } = useToast();

  const handleSolicitarPresupuesto = () => {
    openWhatsApp('Hola, me gustaría solicitar un presupuesto para servicio técnico de equipos de laboratorio.');
    toast({
      title: '¡Redirigiendo a WhatsApp!',
      description: 'Solicitud de presupuesto de servicio técnico',
    });
  };

  const handleAgendarVisita = () => {
    openWhatsApp('Hola, me gustaría agendar una visita técnica para revisión de equipos de laboratorio.');
    toast({
      title: '¡Redirigiendo a WhatsApp!',
      description: 'Solicitud para agendar visita técnica',
    });
  };

  return (
    <section id="servicio" className="py-16 md:py-24 gradient-hero relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 right-20 w-48 h-48 md:w-64 md:h-64 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-64 h-64 md:w-96 md:h-96 bg-primary/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative">
        {/* Section header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3 md:px-4 py-2 rounded-full bg-primary-foreground/10 text-primary-foreground text-xs md:text-sm font-medium mb-3 md:mb-4">
            <Wrench className="w-3 h-3 md:w-4 md:h-4" />
            <span>Servicio Técnico Especializado</span>
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-primary-foreground mb-3 md:mb-4">
            Servicio Técnico Especializado
          </h2>
          <p className="text-base md:text-lg text-primary-foreground/80 max-w-2xl mx-auto px-2">
            Contamos con un equipo de técnicos especializados para el mantenimiento,
            reparación y calibración de todo tipo de equipos de laboratorio.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12 md:mb-16 items-stretch">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="p-4 md:p-6 rounded-2xl bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10 hover:bg-primary-foreground/10 transition-all duration-300 animate-fade-in w-full max-w-[280px] md:max-w-none text-center flex flex-col items-center justify-center h-full"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-accent/20 flex items-center justify-center mb-3 md:mb-4">
                <service.icon className="w-6 h-6 md:w-7 md:h-7 text-accent " />
              </div>
              <h3 className="text-base md:text-lg font-bold text-primary-foreground mb-2">{service.title}</h3>
              <p className="text-primary-foreground/70 text-xs md:text-sm">{service.description}</p>
            </div>
          ))}
        </div>

        {/* Benefits and CTA */}
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="animate-fade-in">
            <h3 className="text-xl md:text-2xl font-bold text-primary-foreground mb-4 md:mb-6">
              ¿Por qué elegirnos?
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-accent shrink-0" />
                  <span className="text-primary-foreground/80 text-sm md:text-base">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-3xl p-6 md:p-8 border border-primary-foreground/20 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl gradient-primary flex items-center justify-center animate-pulse-glow">
                <Phone className="w-6 h-6 md:w-8 md:h-8 text-primary-foreground" />
              </div>
              <div>
                <p className="text-primary-foreground/70 text-xs md:text-sm">Línea de Servicio Técnico</p>
                <p className="text-xl md:text-2xl font-bold text-primary-foreground">+54 9 261 264 6209</p>
              </div>
            </div>
            <p className="text-primary-foreground/80 mb-4 md:mb-6 text-sm md:text-base">
              Solicita un presupuesto sin cargo o agenda una visita técnica.
              Nuestro equipo está disponible para atenderte.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <Button variant="hero" size="lg" className="w-full group text-sm md:text-base" onClick={handleSolicitarPresupuesto}>
                Solicitar Presupuesto
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="heroOutline" size="lg" className="w-full text-sm md:text-base" onClick={handleAgendarVisita}>
                <Clock className="w-4 h-4 md:w-5 md:h-5" />
                Agendar Visita
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
