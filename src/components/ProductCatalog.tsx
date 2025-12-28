import { Button } from '@/components/ui/button';
import { ShoppingCart, Info, Tag, Sparkles } from 'lucide-react';

// Import product images
import centrifugaImg from '@/assets/products/centrifuga.jpg';
import microscopioImg from '@/assets/products/microscopio.jpg';
import autoclaveImg from '@/assets/products/autoclave.jpg';
import espectrofotometroImg from '@/assets/products/espectrofotometro.jpg';
import estufaImg from '@/assets/products/estufa.jpg';
import balanzaImg from '@/assets/products/balanza.jpg';

interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  image: string;
  badge?: 'offer' | 'new' | 'used';
  features: string[];
}

const products: Product[] = [
  {
    id: 1,
    name: 'Centrífuga de Microhematocrito',
    brand: 'Gelec',
    price: 450000,
    originalPrice: 580000,
    image: centrifugaImg,
    badge: 'offer',
    features: ['12.000 RPM', 'Rotor 24 capilares', 'Temporizador digital'],
  },
  {
    id: 2,
    name: 'Microscopio Binocular',
    brand: 'Boeco',
    price: 900000,
    image: microscopioImg,
    badge: 'new',
    features: ['Objetivos 4x, 10x, 40x, 100x', 'Iluminación LED', 'Platina mecánica'],
  },
  {
    id: 3,
    name: 'Autoclave de Vapor',
    brand: 'Phoenix',
    price: 1250000,
    image: autoclaveImg,
    badge: 'used',
    features: ['21 litros', 'Control digital', 'Garantía 6 meses'],
  },
  {
    id: 4,
    name: 'Espectrofotómetro UV-VIS',
    brand: 'Metrolab',
    price: 2800000,
    originalPrice: 3200000,
    image: espectrofotometroImg,
    badge: 'offer',
    features: ['Rango 190-1100nm', 'Pantalla táctil', 'Software incluido'],
  },
  {
    id: 5,
    name: 'Estufa de Cultivo',
    brand: 'San Jor',
    price: 680000,
    image: estufaImg,
    features: ['37°C ± 0.5°C', '50 litros', 'Circulación por convección'],
  },
  {
    id: 6,
    name: 'Balanza Analítica',
    brand: 'Ohaus',
    price: 520000,
    image: balanzaImg,
    badge: 'new',
    features: ['0.0001g precisión', 'Calibración interna', 'Conexión USB'],
  },
];

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(price);
};

const getBadgeConfig = (badge: Product['badge']) => {
  switch (badge) {
    case 'offer':
      return { label: 'Oferta', className: 'badge-offer' };
    case 'new':
      return { label: 'Nuevo', className: 'badge-new' };
    case 'used':
      return { label: 'Usado Seleccionado', className: 'bg-warning text-warning-foreground px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full' };
    default:
      return null;
  }
};

export function ProductCatalog() {
  return (
    <section id="catalogo" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            <span>Equipamiento Destacado</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Catálogo de Productos
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Descubre nuestra selección de equipos de laboratorio con garantía y soporte técnico.
            Nuevos y usados certificados.
          </p>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => {
            const badgeConfig = getBadgeConfig(product.badge);
            return (
              <div
                key={product.id}
                className="product-card group animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Image */}
                <div className="relative aspect-square overflow-hidden bg-muted">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {badgeConfig && (
                    <span className={`absolute top-4 left-4 ${badgeConfig.className}`}>
                      {badgeConfig.label}
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-sm text-muted-foreground mb-1">{product.brand}</p>
                  <h3 className="text-lg font-bold text-foreground mb-3 line-clamp-2">
                    {product.name}
                  </h3>

                  {/* Features */}
                  <ul className="space-y-1 mb-4">
                    {product.features.map((feature, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Price */}
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-2xl font-bold text-foreground">
                      {formatPrice(product.price)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <Button variant="default" className="flex-1">
                      <ShoppingCart className="w-4 h-4" />
                      Consultar
                    </Button>
                    <Button variant="outline" size="icon" className="shrink-0">
                      <Info className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="group">
            <Tag className="w-5 h-5" />
            Ver Catálogo Completo
          </Button>
        </div>
      </div>
    </section>
  );
}
