import { Link } from 'react-router-dom';
import { useInView } from '../hooks/useInView';
import MenuCard from '../components/MenuCard';
import { menuItems } from '../lib/menuData';
import { Flame, Leaf, Bike, Star, ChevronDown } from 'lucide-react';

/* ── Reusable scroll-reveal wrapper ── */
function Reveal({ children, delay = 0, className = '' }) {
  const [ref, visible] = useInView();
  return (
    <div ref={ref} className={`reveal ${visible ? 'visible' : ''} reveal-delay-${delay} ${className}`}>
      {children}
    </div>
  );
}

/* ── Data ── */
const FEATURES = [
  { Icon: Flame, title: 'Baked Fresh Daily',     desc: 'Every pie made to order — hot, fresh, and loaded with flavor every single time.' },
  { Icon: Leaf,  title: 'Fresh Ingredients',    desc: 'Locally sourced produce, premium meats, house-made dough daily.' },
  { Icon: Bike,  title: 'Fast Delivery',        desc: 'Order through UberEats, DoorDash, or Grubhub — hot to your door.' },
  { Icon: Star,  title: 'Community Favorite',   desc: 'Proudly serving the Lilburn & Gwinnett community since day one.' },
];

const DELIVERY_PLATFORMS = [
  { id: 'ubereats', prefix: 'Uber', bold: 'Eats', desc: 'Fast delivery, real-time tracking, exclusive deals.',      cls: 'platform-ubereats', color: '#06C167' },
  { id: 'doordash', prefix: 'Door', bold: 'Dash', desc: 'DashPass members get $0 delivery fees on eligible orders.', cls: 'platform-doordash', color: '#FF3008' },
  { id: 'grubhub',  prefix: 'Grub', bold: 'hub',  desc: 'Grubhub+ members enjoy free delivery and exclusive perks.', cls: 'platform-grubhub',  color: '#F63440' },
];

