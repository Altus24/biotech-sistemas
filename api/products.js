import { createClient } from '@supabase/supabase-js';

const TABLE = 'products';

function getSupabase() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error('SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set');
  return createClient(url, key);
}

function checkAuth(req) {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return false;
  const auth = (req.headers && (req.headers.authorization || req.headers.Authorization)) || '';
  const token = auth.replace(/^Bearer\s+/i, '').trim();
  return token === password;
}

function setCors(res, req) {
  const o = (req && req.headers && (req.headers.origin || req.headers.Origin)) || '*';
  res.setHeader('Access-Control-Allow-Origin', o);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}

export default async function handler(req, res) {
  setCors(res, req);

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  try {
    if (req.method === 'GET') {
      const supabase = getSupabase();
      const { data, error } = await supabase.from(TABLE).select('*').order('id', { ascending: true });
      if (error) throw error;
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(data || []);
      return;
    }

    if (req.method === 'POST') {
      if (!checkAuth(req)) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
      const {
        name,
        brand,
        price,
        image,
        badge,
        features,
        description,
        specifications,
        warranty,
        conectividad,
        aplicaciones,
        estadoDelEquipo,
        mantenimiento,
        manualPdfUrl,
      } = body;

      if (!name || !brand || price == null) {
        res.status(400).json({ error: 'name, brand and price are required' });
        return;
      }

      const supabase = getSupabase();
      const { data: existing } = await supabase.from(TABLE).select('id');
      const maxId = existing?.length ? Math.max(...existing.map((r) => r.id)) : 0;
      const baseMax = 5;
      const nextId = Math.max(maxId + 1, baseMax + 1);

      const row = {
        id: nextId,
        name: String(name),
        brand: String(brand),
        price: Number(price),
        image: image ?? '',
        badge: badge ?? ' ',
        features: Array.isArray(features) ? features : [],
        description: description ?? null,
        specifications:
          specifications && typeof specifications === 'object' && !Array.isArray(specifications)
            ? specifications
            : {},
        warranty: warranty ?? null,
        conectividad: conectividad ?? null,
        aplicaciones: aplicaciones ?? null,
        estado_del_equipo: estadoDelEquipo ?? null,
        mantenimiento: mantenimiento ?? null,
        manual_pdf_url: manualPdfUrl ?? null,
        hidden: false,
      };

      const { data: inserted, error } = await supabase.from(TABLE).insert(row).select().single();
      if (error) throw error;

      const product = mapRowToProduct(inserted);
      res.setHeader('Content-Type', 'application/json');
      res.status(201).json(product);
      return;
    }

    res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || 'Internal server error' });
  }
}

function mapRowToProduct(row) {
  if (!row) return null;
  return {
    id: row.id,
    name: row.name,
    brand: row.brand,
    price: row.price,
    image: row.image ?? '',
    badge: row.badge === ' ' || !row.badge ? undefined : row.badge,
    features: Array.isArray(row.features) ? row.features : [],
    description: row.description ?? undefined,
    specifications:
      row.specifications && typeof row.specifications === 'object' ? row.specifications : undefined,
    warranty: row.warranty ?? undefined,
    conectividad: row.conectividad ?? undefined,
    aplicaciones: row.aplicaciones ?? undefined,
    estadoDelEquipo: row.estado_del_equipo ?? undefined,
    mantenimiento: row.mantenimiento ?? undefined,
    manualPdfUrl: row.manual_pdf_url ?? undefined,
    hidden: row.hidden ?? false,
  };
}
