import { Award, Heart, Star } from 'lucide-react';

export default function About() {
  return (
    <section id="sobre-mi" className="py-24 bg-neutral-900 overflow-hidden relative">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url(https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg?auto=compress&cs=tinysrgb&w=1600)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Image block */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden aspect-[3/4] max-w-sm mx-auto md:mx-0">
              <img
                src="https://images.pexels.com/photos/3997993/pexels-photo-3997993.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Daniela Moya"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/40 to-transparent" />
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-4 -right-4 md:right-8 bg-white rounded-2xl shadow-xl p-5 max-w-[180px]">
              <div className="flex gap-0.5 mb-2">
                {[1,2,3,4,5].map(s => (
                  <Star key={s} className="w-3.5 h-3.5 fill-champagne-400 text-champagne-400" />
                ))}
              </div>
              <p className="font-sans text-xs text-neutral-600 leading-snug">
                "Me cambió la rutina de cuidado completamente"
              </p>
              <p className="font-sans text-xs text-neutral-400 mt-1">— Valentina R.</p>
            </div>

            {/* Experience badge */}
            <div className="absolute -top-4 -left-4 md:left-0 bg-blush-500 text-white rounded-2xl p-4 text-center">
              <p className="font-serif text-3xl font-bold">5+</p>
              <p className="font-sans text-xs uppercase tracking-wider mt-0.5">Años</p>
            </div>
          </div>

          {/* Text */}
          <div>
            <span className="font-sans text-xs uppercase tracking-[0.2em] text-blush-400 font-semibold">
              Sobre mí
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-white mt-3 mb-6 leading-tight">
              La persona detrás{' '}
              <em className="text-blush-400 not-italic">del pincel</em>
            </h2>

            <p className="font-sans text-neutral-300 text-sm leading-relaxed mb-5 font-light">
              Soy Daniela Moya, Maquilladora Profesional titulada y Consultora de Belleza certificada Mary Kay.
              Siempre supe que la belleza no era solo un capricho estético — era una herramienta de confianza y autoexpresión.
            </p>
            <p className="font-sans text-neutral-300 text-sm leading-relaxed mb-5 font-light">
              A lo largo de mi carrera he acompañado a cientos de mujeres a descubrir su propia belleza: desde novias
              el día más importante de su vida hasta clientas que simplemente querían sentirse bien con su piel.
              Cada rostro es una historia diferente, y yo estoy aquí para contarla.
            </p>
            <p className="font-sans text-neutral-300 text-sm leading-relaxed mb-8 font-light">
              Mi compromiso es darte una experiencia personalizada, sin presiones, con productos de la más alta calidad
              y con el conocimiento de quien estudió para ayudarte.
            </p>

            {/* Highlights */}
            <div className="space-y-4">
              {[
                {
                  icon: Award,
                  title: 'Titulada en Maquillaje Profesional',
                  desc: 'Formación técnica y artística certificada',
                },
                {
                  icon: Star,
                  title: 'Consultora Certificada Mary Kay',
                  desc: 'Experta en skincare y cosmética premium',
                },
                {
                  icon: Heart,
                  title: 'Compromiso con cada clienta',
                  desc: 'Tu satisfacción y confianza, siempre primero',
                },
              ].map(item => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-blush-400" />
                    </div>
                    <div>
                      <p className="font-sans text-sm font-semibold text-white">{item.title}</p>
                      <p className="font-sans text-xs text-neutral-400 mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
