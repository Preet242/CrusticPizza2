import { Link } from 'react-router-dom';
import { useInView } from '../hooks/useInView';
import { MapPin, Phone, Mail, Clock, Navigation } from 'lucide-react';

function Reveal({ children, delay = 0, className = '' }) {
  const [ref, visible] = useInView();
  return (
    <div ref={ref} className={`reveal ${visible ? 'visible' : ''} reveal-delay-${delay} ${className}`}>
      {children}
    </div>
  );
}

const HOURS = [
  { days: 'Monday – Sunday', open: '11:00 AM', close: '8:00 PM' },
];

const DIRECTIONS = [
  { step: 'Enter through the <strong>main front entrance</strong> of Plaza Los Américas on Pleasant Hill Rd.' },
  { step: 'Once inside, <strong>turn right</strong> immediately after the entrance doors.' },
  { step: 'Head down the <strong>first hallway on your right</strong>.' },
  { step: 'Our storefront is <strong>right there</strong> — you can\'t miss the Crustic Pizza sign!' },
];

export default function LocationPage() {
  return (
    <div className="page-enter min-h-screen" style={{ paddingTop: '72px' }}>

      {/* ── Page header ── */}
      <section
        className="relative py-24 overflow-hidden text-center"
        style={{
          backgroundImage: `
            linear-gradient(to bottom, rgba(4,9,6,0.88) 0%, rgba(10,20,13,0.80) 50%, rgba(27,41,32,0.97) 100%),
            url('https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1920&q=80')
          `,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        aria-label="Location page header"
      >
        <div
          className="absolute top-1/2 left-[-80px] -translate-y-1/2 w-64 h-64 rounded-full pointer-events-none opacity-25 animate-spin-slow"
          style={{ border: '1px solid rgba(200,92,42,0.2)', animationDirection: 'reverse' }}
          aria-hidden="true"
        />
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          {/* Circular logo in page header */}
          <div className="relative inline-block mb-7">
            <div className="absolute rounded-full pointer-events-none" style={{ inset: '-8px', border: '1px solid rgba(200,92,42,0.3)' }} />
            <div className="w-20 h-20 rounded-full overflow-hidden mx-auto"
              style={{ border: '2px solid rgba(200,92,42,0.5)', boxShadow: '0 0 30px rgba(200,92,42,0.4), 0 8px 24px rgba(0,0,0,0.5)' }}>
              <img src={`${import.meta.env.BASE_URL}crustic-logo.png`} alt="" aria-hidden="true" className="w-full h-full object-cover" />
            </div>
          </div>
          <p className="text-terra-400 text-xs font-bold tracking-widest uppercase mb-4">Come Find Us</p>
          <h1
            className="font-display font-black text-cream-500 leading-tight mb-4"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}
          >
            Location &amp; Hours
          </h1>
          <p className="text-forest-100 max-w-md mx-auto text-base">
            We're tucked right inside Plaza Los Américas — easier to find than you think.
          </p>
        </div>
        <div
          className="absolute -bottom-1 left-0 right-0 h-16 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, transparent, #1B2920)' }}
          aria-hidden="true"
        />
      </section>

      {/* ── Map + Directions ── */}
      <section
        className="py-20"
        style={{ background: 'linear-gradient(160deg, #1B2920 0%, #16221A 100%)' }}
        aria-label="Map and directions"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-start">

            {/* Map — pushed below info on mobile via order */}
            <Reveal className="order-2 lg:order-1">
              <div className="lg:sticky" style={{ top: 'calc(72px + 2rem)' }}>
                <figure
                  className="rounded-4xl overflow-hidden border border-forest-400/40 shadow-2xl"
                  style={{ boxShadow: '0 24px 64px rgba(0,0,0,0.55), 0 0 0 1px rgba(200,92,42,0.1)' }}
                >
                  <img
                    src={`${import.meta.env.BASE_URL}crustic-map.jpg`}
                    alt="Interior floor plan of Plaza Los Américas in Lilburn GA showing Crustic Pizza location highlighted with a red circle — enter the front door, turn right, find us in the first hallway on the right"
                    className="w-full h-auto object-cover"
                    loading="lazy"
                  />
                  <figcaption
                    className="px-5 py-4 border-t border-forest-400/40 text-forest-100 text-xs leading-relaxed"
                    style={{ background: 'rgba(27,41,32,0.95)' }}
                  >
                    Interior map of Plaza Los Américas. The red circle marks our storefront — enter through the main doors, turn right, and we're in the first hallway.
                  </figcaption>
                </figure>

                <div className="mt-4">
                  <a
                    href="https://maps.google.com/?q=733+Pleasant+Hill+Rd+Lilburn+GA+30047"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl border border-forest-300 text-sm font-semibold text-cream-500 hover:border-terra-500 hover:text-terra-300 transition-all duration-200"
                    style={{ background: 'rgba(34,48,40,0.6)' }}
                  >
                    <Navigation size={15} />
                    Get Directions on Google Maps
                  </a>
                </div>
              </div>
            </Reveal>

            {/* Info column — comes first on mobile */}
            <div className="flex flex-col gap-5 sm:gap-6 order-1 lg:order-2">

              {/* Address */}
              <Reveal delay={1}>
                <div
                  className="rounded-3xl border border-forest-300 p-5 sm:p-7"
                  style={{ background: 'rgba(34,48,40,0.7)' }}
                >
                  <div className="flex items-center gap-2.5 mb-4">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'rgba(200,92,42,0.2)' }}>
                      <MapPin size={14} className="text-terra-400" />
                    </div>
                    <span className="text-terra-400 text-xs font-bold tracking-widest uppercase">Address</span>
                  </div>
                  <address className="not-italic text-cream-500 font-medium leading-relaxed text-base">
                    <strong>Crustic Pizza</strong><br />
                    733 Pleasant Hill Rd<br />
                    Lilburn, GA 30047
                  </address>
                  <p className="mt-2 text-terra-400 text-sm font-medium">Located inside Plaza Los Américas</p>
                </div>
              </Reveal>

              {/* Step-by-step directions */}
              <Reveal delay={2}>
                <div
                  className="rounded-3xl border p-5 sm:p-7"
                  style={{
                    background: 'linear-gradient(135deg, rgba(34,48,40,0.7), rgba(200,92,42,0.05))',
                    borderColor: 'rgba(200,92,42,0.22)',
                  }}
                >
                  <div className="flex items-center gap-2.5 mb-6">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'rgba(200,92,42,0.2)' }}>
                      <Navigation size={14} className="text-terra-400" />
                    </div>
                    <span className="text-terra-400 text-xs font-bold tracking-widest uppercase">How to Find Us Inside</span>
                  </div>

                  <ol className="flex flex-col gap-5" aria-label="Step-by-step directions inside Plaza Los Américas">
                    {DIRECTIONS.map(({ step }, i) => (
                      <li key={i} className="flex items-start gap-4">
                        <span
                          className="flex-shrink-0 w-7 h-7 rounded-full text-xs font-bold text-cream-500 flex items-center justify-center"
                          style={{ background: 'linear-gradient(135deg, #C85C2A, #A84A25)', boxShadow: '0 4px 12px rgba(200,92,42,0.35)' }}
                        >
                          {i + 1}
                        </span>
                        <span
                          className="text-forest-100 text-sm leading-relaxed pt-0.5"
                          dangerouslySetInnerHTML={{ __html: step }}
                        />
                      </li>
                    ))}
                  </ol>
                </div>
              </Reveal>

              {/* Hours */}
              <Reveal delay={3}>
                <div
                  className="rounded-3xl border border-forest-300 p-5 sm:p-7"
                  style={{ background: 'rgba(34,48,40,0.7)' }}
                >
                  <div className="flex items-center gap-2.5 mb-5">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'rgba(200,92,42,0.2)' }}>
                      <Clock size={14} className="text-terra-400" />
                    </div>
                    <span className="text-terra-400 text-xs font-bold tracking-widest uppercase">Hours of Operation</span>
                  </div>

                  <table className="w-full" aria-label="Operating hours">
                    <tbody>
                      {HOURS.map(({ days, open, close }) => (
                        <tr key={days} className="hours-row rounded-xl">
                          <td className="py-3 pr-6 text-forest-100 text-sm">{days}</td>
                          <td className="py-3 text-right">
                            <span className="text-cream-500 font-semibold text-sm">{open}</span>
                            <span className="text-forest-200 text-sm mx-1.5">–</span>
                            <span className="text-cream-500 font-semibold text-sm">{close}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <div
                    className="mt-4 pt-4 border-t border-forest-400/30 flex items-center gap-2"
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-emerald-400 text-xs font-semibold">Open today · Closes 8:00 PM</span>
                  </div>
                </div>
              </Reveal>

              {/* Contact */}
              <Reveal delay={4}>
                <div
                  className="rounded-3xl border border-forest-300 p-5 sm:p-7"
                  style={{ background: 'rgba(34,48,40,0.7)' }}
                >
                  <div className="flex items-center gap-2.5 mb-5">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'rgba(200,92,42,0.2)' }}>
                      <Phone size={14} className="text-terra-400" />
                    </div>
                    <span className="text-terra-400 text-xs font-bold tracking-widest uppercase">Contact</span>
                  </div>
                  <div className="flex flex-col gap-3">
                    <a href="tel:+14045550199" className="flex items-center gap-3 text-cream-500 font-medium hover:text-terra-300 transition-colors duration-200">
                      <Phone size={16} className="text-terra-500" />
                      (404) 555-0199
                    </a>
                    <a href="mailto:hello@crusticpizza.com" className="flex items-center gap-3 text-cream-500 font-medium hover:text-terra-300 transition-colors duration-200">
                      <Mail size={16} className="text-terra-500" />
                      hello@crusticpizza.com
                    </a>
                  </div>
                </div>
              </Reveal>

            </div>
          </div>
        </div>
      </section>

      {/* ── Delivery CTA ── */}
      <section
        className="py-20 border-t border-forest-400/30"
        style={{ background: 'linear-gradient(160deg, #111F16 0%, #0D1810 100%)' }}
        aria-label="Order delivery"
      >
        <div className="max-w-6xl mx-auto px-6 text-center">
          <Reveal>
            <p className="text-terra-400 text-xs font-bold tracking-widest uppercase mb-4">Can't Come In?</p>
            <h2 className="font-display font-black text-cream-500 text-4xl sm:text-5xl mb-4">
              We Deliver to You
            </h2>
            <p className="text-forest-100 mb-8 max-w-sm mx-auto">
              Order through your favorite platform and get Crustic delivered hot and fast.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              {[
                { name: 'UberEats',  color: '#06C167' },
                { name: 'DoorDash',  color: '#FF3008' },
                { name: 'Grubhub',   color: '#F63440' },
              ].map(({ name, color }) => (
                <a
                  key={name}
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-7 py-3.5 rounded-xl border border-forest-300 text-sm font-bold transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
                  style={{ color, borderColor: `${color}33`, background: `${color}0D` }}
                >
                  Order on {name} →
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
