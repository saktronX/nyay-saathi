import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Users, FileText, Phone } from 'lucide-react';
import ChatBox from '../components/chat/ChatBox';
import LegalCategoryCard from '../components/legal/LegalCategoryCard';
import { LEGAL_CATEGORIES } from '../data/legalData';
import { useLanguage } from '../context/LanguageContext';

const STATS = [
  { value: '2.4L+', label: 'Citizens Helped', labelHi: 'नागरिकों की मदद' },
  { value: '12K+', label: 'Notices Generated', labelHi: 'नोटिस जारी' },
  { value: '800+', label: 'Verified Lawyers', labelHi: 'सत्यापित वकील' },
  { value: '100%', label: 'Free Service', labelHi: 'मुफ्त सेवा' },
];

const HOW_IT_WORKS = [
  {
    step: '01',
    icon: FileText,
    titleEn: 'Describe Your Issue',
    titleHi: 'अपनी समस्या बताएं',
    descEn: 'Tell the AI your legal concern in Hindi or English — simply in your own words.',
    descHi: 'अपनी कानूनी समस्या हिंदी या अंग्रेजी में AI को बताएं।',
  },
  {
    step: '02',
    icon: Shield,
    titleEn: 'Get Instant Guidance',
    titleHi: 'तुरंत मार्गदर्शन पाएं',
    descEn: 'Receive step-by-step guidance based on Indian law — rights, remedies, and next steps.',
    descHi: 'भारतीय कानून के आधार पर चरण-दर-चरण मार्गदर्शन प्राप्त करें।',
  },
  {
    step: '03',
    icon: Users,
    titleEn: 'Connect with a Lawyer',
    titleHi: 'वकील से जुड़ें',
    descEn: 'If needed, find verified lawyers in your city who speak your language.',
    descHi: 'जरूरत पड़ने पर अपने शहर में सत्यापित वकील खोजें।',
  },
];

