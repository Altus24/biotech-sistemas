import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { ShoppingCart, ArrowLeft, Check, Download } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';
import jsPDF from 'jspdf';

// Import product images
import analizadorImg from '@/assets/products/analisador-de-electrolitos.webp';
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
  badge?: 'offer' | 'new' | 'used' | ' ';
  features: string[];
  description?: string;
  specifications?: { [key: string]: string };
  warranty?: string;
  conectividad?: string;
  aplicaciones?: string;
  estadoDelEquipo?: string;
  mantenimiento?: string;
  manualPdfUrl?: string; // URL del PDF manual subido para este producto
}

const products: Product[] = [
  {
    id: 1,
    name: 'Analizador de electrolitos',
    brand: 'Diestro - modelo 103AP V4',
    price: 2800000,
    // originalPrice: 580000,
    image: analizadorImg,
    badge: 'used',
    features: ['Dimensiones : Alto: 27cm, Ancho: 16cm, Profundidad: 21cm', 'Temperatura y humedad de uso : Entre 15º - 30º C, Menos de 80% de humedad', 'Peso : 3,2Kg', 'Voltaje de entrada : 100 - 240 V',' Frecuencia : 50 / 60 Hz', 'Amperaje 0.8A'],
    description: 'Analizador de electrolitos de alta precisión ideal para laboratorios clínicos. Ofrece resultados rápidos y confiables para análisis de rutina. Listo para uso, incluye manual y cables.',
    specifications: {
      'Parametros medidos:': 'Sodio, potasio y cloro (se puede comprar calcio y litio pero usan otro reactivos)',
      'Tiempo de medición rápido:':'Normalmente < 1 minuto',
      'Calibraciones automáticas:': '(Auto-Cal) y modo QC (control de calidad integrado)',
      'Acepta como muestras:': ' Sangre completa, Suero, Plasma',
      'Mantenimiento reducido:': 'Los electrodos no requieren mantenimiento, lo que reduce los costos y el esfuerzo de mantenimiento',
      'Automatización parcial:': 'Menos manipulación manual que los modelos antiguos, lo que supone un ahorro de tiempo',
      'Multielectrolitos simultáneos:': 'Medición de varios iones en una sola toma, ideal para ionogramas completos',
    },
    warranty: '12 meses',
    conectividad: 'Puerto USB para transferencia de datos y conexión a impresoras. Compatible con sistemas LIS (Laboratory Information System).',
    aplicaciones: 'Ideal para laboratorios clínicos, hospitales y centros de diagnóstico. Análisis de electrolitos en muestras de sangre, suero y plasma. Útil para chequeos de rutina, emergencias y seguimiento de pacientes.',
    estadoDelEquipo: 'Equipo en excelente estado, funcionando correctamente. Incluye todos los accesorios originales, manual de usuario y cables de conexión.',
    mantenimiento: 'Los electrodos no requieren mantenimiento especial. Limpieza periódica recomendada según protocolo del fabricante. Calibración automática integrada reduce la necesidad de mantenimiento manual.',
    manualPdfUrl: '/analizador-electrolitos.pdf',
  },
  {
    id: 2,
    name: 'Baño Maria',
    brand: 'Diestro -modelo 103AP V4',
    price: 390000,
    image: banoMariaImg,
    badge: 'used',
    features: ['Capacidad: 32 tubos de ensayo (10mL) y 40 tubos de Khan (6mL)', 'Temperatura maxima: 70°C', 'Capacidad: 4L','Dimensiones: Alto:22,6cm, Ancho: 21,6cm, Profundidad:  35,2cm', 'Peso: 2,7Kg'],
    description: 'El baño maria es un equipo de laboratorio elaborado para calentar, mantener o incubar muestras a una temperatura precisa y estable, sin contacto directo con la fuente de calor. Baño maria en buen estado.',
    specifications: {
      'Calentamiento uniforme:':'Se distribuye de manera homogenea (ideal para muestras sensibles a la temperatura)',
      'Compacto y liviano': 'Facilita su colocación en mesada de laboratorio',
      'Temperatura': 'Estable y precisa durante largos períodos (Esencial para incubaciones y reacciones enzimáticas)',
      'Adecuado para': 'Reactivos y tampones - Sueros y muestras biológicas - Tubos, frascos y vasos - Medios de cultivos y agar - Reacciones bioquímicas sensible',
                           
    },
    warranty: '12 meses',
    // conectividad: '',
    aplicaciones: 'Ideal para incubación controlada de muestras, Calentamiento, disolución y descongelación suave, Aplicaciones químicas (control térmico de reacciones químicas, y calentamiento uniforme, para extracciones, titulaciones y pruebas de estabilidad)',
    estadoDelEquipo: 'Equipo en buen estado operativo, verificado y calibrado recientemente. Máquina muy simple que permite su reparación rapidamente. Menús en perfecto funcionamiento y fácil a usar.',
    mantenimiento: 'Limpieza con agua y jabón, después enjuagar (aclarar) bien con agua( ⚠️ No dejar ningún jabón ',
    manualPdfUrl: '/bano-maria.pdf',
  },
  {
    id: 3,
    name: 'Espectrofotómetro',
    brand: 'Metrolab 1600 DR',
    price: 2400000,
    image: espectrofotometroImg,
    badge: 'used',
    features: ['Dimensiones: Alto: 17cm, Ancho, 32cm, Profundidad 38cm', 'Peso: 6Kg', 'Voltaje: 150V','Amperaje: 10A'],
    description: 'El Metrolab 1600 DR es un analizador colorimétrico/automatizado de propósito clínico, diseñado para efectuar  eterminaciones bioquímicas confiables y repetibles. Equipo robusto, de fácil operación y mantenimiento,  recuentemente usado en laboratorios clínicos, centros veterinarios y unidades de diagnóstico que realizan ensayos de rutina.Incluye manual y cables.',
    specifications: {
      'Lectura:': 'Fotométrica/colorimétrica de alta estabilidad',
      'Interfaz de usuario: ': 'Simple y menús intuitivos',
      'Diseño: ': 'Compacto y fácil acceso para mantenimiento',
      'Sistema de incubación: ': '37°C y mezcla integrado',
      'Bajo consumo de reactivos y coste operativo moderado': '',
      'Componentes durables, apto para uso clínico/diagnóstico': ' ',
    },
    warranty: '12 meses',
    conectividad: 'Salida serie (RS-232) para conexión a Sistemas LIS, Salida para impresora externa y opción de exportar resultados en formatos ASCII/CSV, Verificar en la unidad los puertos físicos y opciones de comunicación antes de integrar',
    aplicaciones: 'Laboratorios de análisis clínicos, clínicas y consultorios médicos, laboratorios veterinarios. Centros de diagnóstico y control de calidad',
    estadoDelEquipo: 'Equipo en buen estado operativo, verificado y calibrado recientemente. Electrónica y módulos ópticos sin fallas, botones y menús en perfecto funcionamiento. Se entrega con manual y cables.',
    mantenimiento: 'Diario : Debe limpiarse cualquier líquido volcado para evitar la acción corrosiva de cetonas sobre pinturas, perillas, y panel del instrumento.',
    manualPdfUrl: '/espectrofotometro.pdf',
  },
  {
    id: 4,
    name: 'Lector ELISA',
    brand: 'Metrolab 950',
    price: 250000,
    // originalPrice: 3200000,
    image: elisaImg,
    badge: 'used',
    features: ['Capacidad: Tira de 8 o 12 pocillos', 'Capacidad máxima de cada pocillo: 300µL', 'Filtro de 450nm (⚠️ El unico que tiene ese aparato en venta, se puede pedir otro ⚠️)', 'Dimensiones : Alto:  4,5cm, Ancho:  15cm, Profundidad: 18cm','Temperatura de uso : 15-35°C', 'Peso: 0.5Kg'],
    description: 'El lector ELISA Metrolab 950 es un equipo de laboratorio elaborado para realizar una lectura de ensayo colorométrico en tira de 8 pocillos,  fiable para laboratorio clínico y veterinario. Incluye manual y cables.',
    specifications: {
      'Compacta y muy liviano, facilita su colocación en mesada de laboratorio': ' ',
      'Permite el uso hasta 12 pocillos, ahorrando pocillos y reactivos': ' ',
      'Crear fácilmente técnicas adaptado al laboratorio. Muy intuitivo': ' ',
      'Ideal para series pequeñas con lectura de pocillos individuales posible': ' ',
      'Lectura inmediata': '',
      'Se autocalibra': '',
    },
    warranty: '12 meses',
    // conectividad: '',
    aplicaciones: 'Ensayos inmunoenzimáticos, Aplicaciones en investigación, Ideal para laboratorios clínicos, hospitales y centros de salud',
    estadoDelEquipo: 'Equipo en buen estado operativo, verificado y calibrado recientemente. Electrónica y y el filtro de 450nm funcionan bien, botones y menús en perfecto funcionamiento. Se entrega con manual y cables.',
    mantenimiento: 'Limpieza con paño seco (no solventes o agua para limpiar)',
    manualPdfUrl: '/elisa.pdf',
  },
  {
    id: 5,
    name: 'Microcentrífuga para microhematocritos',
    brand: 'Gelec G112',
    price: 1250000,
    image: microCentrifugaImg,
    badge: 'used',
    features: ['Capacidad: 24 tubos', 'Capacidad máxima de cada tubo 1mL', 'Valocidad: 12000rpm (no es variable)', 'Dimensiones: Alto: 21,9cm, Ancho: 22,8cm, Profundidad: 27,5cm', 'Peso: 10Kg', 'Timer: 1-15 minutos máximo de agitacíon', 'Frecuencia: 50Hz', 'Voltaje: 250V','Amperaje: 10A'],
    description: 'La microcentrífuga Gelec G-112 es un equipo de laboratorio diseñado para realizar la centrifugación de muestras de microhematocrito con alta velocidad y en un formato compacto. Fiable para laboratorio clínico y veterinario.',
    specifications: {
      'Alta velocidad:': 'Lo que permite una centrifugación rápida y eficaz',
      'Capacidad': '50 litros',
      'Seguridad integrada': 'Bloqueos ytapa con traba, para proteger al usuario y las muestras',
      'Base antideslizante': 'Asegura estabilidad durante la centrifugación',
    },
    warranty: '12 meses',
    // conectividad: '',
    aplicaciones: '',
    estadoDelEquipo: 'Equipo en buen estado operativo, verificado y calibrado recientemente. La par de carbones estan  nuevos. Se entrega con cables',
    mantenimiento: 'Limpiar regularmente el rotor y la cámara con paño húmedo y desinfectante neutro, Verificar el balance de los tubos antes de cada uso, Evitar el uso de tubos fisurados o con fugas, Revisar periódicamente el estado del cierre de tapa',
    manualPdfUrl: '/micro-centrifuga.pdf',
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