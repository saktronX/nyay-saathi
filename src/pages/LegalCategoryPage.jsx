import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Search, Filter, AlertTriangle, Phone, ArrowLeft, CheckCircle2, Building2 } from 'lucide-react';
import LegalCategoryCard from '../components/legal/LegalCategoryCard';
import { LEGAL_CATEGORIES } from '../data/legalData';
import { useLanguage } from '../context/LanguageContext';

export default function LegalCategoryPage() {
  const { slug } = useParams();
  const { lang } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');

  // Detail view if slug present
  if (slug) {
    const cat = LEGAL_CATEGORIES.find((c) => c.slug === slug);
    if (!cat) {
      return (
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <p className="text-gray-500">Category not found.</p>
          <Link to="/legal-categories" className="btn-secondary mt-4 inline-flex">Back to Categories</Link>
        </div>
      );
    }

    const Icon = cat.icon;

    return (
      <div className="animate-fade-in">
        {/* Breadcrumb header */}
        <div className="bg-navy-700 text-white px-4 py-4">
          <div className="max-w-7xl mx-auto flex items-center gap-3">
            <Link to="/legal-categories" className="text-gray-300 hover:text-white transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="w-8 h-8 bg-saffron-400 rounded-lg flex items-center justify-center">
              <Icon className="w-4 h-4 text-navy-700" />
            </div>
            <div>
              <h1 className="font-bold text-base">{cat.nameEn}</h1>
              <p className="text-saffron-300 text-xs font-hindi">{cat.nameHi}</p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Disclaimer */}
          <div className="disclaimer-bar mb-8">
            <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <p>
              <strong>Disclaimer:</strong> This is AI-assisted legal information for general guidance only. It does not constitute legal advice. For your specific situation, please consult a qualified lawyer.
              <span className="font-hindi ml-2 text-amber-700/80">यह केवल सामान्य जानकारी है — कानूनी सलाह नहीं।</span>
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Overview */}
              <div className="card p-6">
                <h2 className="font-bold text-navy-700 text-lg mb-3">Overview <span className="font-hindi font-normal text-gray-400 text-base ml-1">/ अवलोकन</span></h2>
                <p className="text-gray-600 text-sm leading-relaxed">{cat.overview}</p>
              </div>

              {/* Key Rights */}
              <div className="card p-6">
                <h2 className="font-bold text-navy-700 text-lg mb-4">
                  Your Key Rights <span className="font-hindi font-normal text-gray-400 text-base ml-1">/ आपके मुख्य अधिकार</span>
                </h2>
                <ul className="space-y-3">
                  {cat.keyRights.map((right, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-gray-700">{right}</p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Relevant Laws */}
              <div className="card p-6">
                <h2 className="font-bold text-navy-700 text-lg mb-4">
                  Relevant Laws <span className="font-hindi font-normal text-gray-400 text-base ml-1">/ प्रासंगिक कानून</span>
                </h2>
                <div className="flex flex-wrap gap-2">
                  {cat.laws.map((law) => (
                    <span key={law} className="bg-navy-50 text-navy-700 border border-navy-200 text-xs px-3 py-1.5 rounded-lg font-medium">
                      📜 {law}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              {/* Authority */}
              <div className="card p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Building2 className="w-4 h-4 text-navy-600" />
                  <h3 className="font-semibold text-navy-700 text-sm">Relevant Authority <span className="font-hindi font-normal text-gray-400">/ प्राधिकरण</span></h3>
                </div>
                <p className="text-sm text-gray-600">{cat.authority}</p>
              </div>

              {/* Helpline */}
              {cat.helpline && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Phone className="w-4 h-4 text-green-600" />
                    <h3 className="font-semibold text-green-800 text-sm">Helpline <span className="font-hindi font-normal">/ हेल्पलाइन</span></h3>
                  </div>
                  <a href={`tel:${cat.helpline}`} className="text-2xl font-bold text-green-700 hover:text-green-800 transition-colors">
                    {cat.helpline}
                  </a>
                  <p className="text-xs text-green-600 mt-1">Toll-free / निःशुल्क</p>
                </div>
              )}

              {/* Quick Actions */}
              <div className="card p-5 space-y-3">
                <h3 className="font-semibold text-navy-700 text-sm mb-1">Quick Actions <span className="font-hindi font-normal text-gray-400">/ त्वरित कार्य</span></h3>
                <Link to="/notice-generator" className="btn-primary w-full justify-center text-sm">
                  Generate Legal Notice
                </Link>
                <Link to="/lawyers" className="btn-outline w-full justify-center text-sm">
                  Find a Lawyer
                </Link>
                <Link to="/" className="w-full text-center text-sm text-navy-600 hover:text-navy-800 py-2 block transition-colors">
                  Ask AI Assistant →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // List view
  const filtered = LEGAL_CATEGORIES.filter((cat) =>
    searchQuery === '' ||
    cat.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cat.nameHi.includes(searchQuery) ||
    cat.laws.some((l) => l.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="bg-navy-700 px-4 py-10">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            Legal Categories <span className="text-saffron-400 font-hindi ml-2">/ कानूनी श्रेणियां</span>
          </h1>
          <p className="text-gray-300 text-sm mt-2">Know your rights under Indian Law. Select a category to learn more.</p>
          <p className="text-gray-400 text-xs font-hindi">भारतीय कानून के तहत अपने अधिकार जानें।</p>

          {/* Search */}
          <div className="relative mt-6 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search categories, laws... / श्रेणी खोजें..."
              className="w-full bg-navy-800 border border-navy-600 text-white placeholder-gray-500 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-saffron-400 font-hindi"
              aria-label="Search legal categories"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Disclaimer */}
        <div className="disclaimer-bar mb-8">
          <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
          <p>This is AI-assisted and for informational purposes only. It does not constitute legal advice. <span className="font-hindi">यह केवल सूचनात्मक उद्देश्यों के लिए है।</span></p>
        </div>

        {/* Results */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-gray-500">
            Showing {filtered.length} categories <span className="font-hindi">/ {filtered.length} श्रेणियां</span>
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((cat) => (
            <LegalCategoryCard key={cat.slug} category={cat} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-400 text-sm">No categories found for "{searchQuery}"</p>
          </div>
        )}
      </div>
    </div>
  );
}
