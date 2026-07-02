import { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, X, AlertTriangle, Users } from 'lucide-react';
import LawyerCard from '../components/lawyers/LawyerCard';
import { LAWYERS } from '../data/legalData';
import { useLanguage } from '../context/LanguageContext';

const CITIES = ['All Cities', 'New Delhi', 'Mumbai', 'Bangalore', 'Hyderabad', 'Chennai', 'Lucknow', 'Ahmedabad', 'Patna'];
const SPECS = ['All', 'Consumer Law', 'Criminal Law', 'Family Law', 'Property Law', 'Labour Law', 'Cyber Law', 'RTI / PIL', 'Constitutional Law'];
const LANGUAGES = ['All', 'Hindi', 'English', 'Marathi', 'Gujarati', 'Tamil', 'Telugu', 'Kannada'];

export default function LawyerDirectoryPage() {
  const { lang } = useLanguage();
  const [search, setSearch] = useState('');
  const [city, setCity] = useState('All Cities');
  const [spec, setSpec] = useState('All');
  const [langFilter, setLangFilter] = useState('All');
  const [freeOnly, setFreeOnly] = useState(false);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    return LAWYERS.filter((l) => {
      if (search && !l.name.toLowerCase().includes(search.toLowerCase()) &&
          !l.specializations.some((s) => s.toLowerCase().includes(search.toLowerCase()))) return false;
      if (city !== 'All Cities' && l.city !== city) return false;
      if (spec !== 'All' && !l.specializations.includes(spec)) return false;
      if (langFilter !== 'All' && !l.languages.includes(langFilter)) return false;
      if (freeOnly && !l.freeConsultation) return false;
      if (verifiedOnly && !l.verified) return false;
      return true;
    });
  }, [search, city, spec, langFilter, freeOnly, verifiedOnly]);

  const clearFilters = () => {
    setCity('All Cities'); setSpec('All'); setLangFilter('All');
    setFreeOnly(false); setVerifiedOnly(false); setSearch('');
  };

  const activeFilters = [city !== 'All Cities', spec !== 'All', langFilter !== 'All', freeOnly, verifiedOnly].filter(Boolean).length;

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="bg-navy-700 px-4 py-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-saffron-400 rounded-xl flex items-center justify-center">
              <Users className="w-5 h-5 text-navy-700" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-white">Lawyer Directory</h1>
              <p className="text-saffron-300 text-xs font-hindi">वकील डायरेक्टरी</p>
            </div>
          </div>
          <p className="text-gray-300 text-sm">Find verified lawyers across India. Filter by city, specialization, and language.</p>
          <p className="text-gray-400 text-xs font-hindi mt-1">पूरे भारत में सत्यापित वकील खोजें।</p>

          {/* Search */}
          <div className="relative mt-5 flex gap-2">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name or specialization..."
                className="w-full bg-navy-800 border border-navy-600 text-white placeholder-gray-500 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-saffron-400"
                aria-label="Search lawyers"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                showFilters ? 'bg-saffron-400 text-navy-700' : 'bg-navy-600 text-white hover:bg-navy-500'
              }`}
              aria-label="Toggle filters"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
              {activeFilters > 0 && (
                <span className="bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {activeFilters}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Disclaimer */}
        <div className="disclaimer-bar mb-6">
          <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
          <p>This is AI-assisted and for informational purposes only. Nyay Saathi does not endorse specific lawyers. Verify credentials independently. <span className="font-hindi">यह केवल सूचनात्मक है।</span></p>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="card p-5 mb-6 animate-slide-up">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-navy-700 text-sm">Filter Lawyers <span className="font-hindi font-normal text-gray-400 ml-1">/ वकील फिल्टर करें</span></h3>
              {activeFilters > 0 && (
                <button onClick={clearFilters} className="text-xs text-red-500 hover:text-red-600 flex items-center gap-1">
                  <X className="w-3 h-3" /> Clear all
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* City */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">City <span className="font-hindi text-gray-400">/ शहर</span></label>
                <select value={city} onChange={(e) => setCity(e.target.value)} className="select-field text-sm" aria-label="Filter by city">
                  {CITIES.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
              {/* Specialization */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Specialization <span className="font-hindi text-gray-400">/ विशेषज्ञता</span></label>
                <select value={spec} onChange={(e) => setSpec(e.target.value)} className="select-field text-sm" aria-label="Filter by specialization">
                  {SPECS.map((s) => <option key={s}>{s}</option>)}
                </select>
              </div>
              {/* Language */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Language <span className="font-hindi text-gray-400">/ भाषा</span></label>
                <select value={langFilter} onChange={(e) => setLangFilter(e.target.value)} className="select-field text-sm" aria-label="Filter by language">
                  {LANGUAGES.map((l) => <option key={l}>{l}</option>)}
                </select>
              </div>
              {/* Toggles */}
              <div className="flex flex-col gap-3 justify-end">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={freeOnly} onChange={(e) => setFreeOnly(e.target.checked)}
                    className="w-4 h-4 accent-navy-700" aria-label="Free consultation only" />
                  <span className="text-sm text-gray-700">Free Consultation <span className="font-hindi text-gray-400 text-xs">/ मुफ्त परामर्श</span></span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={verifiedOnly} onChange={(e) => setVerifiedOnly(e.target.checked)}
                    className="w-4 h-4 accent-navy-700" aria-label="Verified only" />
                  <span className="text-sm text-gray-700">Verified Only <span className="font-hindi text-gray-400 text-xs">/ केवल सत्यापित</span></span>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Results header */}
        <div className="flex items-center justify-between mb-5">
          <p className="text-sm text-gray-500">
            Showing <strong className="text-navy-700">{filtered.length}</strong> lawyers
            <span className="font-hindi ml-1 text-gray-400">/ {filtered.length} वकील</span>
          </p>
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((lawyer) => (
              <LawyerCard key={lawyer.id} lawyer={lawyer} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-7 h-7 text-gray-300" />
            </div>
            <p className="text-gray-500 font-medium">No lawyers found</p>
            <p className="text-gray-400 text-sm font-hindi mt-1">कोई वकील नहीं मिला</p>
            <button onClick={clearFilters} className="btn-secondary mt-4 text-sm">
              Clear Filters
            </button>
          </div>
        )}

        {/* NALSA Banner */}
        <div className="mt-10 bg-navy-50 border border-navy-100 rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-navy-700">Need Free Legal Aid?</h3>
            <p className="text-sm text-gray-600 mt-1">
              NALSA (National Legal Services Authority) provides free legal services to eligible citizens.
            </p>
            <p className="text-xs text-gray-400 font-hindi mt-1">NALSA पात्र नागरिकों को मुफ्त कानूनी सेवाएं प्रदान करती है।</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <a href="https://nalsa.gov.in" target="_blank" rel="noopener noreferrer" className="btn-secondary text-sm">
              Visit NALSA
            </a>
            <a href="tel:15100" className="btn-outline text-sm">
              Call 15100
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