export default function HomePage() {
  const { lang, t } = useLanguage();

  return (
    <div className="animate-fade-in">
      {/* ===== HERO ===== */}
      <section className="bg-gradient-to-br from-navy-900 via-navy-700 to-navy-800 relative overflow-hidden">
        {/* Decorative pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full"
            style={{
              backgroundImage: 'radial-gradient(circle at 25% 25%, #f5a623 0%, transparent 50%), radial-gradient(circle at 75% 75%, #f5a623 0%, transparent 50%)',
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text */}
            <div className="animate-slide-up">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-saffron-400/10 border border-saffron-400/30 text-saffron-300 px-3 py-1.5 rounded-full text-xs font-semibold mb-6">
                <span className="w-1.5 h-1.5 bg-saffron-400 rounded-full" />
                Free AI Legal Aid for Every Indian
                <span className="font-hindi text-saffron-400/70">/ हर भारतीय के लिए</span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-2">
                {lang === 'hi' ? 'आपका मुफ्त' : 'Your Free'}
                <span className="text-saffron-400 block">{lang === 'hi' ? 'कानूनी साथी' : 'Legal Companion'}</span>
              </h1>
              <p className="text-navy-300 font-hindi text-base mb-6">
                {lang === 'hi' ? 'हर भारतीय नागरिक के लिए — न्याय साथी' : 'न्याय साथी — हर भारतीय के लिए'}
              </p>

              <p className="text-gray-300 text-base leading-relaxed mb-8 max-w-lg">
                {lang === 'hi'
                  ? 'हिंदी या अंग्रेजी में तुरंत AI-संचालित कानूनी मार्गदर्शन प्राप्त करें — अपने अधिकार जानें, कानूनी नोटिस बनाएं, योग्य वकील खोजें।'
                  : 'Get instant AI-powered legal guidance in Hindi or English — know your rights, generate legal notices, and connect with verified lawyers across India.'
                }
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                {STATS.map((stat) => (
                  <div key={stat.value} className="text-center">
                    <p className="text-2xl font-bold text-saffron-400">{stat.value}</p>
                    <p className="text-xs text-gray-400">{stat.label}</p>
                    <p className="text-[10px] text-gray-500 font-hindi">{stat.labelHi}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <Link to="/legal-categories" className="btn-primary text-sm">
                  Explore Legal Rights
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/notice-generator" className="btn-outline border-saffron-400/50 text-saffron-300 hover:bg-saffron-400 hover:text-navy-800 text-sm">
                  Generate Legal Notice
                </Link>
              </div>

              {/* Helpline */}
              <div className="flex items-center gap-2 mt-6 text-sm text-gray-400">
                <Phone className="w-4 h-4 text-saffron-400" />
                <span>National Legal Helpline: </span>
                <a href="tel:15100" className="text-saffron-400 font-semibold hover:text-saffron-300">15100</a>
                <span className="text-gray-600">|</span>
                <a href="tel:18001114000" className="text-saffron-400 font-semibold hover:text-saffron-300">1800-11-4000</a>
                <span className="text-[11px] font-hindi text-gray-500">(निःशुल्क)</span>
              </div>
            </div>

            {/* Right: ChatBox */}
            <div className="lg:pl-4">
              <ChatBox />
            </div>
          </div>
        </div>
      </section>

      {/* ===== LEGAL CATEGORIES (preview) ===== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="section-title">{lang === 'hi' ? 'कानूनी श्रेणियां' : 'Legal Categories'}</h2>
            <p className="section-subtitle">Know your rights under Indian Law / भारतीय कानून के अंतर्गत अपने अधिकार जानें</p>
          </div>
          <Link to="/legal-categories" className="text-sm text-navy-600 hover:text-navy-800 font-medium flex items-center gap-1 transition-colors">
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {LEGAL_CATEGORIES.slice(0, 6).map((cat) => (
            <LegalCategoryCard key={cat.slug} category={cat} compact />
          ))}
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="bg-navy-50 border-y border-navy-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="text-center mb-10">
            <h2 className="section-title">How It Works <span className="font-hindi text-lg text-gray-400 ml-2">/ यह कैसे काम करता है</span></h2>
            <p className="text-gray-500 mt-2 text-sm">Three simple steps to legal clarity / तीन आसान चरण</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connector lines */}
            <div className="hidden md:block absolute top-8 left-1/3 right-1/3 h-0.5 bg-gradient-to-r from-navy-200 to-navy-200" />

            {HOW_IT_WORKS.map((step, idx) => (
              <div key={step.step} className="text-center animate-slide-up" style={{ animationDelay: `${idx * 0.1}s` }}>
                <div className="relative inline-flex">
                  <div className="w-16 h-16 bg-navy-700 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <step.icon className="w-7 h-7 text-saffron-400" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-6 h-6 bg-saffron-400 text-navy-700 text-xs font-bold rounded-full flex items-center justify-center">
                    {idx + 1}
                  </span>
                </div>
                <h3 className="font-semibold text-navy-700 text-base">
                  {lang === 'hi' ? step.titleHi : step.titleEn}
                </h3>
                <p className="text-xs text-gray-400 font-hindi mt-0.5 mb-2">
                  {lang === 'hi' ? step.titleEn : step.titleHi}
                </p>
                <p className="text-sm text-gray-600 max-w-xs mx-auto">
                  {lang === 'hi' ? step.descHi : step.descEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA STRIP ===== */}
      <section className="bg-saffron-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-xl font-bold text-navy-800">Need Legal Help Right Now?</h2>
            <p className="text-navy-700 text-sm mt-1 font-hindi">अभी कानूनी मदद चाहिए? — यह पूरी तरह मुफ्त है।</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/notice-generator" className="bg-navy-700 hover:bg-navy-800 text-white font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors">
              Generate Legal Notice
            </Link>
            <Link to="/lawyers" className="bg-white hover:bg-navy-50 text-navy-700 font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors border border-navy-200">
              Find a Lawyer
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
