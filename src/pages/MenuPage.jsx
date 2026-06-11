import { useState, useRef, useEffect } from 'react';
import { useInView } from '../hooks/useInView';
import MenuCard from '../components/MenuCard';
import { menuCategories, menuItems } from '../lib/menuData';

function Reveal({ children, delay = 0, className = '' }) {
  const [ref, visible] = useInView();
  return (
    <div ref={ref} className={`reveal ${visible ? 'visible' : ''} reveal-delay-${delay} ${className}`}>
      {children}
    </div>
  );
}

export default function MenuPage({ onOrderClick }) {
  const [active, setActive] = useState('pizzas');
  const tabsRef = useRef(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const container = tabsRef.current;
    if (!container) return;
    const activeBtn = container.querySelector('[data-active="true"]');
    if (!activeBtn) return;
    const { offsetLeft, offsetWidth } = activeBtn;
    setIndicatorStyle({ left: offsetLeft, width: offsetWidth });
  }, [active]);

  const items = menuItems[active] || [];

  return (
    <div className="page-enter min-h-screen" style={{ paddingTop: '72px' }}>

      {/* ── Page header ── */}
      <section
        className="relative py-24 overflow-hidden"
        style={{
          backgroundImage: `
            linear-gradient(to bottom, rgba(4,9,6,0.88) 0%, rgba(10,20,13,0.80) 50%, rgba(27,41,32,0.97) 100%),
            url('https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=1920&q=80')
          `,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        aria-label="Menu page header"
      >
        {/* Spinning ring deco */}
        <div
          className="absolute top-1/2 right-[-80px] -translate-y-1/2 w-64 h-64 rounded-full pointer-events-none opacity-30 animate-spin-slow"
          style={{ border: '1px solid rgba(200,92,42,0.2)' }}
          aria-hidden="true"
        />
        <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
          {/* Circular logo in page header */}
          <div className="relative inline-block mb-7">
            <div className="absolute rounded-full pointer-events-none" style={{ inset: '-8px', border: '1px solid rgba(200,92,42,0.3)' }} />
            <div className="w-20 h-20 rounded-full overflow-hidden mx-auto"
              style={{ border: '2px solid rgba(200,92,42,0.5)', boxShadow: '0 0 30px rgba(200,92,42,0.4), 0 8px 24px rgba(0,0,0,0.5)' }}>
              <img src="/crustic-logo.png" alt="" aria-hidden="true" className="w-full h-full object-cover" />
            </div>
          </div>
          <p className="text-terra-400 text-xs font-bold tracking-widest uppercase mb-4">What We Serve</p>
          <h1 className="font-display font-black text-cream-500 leading-tight mb-4"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}>
            Our Menu
          </h1>
          <p className="text-forest-100 max-w-md mx-auto text-base">
            Everything made fresh to order. No shortcuts, no compromises.
          </p>
        </div>

        <div
          className="absolute -bottom-1 left-0 right-0 h-16 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, transparent, #1B2920)' }}
          aria-hidden="true"
        />
      </section>

      {/* ── Main content ── */}
      <section className="py-16 bg-forest-600" aria-label="Menu items">
        <div className="max-w-6xl mx-auto px-6">

          {/* Sticky tabs */}
          <div className="sticky top-[72px] z-50 py-3 sm:py-4 -mx-6 px-4 sm:px-6"
            style={{ background: 'linear-gradient(to bottom, #1B2920 85%, transparent)' }}>
            {/* Outer wrapper allows horizontal scroll on very small phones */}
            <div className="overflow-x-auto scrollbar-none">
              <div
                ref={tabsRef}
                role="tablist"
                aria-label="Menu categories"
                className="relative flex bg-forest-500 border border-forest-300 rounded-2xl p-1.5 w-fit mx-auto shadow-lg min-w-max"
              >
                {/* Sliding indicator */}
                <div
                  className="tab-indicator absolute top-1.5 bottom-1.5 rounded-xl pointer-events-none"
                  style={{
                    left: `${indicatorStyle.left}px`,
                    width: `${indicatorStyle.width}px`,
                    background: 'linear-gradient(135deg, #C85C2A 0%, #A84A25 100%)',
                    boxShadow: '0 4px 12px rgba(200,92,42,0.35)',
                  }}
                  aria-hidden="true"
                />
                {menuCategories.map(cat => (
                  <button
                    key={cat.id}
                    role="tab"
                    aria-selected={active === cat.id}
                    aria-controls={`panel-${cat.id}`}
                    data-active={active === cat.id}
                    onClick={() => setActive(cat.id)}
                    className={`relative z-10 flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors duration-200 whitespace-nowrap ${
                      active === cat.id ? 'text-cream-500' : 'text-forest-100 hover:text-cream-600'
                    }`}
                  >
                    <span className="hidden xs:inline sm:inline">{cat.emoji}</span>
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Items grid */}
          <div
            key={active}
            id={`panel-${active}`}
            role="tabpanel"
            aria-label={`${menuCategories.find(c => c.id === active)?.label} menu`}
            className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-up"
          >
            {items.map((item, i) => (
              <Reveal key={item.id} delay={(i % 3) + 1}>
                <MenuCard item={item} />
              </Reveal>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <div
              className="inline-block rounded-4xl px-10 py-10 border border-forest-300"
              style={{ background: 'linear-gradient(135deg, #142018, #1B2920)' }}
            >
              <p className="text-terra-400 text-xs font-bold tracking-widest uppercase mb-3">Order Now</p>
              <h3 className="font-display font-bold text-cream-500 text-2xl sm:text-3xl mb-2">
                Ready to order?
              </h3>
              <p className="text-forest-100 text-sm mb-6 max-w-sm mx-auto">
                Full menu available on our delivery platforms. Prices may vary by platform.
              </p>
              <button
                onClick={onOrderClick}
                className="btn-shimmer px-8 py-3.5 rounded-xl font-bold text-cream-500 text-base transition-all duration-200 hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #C85C2A 0%, #A84A25 100%)', boxShadow: '0 6px 24px rgba(200,92,42,0.35)' }}
              >
                Order for Delivery
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
