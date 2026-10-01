import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="glass rounded-[2rem] px-12 py-14 text-center">
        <h1 className="mb-4 text-7xl font-semibold tracking-tighter text-gradient">404</h1>
        <p className="mb-8 text-xl text-muted-foreground">Oops! Página não encontrada</p>
        <Button asChild className="bg-gradient-primary text-white hover:opacity-90">
          <Link to="/">Voltar ao início</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
