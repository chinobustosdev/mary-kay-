import { useEffect } from 'react';
import { X } from 'lucide-react';
import Booking from './Booking';

type BookingModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-neutral-900/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-neutral-100 px-7 py-5 flex items-center justify-between rounded-t-3xl z-10">
          <div>
            <h2 className="font-serif text-2xl text-neutral-800">Agendar Cita</h2>
            <p className="font-sans text-xs text-neutral-400 mt-0.5">Elegí día, horario y completá tus datos</p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-neutral-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-7">
          <Booking modalMode onClose={onClose} />
        </div>
      </div>
    </div>
  );
}
