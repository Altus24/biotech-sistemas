import { MapPin, Phone, Mail, ArrowUp } from 'lucide-react';

const footerLinks = {
  productos: [
    { label: 'Centrífugas', href: '#' },
    { label: 'Microscopios', href: '#' },
    { label: 'Autoclaves', href: '#' },
    { label: 'Espectrofotómetros', href: '#' },
    { label: 'Balanzas', href: '#' },
  ],
  servicios: [
    { label: 'Mantenimiento', href: '#servicio' },
    { label: 'Reparación', href: '#servicio' },
    { label: 'Calibración', href: '#servicio' },
    { label: 'Instalación', href: '#servicio' },
  ],
  empresa: [
    { label: 'Quiénes Somos', href: '#nosotros' },
    { label: 'Catálogo', href: '#catalogo' },
    { label: 'Contacto', href: '#contacto' },
  ],
};

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-foreground text-background">
      {/* Main footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xl">L</span>
              </div>
              <span className="text-xl font-bold">Biotech Systemas</span>
            </div>
            <p className="text-background/70 mb-6 max-w-sm">
              Más de 20 años proveyendo equipamiento de laboratorio de calidad. 
              Soluciones integrales con garantía y soporte técnico especializado.
            </p>
            <div className="space-y-3">
              {/* <div className="flex items-center gap-3 text-background/70">
                <MapPin className="w-5 h-5 shrink-0" />
                <span>Av. Corrientes 1234, CABA, Argentina</span>
              </div> */}
              <div className="flex items-center gap-3 text-background/70">
                <Phone className="w-5 h-5 shrink-0" />
                <span>+54 9 261 264 6209</span>
              </div>
              <div className="flex items-center gap-3 text-background/70">
                <Mail className="w-5 h-5 shrink-0" />
                <span>Biotech-systemas@proton.me</span>
              </div>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-bold mb-4">Productos</h4>
            <ul className="space-y-3">
              {footerLinks.productos.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-background/70 hover:text-background transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold mb-4">Servicios</h4>
            <ul className="space-y-3">
              {footerLinks.servicios.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-background/70 hover:text-background transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold mb-4">Empresa</h4>
            <ul className="space-y-3">
              {footerLinks.empresa.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-background/70 hover:text-background transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-background/10">
        <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-background/50 text-sm text-center md:text-left">
            © {new Date().getFullYear()} Biotech Systemas. Todos los derechos reservados.
          </p>
          <button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-lg bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors"
            aria-label="Volver arriba"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
