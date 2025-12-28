import { Button } from '@/components/ui/button';
import { Wrench, Settings, CheckCircle, Shield, Zap, Clock, Phone, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const openWhatsApp = (message: string) => {
  window.open(`https://wa.me/5491155559999?text=${encodeURIComponent(message)}`, '_blank');
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
    <section id="servicio" className="py-24 gradient-hero relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 text-primary-foreground text-sm font-medium mb-4">
            <Wrench className="w-4 h-4" />
            <span>Servicio Especializado</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4">
            Servicio Técnico
          </h2>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            Contamos con un equipo de técnicos especializados para el mantenimiento, 
            reparación y calibración de todo tipo de equipos de laboratorio.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="p-6 rounded-2xl bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10 hover:bg-primary-foreground/10 transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-14 h-14 rounded-xl bg-accent/20 flex items-center justify-center mb-4">
                <service.icon className="w-7 h-7 text-accent" />
              </div>
              <h3 className="text-lg font-bold text-primary-foreground mb-2">{service.title}</h3>
              <p className="text-primary-foreground/70 text-sm">{service.description}</p>
            </div>
          ))}
        </div>

        {/* Benefits and CTA */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <h3 className="text-2xl font-bold text-primary-foreground mb-6">
              ¿Por qué elegirnos?
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-accent shrink-0" />
                  <span className="text-primary-foreground/80">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-3xl p-8 border border-primary-foreground/20 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center animate-pulse-glow">
                <Phone className="w-8 h-8 text-primary-foreground" />
              </div>
              <div>
                <p className="text-primary-foreground/70 text-sm">Línea de Servicio Técnico</p>
                <p className="text-2xl font-bold text-primary-foreground">+54 11 5555-9999</p>
              </div>
            </div>
            <p className="text-primary-foreground/80 mb-6">
              Solicita un presupuesto sin cargo o agenda una visita técnica. 
              Nuestro equipo está disponible para atenderte.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="lg" className="flex-1 group" onClick={handleSolicitarPresupuesto}>
                Solicitar Presupuesto
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="heroOutline" size="lg" className="flex-1" onClick={handleAgendarVisita}>
                <Clock className="w-5 h-5" />
                Agendar Visita
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
