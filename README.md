Catálogo de productos de laboratorio con funciones de filtrado, búsqueda y descarga de la ficha técnica de cada producto.

## Producción: productos compartidos entre navegadores

En local los productos creados en el panel de admin se guardan en `localStorage` (solo ese navegador). Para que en **producción** todos los visitantes vean los mismos productos (creados desde cualquier navegador), hace falta:

1. **Supabase**  
   - Crear un proyecto en [supabase.com](https://supabase.com).  
   - En SQL Editor, ejecutar el script `supabase-products-table.sql` para crear la tabla `products`.

2. **Variables de entorno en Vercel**  
   En el proyecto de Vercel → Settings → Environment Variables, agregar:

   - `SUPABASE_URL` — URL del proyecto (Project Settings → API).  
   - `SUPABASE_SERVICE_ROLE_KEY` — clave “service_role” (Project Settings → API, no la anon).  
   - `ADMIN_PASSWORD` — misma contraseña que usás en el panel de admin (o la que definas con `VITE_ADMIN_PASSWORD` en el build).

3. **Redesplegar**  
   Tras guardar las variables, volver a desplegar. La app intentará cargar productos desde `/api/products`; si responde bien, el catálogo y el admin usan la base de datos y los cambios se ven en todos los navegadores.
