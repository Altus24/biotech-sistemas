import analizadorImg from '@/assets/products/analisador-de-electrolitos.webp';
import banoMariaImg from '@/assets/products/bano-maria.webp';
import espectrofotometroImg from '@/assets/products/espectrofotometro-1600DR.webp';
import elisaImg from '@/assets/products/lector-elisa-950.webp';
import microCentrifugaImg from '@/assets/products/micro-centrifuga.webp';

// Modelo único de producto usado en catálogo, detalle y admin
export interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
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
  manualPdfUrl?: string;
  // Campo interno para "eliminar" productos base mediante overrides
  hidden?: boolean;
}

// Productos base definidos en el código (semilla del catálogo)
export const baseProducts: Product[] = [
  {
    id: 1,
    name: 'Analizador de electrolitos',
    brand: 'Diestro - modelo 103AP V4',
    price: 2800000,
    image: analizadorImg,
    badge: 'used',
    features: [
      'Dimensiones : Alto: 27cm, Ancho: 16cm, Profundidad: 21cm',
      'Temperatura y humedad de uso : Entre 15º - 30º C, Menos de 80% de humedad',
      'Peso : 3,2Kg',
      'Voltaje de entrada : 100 - 240 V',
      ' Frecuencia : 50 / 60 Hz',
      'Amperaje 0.8A',
    ],
    description:
      'Analizador de electrolitos de alta precisión ideal para laboratorios clínicos. Ofrece resultados rápidos y confiables para análisis de rutina. Listo para uso, incluye manual y cables.',
    specifications: {
      'Parametros medidos:':
        'Sodio, potasio y cloro (se puede comprar calcio y litio pero usan otro reactivos)',
      'Tiempo de medición rápido:': 'Normalmente < 1 minuto',
      'Calibraciones automáticas:':
        '(Auto-Cal) y modo QC (control de calidad integrado)',
      'Acepta como muestras:':
        ' Sangre completa, Suero, Plasma',
      'Mantenimiento reducido:':
        'Los electrodos no requieren mantenimiento, lo que reduce los costos y el esfuerzo de mantenimiento',
      'Automatización parcial:':
        'Menos manipulación manual que los modelos antiguos, lo que supone un ahorro de tiempo',
      'Multielectrolitos simultáneos:':
        'Medición de varios iones en una sola toma, ideal para ionogramas completos',
    },
    warranty: '12 meses',
    conectividad:
      'Puerto USB para transferencia de datos y conexión a impresoras. Compatible con sistemas LIS (Laboratory Information System).',
    aplicaciones:
      'Ideal para laboratorios clínicos, hospitales y centros de diagnóstico. Análisis de electrolitos en muestras de sangre, suero y plasma. Útil para chequeos de rutina, emergencias y seguimiento de pacientes.',
    estadoDelEquipo:
      'Equipo en excelente estado, funcionando correctamente. Incluye todos los accesorios originales, manual de usuario y cables de conexión.',
    mantenimiento:
      'Los electrodos no requieren mantenimiento especial. Limpieza periódica recomendada según protocolo del fabricante. Calibración automática integrada reduce la necesidad de mantenimiento manual.',
    manualPdfUrl: '/analizador-electrolitos.pdf',
  },
  {
    id: 2,
    name: 'Baño Maria',
    brand: 'Diestro -modelo 103AP V4',
    price: 390000,
    image: banoMariaImg,
    badge: 'used',
    features: [
      'Capacidad: 32 tubos de ensayo (10mL) y 40 tubos de Khan (6mL)',
      'Temperatura maxima: 70°C',
      'Capacidad: 4L',
      'Dimensiones: Alto:22,6cm, Ancho: 21,6cm, Profundidad:  35,2cm',
      'Peso: 2,7Kg',
    ],
    description:
      'El baño maria es un equipo de laboratorio elaborado para calentar, mantener o incubar muestras a una temperatura precisa y estable, sin contacto directo con la fuente de calor. Baño maria en buen estado.',
    specifications: {
      'Calentamiento uniforme:':
        'Se distribuye de manera homogenea (ideal para muestras sensibles a la temperatura)',
      'Compacto y liviano':
        'Facilita su colocación en mesada de laboratorio',
      'Temperatura':
        'Estable y precisa durante largos períodos (Esencial para incubaciones y reacciones enzimáticas)',
      'Adecuado para':
        'Reactivos y tampones - Sueros y muestras biológicas - Tubos, frascos y vasos - Medios de cultivos y agar - Reacciones bioquímicas sensible',
    },
    warranty: '12 meses',
    aplicaciones:
      'Ideal para incubación controlada de muestras, Calentamiento, disolución y descongelación suave, Aplicaciones químicas (control térmico de reacciones químicas, y calentamiento uniforme, para extracciones, titulaciones y pruebas de estabilidad)',
    estadoDelEquipo:
      'Equipo en buen estado operativo, verificado y calibrado recientemente. Máquina muy simple que permite su reparación rapidamente. Menús en perfecto funcionamiento y fácil a usar.',
    mantenimiento:
      'Limpieza con agua y jabón, después enjuagar (aclarar) bien con agua( ⚠️ No dejar ningún jabón ',
    manualPdfUrl: '/bano-maria.pdf',
  },
  {
    id: 3,
    name: 'Espectrofotómetro',
    brand: 'Metrolab 1600 DR',
    price: 2400000,
    image: espectrofotometroImg,
    badge: 'used',
    features: [
      'Dimensiones: Alto: 17cm, Ancho, 32cm, Profundidad 38cm',
      'Peso: 6Kg',
      'Voltaje: 150V',
      'Amperaje: 10A',
    ],
    description:
      'El Metrolab 1600 DR es un analizador colorimétrico/automatizado de propósito clínico, diseñado para efectuar  eterminaciones bioquímicas confiables y repetibles. Equipo robusto, de fácil operación y mantenimiento,  recuentemente usado en laboratorios clínicos, centros veterinarios y unidades de diagnóstico que realizan ensayos de rutina.Incluye manual y cables.',
    specifications: {
      'Lectura:':
        'Fotométrica/colorimétrica de alta estabilidad',
      'Interfaz de usuario: ':
        'Simple y menús intuitivos',
      'Diseño: ':
        'Compacto y fácil acceso para mantenimiento',
      'Sistema de incubación: ':
        '37°C y mezcla integrado',
      'Bajo consumo de reactivos y coste operativo moderado': '',
      'Componentes durables, apto para uso clínico/diagnóstico': ' ',
    },
    warranty: '12 meses',
    conectividad:
      'Salida serie (RS-232) para conexión a Sistemas LIS, Salida para impresora externa y opción de exportar resultados en formatos ASCII/CSV, Verificar en la unidad los puertos físicos y opciones de comunicación antes de integrar',
    aplicaciones:
      'Laboratorios de análisis clínicos, clínicas y consultorios médicos, laboratorios veterinarios. Centros de diagnóstico y control de calidad',
    estadoDelEquipo:
      'Equipo en buen estado operativo, verificado y calibrado recientemente. Electrónica y módulos ópticos sin fallas, botones y menús en perfecto funcionamiento. Se entrega con manual y cables.',
    mantenimiento:
      'Diario : Debe limpiarse cualquier líquido volcado para evitar la acción corrosiva de cetonas sobre pinturas, perillas, y panel del instrumento.',
    manualPdfUrl: '/espectrofotometro.pdf',
  },
  {
    id: 4,
    name: 'Lector ELISA',
    brand: 'Metrolab 950',
    price: 250000,
    image: elisaImg,
    badge: 'used',
    features: [
      'Capacidad: Tira de 8 o 12 pocillos',
      'Capacidad máxima de cada pocillo: 300µL',
      'Filtro de 450nm (⚠️ El unico que tiene ese aparato en venta, se puede pedir otro ⚠️)',
      'Dimensiones : Alto:  4,5cm, Ancho:  15cm, Profundidad: 18cm',
      'Temperatura de uso : 15-35°C',
      'Peso: 0.5Kg',
    ],
    description:
      'El lector ELISA Metrolab 950 es un equipo de laboratorio elaborado para realizar una lectura de ensayo colorométrico en tira de 8 pocillos,  fiable para laboratorio clínico y veterinario. Incluye manual y cables.',
    specifications: {
      'Compacta y muy liviano, facilita su colocación en mesada de laboratorio': ' ',
      'Permite el uso hasta 12 pocillos, ahorrando pocillos y reactivos': ' ',
      'Crear fácilmente técnicas adaptado al laboratorio. Muy intuitivo': ' ',
      'Ideal para series pequeñas con lectura de pocillos individuales posible': ' ',
      'Lectura inmediata': '',
      'Se autocalibra': '',
    },
    warranty: '12 meses',
    aplicaciones:
      'Ensayos inmunoenzimáticos, Aplicaciones en investigación, Ideal para laboratorios clínicos, hospitales y centros de salud',
    estadoDelEquipo:
      'Equipo en buen estado operativo, verificado y calibrado recientemente. Electrónica y y el filtro de 450nm funcionan bien, botones y menús en perfecto funcionamiento. Se entrega con manual y cables.',
    mantenimiento:
      'Limpieza con paño seco (no solventes o agua para limpiar)',
    manualPdfUrl: '/elisa.pdf',
  },
  {
    id: 5,
    name: 'Microcentrífuga para microhematocritos',
    brand: 'Gelec G112',
    price: 1250000,
    image: microCentrifugaImg,
    badge: 'used',
    features: [
      'Capacidad: 24 tubos',
      'Capacidad máxima de cada tubo 1mL',
      'Valocidad: 12000rpm (no es variable)',
      'Dimensiones: Alto: 21,9cm, Ancho: 22,8cm, Profundidad: 27,5cm',
      'Peso: 10Kg',
      'Timer: 1-15 minutos máximo de agitacíon',
      'Frecuencia: 50Hz',
      'Voltaje: 250V',
      'Amperaje: 10A',
    ],
    description:
      'La microcentrífuga Gelec G-112 es un equipo de laboratorio diseñado para realizar la centrifugación de muestras de microhematocrito con alta velocidad y en un formato compacto. Fiable para laboratorio clínico y veterinario.',
    specifications: {
      'Alta velocidad:':
        'Lo que permite una centrifugación rápida y eficaz',
      Capacidad: '50 litros',
      'Seguridad integrada':
        'Bloqueos ytapa con traba, para proteger al usuario y las muestras',
      'Base antideslizante':
        'Asegura estabilidad durante la centrifugación',
    },
    warranty: '12 meses',
    aplicaciones: '',
    estadoDelEquipo:
      'Equipo en buen estado operativo, verificado y calibrado recientemente. La par de carbones estan  nuevos. Se entrega con cables',
    mantenimiento:
      'Limpiar regularmente el rotor y la cámara con paño húmedo y desinfectante neutro, Verificar el balance de los tubos antes de cada uso, Evitar el uso de tubos fisurados o con fugas, Revisar periódicamente el estado del cierre de tapa',
    manualPdfUrl: '/micro-centrifuga.pdf',
  },
];

