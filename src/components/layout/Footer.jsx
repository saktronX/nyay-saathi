import { Link } from 'react-router-dom';
import { Scale, Phone, Mail, MapPin, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-navy-900 text-gray-300">
      {/* Disclaimer banner */}
      <div className="bg-amber-600 px-4 py-3 text-center text-sm text-white font-medium">
        ⚠️ This platform provides AI-assisted legal information only — not legal advice. Always consult a qualified lawyer for your specific situation. &nbsp;|&nbsp;
        <span className="font-hindi font-normal">यह केवल AI-सहायक सूचना है — कानूनी सलाह नहीं। विशेष स्थिति के लिए योग्य वकील से परामर्श करें।</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-saffron-400 rounded-lg flex items-center justify-center">
                <Scale className="w-5 h-5 text-navy-700" />
              </div>
              <div>
                <span className="block text-white font-bold text-sm">Nyay Saathi</span>
                <span className="block text-saffron-400 text-xs font-hindi">न्याय साथी</span>
              </div>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              Free AI-powered legal aid for every Indian citizen. Know your rights, get guidance, find help.
            </p>
            <p className="text-xs text-gray-500 mt-1 font-hindi">
              हर भारतीय नागरिक के लिए मुफ्त AI-संचालित कानूनी सहायता।
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-3">Quick Links <span className="font-hindi font-normal text-gray-400 ml-1">/ त्वरित लिंक</span></h3>
            <ul className="space-y-2">
              {[
                { en: 'Home', hi: 'होम', path: '/' },
                { en: 'Legal Categories', hi: 'कानूनी श्रेणियां', path: '/legal-categories' },
                { en: 'Legal Notice Generator', hi: 'नोटिस जनरेटर', path: '/notice-generator' },
                { en: 'Lawyer Directory', hi: 'वकील डायरेक्टरी', path: '/lawyers' },
                { en: 'My Dashboard', hi: 'मेरा डैशबोर्ड', path: '/dashboard' },
              ].map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-xs text-gray-400 hover:text-saffron-400 transition-colors flex items-center gap-1.5">
                    <span className="w-1 h-1 bg-saffron-500 rounded-full flex-shrink-0" />
                    {link.en}
                    <span className="font-hindi text-gray-500">/ {link.hi}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Resources */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-3">Legal Resources <span className="font-hindi font-normal text-gray-400 ml-1">/ संसाधन</span></h3>
            <ul className="space-y-2">
              {[
                { label: 'National Legal Services Authority', url: 'https://nalsa.gov.in' },
                { label: 'e-Courts India', url: 'https://ecourts.gov.in' },
                { label: 'Consumer Forum Portal', url: 'https://consumerhelpline.gov.in' },
                { label: 'India Code (Laws)', url: 'https://indiacode.nic.in' },
                { label: 'RTI Online Portal', url: 'https://rtionline.gov.in' },
              ].map((r) => (
                <li key={r.url}>
                  <a href={r.url} target="_blank" rel="noopener noreferrer"
                    className="text-xs text-gray-400 hover:text-saffron-400 transition-colors flex items-center gap-1.5">
                    <ExternalLink className="w-3 h-3 flex-shrink-0" />
                    {r.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact / Emergency */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-3">Help & Contact <span className="font-hindi font-normal text-gray-400 ml-1">/ सहायता</span></h3>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-saffron-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-white font-medium">National Legal Helpline</p>
                  <p className="text-xs text-gray-400">15100 (Free)</p>
                  <p className="text-xs text-gray-500 font-hindi">राष्ट्रीय कानूनी हेल्पलाइन</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-saffron-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-white font-medium">Consumer Helpline</p>
                  <p className="text-xs text-gray-400">1800-11-4000 (Free)</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-saffron-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-white font-medium">support@nyaysaathi.in</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-navy-700 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-500">
            © 2024 Nyay Saathi. A free public service initiative. | Not affiliated with the Government of India.
          </p>
          <div className="flex gap-4 text-xs text-gray-500">
            <span className="hover:text-gray-300 cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-gray-300 cursor-pointer transition-colors">Terms of Use</span>
            <span className="hover:text-gray-300 cursor-pointer transition-colors">Disclaimer</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
