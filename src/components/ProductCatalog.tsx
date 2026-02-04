import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Info, Tag, Sparkles, X, Eye } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

// Import product images
import centrifugaImg from '@/assets/products/analisador-de-electrolitos.webp';
import banoMariaImg from '@/assets/products/bano-maria.webp';
import espectrofotometroImg from '@/assets/products/espectrofotometro-1600DR.webp';
import elisaImg from '@/assets/products/lector-elisa-950.webp';
import microCentrifugaImg from '@/assets/products/micro-centrifuga.webp';


interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  // originalPrice?: number;
  image: string;
  badge?: 'offer' | 'new' | 'used';
  features: string[];
}

const products: Product[] = [
  {
    id: 1,
    name: 'Analizador de electrolitos',
    brand: 'Diestro - 103AP V4',
    price: 2800000,
    // originalPrice: 580000,
    image: centrifugaImg,
    badge: 'used',
    features: ['Dimensiones : 27cm de alto, 16cm de ancho y 21cm de profundidad', 'Temperatura y humedad de uso : Entre 15º - 30º C, Menos de 80%', 'Pesa : 3,2Kg', 'Voltaje de entrada : 100 - 240 V, frecuencia : 50 / 60 Hz, Amperaje 0.8A'],
  },
  {
    id: 2,
    name: 'Baño Maria',
    brand: 'Donelab - DL 326',
    price: 390000,
    image: banoMariaImg,
    badge: 'used',
    features: ['Capacidad: 32 tubos de ensayo (10mL) y 40 tubos de Khan (6mL)', 'Temperatura maxima: 70°C', 'Capacidad: 4L','Dimensiones: Alto:22,6cm, Ancho: 21,6cm, Profundidad:  35,2cm', 'Peso: 2,7Kg'],
  },
  {
    id: 3,
    name: 'Espectrofotómetro',
    brand: 'Metrolab 1600 DR',
    price: 2400000,
    image: espectrofotometroImg,
    badge: 'used',
    features: ['Dimensiones: Alto: 17cm, Ancho, 32cm, Profundidad 38cm', 'Peso: 6Kg', 'Voltaje: 150V','Amperaje: 10A'],
  },
  {
    id: 4,
    name: 'Lector ELISA',
    brand: 'Metrolab 950',
    price: 250000,
    // originalPrice: 3200000,
    image: elisaImg,
    badge: 'used',
    features: ['Capacidad: Tira de 8 o 12 pocillos', 'Capacidad máxima de cada pocillo: 300µL', 'Filtro de 450nm (⚠️ El unico que tiene ese aparato en venta, se puede pedir otro ⚠️)', 'Dimensiones : Alto:  4,5cm, Ancho:  15cm, Profundidad: 18cm','Temperatura de uso : 15-35°C' , 'Peso: 0.5Kg'],
  },
  {
    id: 5,
    name: 'Micro-ífuga para microhematocritos',
    brand: 'Gelec G112',
    price: 1250000,
    image: microCentrifugaImg,
    badge: 'used',
    features: ['Capacidad: 24 tubos', 'Capacidad máxima de cada tubo 1mL', 'Valocidad: 12000rpm (no es variable)', 'Dimensiones: Alto: 21,9cm, Ancho: 22,8cm, Profundidad: 27,5cm', 'Peso: 10Kg', 'Timer: 1-15 minutos máximo de agitacíon', 'Frecuencia: 50Hz', 'Voltaje: 250V','Amperaje: 10A'],
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

const openWhatsApp = (product: Product) => {
  const message = `Hola, me interesa el producto: ${product.name} (${product.brand}) - ${formatPrice(product.price)}. ¿Podrían darme más información?`;
  window.open(`https://wa.me/5492612646209?text=${encodeURIComponent(message)}`, '_blank');
};

export function ProductCatalog() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleConsultar = (product: Product) => {
    openWhatsApp(product);
    toast({
      title: '¡Redirigiendo a WhatsApp!',
      description: `Consulta sobre ${product.name}`,
    });
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="catalogo" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3 md:px-4 py-2 rounded-full bg-primary/10 text-primary text-xs md:text-sm font-medium mb-3 md:mb-4">
            <Sparkles className="w-3 h-3 md:w-4 md:h-4" />
            <span>Equipamiento Destacado</span>
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground mb-3 md:mb-4">
            Catálogo de Productos
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-2">
            Descubre nuestra selección de equipos de laboratorio con garantía y soporte técnico.
            Nuevos y usados certificados.
          </p>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 items-stretch">
          {products.map((product, index) => {
            const badgeConfig = getBadgeConfig(product.badge);
            return (
              <div
                key={product.id}
                className="product-card group animate-fade-in relative flex flex-col h-full"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Image */}
                <div className="relative aspect-square overflow-hidden bg-muted">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 md:group-hover:scale-110"
                  />
                  {badgeConfig && (
                    <span className={`absolute top-4 left-4 ${badgeConfig.className}`}>
                      {badgeConfig.label}
                    </span>
                  )}
                  
                  {/* Hover Overlay con características - Solo visible en desktop */}
                  <div className="hidden md:flex absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex-col items-center justify-center p-4 md:p-6">
                    {/* <h4 className="text-white font-bold text-base md:text-lg mb-3 md:mb-4 text-center">
                      Características principales
                    </h4>
                    <ul className="space-y-2 md:space-y-3 w-full max-w-xs">
                      {product.features.map((feature, i) => (
                        <li key={i} className="text-white text-xs md:text-sm flex items-start gap-2">
                          <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-accent shrink-0 mt-1.5" />
                          <span className="text-center flex-1">{feature}</span>
                        </li>
                      ))}
                    </ul> */}
                    <Button
                      variant="default"
                      size="sm"
                      className="mt-4 md:mt-6 text-xs md:text-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/producto/${product.id}`);
                      }}
                    >
                      <Eye className="w-3 h-3 md:w-4 md:h-4 mr-2" />
                      Ver más detalles
                    </Button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 md:p-6 flex flex-col flex-1">
                  <p className="text-xs md:text-sm text-muted-foreground mb-1">{product.brand}</p>
                  <h3 className="text-base md:text-lg font-bold text-foreground mb-2 md:mb-3 line-clamp-2">
                    {product.name}
                  </h3>

                  {/* Features */}
                  <ul className="space-y-1 mb-3 md:mb-4">
                    {product.features.map((feature, i) => (
                      <li key={i} className="text-xs md:text-sm text-muted-foreground flex items-center gap-2">
                        <span className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-accent shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Price */}
                  <div className="flex items-baseline gap-2 mb-3 md:mb-4">
                    <span className="text-lg md:text-2xl font-bold text-foreground">
                      {formatPrice(product.price)}
                    </span>
                    {/* {product.originalPrice && (
                      <span className="text-xs md:text-sm text-muted-foreground line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )} */}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 md:gap-3 mt-auto">
                    <Button variant="default" size="sm" className="flex-1 text-xs md:text-sm" onClick={() => handleConsultar(product)}>
                      <ShoppingCart className="w-3 h-3 md:w-4 md:h-4" />
                      Consultar
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1 text-xs md:text-sm" 
                      onClick={() => navigate(`/producto/${product.id}`)}
                    >
                      <Eye className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                      Ver más
                    </Button>
                    <Button variant="outline" size="sm" className="shrink-0 p-2" onClick={() => setSelectedProduct(product)}>
                      <Info className="w-3 h-3 md:w-4 md:h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-8 md:mt-12">
          <Button variant="outline" size="lg" className="group text-sm md:text-base" onClick={() => scrollToSection('contacto')}>
            <Tag className="w-4 h-4 md:w-5 md:h-5" />
            Ver Catálogo Completo
          </Button>
        </div>
      </div>

      {/* Product Detail Modal */}
      <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
        <DialogContent className="max-w-sm md:max-w-lg mx-4">
          {selectedProduct && (
            <>
              <DialogHeader>
                <DialogTitle className="text-lg md:text-xl">{selectedProduct.name}</DialogTitle>
                <DialogDescription className="text-sm md:text-base">{selectedProduct.brand}</DialogDescription>
              </DialogHeader>
              <div className="space-y-3 md:space-y-4">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-32 md:h-48 object-cover rounded-lg"
                />
                <div>
                  <h4 className="font-semibold mb-2 text-sm md:text-base">Características:</h4>
                  <ul className="space-y-1">
                    {selectedProduct.features.map((feature, i) => (
                      <li key={i} className="text-xs md:text-sm text-muted-foreground flex items-center gap-2">
                        <span className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-accent shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-xl md:text-2xl font-bold text-foreground">
                    {formatPrice(selectedProduct.price)}
                  </span>
                  {/* {selectedProduct.originalPrice && (
                    <span className="text-xs md:text-sm text-muted-foreground line-through">
                      {formatPrice(selectedProduct.originalPrice)}
                    </span>
                  )} */}
                </div>
                <Button className="w-full text-sm md:text-base" size="lg" onClick={() => handleConsultar(selectedProduct)}>
                  <ShoppingCart className="w-3 h-3 md:w-4 md:h-4" />
                  Consultar por WhatsApp
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
