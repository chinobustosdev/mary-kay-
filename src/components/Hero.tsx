import { ArrowDown, Star } from 'lucide-react';
import heroImage from '../public/foto mama.png';

type HeroProps = {
  onBooking: () => void;
};

export default function Hero({ onBooking }: HeroProps) {
  const scrollToServices = () => {
    document.querySelector('#servicios')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${heroImage})`,
        }}
      />
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-neutral-900/80 via-neutral-900/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/50 via-transparent to-transparent" />

      {/* Decorative dots */}
      <div className="absolute top-24 right-12 w-48 h-48 opacity-10">
        <div className="grid grid-cols-6 gap-3">
          {Array.from({ length: 36 }).map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-white" />
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-20">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="w-3 h-3 fill-champagne-400 text-champagne-400" />
              ))}
            </div>
            <span className="font-sans text-xs text-white/90 tracking-wide">
              Consultora Certificada Mary Kay
            </span>
          </div>

          {/* Heading */}
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-white leading-tight mb-6">
            Tu mejor versión{' '}
            <em className="text-blush-300 not-italic">comienza</em>{' '}
            aquí
          </h1>

          {/* Subheading */}
          <p className="font-sans text-base md:text-lg text-white/80 leading-relaxed mb-10 max-w-lg font-light">
            Descubrí el poder de una piel radiante y un maquillaje que te define.
            Soy Daniela, maquilladora profesional y consultora de belleza,
            y estoy aquí para transformar tu rutina de cuidado personal.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={onBooking}
              className="bg-blush-500 hover:bg-blush-600 text-white font-sans font-semibold text-sm px-8 py-4 rounded-full transition-all duration-300 hover:shadow-2xl hover:shadow-blush-500/30 hover:-translate-y-1"
            >
              Agenda tu Limpieza Gratis
            </button>
            <button
              onClick={scrollToServices}
              className="border border-white/40 text-white hover:bg-white/10 font-sans font-medium text-sm px-8 py-4 rounded-full transition-all duration-300 backdrop-blur-sm"
            >
              Conocer Servicios
            </button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-8 mt-14 pt-10 border-t border-white/15">
            {[
              { value: '100+', label: 'Clientas Felices' },
              { value: '5+', label: 'Años de Experiencia' },
              { value: '100%', label: 'Productos Certificados' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-serif text-3xl text-white font-semibold">{stat.value}</p>
                <p className="font-sans text-xs text-white/60 uppercase tracking-wider mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <button
        onClick={scrollToServices}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 hover:text-white/80 transition-colors animate-float"
      >
        <span className="font-sans text-xs tracking-widest uppercase">Explorar</span>
        <ArrowDown className="w-4 h-4" />
      </button>
    </section>
  );
}
