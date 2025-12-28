import { Users, Target, Award, Clock } from 'lucide-react';

const stats = [
  { icon: Users, value: '500+', label: 'Clientes Satisfechos' },
  { icon: Target, value: '1000+', label: 'Equipos Entregados' },
  { icon: Award, value: '20+', label: 'Años de Experiencia' },
  { icon: Clock, value: '24/7', label: 'Soporte Disponible' },
];

export function AboutUs() {
  return (
    <section id="nosotros" className="py-24 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
              <Users className="w-4 h-4" />
              <span>Sobre Nosotros</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Quiénes Somos
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p className="text-lg">
                En <strong className="text-foreground">LabEquip</strong> somos especialistas en equipamiento 
                para laboratorios clínicos, industriales y de investigación. Con más de 20 años de 
                experiencia, nos hemos consolidado como referentes en el sector.
              </p>
              <p>
                Ofrecemos una amplia gama de equipos nuevos y usados seleccionados, todos con 
                garantía y respaldo técnico. Nuestro equipo de profesionales está capacitado para 
                asesorarte en la mejor solución para tu laboratorio.
              </p>
              <p>
                Trabajamos con las mejores marcas del mercado y contamos con un servicio técnico 
                propio que garantiza el correcto funcionamiento y mantenimiento de tu equipamiento.
              </p>
            </div>

            {/* Values */}
            <div className="grid grid-cols-2 gap-6 mt-8">
              <div className="p-4 rounded-xl bg-card border border-border/50">
                <h4 className="font-bold text-foreground mb-2">Nuestra Misión</h4>
                <p className="text-sm text-muted-foreground">
                  Proveer soluciones integrales en equipamiento científico con la mejor relación 
                  calidad-precio y servicio post-venta de excelencia.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-card border border-border/50">
                <h4 className="font-bold text-foreground mb-2">Nuestra Visión</h4>
                <p className="text-sm text-muted-foreground">
                  Ser líderes en el mercado de equipamiento de laboratorio, reconocidos por 
                  nuestra calidad, servicio e innovación constante.
                </p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="service-card text-center animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 mx-auto rounded-2xl gradient-primary flex items-center justify-center mb-4">
                  <stat.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <p className="text-4xl font-bold text-foreground mb-2">{stat.value}</p>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
