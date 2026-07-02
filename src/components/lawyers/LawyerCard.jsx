import { Phone, MapPin, Star, BadgeCheck, MessageSquare } from 'lucide-react';
import clsx from 'clsx';

const SPECIALIZATION_COLORS = {
  'Consumer Law': 'bg-blue-50 text-blue-700',
  'Criminal Law': 'bg-red-50 text-red-700',
  'Family Law': 'bg-pink-50 text-pink-700',
  'Property Law': 'bg-green-50 text-green-700',
  'Labour Law': 'bg-yellow-50 text-yellow-700',
  'Cyber Law': 'bg-purple-50 text-purple-700',
  'RTI / PIL': 'bg-orange-50 text-orange-700',
  'Constitutional Law': 'bg-navy-50 text-navy-700',
};

export default function LawyerCard({ lawyer }) {
  const {
    name, nameHi, city, cityHi, specializations, rating, reviewCount,
    verified, experience, languages, freeConsultation, phone,
  } = lawyer;

  return (
    <div className="card p-5 hover:border-navy-200 transition-all duration-200">
      {/* Header */}
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-navy-600 to-navy-800 flex items-center justify-center flex-shrink-0 text-white font-bold text-xl">
          {name.charAt(0)}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-semibold text-navy-700 text-sm md:text-base">{name}</h3>
                {verified && (
                  <BadgeCheck className="w-4 h-4 text-blue-500 flex-shrink-0" aria-label="Verified" />
                )}
              </div>
              <p className="text-xs text-gray-400 font-hindi mt-0.5">{nameHi}</p>
            </div>
            {freeConsultation && (
              <span className="text-[10px] bg-green-50 text-green-700 border border-green-200 px-2 py-0.5 rounded-full font-semibold flex-shrink-0">
                Free Consult
              </span>
            )}
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mt-1">
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  className={clsx('w-3 h-3', s <= Math.round(rating) ? 'text-saffron-400 fill-saffron-400' : 'text-gray-200 fill-gray-200')}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500">{rating} ({reviewCount} reviews)</span>
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="mt-4 space-y-2">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <MapPin className="w-3.5 h-3.5 text-navy-400 flex-shrink-0" />
          <span>{city}</span>
          <span className="text-gray-300">|</span>
          <span className="font-hindi text-gray-400">{cityHi}</span>
          <span className="text-gray-300 ml-auto">Exp: {experience} yrs</span>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-gray-500">
          <MessageSquare className="w-3.5 h-3.5 text-navy-400 flex-shrink-0" />
          <span>{languages.join(', ')}</span>
        </div>
      </div>

      {/* Specializations */}
      <div className="flex flex-wrap gap-1.5 mt-3">
        {specializations.map((spec) => (
          <span
            key={spec}
            className={clsx(
              'text-[10px] px-2 py-0.5 rounded-full font-medium border border-transparent',
              SPECIALIZATION_COLORS[spec] || 'bg-gray-50 text-gray-600'
            )}
          >
            {spec}
          </span>
        ))}
      </div>

      {/* Actions */}
      <div className="flex gap-2 mt-4">
        <a
          href={`tel:${phone}`}
          className="flex-1 btn-secondary text-xs py-2 justify-center"
          aria-label={`Call ${name}`}
        >
          <Phone className="w-3.5 h-3.5" />
          Contact / संपर्क
        </a>
        <button className="flex-1 btn-outline text-xs py-2 justify-center">
          View Profile
        </button>
      </div>
    </div>
  );
}
