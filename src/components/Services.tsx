import { Sparkles, Camera, ShoppingBag, Check, ArrowRight, MessageCircle } from 'lucide-react';

type ServicesProps = {
  onBooking: () => void;
};

const services = [
  {
    icon: Sparkles,
    tag: 'Completamente Gratis',
    title: 'Limpieza de Cutis',
    subtitle: 'Una experiencia que transforma tu piel',
    description:
      'Olvidate de la piel opaca y los poros congestionados. Con nuestra Limpieza de Cutis personalizada con productos Mary Kay, tu piel volverá a respirar. Sin costo, sin compromiso — solo resultados reales.',
    benefits: [
      'Análisis de tipo de piel personalizado',
      'Limpieza profunda con productos premium',
      'Rutina de cuidado a medida',
      'Recomendación de productos sin presión',
    ],
    image: 'https://images.pexels.com/photos/3997987/pexels-photo-3997987.jpeg?auto=compress&cs=tinysrgb&w=800',
    accent: 'blush',
    cta: 'Reservar Mi Lugar Gratis',
  },
  {
    icon: Camera,
    tag: 'Profesional',
    title: 'Sesiones de Maquillaje',
    subtitle: 'Para cada momento especial de tu vida',
    description:
      'Desde un look natural para el día a día hasta el glamour absoluto de tu boda. Cada trazo es una obra de arte diseñada para realzar tu belleza única y hacerte brillar donde vayas.',
    benefits: [
      'Maquillaje Social & Everyday',
      'Novia & Quinceañera',
      'Eventos de Gala',
      'Prueba previa incluida',
    ],
    image: 'https://images.pexels.com/photos/2065195/pexels-photo-2065195.jpeg?auto=compress&cs=tinysrgb&w=800',
    accent: 'champagne',
    cta: 'Consultar Disponibilidad',
  },
  {
    icon: ShoppingBag,
    tag: 'Mary Kay',
    title: 'Asesoría de Productos',
    subtitle: 'Construí tu rutina perfecta',
    description:
      'No todos los productos son para todas las pieles. Como consultora certificada Mary Kay, te guío para elegir exactamente lo que tu piel necesita — y nada de lo que no. Tu inversión, bien aprovechada.',
    benefits: [
      'Evaluación completa de tu piel',
      'Rutina AM/PM personalizada',
      'Maquillaje acorde a tu tono',
      'Seguimiento post-compra',
    ],
    image: 'https://images.pexels.com/photos/3735641/pexels-photo-3735641.jpeg?auto=compress&cs=tinysrgb&w=800',
    accent: 'blush',
    cta: 'Quiero Mi Asesoría',
    whatsapp: true,
  },
];

export default function Services({ onBooking }: ServicesProps) {
  return (
    <section id="servicios" className="py-24 bg-neutral-50">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="font-sans text-xs uppercase tracking-[0.2em] text-blush-500 font-semibold">
            Lo que ofrezco
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-neutral-800 mt-3 mb-5">
            Servicios diseñados{' '}
            <em className="text-blush-500 not-italic">para vos</em>
          </h2>
          <p className="font-sans text-neutral-500 text-base max-w-lg mx-auto leading-relaxed font-light">
            Cada servicio está pensado para que salgas con más confianza,
            más conocimiento y más brillo.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 flex flex-col"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/50 to-transparent" />
                  <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-blush-600 font-sans text-xs font-semibold px-3 py-1.5 rounded-full">
                    {service.tag}
                  </span>
                </div>

                {/* Content */}
                <div className="p-7 flex flex-col flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-2xl bg-blush-50 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-blush-500" />
                    </div>
                    <div>
                      <h3 className="font-serif text-xl text-neutral-800 leading-tight">
                        {service.title}
                      </h3>
                      <p className="font-sans text-xs text-neutral-400 mt-0.5">
                        {service.subtitle}
                      </p>
                    </div>
                  </div>

                  <p className="font-sans text-sm text-neutral-500 leading-relaxed mb-6 font-light">
                    {service.description}
                  </p>

                  <ul className="space-y-2.5 mb-8">
                    {service.benefits.map((b) => (
                      <li key={b} className="flex items-start gap-2.5">
                        <div className="w-4 h-4 rounded-full bg-blush-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5 text-blush-600" />
                        </div>
                        <span className="font-sans text-xs text-neutral-600">{b}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto">
                    {service.whatsapp ? (
                      <a
                        href="https://wa.me/5492615652189?text=Hola%20Daniela%2C%20me%20interesa%20la%20asesor%C3%ADa%20de%20productos%20Mary%20Kay"
                        target="_blank"
                        rel="noreferrer"
                        className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-sans text-sm font-semibold py-3.5 rounded-2xl transition-all duration-300 group/btn"
                      >
                        <MessageCircle className="w-4 h-4" />
                        {service.cta}
                      </a>
                    ) : (
                      <button
                        onClick={onBooking}
                        className="w-full flex items-center justify-center gap-2 bg-neutral-800 hover:bg-blush-500 text-white font-sans text-sm font-semibold py-3.5 rounded-2xl transition-all duration-300 group/btn"
                      >
                        {service.cta}
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
