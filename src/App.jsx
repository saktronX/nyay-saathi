import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import LegalCategoryPage from './pages/LegalCategoryPage';
import NoticeGeneratorPage from './pages/NoticeGeneratorPage';
import LawyerDirectoryPage from './pages/LawyerDirectoryPage';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

const AUTH_ROUTES = ['/login', '/register'];

function Layout() {
  const location = useLocation();
  const isAuth = AUTH_ROUTES.includes(location.pathname);

  return (
    <div className={`min-h-screen flex flex-col ${isAuth ? 'bg-navy-950' : 'bg-gray-50'}`}>
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/legal-categories" element={<LegalCategoryPage />} />
          <Route path="/legal-categories/:slug" element={<LegalCategoryPage />} />
          <Route path="/notice-generator" element={<NoticeGeneratorPage />} />
          <Route path="/lawyers" element={<LawyerDirectoryPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </main>
      {!isAuth && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </LanguageProvider>
  );
}
