import { useState } from 'react';
import { Calendar, Clock, ChevronLeft, ChevronRight, CheckCircle, Loader } from 'lucide-react';
import { supabase } from '../lib/supabase';

type BookingProps = {
  modalMode?: boolean;
  onClose?: () => void;
};

const SERVICES = [
  { value: 'limpieza', label: 'Limpieza de Cutis Gratis' },
  { value: 'maquillaje_social', label: 'Maquillaje Social' },
  { value: 'maquillaje_novia', label: 'Maquillaje Novia / Quinceañera' },
  { value: 'maquillaje_evento', label: 'Maquillaje Evento / Gala' },
  { value: 'asesoria', label: 'Asesoría de Productos Mary Kay' },
];

const TIME_SLOTS = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00',
];

const MONTHS = [
  'Enero','Febrero','Marzo','Abril','Mayo','Junio',
  'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre',
];
const DAYS = ['Do','Lu','Ma','Mi','Ju','Vi','Sa'];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}
function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

export default function Booking({ modalMode = false, onClose }: BookingProps) {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: 'limpieza', notes: '' });
  const [step, setStep] = useState<'calendar' | 'form' | 'done'>('calendar');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth);

  const prevMonth = () => {
    if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0); }
    else setViewMonth(m => m + 1);
  };

  const isDisabled = (day: number) => {
    const d = new Date(viewYear, viewMonth, day);
    return d < new Date(today.getFullYear(), today.getMonth(), today.getDate()) || d.getDay() === 0;
  };

  const selectDay = (day: number) => {
    if (isDisabled(day)) return;
    const dateStr = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    setSelectedDate(dateStr);
    setSelectedTime(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime) return;
    setLoading(true);
    setError(null);
    const { error: dbError } = await supabase.from('appointments').insert({
      ...form,
      appointment_date: selectedDate,
      appointment_time: selectedTime,
      status: 'pending',
    });
    setLoading(false);
    if (dbError) {
      setError('Hubo un problema al registrar tu cita. Por favor intentá de nuevo.');
    } else {
      setStep('done');
    }
  };

  const reset = () => {
    setStep('calendar');
    setSelectedDate(null);
    setSelectedTime(null);
    setForm({ name: '', email: '', phone: '', service: 'limpieza', notes: '' });
    setError(null);
  };

  const containerClass = modalMode
    ? ''
    : 'py-24 bg-white';

  return (
    <section id="reservas" className={containerClass}>
      <div className={modalMode ? '' : 'max-w-5xl mx-auto px-6'}>
        {!modalMode && (
          <div className="text-center mb-12">
            <span className="font-sans text-xs uppercase tracking-[0.2em] text-blush-500 font-semibold">
              Tu turno te espera
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-neutral-800 mt-3 mb-5">
              Reservá tu cita{' '}
              <em className="text-blush-500 not-italic">ahora</em>
            </h2>
            <p className="font-sans text-neutral-500 text-base max-w-md mx-auto leading-relaxed font-light">
              Elegí el día y horario que mejor se adapte a vos. En minutos tu lugar queda confirmado.
            </p>
          </div>
        )}

        {step === 'done' ? (
          <div className="text-center py-16 px-6">
            <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-500" />
            </div>
            <h3 className="font-serif text-3xl text-neutral-800 mb-3">
              ¡Reserva Confirmada!
            </h3>
            <p className="font-sans text-neutral-500 text-sm max-w-sm mx-auto leading-relaxed font-light mb-8">
              Te enviamos la confirmación a <strong>{form.email}</strong>. ¡Nos vemos pronto!
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={reset}
                className="bg-blush-500 hover:bg-blush-600 text-white font-sans text-sm font-semibold px-6 py-3 rounded-full transition-colors"
              >
                Hacer otra reserva
              </button>
              {modalMode && onClose && (
                <button
                  onClick={onClose}
                  className="border border-neutral-200 text-neutral-600 hover:bg-neutral-50 font-sans text-sm font-medium px-6 py-3 rounded-full transition-colors"
                >
                  Cerrar
                </button>
              )}
            </div>
          </div>
        ) : step === 'calendar' ? (
          <div className="grid md:grid-cols-2 gap-8">
            {/* Calendar */}
            <div className="bg-neutral-50 rounded-3xl p-6">
              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={prevMonth}
                  className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center hover:bg-blush-50 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4 text-neutral-600" />
                </button>
                <h3 className="font-serif text-lg text-neutral-800">
                  {MONTHS[viewMonth]} {viewYear}
                </h3>
                <button
                  onClick={nextMonth}
                  className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center hover:bg-blush-50 transition-colors"
                >
                  <ChevronRight className="w-4 h-4 text-neutral-600" />
                </button>
              </div>

              <div className="grid grid-cols-7 mb-3">
                {DAYS.map(d => (
                  <div key={d} className="text-center font-sans text-xs text-neutral-400 font-semibold py-1">
                    {d}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: firstDay }).map((_, i) => (
                  <div key={`empty-${i}`} />
                ))}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const dateStr = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                  const isSelected = selectedDate === dateStr;
                  const disabled = isDisabled(day);
                  return (
                    <button
                      key={day}
                      onClick={() => selectDay(day)}
                      disabled={disabled}
                      className={`aspect-square rounded-xl font-sans text-sm transition-all duration-200 ${
                        isSelected
                          ? 'bg-blush-500 text-white font-semibold shadow-md shadow-blush-200'
                          : disabled
                          ? 'text-neutral-300 cursor-not-allowed'
                          : 'text-neutral-700 hover:bg-blush-100 hover:text-blush-700'
                      }`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center gap-2 mt-4 text-neutral-400">
                <Calendar className="w-4 h-4" />
                <span className="font-sans text-xs">
                  {selectedDate
                    ? `Fecha seleccionada: ${selectedDate.split('-').reverse().join('/')}`
                    : 'Seleccioná una fecha'}
                </span>
              </div>
            </div>

            {/* Time slots */}
            <div>
              <h3 className="font-sans text-sm font-semibold text-neutral-700 mb-4 flex items-center gap-2">
                <Clock className="w-4 h-4 text-blush-500" />
                Horarios disponibles
              </h3>

              {selectedDate ? (
                <div className="grid grid-cols-3 gap-2">
                  {TIME_SLOTS.map(slot => (
                    <button
                      key={slot}
                      onClick={() => setSelectedTime(slot)}
                      className={`py-2.5 rounded-xl font-sans text-sm transition-all duration-200 border ${
                        selectedTime === slot
                          ? 'bg-blush-500 text-white border-blush-500 shadow-md shadow-blush-200'
                          : 'bg-white text-neutral-600 border-neutral-200 hover:border-blush-300 hover:text-blush-600'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="h-48 flex items-center justify-center bg-neutral-50 rounded-2xl border-2 border-dashed border-neutral-200">
                  <p className="font-sans text-sm text-neutral-400 text-center px-4">
                    Primero seleccioná una fecha en el calendario
                  </p>
                </div>
              )}

              {selectedDate && selectedTime && (
                <div className="mt-6 p-4 bg-blush-50 rounded-2xl border border-blush-100">
                  <p className="font-sans text-sm text-blush-700 font-medium">
                    Fecha elegida: <strong>{selectedDate.split('-').reverse().join('/')}</strong> a las <strong>{selectedTime}</strong>
                  </p>
                </div>
              )}

              <button
                onClick={() => { if (selectedDate && selectedTime) setStep('form'); }}
                disabled={!selectedDate || !selectedTime}
                className={`w-full mt-6 py-4 rounded-2xl font-sans text-sm font-semibold transition-all duration-300 ${
                  selectedDate && selectedTime
                    ? 'bg-blush-500 hover:bg-blush-600 text-white hover:shadow-lg hover:shadow-blush-200'
                    : 'bg-neutral-100 text-neutral-400 cursor-not-allowed'
                }`}
              >
                Continuar →
              </button>
            </div>
          </div>
        ) : (
          /* Form step */
          <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
            <div className="bg-blush-50 border border-blush-100 rounded-2xl p-4 mb-6">
              <p className="font-sans text-sm text-blush-700">
                <strong>Tu cita:</strong> {selectedDate?.split('-').reverse().join('/')} a las {selectedTime}
              </p>
            </div>

            <div className="space-y-5">
              <div>
                <label className="font-sans text-xs font-semibold text-neutral-600 uppercase tracking-wide block mb-2">
                  Nombre completo *
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="Tu nombre"
                  className="w-full bg-white border border-neutral-200 rounded-xl px-4 py-3 font-sans text-sm text-neutral-800 focus:outline-none focus:border-blush-400 focus:ring-2 focus:ring-blush-100 transition-all"
                />
              </div>
              <div>
                <label className="font-sans text-xs font-semibold text-neutral-600 uppercase tracking-wide block mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  placeholder="tu@email.com"
                  className="w-full bg-white border border-neutral-200 rounded-xl px-4 py-3 font-sans text-sm text-neutral-800 focus:outline-none focus:border-blush-400 focus:ring-2 focus:ring-blush-100 transition-all"
                />
              </div>
              <div>
                <label className="font-sans text-xs font-semibold text-neutral-600 uppercase tracking-wide block mb-2">
                  Teléfono / WhatsApp *
                </label>
                <input
                  type="tel"
                  required
                  value={form.phone}
                  onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                  placeholder="+54 9 11 0000-0000"
                  className="w-full bg-white border border-neutral-200 rounded-xl px-4 py-3 font-sans text-sm text-neutral-800 focus:outline-none focus:border-blush-400 focus:ring-2 focus:ring-blush-100 transition-all"
                />
              </div>
              <div>
                <label className="font-sans text-xs font-semibold text-neutral-600 uppercase tracking-wide block mb-2">
                  Servicio deseado *
                </label>
                <select
                  value={form.service}
                  onChange={e => setForm(f => ({ ...f, service: e.target.value }))}
                  className="w-full bg-white border border-neutral-200 rounded-xl px-4 py-3 font-sans text-sm text-neutral-800 focus:outline-none focus:border-blush-400 focus:ring-2 focus:ring-blush-100 transition-all"
                >
                  {SERVICES.map(s => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="font-sans text-xs font-semibold text-neutral-600 uppercase tracking-wide block mb-2">
                  Notas adicionales (opcional)
                </label>
                <textarea
                  value={form.notes}
                  onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                  rows={3}
                  placeholder="Contame algo sobre tu tipo de piel o lo que buscás..."
                  className="w-full bg-white border border-neutral-200 rounded-xl px-4 py-3 font-sans text-sm text-neutral-800 focus:outline-none focus:border-blush-400 focus:ring-2 focus:ring-blush-100 transition-all resize-none"
                />
              </div>
            </div>

            {error && (
              <p className="mt-4 text-sm text-red-600 font-sans bg-red-50 rounded-xl px-4 py-3">
                {error}
              </p>
            )}

            <div className="flex gap-3 mt-8">
              <button
                type="button"
                onClick={() => setStep('calendar')}
                className="flex-1 border border-neutral-200 text-neutral-600 hover:bg-neutral-50 font-sans text-sm font-medium py-3.5 rounded-2xl transition-colors"
              >
                ← Volver
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-blush-500 hover:bg-blush-600 disabled:bg-blush-300 text-white font-sans text-sm font-semibold py-3.5 rounded-2xl transition-all flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader className="w-4 h-4 animate-spin" />
                    Confirmando...
                  </>
                ) : (
                  'Confirmar Cita'
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
