export function SkipLinks() {
  return (
    <div className="sr-only focus-within:not-sr-only focus-within:absolute focus-within:top-0 focus-within:left-0 focus-within:z-50 focus-within:bg-primary focus-within:text-primary-foreground focus-within:px-4 focus-within:py-2">
      <a
        href="#main-content"
        className="focus:outline-none focus:ring-2 focus:ring-primary-foreground focus:ring-offset-2 mr-4"
      >
        Saltar al contenido principal
      </a>
      <a
        href="#navigation"
        className="focus:outline-none focus:ring-2 focus:ring-primary-foreground focus:ring-offset-2"
      >
        Saltar a la navegación
      </a>
    </div>
  );
}