import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

const PLATFORMS = [
  { id: 'ubereats',  label: 'UberEats',  bold: 'Eats',    prefix: 'Uber', href: '#', cls: 'modal-ubereats',  color: '#06C167' },
  { id: 'doordash',  label: 'DoorDash',  bold: 'Dash',    prefix: 'Door', href: '#', cls: 'modal-doordash',  color: '#FF3008' },
  { id: 'grubhub',   label: 'Grubhub',   bold: 'hub',     prefix: 'Grub', href: '#', cls: 'modal-grubhub',   color: '#F63440' },
];

export default function DeliveryModal({ open, onClose }) {
  const closeRef = useRef(null);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => closeRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape' && open) onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Order delivery options"
      className={`modal-backdrop fixed inset-0 z-[9999] flex items-center justify-center p-4 ${open ? 'open' : ''}`}
      style={{ background: 'rgba(7,14,10,0.82)', backdropFilter: 'blur(10px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="modal-panel w-full max-w-md bg-forest-500 border border-forest-300 rounded-3xl sm:rounded-4xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="relative flex flex-col items-center pt-0 pb-6 text-center"
          style={{ background: 'linear-gradient(160deg, #142018 0%, #1B2920 100%)', padding: 'clamp(1.25rem, 5vw, 2rem)' }}>
          <button
            ref={closeRef}
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full border border-forest-300 text-forest-100 hover:bg-terra-600 hover:border-terra-600 hover:text-cream-500 transition-all duration-200"
            aria-label="Close modal"
          >
            <X size={16} />
          </button>
          <img src={`${import.meta.env.BASE_URL}crustic-logo.png`} alt="Crustic Pizza" className="h-16 w-auto mb-4 object-contain"
            style={{ filter: 'drop-shadow(0 4px 12px rgba(200,92,42,0.4))' }} />
          <h2 className="font-display font-bold text-cream-500 text-2xl leading-tight mb-2">Order for Delivery</h2>
          <p className="text-forest-100 text-sm leading-relaxed max-w-xs">
            Choose your preferred platform below. We'll take you right to our menu.
          </p>
        </div>

        {/* Platforms */}
        <div className="flex flex-col gap-3 px-5 sm:px-8 py-5 sm:py-6">
          {PLATFORMS.map(p => (
            <a
              key={p.id}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-between px-5 py-4 rounded-2xl border border-forest-300 bg-forest-700 transition-all duration-200 group ${p.cls}`}
            >
              <span className="text-cream-500 font-light text-xl tracking-tight">
                {p.prefix}<strong className="font-extrabold">{p.bold}</strong>
              </span>
              <span className="text-forest-100 group-hover:text-cream-500 transition-colors text-lg">→</span>
            </a>
          ))}
        </div>

        <p className="text-forest-200 text-xs text-center px-5 sm:px-8 pb-5 sm:pb-6 leading-relaxed">
          Prices and availability may vary by platform. Check each app for current promotions.
        </p>
      </div>
    </div>
  );
}
