import { Users } from 'lucide-react';

export function AboutUs() {
  return (
    <section id="nosotros" className="py-16 md:py-24 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Content */}
          <div className="animate-fade-in">
            <div className="inline-flex items-center gap-2 px-3 md:px-4 py-2 rounded-full bg-accent/10 text-accent text-xs md:text-sm font-medium mb-3 md:mb-4">
              <Users className="w-3 h-3 md:w-4 md:h-4" />
              <span>Sobre Nosotros</span>
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground mb-4 md:mb-6 text-center">
              Quiénes Somos
            </h2>

            {/* Values */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12">
              <div className="p-4 md:p-6 rounded-xl bg-card border border-border/50 text-center">
                <h4 className="font-bold text-foreground mb-3 text-base md:text-lg">Nuestra Misión</h4>
                <p className="text-sm md:text-base text-muted-foreground">
                  Biotech Sistemas es una empresa mendocina de tamaño humano que propone un servicio técnico
                  (reparación y mantenimiento de máquinas), ventas de máquinas (centrífuga, espectrofotómetro, ….)
                </p>
              </div>
              <div className="p-4 md:p-6 rounded-xl bg-card border border-border/50 text-center">
                <h4 className="font-bold text-foreground mb-3 text-base md:text-lg">Nuestra Visión</h4>
                <p className="text-sm md:text-base text-muted-foreground">
                  Gracias al compromiso, profesionalismo e integridad de nuestro equipo queremos posicionarnos
                  como una de las empresas más importantes de la región con el objetivo principal de brindar el mejor
                  servicio a nuestros clientes actuales y futuros.
                </p>
              </div>
              <div className="p-4 md:p-6 rounded-xl bg-card border border-border/50 text-center">
                <h4 className="font-bold text-foreground mb-3 text-base md:text-lg">Nuestros Valores</h4>
                <p className="text-sm md:text-base text-muted-foreground">
                  Biotech Sistemas concede gran importancia a proporcionar a sus clientes asesoramiento objetivo,
                  científico y comercial. El personal de ventas especializado y los expertos de la empresa están allí
                  para ayudar a los clientes en el uso de productos, dispositivos y software de diagnóstico
                </p>
              </div>
            </div>

            {/* <div className="space-y-4 md:space-y-5 text-muted-foreground mb-8 md:mb-12">
              <p className="text-base md:text-lg text-center">
                En <strong className="text-foreground">Biotech Sistemas</strong> somos especialistas en equipamiento
                para laboratorios clínicos, industriales y de investigación. Con más de 20 años de
                experiencia, nos hemos consolidado como referentes en el sector.
              </p>
              <p className="text-sm md:text-base text-center">
                Ofrecemos una amplia gama de equipos nuevos y usados seleccionados, todos con
                garantía y respaldo técnico. Nuestro equipo de profesionales está capacitado para
                asesorarte en la mejor solución para tu laboratorio.
              </p>
              <p className="text-sm md:text-base text-center">
                Trabajamos con las mejores marcas del mercado y contamos con un servicio técnico
                propio que garantiza el correcto funcionamiento y mantenimiento de tu equipamiento.
              </p>
            </div> */}

            {/* Cultura Empresarial */}
            <div className="mb-8 md:mb-12">
              <h3 className="text-xl md:text-2xl font-bold text-foreground mb-4 md:mb-6 text-center">
                Nuestra cultura empresarial
              </h3>
              
              <ul className="space-y-3 md:space-y-4 max-w-3xl mx-auto">
                <li className="flex items-start gap-3 text-sm md:text-base text-muted-foreground">
                  <span className="text-accent mt-1">➢</span>
                  <span>Transparencia</span>
                </li>
                <li className="flex items-start gap-3 text-sm md:text-base text-muted-foreground">
                  <span className="text-accent mt-1">➢</span>
                  <span>Calidad del servicio al cliente</span>
                </li>
                <li className="flex items-start gap-3 text-sm md:text-base text-muted-foreground">
                  <span className="text-accent mt-1">➢</span>
                  <span>Garantía de la continuidad y seguridad de la atención mediante equipos médicos confiables</span>
                </li>
                <li className="flex items-start gap-3 text-sm md:text-base text-muted-foreground">
                  <span className="text-accent mt-1">➢</span>
                  <span>Diferenciarse por la calidad del servicio postventa y la capacidad de respuesta</span>
                </li>
                <li className="flex items-start gap-3 text-sm md:text-base text-muted-foreground">
                  <span className="text-accent mt-1">➢</span>
                  <span>Mantener un alto nivel de competencia técnica entre los equipos</span>
                </li>
                <li className="flex items-start gap-3 text-sm md:text-base text-muted-foreground">
                  <span className="text-accent mt-1">➢</span>
                  <span>Ser percibidos como un socio técnico confiable, no solo como un proveedor</span>
                </li>
                <li className="flex items-start gap-3 text-sm md:text-base text-muted-foreground">
                  <span className="text-accent mt-1">➢</span>
                  <span>Construir y mejorar una imagen de experiencia, rigor y confiabilidad</span>
                </li>
              </ul>
            </div>

            {/* Objetivos */}
            <div className="mb-8 md:mb-12">
              <h3 className="text-xl md:text-2xl font-bold text-foreground mb-4 md:mb-6 text-center">
                Objetivo de la empresa
              </h3>
              <ul className="space-y-3 md:space-y-4 max-w-3xl mx-auto">
                <li className="flex items-start gap-3 text-sm md:text-base text-muted-foreground">
                  <span className="text-accent mt-1">➢</span>
                  <span>Desarrollo de una oferta integral : ventas + instalación + mantenimiento + servicio posventa</span>
                </li>
                <li className="flex items-start gap-3 text-sm md:text-base text-muted-foreground">
                  <span className="text-accent mt-1">➢</span>
                  <span>Reducir al máximo los tiempos de inactividad de los equipos</span>
                </li>
                <li className="flex items-start gap-3 text-sm md:text-base text-muted-foreground">
                  <span className="text-accent mt-1">➢</span>
                  <span>Garantizar la precisión y el rendimiento de los equipos médicos</span>
                </li>
                <li className="flex items-start gap-3 text-sm md:text-base text-muted-foreground">
                  <span className="text-accent mt-1">➢</span>
                  <span>Garantizar la trazabilidad de las intervenciones y las piezas sustituidas</span>
                </li>
                <li className="flex items-start gap-3 text-sm md:text-base text-muted-foreground">
                  <span className="text-accent mt-1">➢</span>
                  <span>Desarrollar la venta de equipos médicos adaptados a las necesidades de los clientes</span>
                </li>
                <li className="flex items-start gap-3 text-sm md:text-base text-muted-foreground">
                  <span className="text-accent mt-1">➢</span>
                  <span>Formar continuamente a los equipos en las nuevas tecnología</span>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
