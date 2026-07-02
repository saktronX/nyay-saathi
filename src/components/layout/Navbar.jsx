import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Scale, Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import clsx from 'clsx';

const navItems = [
  { key: 'home', path: '/', labelEn: 'Home', labelHi: 'होम' },
  { key: 'legalCategories', path: '/legal-categories', labelEn: 'Legal Categories', labelHi: 'कानूनी श्रेणियां' },
  { key: 'noticeGenerator', path: '/notice-generator', labelEn: 'Legal Notice', labelHi: 'नोटिस बनाएं' },
  { key: 'lawyerDirectory', path: '/lawyers', labelEn: 'Find Lawyer', labelHi: 'वकील खोजें' },
  { key: 'dashboard', path: '/dashboard', labelEn: 'My Cases', labelHi: 'मेरे मामले' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { lang, setLang } = useLanguage();
  const location = useLocation();

  const isActive = (path) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  return (
    <header className="bg-navy-700 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 bg-saffron-400 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-saffron-300 transition-colors">
              <Scale className="w-5 h-5 text-navy-700" />
            </div>
            <div className="leading-tight">
              <span className="block text-white font-bold text-base tracking-wide">Nyay Saathi</span>
              <span className="block text-saffron-400 text-xs font-hindi">न्याय साथी</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.key}
                to={item.path}
                className={clsx(
                  'px-3 py-2 rounded-md text-sm font-medium transition-all duration-150',
                  isActive(item.path)
                    ? 'bg-saffron-400 text-navy-700'
                    : 'text-gray-300 hover:text-white hover:bg-navy-600'
                )}
              >
                <span className="block">{lang === 'hi' ? item.labelHi : item.labelEn}</span>
              </Link>
            ))}
          </nav>

          {/* Right: Lang toggle + mobile menu */}
          <div className="flex items-center gap-2">
            {/* Language Toggle */}
            <button
              onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
              className="flex items-center gap-1.5 bg-navy-600 hover:bg-navy-500 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
              aria-label="Toggle language"
            >
              <Globe className="w-4 h-4 text-saffron-400" />
              <span>{lang === 'en' ? 'हि' : 'EN'}</span>
            </button>

            {/* Mobile toggle */}
            <button
              className="md:hidden text-gray-300 hover:text-white p-1.5 rounded-md"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="md:hidden bg-navy-800 border-t border-navy-600 px-4 pb-4 pt-2 animate-fade-in">
          {navItems.map((item) => (
            <Link
              key={item.key}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className={clsx(
                'flex flex-col px-3 py-2.5 rounded-lg mb-1 transition-colors',
                isActive(item.path)
                  ? 'bg-saffron-400 text-navy-700'
                  : 'text-gray-300 hover:bg-navy-700 hover:text-white'
              )}
            >
              <span className="font-medium text-sm">{item.labelEn}</span>
              <span className="text-xs font-hindi opacity-70">{item.labelHi}</span>
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