const GALLERY = [
  { src: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=800&q=82', alt: 'Fresh Crustic pizza with perfectly melted cheese and toppings', label: 'Made Fresh' },
  { src: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=600&q=82', alt: 'Overhead view of a fully loaded Crustic pizza with fresh toppings' },
  { src: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&w=600&q=82', alt: 'Crispy golden chicken wings fresh from the fryer' },
  { src: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=600&q=82', alt: 'Perfect pizza slice pull with melted mozzarella cheese stretch' },
  { src: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=600&q=82', alt: 'Creamy smoky carbonara pasta with golden pancetta' },
];

const FEATURED_IDS = ['p1', 'p2', 'w1'];
const featuredItems = FEATURED_IDS.map(id =>
  Object.values(menuItems).flat().find(item => item.id === id)
).filter(Boolean);

export default function HomePage({ onOrderClick }) {
  return (
    <div className="page-enter">

      {/* ══════════════════════════════════════════
          HERO  — full-bleed pizza photo background
      ══════════════════════════════════════════ */}
      <section
        className="relative min-h-screen [min-height:100svh] flex flex-col items-center justify-center text-center px-6 overflow-hidden pt-[72px]"
        style={{
          backgroundImage: `
            linear-gradient(to bottom,
              rgba(4,10,6,0.92) 0%,
              rgba(10,20,13,0.78) 40%,
              rgba(27,41,32,0.94) 100%
            ),
            url('https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1920&q=80')
          `,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        aria-label="Hero"
      >
        {/* Spinning decorative rings — hidden on mobile to avoid overflow */}
        <div className="hidden sm:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true">
          <div className="w-[480px] h-[480px] rounded-full animate-spin-slow" style={{ border: '1px solid rgba(200,92,42,0.12)' }} />
        </div>
        <div className="hidden sm:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true">
          <div className="w-[640px] h-[640px] rounded-full" style={{ border: '1px dashed rgba(200,92,42,0.06)' }} />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center max-w-3xl w-full">

          {/* ── CIRCULAR LOGO — the centrepiece ── */}
          <div className="relative mb-10 animate-float" style={{ animationDuration: '5s' }}>
            {/* Breathing glow blob behind */}
            <div
              className="absolute rounded-full animate-glow-breathe pointer-events-none"
              style={{
                inset: '-40px',
                background: 'radial-gradient(circle, rgba(200,92,42,0.30) 0%, rgba(232,136,58,0.12) 45%, transparent 72%)',
              }}
              aria-hidden="true"
            />
            {/* Outer thin ring */}
            <div className="absolute rounded-full pointer-events-none" style={{ inset: '-14px', border: '1px solid rgba(200,92,42,0.18)' }} aria-hidden="true" />
            {/* Inner ring */}
            <div className="absolute rounded-full pointer-events-none" style={{ inset: '-5px', border: '1px solid rgba(200,92,42,0.38)' }} aria-hidden="true" />

            {/* The circle */}
            <div
              className="w-48 h-48 sm:w-60 sm:h-60 md:w-72 md:h-72 rounded-full overflow-hidden"
              style={{
                border: '2.5px solid rgba(200,92,42,0.55)',
                boxShadow:
                  '0 0 0 1px rgba(200,92,42,0.08), ' +
                  '0 0 50px rgba(200,92,42,0.50), ' +
                  '0 0 100px rgba(200,92,42,0.18), ' +
                  '0 24px 60px rgba(0,0,0,0.65)',
              }}
            >
              <img
                src="/crustic-logo.png"
                alt="Crustic Pizza — Crispy Outside. Soft Inside."
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Amber rule */}
          <div className="w-24 h-px mb-7 opacity-50" style={{ background: 'linear-gradient(90deg, transparent, #E8883A, transparent)' }} aria-hidden="true" />

          <h1
            className="font-display font-black text-cream-500 leading-none mb-5 animate-fade-up"
            style={{ fontSize: 'clamp(2.6rem, 8vw, 5.5rem)', animationDelay: '0.12s', textShadow: '0 4px 40px rgba(0,0,0,0.6)' }}
          >
            Pizza That&nbsp;<span className="text-gradient">Burns</span>
            <br />With Passion
          </h1>

          <p
            className="leading-relaxed mb-9 max-w-lg animate-fade-up"
            style={{ fontSize: 'clamp(0.95rem, 2vw, 1.1rem)', animationDelay: '0.26s', color: '#9ab0a0' }}
          >
            Bold flavors, fresh ingredients, and a crust so perfectly made
            it has to be tasted to be believed.
            Located inside Plaza&nbsp;Los&nbsp;Américas, Lilburn,&nbsp;GA.
          </p>

          <div className="flex flex-wrap gap-4 justify-center animate-fade-up" style={{ animationDelay: '0.38s' }}>
            <Link
              to="/menu"
              className="btn-shimmer px-9 py-3.5 rounded-xl font-bold text-cream-500 text-base transition-all duration-200 hover:scale-105 hover:shadow-2xl"
              style={{ background: 'linear-gradient(135deg, #C85C2A 0%, #A84A25 100%)', boxShadow: '0 6px 28px rgba(200,92,42,0.45)' }}
            >
              View Menu
            </Link>
            <button
              onClick={onOrderClick}
              className="px-9 py-3.5 rounded-xl font-bold text-cream-500 text-base border-2 transition-all duration-200 hover:scale-105"
              style={{ background: 'rgba(255,255,255,0.06)', borderColor: 'rgba(237,228,203,0.22)', backdropFilter: 'blur(8px)' }}
            >
              Order Now
            </button>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 animate-scroll-bounce" aria-hidden="true">
          <span className="text-terra-500/60 text-[0.65rem] font-bold tracking-widest uppercase">Scroll</span>
          <ChevronDown size={18} className="text-terra-400 opacity-60" />
        </div>

        {/* Fade to next section */}
        <div className="absolute -bottom-px left-0 right-0 h-24 pointer-events-none" style={{ background: 'linear-gradient(to bottom, transparent, #111F16)' }} aria-hidden="true" />
      </section>

      {/* ══════════════════════════════════════════
          FEATURES
      ══════════════════════════════════════════ */}
      <section
        className="py-20 border-b border-forest-400/25"
        style={{ background: 'linear-gradient(160deg, #111F16 0%, #16221A 100%)' }}
        aria-label="Why Crustic"
      >
        <div className="max-w-6xl mx-auto px-6">
          <Reveal className="text-center mb-12">
            <p className="text-terra-400 text-xs font-bold tracking-widest uppercase mb-3">Why Crustic</p>
            <h2 className="font-display font-black text-cream-500 text-4xl sm:text-5xl">
              Made Different.{' '}
              <span className="text-gradient">Tasted Different.</span>
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {FEATURES.map(({ Icon, title, desc }, i) => (
              <Reveal key={title} delay={i + 1}>
                <div
                  className="flex flex-col items-center text-center p-7 rounded-3xl border border-forest-400/50 transition-all duration-300 hover:-translate-y-2 hover:border-terra-600/40 group"
                  style={{ background: 'rgba(34,48,40,0.55)', backdropFilter: 'blur(8px)' }}
                >
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"
                    style={{ background: 'linear-gradient(135deg, rgba(200,92,42,0.22), rgba(168,74,37,0.08))', border: '1px solid rgba(200,92,42,0.25)' }}
                  >
                    <Icon size={24} className="text-terra-400" />
                  </div>
                  <h3 className="font-display font-bold text-cream-500 text-lg mb-2">{title}</h3>
                  <p className="text-forest-100 text-sm leading-relaxed">{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          PHOTO GALLERY — "Crafted to Perfection"
      ══════════════════════════════════════════ */}
      <section className="py-24 bg-forest-700" aria-label="Food gallery">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal className="text-center mb-12">
            <p className="text-terra-400 text-xs font-bold tracking-widest uppercase mb-3">The Craft</p>
            <h2 className="font-display font-black text-cream-500 text-4xl sm:text-5xl">
              Crafted to <span className="text-gradient">Perfection</span>
            </h2>
            <p className="text-forest-100 mt-3 max-w-md mx-auto text-base">
              Every dish is a labor of love — from the 72-hour fermented dough to the last drizzle of hot honey.
            </p>
          </Reveal>

          {/* Asymmetric mosaic grid — responsive via .gallery-grid CSS class */}
          <div className="gallery-grid grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {/* Big image — spans 2 rows on md+ */}
            <Reveal className="col-span-1 md:row-span-2 overflow-hidden rounded-2xl md:rounded-3xl">
              <div className="relative w-full h-full group cursor-pointer overflow-hidden rounded-2xl md:rounded-3xl">
                <img
                  src={GALLERY[0].src}
                  alt={GALLERY[0].alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                {GALLERY[0].label && (
                  <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4">
                    <span className="text-cream-500 font-display font-bold text-sm sm:text-base tracking-wide">{GALLERY[0].label}</span>
                  </div>
                )}
              </div>
            </Reveal>

            {/* Four regular images — last one goes full-width on mobile so no orphan */}
            {GALLERY.slice(1).map((img, i) => (
              <Reveal
                key={i}
                delay={(i % 2) + 1}
                className={`overflow-hidden rounded-2xl ${i === 3 ? 'col-span-2 md:col-span-1' : ''}`}
              >
                <div className="relative w-full h-full group cursor-pointer overflow-hidden rounded-2xl">
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          MENU SPOTLIGHT
      ══════════════════════════════════════════ */}
      <section
        className="py-24"
        style={{ background: 'linear-gradient(160deg, #16221A 0%, #1B2920 100%)' }}
        aria-label="Menu spotlight"
      >
        <div className="max-w-6xl mx-auto px-6">
          <Reveal className="flex flex-col sm:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <p className="text-terra-400 text-xs font-bold tracking-widest uppercase mb-3">A Taste of What's Inside</p>
              <h2 className="font-display font-black text-cream-500 text-4xl sm:text-5xl leading-tight">
                Our Most-Loved<br />Dishes
              </h2>
            </div>
            <Link
              to="/menu"
              className="flex-shrink-0 text-sm font-semibold text-terra-400 border border-terra-700/50 px-5 py-2.5 rounded-xl hover:bg-terra-600 hover:text-cream-500 hover:border-terra-600 transition-all duration-200"
            >
              Full Menu →
            </Link>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredItems.map((item, i) => (
              <Reveal key={item.id} delay={i + 1}>
                <MenuCard item={item} />
              </Reveal>
            ))}
          </div>

          <Reveal className="text-center mt-12">
            <Link
              to="/menu"
              className="btn-shimmer inline-flex items-center gap-2 px-9 py-3.5 rounded-xl font-bold text-cream-500 text-base transition-all duration-200 hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #C85C2A 0%, #A84A25 100%)', boxShadow: '0 6px 28px rgba(200,92,42,0.38)' }}
            >
              See the Full Menu
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          TAGLINE BANNER — full-bleed oven fire photo
      ══════════════════════════════════════════ */}
      <section
        className="relative py-32 overflow-hidden"
        style={{
          backgroundImage: `
            linear-gradient(to bottom, rgba(4,10,6,0.86), rgba(4,10,6,0.86)),
            url('https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=1920&q=80')
          `,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        aria-label="Brand promise"
      >
        <span className="absolute -top-8 left-6 font-display font-black text-[14rem] leading-none opacity-[0.035] select-none pointer-events-none text-terra-400" aria-hidden="true">"</span>
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <Reveal>
            <p className="font-display font-bold italic text-cream-500 leading-snug mb-6"
              style={{ fontSize: 'clamp(1.8rem, 4.5vw, 3.2rem)' }}>
              "Crispy outside.<br />Soft inside.<br />
              <span className="text-gradient">Real ingredients. Real pizza."</span>
            </p>
            <div className="w-16 h-px mx-auto mb-5 opacity-40" style={{ background: 'linear-gradient(90deg, transparent, #E8883A, transparent)' }} />
            <p className="text-forest-100 text-sm tracking-widest uppercase">— The Crustic Promise</p>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          LOCATION CTA
      ══════════════════════════════════════════ */}
      <section
        className="py-20 border-y border-forest-400/25"
        style={{ background: 'linear-gradient(160deg, #111F16 0%, #16221A 100%)' }}
        aria-label="Find us"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Map image */}
            <Reveal>
              <div className="rounded-4xl overflow-hidden border border-forest-400/40"
                style={{ boxShadow: '0 24px 64px rgba(0,0,0,0.55), 0 0 0 1px rgba(200,92,42,0.1)' }}>
                <img
                  src="/crustic-map.jpg"
                  alt="Indoor map of Plaza Los Américas in Lilburn GA — the red circle marks Crustic Pizza. Enter main doors, turn right, find us in the first hallway."
                  className="w-full h-64 object-cover"
                />
                <div className="px-5 py-4 border-t border-forest-400/40" style={{ background: 'rgba(27,41,32,0.95)' }}>
                  <p className="text-forest-100 text-xs leading-relaxed">
                    Interior layout of Plaza Los Américas. The red circle marks our storefront.
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Directions */}
            <Reveal delay={1}>
              <p className="text-terra-400 text-xs font-bold tracking-widest uppercase mb-4">Find Us</p>
              <h2 className="font-display font-black text-cream-500 leading-tight mb-6"
                style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
                Inside Plaza<br />Los Américas
              </h2>
              <ol className="flex flex-col gap-4 mb-8">
                {[
                  'Enter through the <strong>main front entrance</strong> on Pleasant Hill Rd.',
                  '<strong>Turn right</strong> immediately after the entrance doors.',
                  'Head down the <strong>first hallway</strong> on your right.',
                  'Our storefront is <strong>right there</strong> — look for the Crustic Pizza sign!',
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-7 h-7 rounded-full text-xs font-bold text-cream-500 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #C85C2A, #A84A25)' }}>
                      {i + 1}
                    </span>
                    <span className="text-forest-100 text-sm leading-relaxed pt-0.5" dangerouslySetInnerHTML={{ __html: step }} />
                  </li>
                ))}
              </ol>
              <div className="flex flex-wrap gap-3">
                <Link to="/location" className="btn-shimmer px-6 py-3 rounded-xl font-bold text-sm text-cream-500 transition-all duration-200 hover:scale-105" style={{ background: 'linear-gradient(135deg, #C85C2A 0%, #A84A25 100%)' }}>
                  Hours &amp; Full Directions
                </Link>
                <a href="https://maps.google.com/?q=733+Pleasant+Hill+Rd+Lilburn+GA+30047" target="_blank" rel="noopener noreferrer" className="px-6 py-3 rounded-xl font-bold text-sm text-cream-500 border border-forest-300 hover:border-terra-500 hover:text-terra-300 transition-all duration-200">
                  Google Maps →
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          DELIVERY PLATFORMS
      ══════════════════════════════════════════ */}
      <section className="py-24 bg-forest-600" aria-label="Delivery options" id="delivery">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal className="text-center mb-12">
            <p className="text-terra-400 text-xs font-bold tracking-widest uppercase mb-3">Delivery</p>
            <h2 className="font-display font-black text-cream-500 text-4xl sm:text-5xl mb-3">
              Order on Your<br />Favorite Platform
            </h2>
            <p className="text-forest-100 text-base max-w-md mx-auto">
              We partner with the top delivery services so you get Crustic hot, fast, and exactly how you want it.
            </p>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {DELIVERY_PLATFORMS.map(({ id, prefix, bold, desc, cls, color }, i) => (
              <Reveal key={id} delay={i + 1}>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex flex-col items-center text-center p-9 rounded-4xl border border-forest-300 bg-forest-500 transition-all duration-300 hover:-translate-y-2 card-glow-hover ${cls} group`}
                >
                  <p className="text-cream-500 font-light text-3xl tracking-tight mb-3">
                    {prefix}<strong className="font-black">{bold}</strong>
                  </p>
                  <p className="text-forest-100 text-sm leading-relaxed mb-4">{desc}</p>
                  <span className="text-xs font-bold tracking-wider uppercase" style={{ color }}>Order Now →</span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
