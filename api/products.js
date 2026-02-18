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

    // PUT /api/products/:id  (actualizar o crear override)
    if (req.method === 'PUT') {
      if (!checkAuth(req)) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }

      const url = req.url || '';
      const match = url.match(/\/api\/products\/(\d+)/);
      const id = match ? parseInt(match[1], 10) : NaN;
      if (!match || Number.isNaN(id)) {
        res.status(400).json({ error: 'Invalid id' });
        return;
      }

      const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
      const row = {
        name: body.name != null ? String(body.name) : undefined,
        brand: body.brand != null ? String(body.brand) : undefined,
        price: body.price != null ? Number(body.price) : undefined,
        image: body.image != null ? String(body.image) : undefined,
        badge: body.badge != null ? (body.badge === ' ' || body.badge === '' ? ' ' : body.badge) : undefined,
        features: body.features != null && Array.isArray(body.features) ? body.features : undefined,
        description: body.description != null ? body.description : undefined,
        specifications:
          body.specifications != null && typeof body.specifications === 'object' && !Array.isArray(body.specifications)
            ? body.specifications
            : undefined,
        warranty: body.warranty != null ? body.warranty : undefined,
        conectividad: body.conectividad != null ? body.conectividad : undefined,
        aplicaciones: body.aplicaciones != null ? body.aplicaciones : undefined,
        estado_del_equipo: body.estadoDelEquipo != null ? body.estadoDelEquipo : undefined,
        mantenimiento: body.mantenimiento != null ? body.mantenimiento : undefined,
        manual_pdf_url: body.manualPdfUrl != null ? body.manualPdfUrl : undefined,
        hidden: body.hidden != null ? !!body.hidden : undefined,
      };
      const clean = Object.fromEntries(Object.entries(row).filter(([, v]) => v !== undefined));

      const supabase = getSupabase();
      const { data: existing } = await supabase.from(TABLE).select('*').eq('id', id).single();
      if (existing) {
        const { data: updated, error } = await supabase
          .from(TABLE)
          .update(clean)
          .eq('id', id)
          .select()
          .single();
        if (error) throw error;
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(mapRowToProduct(updated));
        return;
      }

      const insertRow = {
        id,
        name: clean.name ?? '',
        brand: clean.brand ?? '',
        price: clean.price ?? 0,
        image: clean.image ?? '',
        badge: clean.badge ?? ' ',
        features: clean.features ?? [],
        description: clean.description ?? null,
        specifications: clean.specifications ?? {},
        warranty: clean.warranty ?? null,
        conectividad: clean.conectividad ?? null,
        aplicaciones: clean.aplicaciones ?? null,
        estado_del_equipo: clean.estado_del_equipo ?? null,
        mantenimiento: clean.mantenimiento ?? null,
        manual_pdf_url: clean.manual_pdf_url ?? null,
        hidden: clean.hidden ?? false,
      };
      const { data: inserted, error } = await supabase.from(TABLE).insert(insertRow).select().single();
      if (error) throw error;
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(mapRowToProduct(inserted));
      return;
    }

    // DELETE /api/products/:id
    if (req.method === 'DELETE') {
      if (!checkAuth(req)) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }

      const url = req.url || '';
      const match = url.match(/\/api\/products\/(\d+)/);
      const id = match ? parseInt(match[1], 10) : NaN;
      if (!match || Number.isNaN(id)) {
        res.status(400).json({ error: 'Invalid id' });
        return;
      }

      const supabase = getSupabase();
      const { data: existing } = await supabase.from(TABLE).select('id').eq('id', id).single();
      if (existing) {
        const { error } = await supabase.from(TABLE).delete().eq('id', id);
        if (error) throw error;
        res.status(204).end();
        return;
      }

      const { error } = await supabase.from(TABLE).insert({
        id,
        name: '',
        brand: '',
        price: 0,
        image: '',
        badge: ' ',
        features: [],
        description: null,
        specifications: {},
        warranty: null,
        conectividad: null,
        aplicaciones: null,
        estado_del_equipo: null,
        mantenimiento: null,
        manual_pdf_url: null,
        hidden: true,
      });
      if (error) throw error;
      res.status(204).end();
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
