import { useState } from 'react';
import { Instagram, Facebook, MessageCircle, Sparkles, Send, Loader, CheckCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function Footer() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error: dbError } = await supabase.from('contacts').insert(form);
    setLoading(false);
    if (dbError) {
      setError('No pudimos enviar tu mensaje. Por favor intentá de nuevo.');
    } else {
      setSent(true);
    }
  };

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer id="contacto" className="bg-white border-t border-neutral-100">
      {/* Contact section */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-16">
          {/* Left: Info + social */}
          <div>
            <span className="font-sans text-xs uppercase tracking-[0.2em] text-blush-500 font-semibold">
              Contacto
            </span>
            <h2 className="font-serif text-4xl text-neutral-800 mt-3 mb-5 leading-tight">
              Hablemos de{' '}
              <em className="text-blush-500 not-italic">tu belleza</em>
            </h2>
            <p className="font-sans text-sm text-neutral-500 leading-relaxed mb-8 font-light max-w-sm">
              ¿Tenés dudas sobre qué servicio es el indicado para vos? Escribime sin compromiso
              y te ayudo a encontrar la mejor opción.
            </p>

            {/* Social links */}
            <div className="flex gap-4 mb-10">
              <a
                href="https://www.instagram.com/danimoyamk?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                aria-label="Instagram"
                className="w-12 h-12 rounded-2xl bg-neutral-50 border border-neutral-100 flex items-center justify-center hover:bg-blush-500 hover:border-blush-500 group transition-all duration-300"
              >
                <Instagram className="w-5 h-5 text-neutral-500 group-hover:text-white transition-colors" />
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="w-12 h-12 rounded-2xl bg-neutral-50 border border-neutral-100 flex items-center justify-center hover:bg-blush-500 hover:border-blush-500 group transition-all duration-300"
              >
                <Facebook className="w-5 h-5 text-neutral-500 group-hover:text-white transition-colors" />
              </a>
              <a
                href="https://wa.me/2615652189"
                aria-label="WhatsApp"
                target="_blank"
                rel="noreferrer"
                className="w-12 h-12 rounded-2xl bg-neutral-50 border border-neutral-100 flex items-center justify-center hover:bg-green-500 hover:border-green-500 group transition-all duration-300"
              >
                <MessageCircle className="w-5 h-5 text-neutral-500 group-hover:text-white transition-colors" />
              </a>
            </div>

            {/* Quick info */}
            <div className="space-y-3">
              {[
                { label: 'Horario', value: 'Lun – Vie, 9:00 – 18:00' },
                { label: 'WhatsApp', value: '+54 9 261 565-2189' },
                { label: 'Email', value: 'daniela@marykay.com.ar' },
              ].map(item => (
                <div key={item.label} className="flex items-center gap-3">
                  <span className="font-sans text-xs uppercase tracking-wide text-neutral-400 w-20 font-semibold">
                    {item.label}
                  </span>
                  <span className="font-sans text-sm text-neutral-700">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div>
            {sent ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mb-4">
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="font-serif text-2xl text-neutral-800 mb-2">Mensaje enviado</h3>
                <p className="font-sans text-sm text-neutral-500 font-light">
                  Gracias por escribirme. Te respondo a la brevedad.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-sans text-xs font-semibold text-neutral-600 uppercase tracking-wide block mb-2">
                      Nombre
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      placeholder="Tu nombre"
                      className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 font-sans text-sm text-neutral-800 focus:outline-none focus:border-blush-400 focus:ring-2 focus:ring-blush-100 transition-all"
                    />
                  </div>
                  <div>
                    <label className="font-sans text-xs font-semibold text-neutral-600 uppercase tracking-wide block mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      placeholder="tu@email.com"
                      className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 font-sans text-sm text-neutral-800 focus:outline-none focus:border-blush-400 focus:ring-2 focus:ring-blush-100 transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="font-sans text-xs font-semibold text-neutral-600 uppercase tracking-wide block mb-2">
                    Mensaje
                  </label>
                  <textarea
                    required
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    rows={5}
                    placeholder="Contame en qué puedo ayudarte..."
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 font-sans text-sm text-neutral-800 focus:outline-none focus:border-blush-400 focus:ring-2 focus:ring-blush-100 transition-all resize-none"
                  />
                </div>

                {error && (
                  <p className="text-sm text-red-600 font-sans bg-red-50 rounded-xl px-4 py-3">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blush-500 hover:bg-blush-600 disabled:bg-blush-300 text-white font-sans text-sm font-semibold py-4 rounded-2xl transition-all flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-blush-200"
                >
                  {loading ? (
                    <><Loader className="w-4 h-4 animate-spin" /> Enviando...</>
                  ) : (
                    <><Send className="w-4 h-4" /> Enviar Mensaje</>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-neutral-100 py-6">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-blush-400 flex items-center justify-center">
              <Sparkles className="w-3 h-3 text-white" />
            </div>
            <span className="font-serif text-sm text-neutral-600">Daniela Moya</span>
            <span className="text-neutral-300 text-xs">|</span>
            <span className="font-sans text-xs text-neutral-400">Consultora Mary Kay & Makeup Artist</span>
          </div>

          <div className="flex gap-6">
            {[
              { label: 'Servicios', href: '#servicios' },
              { label: 'Reservas', href: '#reservas' },
              { label: 'Contacto', href: '#contacto' },
            ].map(link => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="font-sans text-xs text-neutral-400 hover:text-blush-500 transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>

          <p className="font-sans text-xs text-neutral-400">
            © {new Date().getFullYear()} Daniela Moya. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
