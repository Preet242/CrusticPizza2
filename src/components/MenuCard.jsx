export default function MenuCard({ item }) {
  const { name, price, description, badge, badgeType, tags, image } = item;

  const badgeClasses =
    badgeType === 'spicy'
      ? 'bg-red-900/90 text-red-200 border border-red-700/60 backdrop-blur-sm'
      : 'bg-terra-800/90 text-terra-100 border border-terra-600/60 backdrop-blur-sm';

  return (
    <article className="group flex flex-col bg-forest-500 border border-forest-300 rounded-3xl overflow-hidden card-glow-hover h-full">

      {/* ── Food photo with badge overlaid on image ── */}
      <div className="relative h-40 sm:h-48 overflow-hidden flex-shrink-0">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        {/* Gradient overlay so text below is readable at card edge */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, transparent 40%, rgba(20,32,24,0.75) 100%)' }}
        />
        {/* Badge floats over the IMAGE corner — never over card text */}
        {badge && (
          <span className={`absolute top-3 left-3 text-[0.67rem] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full ${badgeClasses}`}>
            {badge}
          </span>
        )}
      </div>

      {/* ── Card body — no floating elements, clean text ── */}
      <div className="flex flex-col flex-1 px-5 py-5 gap-2.5">
        <div className="flex justify-between items-start gap-3">
          <h3 className="font-display font-bold text-cream-500 leading-snug text-[1.12rem]">{name}</h3>
          <span className="font-bold text-terra-400 text-base whitespace-nowrap flex-shrink-0 pt-0.5">{price}</span>
        </div>

        <p className="text-forest-100 text-sm leading-relaxed flex-1">{description}</p>

        <div className="flex flex-wrap gap-1.5 pt-1">
          {tags.map(tag => (
            <span
              key={tag}
              className="text-[0.65rem] font-semibold tracking-wide uppercase px-2.5 py-1 rounded-full bg-forest-400 text-terra-300 border border-terra-900/40"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
