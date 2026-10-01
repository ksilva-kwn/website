import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import GlassIcon from "@/components/GlassIcon";
import { useState } from "react";
import { useTheme } from "next-themes";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { theme, setTheme } = useTheme();

  const navigation = [
    { name: "Início", href: "/" },
    { name: "Contato", href: "/contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-4 inset-x-0 z-50 px-4">
      <div
        className={`glass mx-auto max-w-5xl px-3 py-2 transition-all duration-300 ${
          isMenuOpen ? "rounded-3xl" : "rounded-full"
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 pl-1 group">
            <div className="p-1.5 bg-gradient-primary rounded-full shadow-md group-hover:animate-glow transition-all">
              <GlassIcon name="cloud" onColor />
            </div>
            <span className="text-base font-semibold tracking-tight text-foreground">
              Kawan <span className="font-light italic">Silva</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                  isActive(item.href)
                    ? "glass-control text-foreground font-medium"
                    : "text-foreground/70 hover:text-foreground hover:bg-foreground/5"
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="ml-1 h-9 w-9 text-foreground/80"
              aria-label="Toggle theme"
            >
              <GlassIcon name={theme === "dark" ? "sun" : "moon"} />
            </Button>
            <Button asChild size="sm" className="ml-1 bg-gradient-primary text-white hover:opacity-90 shadow-md">
              <a href="/CV-Kawan_Silva-EN.pdf" download="CV-Kawan_Silva-EN.pdf">
                Baixar CV
              </a>
            </Button>
          </nav>

          {/* Mobile buttons */}
          <div className="flex items-center gap-1 md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="h-9 w-9 text-foreground/80"
              aria-label="Toggle theme"
            >
              <GlassIcon name={theme === "dark" ? "sun" : "moon"} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <GlassIcon name={isMenuOpen ? "multiply" : "menu"} />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-2 pb-2 border-t border-foreground/10 animate-fade-in-up">
            <div className="flex flex-col gap-1 pt-3">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-4 py-3 rounded-2xl transition-all ${
                    isActive(item.href)
                      ? "glass-control text-foreground font-medium"
                      : "text-foreground/70 hover:text-foreground hover:bg-foreground/5"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <Button asChild size="sm" className="mt-2 bg-gradient-primary text-white hover:opacity-90">
                <a
                  href="/CV-Kawan_Silva-EN.pdf"
                  download="CV-Kawan_Silva-EN.pdf"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Baixar CV
                </a>
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
