import { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const translations = {
  en: {
    // Nav
    home: 'Home',
    legalCategories: 'Legal Categories',
    noticeGenerator: 'Legal Notice',
    lawyerDirectory: 'Find Lawyer',
    dashboard: 'My Cases',
    // Hero
    heroTitle: 'Your Free Legal Companion',
    heroSubtitle: 'Get instant AI-powered legal guidance in Hindi or English — know your rights, generate legal notices, find qualified lawyers.',
    askQuestion: 'Ask a legal question...',
    quickChips: ['Consumer complaint', 'Workplace harassment', 'Tenant rights', 'Property dispute', 'RTI filing'],
    // Disclaimer
    disclaimer: 'This is AI-assisted and for informational purposes only. It does not constitute legal advice.',
    // Common
    learnMore: 'Learn More',
    downloadPDF: 'Download PDF',
    contact: 'Contact',
    submit: 'Submit',
    next: 'Next',
    previous: 'Previous',
    filter: 'Filter',
    search: 'Search',
    all: 'All',
    status: 'Status',
    date: 'Date',
    city: 'City',
    specialization: 'Specialization',
    // Categories
    categoriesTitle: 'Legal Categories',
    // Lawyer Directory
    lawyerDirTitle: 'Find a Lawyer',
    lawyerDirSub: 'Connect with verified lawyers across India',
    // Dashboard
    dashboardTitle: 'My Case History',
    dashboardSub: 'Track all your legal matters in one place',
  },
  hi: {
    home: 'होम',
    legalCategories: 'कानूनी श्रेणियां',
    noticeGenerator: 'कानूनी नोटिस',
    lawyerDirectory: 'वकील खोजें',
    dashboard: 'मेरे मामले',
    heroTitle: 'आपका मुफ्त कानूनी साथी',
    heroSubtitle: 'हिंदी या अंग्रेजी में तुरंत AI-संचालित कानूनी मार्गदर्शन प्राप्त करें — अपने अधिकार जानें, कानूनी नोटिस बनाएं, योग्य वकील खोजें।',
    askQuestion: 'कोई कानूनी सवाल पूछें...',
    quickChips: ['उपभोक्ता शिकायत', 'कार्यस्थल उत्पीड़न', 'किरायेदार अधिकार', 'संपत्ति विवाद', 'RTI दाखिल करना'],
    disclaimer: 'यह AI-सहायक है और केवल सूचनात्मक उद्देश्यों के लिए है। यह कानूनी सलाह नहीं है।',
    learnMore: 'अधिक जानें',
    downloadPDF: 'PDF डाउनलोड',
    contact: 'संपर्क करें',
    submit: 'जमा करें',
    next: 'आगे',
    previous: 'पीछे',
    filter: 'फिल्टर',
    search: 'खोजें',
    all: 'सभी',
    status: 'स्थिति',
    date: 'तारीख',
    city: 'शहर',
    specialization: 'विशेषज्ञता',
    categoriesTitle: 'कानूनी श्रेणियां',
    lawyerDirTitle: 'वकील खोजें',
    lawyerDirSub: 'पूरे भारत में सत्यापित वकीलों से जुड़ें',
    dashboardTitle: 'मेरा केस इतिहास',
    dashboardSub: 'एक ही जगह पर अपने सभी कानूनी मामलों को ट्रैक करें',
  },
};

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en');
  const t = (key) => translations[lang][key] || translations.en[key] || key;
  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
