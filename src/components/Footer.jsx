import { Link } from 'react-router-dom';
import { Instagram, Facebook, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer({ onOrderClick }) {
  const year = new Date().getFullYear();

  return (
    <footer
      className="border-t border-forest-400/40"
      style={{ background: 'linear-gradient(175deg, #0A1610 0%, #0D1810 100%)' }}
    >
      <div className="max-w-6xl mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-forest-400/30">

          {/* Brand */}
          <div className="lg:col-span-1">
            <div
              className="w-16 h-16 rounded-full overflow-hidden mb-4"
              style={{
                border: '2px solid rgba(200,92,42,0.55)',
                boxShadow: '0 0 24px rgba(200,92,42,0.40), 0 0 8px rgba(200,92,42,0.20)',
              }}
            >
              <img
                src={`${import.meta.env.BASE_URL}crustic-logo.png`}
                alt="Crustic Pizza"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-forest-100 text-sm leading-relaxed mb-5">
              Fresh pizza, real ingredients.<br />
              Right here in Lilburn, GA.
            </p>
            <div className="flex gap-3">
              {[
                { Icon: Instagram, label: 'Instagram' },
                { Icon: Facebook,  label: 'Facebook'  },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={`Crustic Pizza on ${label}`}
                  className="w-9 h-9 rounded-full border border-forest-300 flex items-center justify-center text-forest-100 hover:bg-terra-600 hover:border-terra-600 hover:text-cream-500 transition-all duration-200"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigate */}
          <div>
            <h4 className="text-cream-500 text-xs font-bold tracking-widest uppercase mb-5">Navigate</h4>
            <ul className="flex flex-col gap-3">
              {[
                { to: '/',         label: 'Home' },
                { to: '/menu',     label: 'Menu' },
                { to: '/location', label: 'Location & Hours' },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="text-forest-100 text-sm hover:text-terra-300 transition-colors duration-200">
                    {label}
                  </Link>
                </li>
              ))}
              <li>
                <button onClick={onOrderClick} className="text-forest-100 text-sm hover:text-terra-300 transition-colors duration-200 text-left">
                  Order Delivery
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-cream-500 text-xs font-bold tracking-widest uppercase mb-5">Contact</h4>
            <ul className="flex flex-col gap-3.5">
              <li>
                <a href="tel:+14045550199" className="flex items-center gap-2.5 text-forest-100 text-sm hover:text-terra-300 transition-colors duration-200">
                  <Phone size={13} className="text-terra-500 flex-shrink-0" /> (404) 555-0199
                </a>
              </li>
              <li>
                <a href="mailto:hello@crusticpizza.com" className="flex items-center gap-2.5 text-forest-100 text-sm hover:text-terra-300 transition-colors duration-200">
                  <Mail size={13} className="text-terra-500 flex-shrink-0" /> hello@crusticpizza.com
                </a>
              </li>
              <li>
                <address className="not-italic flex items-start gap-2.5 text-forest-100 text-sm leading-relaxed">
                  <MapPin size={13} className="text-terra-500 flex-shrink-0 mt-0.5" />
                  <span>
                    733 Pleasant Hill Rd<br />
                    Lilburn, GA 30047<br />
                    <em className="not-italic text-terra-400 text-xs">Inside Plaza Los Américas</em>
                  </span>
                </address>
              </li>
            </ul>
          </div>

          {/* Order */}
          <div>
            <h4 className="text-cream-500 text-xs font-bold tracking-widest uppercase mb-5">Order Delivery</h4>
            <ul className="flex flex-col gap-3">
              {[
                { label: 'UberEats',  color: '#06C167' },
                { label: 'DoorDash',  color: '#FF3008' },
                { label: 'Grubhub',   color: '#F63440' },
              ].map(({ label, color }) => (
                <li key={label}>
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-medium hover:opacity-90 transition-opacity"
                    style={{ color }}
                  >
                    <span className="text-xs">→</span> {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-7 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-forest-200">
          <span>© {year} Crustic Pizza. All rights reserved.</span>
          <span>733 Pleasant Hill Rd, Lilburn, GA · Inside Plaza Los Américas</span>
        </div>
      </div>
    </footer>
  );
}
