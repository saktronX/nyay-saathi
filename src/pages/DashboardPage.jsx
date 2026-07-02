import { useState } from 'react';
import { LayoutDashboard, Plus, AlertTriangle, FileText, CheckCircle, Clock, Activity } from 'lucide-react';
import CaseHistoryCard from '../components/dashboard/CaseHistoryCard';
import { CASE_HISTORY } from '../data/legalData';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

const STATUS_FILTERS = ['All', 'Active', 'Pending', 'Under Review', 'Notice Sent', 'Resolved'];

const STATS = [
  { icon: Activity, label: 'Total Cases', labelHi: 'कुल मामले', value: 6, color: 'text-navy-600 bg-navy-50' },
  { icon: Clock, label: 'Active', labelHi: 'सक्रिय', value: 1, color: 'text-blue-600 bg-blue-50' },
  { icon: AlertTriangle, label: 'Pending', labelHi: 'लंबित', value: 2, color: 'text-amber-600 bg-amber-50' },
  { icon: CheckCircle, label: 'Resolved', labelHi: 'हल हुए', value: 2, color: 'text-green-600 bg-green-50' },
];

export default function DashboardPage() {
  const { lang } = useLanguage();
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = CASE_HISTORY.filter((c) => {
    const matchesStatus = statusFilter === 'All' || c.status === statusFilter;
    const matchesSearch = searchQuery === '' ||
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.caseNumber && c.caseNumber.includes(searchQuery));
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="bg-navy-700 px-4 py-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-saffron-400 rounded-xl flex items-center justify-center">
                <LayoutDashboard className="w-5 h-5 text-navy-700" />
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-white">My Case Dashboard</h1>
                <p className="text-saffron-300 text-xs font-hindi">मेरा केस डैशबोर्ड</p>
              </div>
            </div>

            {/* User Profile stub */}
            <div className="flex items-center gap-3 bg-navy-600 rounded-xl px-4 py-2.5">
              <div className="w-9 h-9 bg-saffron-400 rounded-full flex items-center justify-center text-navy-700 font-bold text-sm">
                RK
              </div>
              <div>
                <p className="text-white text-sm font-medium">Rahul Kumar</p>
                <p className="text-gray-400 text-xs">rahul@example.com</p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
            {STATS.map((stat) => (
              <div key={stat.label} className="bg-navy-800/50 rounded-xl p-4 border border-navy-600">
                <div className={clsx('w-8 h-8 rounded-lg flex items-center justify-center mb-2', stat.color)}>
                  <stat.icon className="w-4 h-4" />
                </div>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-xs text-gray-400">{stat.label}</p>
                <p className="text-[10px] text-gray-500 font-hindi">{stat.labelHi}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Disclaimer */}
        <div className="disclaimer-bar mb-6">
          <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
          <p>This is AI-assisted and for informational purposes only. It does not constitute legal advice. <span className="font-hindi">यह केवल सूचनात्मक है।</span></p>
        </div>

        {/* Actions + Search */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            {/* Search */}
            <div className="relative">
              <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search cases, case numbers..."
                className="input-field pl-9 text-sm w-full sm:w-72"
                aria-label="Search cases"
              />
            </div>
          </div>

          {/* Quick actions */}
          <div className="flex gap-2 flex-shrink-0">
            <Link to="/notice-generator" className="btn-primary text-xs py-2">
              <Plus className="w-4 h-4" />
              New Notice
            </Link>
            <Link to="/" className="btn-outline text-xs py-2">
              Ask AI
            </Link>
          </div>
        </div>

        {/* Status filter tabs */}
        <div className="flex gap-2 overflow-x-auto scrollbar-thin pb-2 mb-6">
          {STATUS_FILTERS.map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={clsx(
                'flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold transition-all',
                statusFilter === s
                  ? 'bg-navy-700 text-white'
                  : 'bg-white text-gray-500 border border-gray-200 hover:border-navy-300 hover:text-navy-600'
              )}
              aria-pressed={statusFilter === s}
            >
              {s}
              {s === 'All' ? (
                <span className="ml-1.5 opacity-60">{CASE_HISTORY.length}</span>
              ) : (
                <span className="ml-1.5 opacity-60">{CASE_HISTORY.filter((c) => c.status === s).length}</span>
              )}
            </button>
          ))}
        </div>

        {/* Case List */}
        {filtered.length > 0 ? (
          <div className="space-y-4">
            {filtered.map((c) => (
              <CaseHistoryCard key={c.id} caseItem={c} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-7 h-7 text-gray-300" />
            </div>
            <p className="text-gray-500 font-medium">No cases found</p>
            <p className="text-gray-400 text-sm font-hindi mt-1">कोई मामला नहीं मिला</p>
          </div>
        )}

        {/* Help Banner */}
        <div className="mt-10 bg-gradient-to-r from-navy-50 to-saffron-50 border border-navy-100 rounded-xl p-6">
          <h3 className="font-bold text-navy-700 mb-2">Need Help with Your Case?</h3>
          <p className="text-sm text-gray-600 mb-4">
            Use our AI assistant for guidance or find a verified lawyer in your city.
          </p>
          <p className="text-xs text-gray-400 font-hindi mb-4">
            मार्गदर्शन के लिए AI सहायक का उपयोग करें या अपने शहर में सत्यापित वकील खोजें।
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/" className="btn-secondary text-sm">Ask AI Assistant</Link>
            <Link to="/lawyers" className="btn-outline text-sm">Find a Lawyer</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
