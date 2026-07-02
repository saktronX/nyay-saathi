import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import clsx from 'clsx';

export default function LegalCategoryCard({ category, compact = false }) {
  const { icon: Icon, nameEn, nameHi, laws, slug, color, description } = category;

  return (
    <Link
      to={`/legal-categories/${slug}`}
      className={clsx(
        'card group block p-5 hover:border-navy-200 transition-all duration-200 hover:-translate-y-0.5',
        compact ? 'p-4' : 'p-5'
      )}
      aria-label={`${nameEn} - ${nameHi}`}
    >
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className={clsx(
          'flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-colors',
          color || 'bg-navy-50 group-hover:bg-navy-100'
        )}>
          <Icon className="w-6 h-6 text-navy-700" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-semibold text-navy-700 text-sm md:text-base group-hover:text-navy-600 transition-colors">
                {nameEn}
              </h3>
              <p className="text-xs text-gray-400 font-hindi mt-0.5">{nameHi}</p>
            </div>
            <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-saffron-500 flex-shrink-0 mt-0.5 transition-colors" />
          </div>

          {!compact && description && (
            <p className="text-xs text-gray-500 mt-2 line-clamp-2">{description}</p>
          )}

          {/* Law tags */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {laws.slice(0, compact ? 2 : 3).map((law) => (
              <span
                key={law}
                className="text-[10px] bg-navy-50 text-navy-600 border border-navy-100 px-2 py-0.5 rounded-full font-medium"
              >
                {law}
              </span>
            ))}
            {laws.length > (compact ? 2 : 3) && (
              <span className="text-[10px] text-gray-400">+{laws.length - (compact ? 2 : 3)} more</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
