import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import {
  baseProducts,
  fetchStoredFromApi,
  mergeStoredWithBase,
  getAllProducts,
  type Product,
} from '@/lib/productStore';

type ProductsContextValue = {
  products: Product[];
  isLoading: boolean;
  /** true cuando los datos vienen del API (producción); false cuando solo localStorage */
  useApi: boolean;
  refetch: () => Promise<void>;
};

const ProductsContext = createContext<ProductsContextValue | null>(null);

export function ProductsProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(() => getAllProducts());
  const [isLoading, setIsLoading] = useState(true);
  const [useApi, setUseApi] = useState(false);

  const refetch = useCallback(async () => {
    if (useApi) {
      const stored = await fetchStoredFromApi();
      if (stored !== null) setProducts(mergeStoredWithBase(stored));
    } else {
      setProducts(getAllProducts());
    }
  }, [useApi]);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const stored = await fetchStoredFromApi();
      if (cancelled) return;
      if (stored !== null) {
        setUseApi(true);
        setProducts(mergeStoredWithBase(stored));
      } else {
        setUseApi(false);
        setProducts(getAllProducts());
      }
      setIsLoading(false);
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const value: ProductsContextValue = {
    products,
    isLoading,
    useApi,
    refetch,
  };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts(): ProductsContextValue {
  const ctx = useContext(ProductsContext);
  if (!ctx) {
    return {
      products: getAllProducts(),
      isLoading: false,
      useApi: false,
      refetch: async () => {},
    };
  }
  return ctx;
}
