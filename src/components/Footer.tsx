// Site footer. The Icons8 link is required by the free icon license.
const Footer = () => (
  <footer className="container mx-auto px-4 pb-10">
    <div className="glass rounded-full max-w-5xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/60">
      <span>© Kawan Silva {new Date().getFullYear()}</span>
      <a href="mailto:kwnsilva@hotmail.com" className="hover:text-white transition-colors">
        kwnsilva@hotmail.com
      </a>
      <a href="https://icons8.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
        Ícones por Icons8
      </a>
    </div>
  </footer>
);

export default Footer;
