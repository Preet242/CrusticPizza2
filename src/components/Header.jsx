import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { X, Menu } from 'lucide-react';

const NAV_LINKS = [
  { to: '/',         label: 'Home' },
  { to: '/menu',     label: 'Menu' },
  { to: '/location', label: 'Location & Hours' },
];

export default function Header({ onOrderClick }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    handler();
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const close = () => setMenuOpen(false);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-300 ${
          scrolled
            ? 'bg-forest-900/95 backdrop-blur-xl border-b border-forest-400/40 shadow-lg'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-[72px] flex items-center justify-between">
          {/* Logo */}
          <Link to="/" onClick={close} className="flex-shrink-0 transition-transform duration-300 hover:scale-105">
            <div
              className="w-11 h-11 rounded-full overflow-hidden"
              style={{
                border: '2px solid rgba(200,92,42,0.55)',
                boxShadow: '0 0 18px rgba(200,92,42,0.40), 0 0 6px rgba(200,92,42,0.20)',
              }}
            >
              <img
                src={`${import.meta.env.BASE_URL}crustic-logo.png`}
                alt="Crustic Pizza"
                className="w-full h-full object-cover"
              />
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {NAV_LINKS.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `nav-link-underline text-sm font-medium transition-colors duration-200 ${
                    isActive ? 'text-cream-500 active' : 'text-forest-100 hover:text-cream-500'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Desktop CTA */}
          <button
            onClick={onOrderClick}
            className="hidden md:flex btn-shimmer items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-cream-500 transition-all duration-200 hover:scale-105 hover:shadow-lg"
            style={{ background: 'linear-gradient(135deg, #C85C2A 0%, #A84A25 100%)', boxShadow: '0 4px 16px rgba(200,92,42,0.35)' }}
          >
            Order Delivery
          </button>

          {/* Mobile Burger */}
          <button
            className="md:hidden p-2 rounded-lg text-cream-500 hover:bg-forest-400 transition-colors"
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        className={`mobile-nav fixed inset-y-0 right-0 z-[999] w-72 md:hidden ${menuOpen ? 'open' : ''}`}
        style={{ background: 'linear-gradient(175deg, #0D1810 0%, #1B2920 100%)', borderLeft: '1px solid rgba(42,58,47,0.8)' }}
        aria-hidden={!menuOpen}
      >
        <div className="flex flex-col h-full pt-24 px-8 pb-10 gap-2">
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              onClick={close}
              className={({ isActive }) =>
                `block py-4 text-lg font-medium border-b border-forest-400/40 transition-colors duration-200 ${
                  isActive ? 'text-terra-400' : 'text-cream-500 hover:text-terra-300'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
          <button
            onClick={() => { close(); onOrderClick(); }}
            className="btn-shimmer mt-6 w-full py-3.5 rounded-xl text-base font-bold text-cream-500"
            style={{ background: 'linear-gradient(135deg, #C85C2A 0%, #A84A25 100%)' }}
          >
            Order Delivery
          </button>
        </div>
      </div>

      {/* Drawer backdrop */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-[998] md:hidden bg-black/60 backdrop-blur-sm"
          onClick={close}
          aria-hidden="true"
        />
      )}
    </>
  );
}
