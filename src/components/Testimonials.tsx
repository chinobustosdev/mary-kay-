import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Valentina Rodríguez',
    role: 'Novia',
    text: 'Daniela hizo que el día de mi boda fuera perfecto. El maquillaje duró toda la noche y me sentí absolutamente hermosa. ¡La recomiendo a todas mis amigas!',
    image: 'https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&w=200',
    stars: 5,
  },
  {
    name: 'Camila Torres',
    role: 'Clienta habitual',
    text: 'Empecé con la limpieza gratuita sin saber qué esperar y me enamoré. Ahora sigo toda la rutina Mary Kay que Daniela me recomendó y mi piel nunca estuvo mejor.',
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200',
    stars: 5,
  },
  {
    name: 'Lucía Martínez',
    role: 'Evento corporativo',
    text: 'Para mi presentación en el congreso quería verme profesional pero natural. Daniela entendió exactamente lo que buscaba. Recibí cumplidos todo el día.',
    image: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=200',
    stars: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-blush-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="font-sans text-xs uppercase tracking-[0.2em] text-blush-500 font-semibold">
            Testimonios
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-neutral-800 mt-3">
            Lo que dicen{' '}
            <em className="text-blush-500 not-italic">ellas</em>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-7">
          {testimonials.map((t) => (
            <div key={t.name} className="bg-white rounded-3xl p-7 shadow-sm hover:shadow-md transition-shadow duration-300">
              <Quote className="w-8 h-8 text-blush-200 mb-5" />
              <p className="font-sans text-sm text-neutral-600 leading-relaxed mb-6 font-light">
                "{t.text}"
              </p>
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.stars }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-champagne-400 text-champagne-400" />
                ))}
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-neutral-100">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-sans text-sm font-semibold text-neutral-800">{t.name}</p>
                  <p className="font-sans text-xs text-neutral-400">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
