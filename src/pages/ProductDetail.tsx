import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { ShoppingCart, ArrowLeft, Check, Download } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';
import jsPDF from 'jspdf';
import { getAllProducts, type Product } from '@/lib/productStore';

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

const downloadProductPDF = (product: Product) => {
  if (product.manualPdfUrl) {
    // Descargar PDF manual si existe
    const link = document.createElement('a');
    link.href = product.manualPdfUrl;
    link.download = `${product.name.replace(/\s+/g, '_')}_manual.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } else {
    // Generar PDF automáticamente si no hay manual
    generateProductPDF(product);
  }
};


const generateProductPDF = (product: Product) => {
  const doc = new jsPDF();

  // Configuración inicial
  let yPosition = 20;
  const lineHeight = 7;
  const pageWidth = doc.internal.pageSize.width;
  const margin = 20;

  // Título principal
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('BIOTECH SISTEMAS', pageWidth / 2, yPosition, { align: 'center' });
  yPosition += lineHeight * 2;

  doc.setFontSize(14);
  doc.text('FICHA TÉCNICA DEL PRODUCTO', pageWidth / 2, yPosition, { align: 'center' });
  yPosition += lineHeight * 3;

  // Nombre del producto
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text(product.name, margin, yPosition);
  yPosition += lineHeight;

  // Marca
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text(product.brand, margin, yPosition);
  yPosition += lineHeight * 2;

  // Precio
  doc.setFont('helvetica', 'bold');
  doc.text(`Precio: ${formatPrice(product.price)}`, margin, yPosition);
  yPosition += lineHeight;

  // if (product.originalPrice) {
  //   doc.setFont('helvetica', 'normal');
  //   doc.setTextColor(150, 150, 150);
  //   doc.text(`Precio anterior: ${formatPrice(product.originalPrice)}`, margin, yPosition);
  //   doc.setTextColor(0, 0, 0);
  //   yPosition += lineHeight;
  // }
  // yPosition += lineHeight;

  // Función auxiliar para agregar secciones
  const addSection = (title: string, content: string) => {
    // Verificar si necesitamos una nueva página
    if (yPosition > 250) {
      doc.addPage();
      yPosition = 20;
    }

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.text(title.toUpperCase(), margin, yPosition);
    yPosition += lineHeight;

    // Línea separadora
    doc.setLineWidth(0.5);
    doc.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += lineHeight;

    // Contenido
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    const splitContent = doc.splitTextToSize(content, pageWidth - (margin * 2));
    doc.text(splitContent, margin, yPosition);
    yPosition += (splitContent.length * lineHeight) + lineHeight;
  };

  // Descripción
  if (product.description) {
    addSection('Descripción', product.description);
  }

  // Características principales
  addSection('Características Principales', product.features.map(feature => '• ' + feature).join('\n'));

  // Especificaciones técnicas
  if (product.specifications) {
    const specsText = Object.entries(product.specifications)
      .map(([key, value]) => `${key}: ${value}`)
      .join('\n');
    addSection('Especificaciones Técnicas', specsText);
  }

  // Conectividad
  if (product.conectividad) {
    addSection('Conectividad', product.conectividad);
  }

  // Aplicaciones
  if (product.aplicaciones) {
    addSection('Aplicaciones', product.aplicaciones);
  }

  // Estado del equipo
  if (product.estadoDelEquipo) {
    addSection('Estado del Equipo', product.estadoDelEquipo);
  }

  // Mantenimiento
  if (product.mantenimiento) {
    addSection('Mantenimiento', product.mantenimiento);
  }

  // Garantía
  if (product.warranty) {
    addSection('Garantía', product.warranty);
  }

  // Información de contacto (al final)
  if (yPosition > 220) {
    doc.addPage();
    yPosition = 20;
  }

  yPosition += lineHeight;
  addSection('Información de Contacto',
    'Biotech Sistemas\n' +
    'Email: info@biotechsistemas.com\n' +
    'Teléfono: +54 9 261 264 6209\n' +
    'Website: www.biotechsistemas.com\n\n' +
    `Fecha de generación: ${new Date().toLocaleDateString('es-AR')}`
  );

  // Descargar el PDF
  doc.save(`${product.name.replace(/\s+/g, '_')}_ficha_tecnica.pdf`);
};

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const products = getAllProducts();
  const product = products.find(p => p.id === Number(id));

  // ← NUEVO: fuerza scroll al top al cargar/cambiar el producto
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-muted">
          <div className="text-center">
            <h1 className="mb-4 text-4xl font-bold">Producto no encontrado</h1>
            <Button onClick={() => navigate('/')} className="mt-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al catálogo
            </Button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const badgeConfig = getBadgeConfig(product.badge);

  const handleConsultar = () => {
    openWhatsApp(product);
    toast({
      title: '¡Redirigiendo a WhatsApp!',
      description: `Consulta sobre ${product.name}`,
    });
  };

  return (
    <>
      <Helmet>
        <html lang="es" />
        <title>{product.name} - {product.brand} | Biotech Sistemas</title>
        <meta
          name="description"
          content={`${product.name} ${product.brand}. ${product.description || ''} Precio: ${formatPrice(product.price)}. Envíos a todo Argentina.`}
        />
        <link rel="canonical" href={`https://labequip.com/producto/${product.id}`} />

        {/* Open Graph */}
        <meta property="og:type" content="product" />
        <meta property="og:title" content={`${product.name} - ${product.brand} | Biotech Sistemas`} />
        <meta property="og:description" content={`${product.description || ''} Precio: ${formatPrice(product.price)}`} />
        <meta property="og:url" content={`https://labequip.com/producto/${product.id}`} />
        <meta property="og:image" content={`https://labequip.com${product.image}`} />
        <meta property="og:site_name" content="Biotech Sistemas" />
        <meta property="og:locale" content="es_AR" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${product.name} - ${product.brand}`} />
        <meta name="twitter:description" content={`${product.description || ''} Precio: ${formatPrice(product.price)}`} />
        <meta name="twitter:image" content={`https://labequip.com${product.image}`} />

        {/* Product JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": product.name,
            "brand": {
              "@type": "Brand",
              "name": product.brand
            },
            "description": product.description,
            "image": `https://labequip.com${product.image}`,
            "offers": {
              "@type": "Offer",
              "price": product.price,
              "priceCurrency": "ARS",
              "availability": "https://schema.org/InStock",
              "seller": {
                "@type": "Organization",
                "name": "Biotech Sistemas"
              }
            },
            "additionalProperty": product.features.map(feature => ({
              "@type": "PropertyValue",
              "name": "Característica",
              "value": feature
            }))
          })}
        </script>
      </Helmet>
      
      <div className="min-h-screen">
        <Navbar />
        <main className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="mb-6 md:mb-8"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al catálogo
            </Button>

            {/* El resto del JSX queda exactamente igual */}
            <div className="grid lg:grid-cols-2 gap-8 md:gap-12 w-full">
              {/* Imagen */}
              <div className="relative">
                <div className="aspect-square overflow-hidden bg-muted rounded-lg">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {badgeConfig && (
                  <span className={`absolute top-4 left-4 ${badgeConfig.className}`}>
                    {badgeConfig.label}
                  </span>
                )}
              </div>

              {/* Información */}
              <div className="space-y-6 md:space-y-8">
                <div>
                  <p className="text-sm md:text-base text-muted-foreground mb-2">{product.brand}</p>
                  <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">
                    {product.name}
                  </h1>
                  {product.description && (
                    <p className="text-base md:text-lg text-muted-foreground mb-6">
                      {product.description}
                    </p>
                  )}
                </div>

                {/* Precio */}
                <div className="flex items-baseline gap-3 pb-6 border-b">
                  <span className="text-3xl md:text-4xl font-bold text-foreground">
                    {formatPrice(product.price)}
                  </span>
                  {/* {product.originalPrice && (
                    <span className="text-lg md:text-xl text-muted-foreground line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )} */}
                </div>

                {/* Características principales */}
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4">
                    Características principales
                  </h2>
                  <ul className="space-y-3">
                    {product.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3 text-base md:text-lg text-muted-foreground">
                        <Check className="w-5 h-5 text-accent shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Botones de acción */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button
                    size="lg"
                    className="flex-1 text-base md:text-lg"
                    onClick={handleConsultar}
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Consultar por WhatsApp
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="flex-1 text-base md:text-lg"
                    onClick={() => downloadProductPDF(product)}
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Descargar Ficha Técnica
                    
                  </Button>
                </div>
              </div>
            </div>

            {/* Secciones de ancho completo (sin cambios) */}
            <div className="mt-8 md:mt-12 space-y-6 md:space-y-8">
              {product.specifications && (
                <div className="p-4 md:p-6 rounded-lg bg-muted/50 border border-border/50">
                  <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4">
                    Especificaciones técnicas
                  </h2>
                  <ul className="space-y-3">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <li key={key} className="flex items-start gap-3 text-base md:text-lg text-muted-foreground">
                        <Check className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                        <span>
                          <strong className="text-foreground">{key}</strong> {value}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Conectividad */}
              {product.conectividad && (
                <div className="p-4 md:p-6 rounded-lg bg-muted/50 border border-border/50">
                  <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4">
                    Conectividad
                  </h2>
                  <p className="text-sm md:text-base text-muted-foreground">
                    {product.conectividad}
                  </p>
                </div>
              )}

              {product.aplicaciones && (
                <div className="p-4 md:p-6 rounded-lg bg-muted/50 border border-border/50">
                  <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4">
                    Aplicaciones
                  </h2>
                  <p className="text-sm md:text-base text-muted-foreground">
                    {product.aplicaciones}
                  </p>
                </div>
              )}

              {product.estadoDelEquipo && (
                <div className="p-4 md:p-6 rounded-lg bg-muted/50 border border-border/50">
                  <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4">
                    Estado del equipo
                  </h2>
                  <p className="text-sm md:text-base text-muted-foreground">
                    {product.estadoDelEquipo}
                  </p>
                </div>
              )}

              {product.mantenimiento && (
                <div className="p-4 md:p-6 rounded-lg bg-muted/50 border border-border/50">
                  <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4">
                    Mantenimiento
                  </h2>
                  <p className="text-sm md:text-base text-muted-foreground">
                    {product.mantenimiento}
                  </p>
                </div>
              )}

              {product.warranty && (
                <div className="p-4 md:p-6 rounded-lg bg-muted/50 border border-border/50">
                  <p className="text-sm md:text-base text-muted-foreground">
                    <strong className="text-foreground">Garantía:</strong> {product.warranty}
                  </p>
                </div>
              )}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}