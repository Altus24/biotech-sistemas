import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navItems = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Catálogo', href: '#catalogo' },
  { label: 'Quiénes Somos', href: '#nosotros' },
  { label: 'Servicio Técnico', href: '#servicio' },
  { label: 'Contacto', href: '#contacto' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isProductPage = location.pathname.startsWith('/producto/');
  const isHomePage = location.pathname === '/'; // ← Detectamos si estamos en la home

  // Forzamos el estilo "scrolled" (opaco) en páginas que no sean la home
  const forceOpaque = !isHomePage;
  const effectiveScrolled = isScrolled || forceOpaque;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    if (isProductPage) {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(href.substring(1));
        element?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.getElementById(href.substring(1));
      element?.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        effectiveScrolled
          ? 'bg-card/95 backdrop-blur-md shadow-md'
          : 'bg-transparent'
      }`}
    >
      {/* Main nav */}
      <nav className="container mx-auto px-4 py-3 md:py-4 flex items-center justify-between">
        <button onClick={() => handleNavClick('#inicio')} className="flex items-center gap-2 md:gap-3">
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg gradient-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg md:text-xl">L</span>
          </div>
          <span className={`text-lg md:text-xl font-bold transition-colors ${
            effectiveScrolled ? 'text-foreground' : 'text-primary-foreground'
          }`}>
            Biotech Sistemas
          </span>
        </button>

        {/* Desktop menu */}
        <ul className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <li key={item.label}>
              <button
                onClick={() => handleNavClick(item.href)}
                className={`nav-link text-sm ${
                  effectiveScrolled
                    ? 'text-foreground/80 hover:text-primary'
                    : 'text-primary-foreground/80 hover:text-primary-foreground'
                }`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="hidden lg:flex items-center gap-4">
          <Button
            variant={effectiveScrolled ? 'default' : 'heroOutline'}
            size="lg"
            onClick={() => handleNavClick('#contacto')}
          >
            Cotizar Ahora
          </Button>
        </div>

        {/* Mobile menu button */}
        <button
          className="lg:hidden p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className={`w-6 h-6 ${effectiveScrolled ? 'text-foreground' : 'text-primary-foreground'}`} />
          ) : (
            <Menu className={`w-6 h-6 ${effectiveScrolled ? 'text-foreground' : 'text-primary-foreground'}`} />
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`lg:hidden absolute top-full left-0 right-0 bg-card shadow-lg transition-all duration-300 ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <ul className="container mx-auto px-4 py-6 flex flex-col gap-3">
          {navItems.map((item) => (
            <li key={item.label}>
              <button
                onClick={() => handleNavClick(item.href)}
                className="block py-3 text-foreground/80 hover:text-primary transition-colors text-base text-left"
              >
                {item.label}
              </button>
            </li>
          ))}
          <li className="pt-4 border-t border-border">
            <Button
              variant="default"
              className="w-full mt-2"
              size="lg"
              onClick={() => handleNavClick('#contacto')}
            >
              Cotizar Ahora
            </Button>
          </li>
        </ul>
      </div>
    </header>
  );
}