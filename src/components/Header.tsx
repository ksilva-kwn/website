import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Cloud } from "lucide-react"; // Importe o ícone de nuvem
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "Início", href: "/" },
    { name: "Contato", href: "/contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 w-full z-50 glass border-b border-white/10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo - Alterado aqui */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="p-2 bg-gradient-primary rounded-lg group-hover:animate-glow transition-all">
              <Cloud className="w-6 h-6 text-white" /> {/* O ícone agora é uma nuvem */}
            </div>
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Kawan Silva
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`relative px-4 py-2 rounded-lg transition-all duration-300 ${
                  isActive(item.href)
                    ? "text-primary bg-primary/10"
                    : "text-foreground/80 hover:text-primary hover:bg-primary/5"
                }`}
              >
                {item.name}
                {isActive(item.href) && (
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-primary rounded-full" />
                )}
              </Link>
            ))}
            <a href="/CV-Kawan_Silva-EN.pdf" download="CV-Kawan_Silva-EN.pdf">
              <Button 
                variant="outline" 
                size="sm"
                className="border-primary/20 hover:border-primary/50 hover:bg-primary/10 transition-all"
              >
                Baixar CV
              </Button>
            </a>
          </nav>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-white/10 animate-fade-in-up">
            <div className="flex flex-col space-y-2 pt-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-4 py-3 rounded-lg transition-all ${
                    isActive(item.href)
                      ? "text-primary bg-primary/10"
                      : "text-foreground/80 hover:text-primary hover:bg-primary/5"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <a href="/CV-Kawan_Silva-EN.pdf" download="CV-Kawan_Silva-EN.pdf"
                onClick={() => setIsMenuOpen(false)}
                className="mx-4 mt-2"
              >
                <Button 
                  variant="outline" 
                  size="sm"
                  className="w-full border-primary/20 hover:border-primary/50"
                >
                  Baixar CV
                </Button>
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;