-- Tabla para productos creados/editados desde el panel de admin (compartidos en producción).
-- Ejecutá este script en el SQL Editor de tu proyecto Supabase.

create table if not exists products (
  id int primary key,
  name text not null,
  brand text not null,
  price float not null,
  image text not null default '',
  badge text default ' ',
  features jsonb default '[]',
  description text,
  specifications jsonb default '{}',
  warranty text,
  conectividad text,
  aplicaciones text,
  estado_del_equipo text,
  mantenimiento text,
  manual_pdf_url text,
  hidden boolean default false
);

-- La API en Vercel usa SUPABASE_SERVICE_ROLE_KEY y tiene acceso total a esta tabla.
