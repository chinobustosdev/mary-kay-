import { useState, useEffect } from 'react';
import { Menu, X, Sparkles } from 'lucide-react';

type HeaderProps = {
  onBooking: () => void;
};

const navLinks = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Reservas', href: '#reservas' },
  { label: 'Sobre Mí', href: '#sobre-mi' },
  { label: 'Contacto', href: '#contacto' },
];

export default function Header({ onBooking }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNav = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => handleNav('#inicio')}
          className="flex items-center gap-2 group"
        >
          <div className="w-8 h-8 rounded-full bg-blush-400 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div className="text-left">
            <span
              className={`font-serif text-lg font-semibold leading-tight block transition-colors duration-300 ${
                scrolled ? 'text-neutral-800' : 'text-white'
              }`}
            >
              Daniela Moya
            </span>
            <span
              className={`font-sans text-[10px] uppercase tracking-widest leading-tight block transition-colors duration-300 ${
                scrolled ? 'text-blush-500' : 'text-blush-200'
              }`}
            >
              Mary Kay & Makeup Artist
            </span>
          </div>
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNav(link.href)}
              className={`font-sans text-sm font-medium tracking-wide transition-colors duration-300 hover:text-blush-500 ${
                scrolled ? 'text-neutral-700' : 'text-white/90'
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:block">
          <button
            onClick={onBooking}
            className="bg-blush-500 hover:bg-blush-600 text-white font-sans text-sm font-semibold px-6 py-2.5 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-blush-200 hover:-translate-y-0.5"
          >
            Agendar Cita
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menú"
        >
          {menuOpen ? (
            <X className={`w-6 h-6 ${scrolled ? 'text-neutral-800' : 'text-white'}`} />
          ) : (
            <Menu className={`w-6 h-6 ${scrolled ? 'text-neutral-800' : 'text-white'}`} />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-white px-6 pt-4 pb-6 flex flex-col gap-4 shadow-lg">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNav(link.href)}
              className="font-sans text-sm font-medium text-neutral-700 hover:text-blush-500 text-left transition-colors"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => { setMenuOpen(false); onBooking(); }}
            className="mt-2 bg-blush-500 hover:bg-blush-600 text-white font-sans text-sm font-semibold px-6 py-3 rounded-full transition-colors"
          >
            Agendar Cita
          </button>
        </div>
      </div>
    </header>
  );
}
