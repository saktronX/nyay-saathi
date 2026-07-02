import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import LegalCategoryPage from './pages/LegalCategoryPage';
import NoticeGeneratorPage from './pages/NoticeGeneratorPage';
import LawyerDirectoryPage from './pages/LawyerDirectoryPage';
import DashboardPage from './pages/DashboardPage';

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col bg-gray-50">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/legal-categories" element={<LegalCategoryPage />} />
              <Route path="/legal-categories/:slug" element={<LegalCategoryPage />} />
              <Route path="/notice-generator" element={<NoticeGeneratorPage />} />
              <Route path="/lawyers" element={<LawyerDirectoryPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </LanguageProvider>
  );
}
