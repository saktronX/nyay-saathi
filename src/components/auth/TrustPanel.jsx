import { Scale, ShieldCheck, DatabaseZap, Infinity, Star, Landmark } from 'lucide-react';

const TRUST_BADGES = [
  {
    icon: ShieldCheck,
    titleEn: '256-bit Encrypted',
    titleHi: '256-बिट एन्क्रिप्टेड',
    desc: 'Your data is protected with bank-grade encryption.',
  },
  {
    icon: DatabaseZap,
    titleEn: 'No Data Sold',
    titleHi: 'डेटा नहीं बेचा जाता',
    desc: 'We never share or sell your personal information.',
  },
  {
    icon: Infinity,
    titleEn: 'Free Forever',
    titleHi: 'हमेशा मुफ्त',
    desc: 'Nyay Saathi is and will always be completely free.',
  },
];

export default function TrustPanel() {
  return (
    <div className="w-full bg-navy-900 border-l border-navy-700/60 flex flex-col justify-between px-10 py-12">
      {/* Logo + tagline */}
      <div>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 bg-saffron-400 rounded-xl flex items-center justify-center flex-shrink-0">
            <Scale className="w-6 h-6 text-navy-700" />
          </div>
          <div>
            <span className="block text-white font-bold text-xl tracking-wide">Nyay Saathi</span>
            <span className="block text-saffron-400 text-sm font-hindi">न्याय साथी</span>
          </div>
        </div>
        <p className="text-gray-400 text-sm leading-relaxed mt-2 max-w-xs">
          Free AI-powered legal aid for every Indian citizen — in Hindi and English.
        </p>
        <p className="text-gray-500 text-xs font-hindi mt-1">
          हर भारतीय नागरिक के लिए मुफ्त AI-संचालित कानूनी सहायता।
        </p>
      </div>

      {/* Divider */}
      <div className="h-px bg-navy-700 my-8" />

      {/* Trust badges */}
      <div className="space-y-5">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
          Why Trust Us <span className="font-hindi normal-case tracking-normal">/ हम पर भरोसा क्यों</span>
        </h3>
        {TRUST_BADGES.map((b) => {
          const Icon = b.icon;
          return (
            <div key={b.titleEn} className="flex items-start gap-4">
              <div className="w-9 h-9 bg-navy-800 border border-navy-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <Icon className="w-4 h-4 text-saffron-400" />
              </div>
              <div>
                <p className="text-white text-sm font-semibold">{b.titleEn}</p>
                <p className="text-gray-500 text-[10px] font-hindi">{b.titleHi}</p>
                <p className="text-gray-400 text-xs mt-0.5">{b.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Divider */}
      <div className="h-px bg-navy-700 my-8" />

      {/* Quote / Social proof */}
      <div className="bg-navy-800 border border-navy-700 rounded-xl p-5">
        <div className="flex gap-0.5 mb-3">
          {[1,2,3,4,5].map((s) => (
            <Star key={s} className="w-3.5 h-3.5 text-saffron-400 fill-saffron-400" />
          ))}
        </div>
        <blockquote className="text-gray-200 text-sm leading-relaxed italic">
          "2.4 lakh+ citizens have used Nyay Saathi to know their rights and get free legal guidance."
        </blockquote>
        <p className="text-gray-500 text-xs font-hindi mt-2 not-italic">
          "2.4 लाख+ नागरिकों ने न्याय साथी का उपयोग करके अपने अधिकार जाने।"
        </p>
      </div>

      {/* Divider */}
      <div className="h-px bg-navy-700 my-8" />

      {/* Ministry placeholder + fine print */}
      <div className="flex items-start gap-3">
        {/* Ministry logo placeholder */}
        <div className="w-10 h-10 bg-navy-800 border border-navy-600 rounded-lg flex items-center justify-center flex-shrink-0">
          <Landmark className="w-5 h-5 text-gray-400" />
        </div>
        <div>
          <p className="text-[11px] text-gray-400 leading-relaxed">
            <span className="text-gray-300 font-medium">Ministry of Law & Justice</span>
            <br />
            Aligned with Digital India initiatives.
          </p>
          <p className="text-[10px] text-gray-600 mt-1.5 leading-relaxed">
            ⚠ AI-assisted information only — not legal advice.
            Always consult a qualified lawyer for specific matters.
          </p>
          <p className="text-[10px] text-gray-600 font-hindi mt-0.5">
            यह AI-सहायक जानकारी है — कानूनी सलाह नहीं।
          </p>
        </div>
      </div>
    </div>
  );
}