const STORAGE_KEY = 'biotech-admin-products';

function readStored(): Product[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed as Product[];
    }
    return [];
  } catch {
    return [];
  }
}

function writeStored(products: Product[]) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}

export function getStoredProducts(): Product[] {
  return readStored();
}

export function getAllProducts(): Product[] {
  if (typeof window === 'undefined') {
    return baseProducts.filter((p) => !p.hidden);
  }

  const stored = readStored();
  const map = new Map<number, Product>();

  for (const p of baseProducts) {
    map.set(p.id, p);
  }

  for (const p of stored) {
    map.set(p.id, p);
  }

  return Array.from(map.values())
    .filter((p) => !p.hidden)
    .sort((a, b) => a.id - b.id);
}

export function createProduct(data: Omit<Product, 'id'>): Product {
  const stored = readStored();
  const all = [...baseProducts, ...stored];
  const nextId = all.length > 0 ? Math.max(...all.map((p) => p.id)) + 1 : 1;

  const created: Product = { id: nextId, ...data, hidden: false };
  const updatedStored = [...stored, created];
  writeStored(updatedStored);
  return created;
}

export function updateProduct(
  id: number,
  data: Partial<Omit<Product, 'id'>>,
): Product | null {
  const stored = readStored();
  const index = stored.findIndex((p) => p.id === id);

  let updatedStored: Product[];
  let updatedProduct: Product;

  if (index !== -1) {
    updatedProduct = { ...stored[index], ...data, id };
    updatedStored = [...stored];
    updatedStored[index] = updatedProduct;
  } else {
    const base = baseProducts.find((p) => p.id === id);
    if (!base) return null;
    updatedProduct = { ...base, ...data, id };
    updatedStored = [...stored, updatedProduct];
  }

  writeStored(updatedStored);
  return updatedProduct;
}

export function deleteProduct(id: number): void {
  const stored = readStored();
  const existsStored = stored.some((p) => p.id === id);

  if (existsStored) {
    const updatedStored = stored.filter((p) => p.id !== id);
    writeStored(updatedStored);
    return;
  }

  const base = baseProducts.find((p) => p.id === id);
  if (!base) return;

  const hiddenOverride: Product = { ...base, hidden: true };
  const updatedStored = [...stored, hiddenOverride];
  writeStored(updatedStored);
}


