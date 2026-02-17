import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FlaskConical, Microscope, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <>
      <Navbar />
      <main className="min-h-[60vh] flex items-center justify-center bg-muted/40 pt-24">
        <section className="container mx-auto px-4 py-16">
          <div className="mx-auto max-w-2xl rounded-3xl bg-background shadow-xl border border-border/60 p-8 md:p-10 text-center">
            <div className="inline-flex items-center justify-center rounded-full bg-primary/10 text-primary mb-6 p-3">
              <FlaskConical className="w-7 h-7" />
            </div>
            <p className="text-sm font-medium uppercase tracking-[0.25em] text-muted-foreground mb-3">
              Error 404
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
Oops!             </h1>
            <p className="text-muted-foreground mb-6 md:mb-8 text-sm md:text-base">
              La página que estás buscando no existe, fue movida o está fuera de
              servicio. Volvé al catálogo para seguir explorando nuestro
              equipamiento de laboratorio.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link to="/">
                  <Home className="w-4 h-4 mr-2" />
                  Volver al inicio
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="w-full sm:w-auto"
              >
                <Link to="/#catalogo">
                  <Microscope className="w-4 h-4 mr-2" />
                  Ver catálogo de equipos
                </Link>
              </Button>
            </div>

            <p className="mt-6 text-xs md:text-sm text-muted-foreground/80">
              Ruta solicitada:{" "}
              <span className="font-mono text-foreground/90">
                {location.pathname}
              </span>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default NotFound;
