import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import GlassIcon from "@/components/GlassIcon";
import { useState } from "react";

const CV_PATH = `${import.meta.env.BASE_URL}CV-Kawan_Silva-EN.pdf`;

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "Início", href: "/" },
    { name: "Contato", href: "/contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-4 inset-x-0 z-50 px-4">
      {/* Compact floating pill, only as wide as its content */}
      <div
        className={`glass mx-auto w-full md:w-fit pl-5 pr-2 py-2 transition-all duration-300 ${
          isMenuOpen ? "rounded-3xl" : "rounded-full"
        }`}
      >
        <div className="flex items-center justify-between md:justify-start">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <GlassIcon name="cloud" onColor className="h-6 w-6 transition-transform group-hover:scale-110" />
            <span className="text-base font-semibold tracking-tight text-white">
              Kawan <span className="font-light italic">Silva</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block mx-6 h-6 w-px bg-white/20" />
          <nav className="hidden md:flex items-center gap-7">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm transition-colors duration-300 ${
                  isActive(item.href) ? "text-white font-medium" : "text-white/70 hover:text-white"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
          <Button
            asChild
            size="sm"
            className="hidden md:inline-flex ml-10 h-10 px-5 bg-white text-slate-900 font-medium hover:bg-white/90 shadow-md"
          >
            <a href={CV_PATH} download="CV-Kawan_Silva-EN.pdf">
              Baixar CV
            </a>
          </Button>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden h-9 w-9"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <GlassIcon name={isMenuOpen ? "multiply" : "menu"} />
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-2 pb-2 pr-3 border-t border-white/10 animate-fade-in-up">
            <div className="flex flex-col gap-1 pt-3">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-1 py-3 transition-colors ${
                    isActive(item.href) ? "text-white font-medium" : "text-white/70 hover:text-white"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <Button asChild size="sm" className="mt-2 bg-white text-slate-900 font-medium hover:bg-white/90">
                <a href={CV_PATH} download="CV-Kawan_Silva-EN.pdf" onClick={() => setIsMenuOpen(false)}>
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
