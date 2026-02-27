import { useEffect, useState, FormEvent, ChangeEvent } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Pencil, Trash2 } from 'lucide-react';
import {
  createProduct,
  updateProduct,
  deleteProduct,
  createProductApi,
  updateProductApi,
  deleteProductApi,
  type Product,
} from '@/lib/productStore';
import { useProducts } from '@/contexts/ProductsContext';

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'biotech-admin';

type ProductForm = Omit<
  Product,
  'id' | 'features' | 'specifications' | 'price' | 'warranty'
> & {
  price: string;
  warranty: string; // solo el número de meses
};

type SpecField = {
  id: string;
  label: string;
  value: string;
};

type FeatureField = {
  id: string;
  value: string;
};

export default function Admin() {
  const { toast } = useToast();
  const { products, refetch, useApi } = useProducts();
  const [isAuthed, setIsAuthed] = useState(false);
  const [password, setPassword] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [featureFields, setFeatureFields] = useState<FeatureField[]>([{
    id: crypto.randomUUID(),
    value: '',
  }]);
  const [specFields, setSpecFields] = useState<SpecField[]>([{
    id: crypto.randomUUID(),
    label: '',
    value: '',
  }]);
  const [errors, setErrors] = useState<{
    name?: string;
    brand?: string;
    price?: string;
    image?: string;
    features?: string;
  }>({});

  const [form, setForm] = useState<ProductForm>({
    name: '',
    brand: '',
    price: '',
    image: '',
    badge: 'used',
    description: '',
    warranty: '',
    conectividad: '',
    aplicaciones: '',
    estadoDelEquipo: '',
    mantenimiento: '',
    manualPdfUrl: '',
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const token = window.localStorage.getItem('biotech-admin-authed');
    if (token === 'true') setIsAuthed(true);
  }, []);

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthed(true);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('biotech-admin-authed', 'true');
      }
      refetch();
    } else {
      alert('Contraseña incorrecta');
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setForm({
      name: '',
      brand: '',
      price: '',
      badge: 'used',
      image: '',
      description: '',
      warranty: '',
      conectividad: '',
      aplicaciones: '',
      estadoDelEquipo: '',
      mantenimiento: '',
      manualPdfUrl: '',
    });
    setFeatureFields([{
      id: crypto.randomUUID(),
      value: '',
    }]);
    setSpecFields([{
      id: crypto.randomUUID(),
      label: '',
      value: '',
    }]);
  };

  const handleSubmitProduct = async (e: FormEvent) => {
    e.preventDefault();

    // Procesar características (una por campo)
    const features = featureFields
      .map((field) => field.value.trim())
      .filter(Boolean);

    const newErrors: {
      name?: string;
      brand?: string;
      price?: string;
      image?: string;
      features?: string;
    } = {};
    if (!form.name.trim()) {
      newErrors.name = 'Este campo es obligatorio';
    }
    if (!form.brand.trim()) {
      newErrors.brand = 'Este campo es obligatorio';
    }
    if (!form.price.trim()) {
      newErrors.price = 'Este campo es obligatorio';
    }
    if (!form.image) {
      newErrors.image = 'Este campo es obligatorio';
    }
    if (features.length === 0) {
      newErrors.features = 'Agrega al menos una característica';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast({
        title: 'Faltan campos obligatorios',
        description: 'Revisá los campos marcados en rojo antes de guardar.',
        variant: 'destructive',
      });
      return;
    }

    setErrors({});

    const specifications: Record<string, string> = {};
    for (const spec of specFields) {
      const key = spec.label.trim();
      const value = spec.value.trim();
      // Solo la etiqueta es obligatoria; el valor puede quedar vacío
      if (!key) continue;
      specifications[key] = value;
    }

    const baseProduct: Omit<Product, 'id'> = {
      ...form,
      image: form.image.trim(),
      price: Number(form.price || 0),
      warranty: form.warranty
        ? `${form.warranty.trim()} meses`
        : undefined,
      features,
      specifications: Object.keys(specifications).length
        ? specifications
        : undefined,
    };

    const pwd = ADMIN_PASSWORD;
    if (editingId !== null) {
      if (useApi) {
        const updated = await updateProductApi(editingId, baseProduct, pwd);
        if (updated) {
          await refetch();
        } else {
          toast({ title: 'Error', description: 'No se pudo actualizar el producto.', variant: 'destructive' });
          return;
        }
      } else {
        updateProduct(editingId, baseProduct);
        await refetch();
      }
    } else {
      if (useApi) {
        const created = await createProductApi(baseProduct, pwd);
        if (created) {
          await refetch();
          toast({
            title: 'Producto creado',
            description: `Se creó "${created.name}" correctamente.`,
          });
        } else {
          toast({ title: 'Error', description: 'No se pudo crear el producto.', variant: 'destructive' });
          return;
        }
      } else {
        const created = createProduct(baseProduct);
        await refetch();
        toast({
          title: 'Producto creado',
          description: `Se creó "${created.name}" correctamente.`,
        });
      }
    }

    resetForm();
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (errors.image) {
      setErrors((prev) => ({ ...prev, image: undefined }));
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((f) => ({ ...f, image: (reader.result as string) || '' }));
    };
    reader.readAsDataURL(file);
  };

  const handleManualChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((f) => ({
        ...f,
        manualPdfUrl: (reader.result as string) || '',
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleEdit = (product: Product) => {
    setEditingId(product.id);
    setForm({
      name: product.name,
      brand: product.brand,
      price: String(product.price),
      badge: product.badge ?? 'used',
      image: product.image ?? '',
      description: product.description ?? '',
      warranty: (() => {
        if (!product.warranty) return '';
        const match = product.warranty.match(/\d+/);
        return match ? match[0] : '';
      })(),
      conectividad: product.conectividad ?? '',
      aplicaciones: product.aplicaciones ?? '',
      estadoDelEquipo: product.estadoDelEquipo ?? '',
      mantenimiento: product.mantenimiento ?? '',
      manualPdfUrl: product.manualPdfUrl ?? '',
    });
    if (product.features && product.features.length) {
      setFeatureFields(
        product.features.map((value) => ({
          id: crypto.randomUUID(),
          value,
        })),
      );
    } else {
      setFeatureFields([{
        id: crypto.randomUUID(),
        value: '',
      }]);
    }
    if (product.specifications) {
      const entries = Object.entries(product.specifications);
      setSpecFields(
        entries.map(([label, value]) => ({
          id: crypto.randomUUID(),
          label,
          value,
        })),
      );
    } else {
      setSpecFields([{
        id: crypto.randomUUID(),
        label: '',
        value: '',
      }]);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: number) => {
    if (!confirm('¿Eliminar este producto?')) return;
    if (useApi) {
      const ok = await deleteProductApi(id, ADMIN_PASSWORD);
      if (ok) await refetch();
      else toast({ title: 'Error', description: 'No se pudo eliminar.', variant: 'destructive' });
    } else {
      deleteProduct(id);
      await refetch();
    }
    if (editingId === id) resetForm();
  };

  const addSpecField = () => {
    setSpecFields((fields) => [
      ...fields,
      { id: crypto.randomUUID(), label: '', value: '' },
    ]);
  };

  const updateSpecField = (
    id: string,
    key: 'label' | 'value',
    newValue: string,
  ) => {
    setSpecFields((fields) =>
      fields.map((field) =>
        field.id === id ? { ...field, [key]: newValue } : field,
      ),
    );
  };

  const removeSpecField = (id: string) => {
    setSpecFields((fields) => {
      const next = fields.filter((f) => f.id !== id);
      return next.length > 0 ? next : [{ id: crypto.randomUUID(), label: '', value: '' }];
    });
  };

  const addFeatureField = () => {
    setFeatureFields((fields) => [
      ...fields,
      { id: crypto.randomUUID(), value: '' },
    ]);
  };

  const updateFeatureField = (id: string, newValue: string) => {
    setFeatureFields((fields) =>
      fields.map((field) =>
        field.id === id ? { ...field, value: newValue } : field,
      ),
    );
    if (errors.features) {
      setErrors((prev) => ({ ...prev, features: undefined }));
    }
  };

  const removeFeatureField = (id: string) => {
    setFeatureFields((fields) => {
      const next = fields.filter((f) => f.id !== id);
      return next.length > 0 ? next : [{ id: crypto.randomUUID(), value: '' }];
    });
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-muted/30 pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-3xl font-bold mb-6 text-foreground">
            Panel de Administración
          </h1>

          {!isAuthed ? (
            <section className="max-w-md mx-auto bg-background border border-border rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">
                Iniciar sesión como administrador
              </h2>
              <form className="space-y-4" onSubmit={handleLogin}>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Contraseña
                  </label>
                  <input
                    type="password"
                    className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <Button type="submit" className="w-full">
                  Entrar
                </Button>
              </form>
            </section>
          ) : (
            <>
              <section className="bg-background border border-border rounded-xl p-6 shadow-sm mb-8">
                <h2 className="text-xl font-semibold mb-4">
                  {editingId ? 'Editar producto' : 'Nuevo producto'}
                </h2>
                <form className="grid gap-4 md:grid-cols-2" onSubmit={handleSubmitProduct}>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-1">
                      Nombre
                    </label>
                    <input
                      type="text"
                      className={`w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 ${
                        errors.name
                          ? 'border-destructive focus:ring-destructive'
                          : 'border-border focus:ring-primary'
                      }`}
                      value={form.name}
                      onChange={(e) =>
                        setForm((f) => {
                          if (errors.name) {
                            setErrors((prev) => ({ ...prev, name: undefined }));
                          }
                          return { ...f, name: e.target.value };
                        })
                      }
                    />
                    {errors.name && (
                      <p className="mt-1 text-xs text-destructive">
                        {errors.name}
                      </p>
                    )}
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-1">
                      Marca / modelo
                    </label>
                    <input
                      type="text"
                      className={`w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 ${
                        errors.brand
                          ? 'border-destructive focus:ring-destructive'
                          : 'border-border focus:ring-primary'
                      }`}
                      value={form.brand}
                      onChange={(e) =>
                        setForm((f) => {
                          if (errors.brand) {
                            setErrors((prev) => ({ ...prev, brand: undefined }));
                          }
                          return { ...f, brand: e.target.value };
                        })
                      }
                    />
                    {errors.brand && (
                      <p className="mt-1 text-xs text-destructive">
                        {errors.brand}
                      </p>
                    )}
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-1">
                      Imagen del producto
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      className={`w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 ${
                        errors.image
                          ? 'border-destructive focus:ring-destructive'
                          : 'border-border focus:ring-primary'
                      }`}
                      onChange={handleImageChange}
                    />
                    {form.image && (
                      <p className="mt-1 text-xs text-muted-foreground">
                        Ya hay una imagen guardada para este producto. Si
                        subís otra, la reemplazará.
                      </p>
                    )}
                    {errors.image && (
                      <p className="mt-1 text-xs text-destructive">
                        {errors.image}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Precio (ARS)
                    </label>
                    <input
                      type="number"
                      min={0}
                      className={`w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 ${
                        errors.price
                          ? 'border-destructive focus:ring-destructive'
                          : 'border-border focus:ring-primary'
                      }`}
                      value={form.price}
                      onChange={(e) =>
                        setForm((f) => {
                          if (errors.price) {
                            setErrors((prev) => ({ ...prev, price: undefined }));
                          }
                          return {
                            ...f,
                            price: e.target.value,
                          };
                        })
                      }
                    />
                    {errors.price && (
                      <p className="mt-1 text-xs text-destructive">
                        {errors.price}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Etiqueta
                    </label>
                    <select
                      className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
                      value={form.badge}
                      onChange={(e) =>
                        setForm((f) => ({
                          ...f,
                          badge: e.target.value as Product['badge'],
                        }))
                      }
                    >
                      <option value="used">Usado seleccionado</option>
                      <option value="new">Nuevo</option>
                      <option value="offer">Oferta</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">
                      Características principales
                    </label>
                    <div className="space-y-2">
                      {featureFields.map((field) => (
                        <div
                          key={field.id}
                          className="grid grid-cols-[1fr,auto] gap-2 items-center"
                        >
                          <input
                            type="text"
                            placeholder="Ej: Dimensiones: 27cm x 16cm x 21cm"
                            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
                            value={field.value}
                            onChange={(e) =>
                              updateFeatureField(field.id, e.target.value)
                            }
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="px-3"
                            onClick={() => removeFeatureField(field.id)}
                          >
                            <span className="text-xs">Quitar</span>
                          </Button>
                        </div>
                      ))}
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="mt-2"
                      onClick={addFeatureField}
                    >
                      Agregar característica
                    </Button>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Cada línea se mostrará como un ítem en la lista de características del producto.
                    </p>
                    {errors.features && (
                      <p className="mt-1 text-xs text-destructive">
                        {errors.features}
                      </p>
                    )}
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-1">
                      Descripción
                    </label>
                    <textarea
                      className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary min-h-[80px]"
                      value={form.description}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, description: e.target.value }))
                      }
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">
                      Especificaciones técnicas
                    </label>
                    <div className="space-y-2">
                      {specFields.map((spec) => (
                        <div
                          key={spec.id}
                          className="grid grid-cols-1 md:grid-cols-[1fr,1.5fr,auto] gap-2 items-center"
                        >
                          <input
                            type="text"
                            placeholder="Etiqueta (ej: Voltaje)"
                            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
                            value={spec.label}
                            onChange={(e) =>
                              updateSpecField(spec.id, 'label', e.target.value)
                            }
                          />
                          <input
                            type="text"
                            placeholder="Valor (ej: 220V)"
                            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
                            value={spec.value}
                            onChange={(e) =>
                              updateSpecField(spec.id, 'value', e.target.value)
                            }
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="px-3"
                            onClick={() => removeSpecField(spec.id)}
                          >
                            <span className="text-xs">Quitar</span>
                          </Button>
                        </div>
                      ))}
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="mt-2"
                      onClick={addSpecField}
                    >
                      Agregar especificación
                    </Button>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-1">
                      Garantía (opcional)
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min={0}
                        className="w-32 rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
                        placeholder="12"
                        value={form.warranty}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, warranty: e.target.value }))
                        }
                      />
                      <span className="text-sm text-muted-foreground">
                        meses
                      </span>
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-1">
                      Conectividad (opcional)
                    </label>
                    <textarea
                      className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary min-h-[64px]"
                      value={form.conectividad}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, conectividad: e.target.value }))
                      }
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-1">
                      Aplicaciones (opcional)
                    </label>
                    <textarea
                      className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary min-h-[64px]"
                      value={form.aplicaciones}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, aplicaciones: e.target.value }))
                      }
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-1">
                      Estado del equipo (opcional)
                    </label>
                    <textarea
                      className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary min-h-[64px]"
                      value={form.estadoDelEquipo}
                      onChange={(e) =>
                        setForm((f) => ({
                          ...f,
                          estadoDelEquipo: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-1">
                      Mantenimiento (opcional)
                    </label>
                    <textarea
                      className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary min-h-[64px]"
                      value={form.mantenimiento}
                      onChange={(e) =>
                        setForm((f) => ({
                          ...f,
                          mantenimiento: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-1">
                      Manual en PDF (opcional)
                    </label>
                    <input
                      type="file"
                      accept="application/pdf"
                      className="w-full text-sm"
                      onChange={handleManualChange}
                    />
                    {form.manualPdfUrl && (
                      <p className="mt-1 text-xs text-muted-foreground">
                        Ya hay un PDF guardado para este producto. Si subís
                        otro archivo, lo reemplazará.
                      </p>
                    )}
                  </div>
                  <div className="md:col-span-2 flex gap-2 justify-end">
                    {editingId && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={resetForm}
                      >
                        Cancelar edición
                      </Button>
                    )}
                    <Button type="submit">
                      {editingId ? 'Guardar cambios' : 'Crear producto'}
                    </Button>
                  </div>
                </form>
              </section>

              <section className="bg-background border border-border rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-semibold mb-4">
                  Productos creados en el panel
                </h2>
                {products.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    Aún no hay productos creados desde el panel de admin.
                  </p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border text-left">
                          <th className="py-2 pr-4">ID</th>
                          <th className="py-2 pr-4">Nombre</th>
                          <th className="py-2 pr-4">Marca</th>
                          <th className="py-2 pr-4">Precio</th>
                          <th className="py-2 pr-4">Etiqueta</th>
                          <th className="py-2 pr-4 text-right">Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.map((product) => (
                          <tr
                            key={product.id}
                            className="border-b border-border/60 last:border-0"
                          >
                            <td className="py-2 pr-4">{product.id}</td>
                            <td className="py-2 pr-4">{product.name}</td>
                            <td className="py-2 pr-4">{product.brand}</td>
                            <td className="py-2 pr-4">
                              {new Intl.NumberFormat('es-AR', {
                                style: 'currency',
                                currency: 'ARS',
                                maximumFractionDigits: 0,
                              }).format(product.price)}
                            </td>
                            <td className="py-2 pr-4">
                              {product.badge === 'offer'
                                ? 'Oferta'
                                : product.badge === 'new'
                                ? 'Nuevo'
                                : 'Usado'}
                            </td>
                            <td className="py-2 pr-0 text-right space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                aria-label="Editar producto"
                                onClick={() => handleEdit(product)}
                              >
                                <Pencil className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="destructive"
                                size="sm"
                                aria-label="Eliminar producto"
                                onClick={() => handleDelete(product.id)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </section>

            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

