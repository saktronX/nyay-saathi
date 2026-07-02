import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Scale, Eye, EyeOff, Shield, Lock, Mail, AlertTriangle,
  ChevronRight, CheckCircle2,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import TrustPanel from '../components/auth/TrustPanel';

export default function LoginPage() {
  const { lang } = useLanguage();
  const navigate = useNavigate();

  const [form, setForm] = useState({ identifier: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const update = (field, value) => {
    setForm((p) => ({ ...p, [field]: value }));
    if (errors[field]) setErrors((p) => ({ ...p, [field]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.identifier.trim()) e.identifier = 'Email or mobile number is required.';
    if (!form.password) e.password = 'Password is required.';
    else if (form.password.length < 6) e.password = 'Password must be at least 6 characters.';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const e_ = validate();
    if (Object.keys(e_).length) { setErrors(e_); return; }
    setLoading(true);
    // Simulate auth
    setTimeout(() => {
      setLoading(false);
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-navy-950 flex items-stretch">
      {/* ── Left: Form ── */}
      <div className="flex-1 flex items-center justify-center px-4 py-12 sm:px-8 lg:px-16">
        <div className="w-full max-w-md animate-slide-up">

          {/* Mobile logo (hidden on desktop) */}
          <div className="flex items-center gap-2.5 mb-8 lg:hidden">
            <div className="w-9 h-9 bg-saffron-400 rounded-lg flex items-center justify-center">
              <Scale className="w-5 h-5 text-navy-700" />
            </div>
            <div>
              <span className="block text-white font-bold text-base">Nyay Saathi</span>
              <span className="block text-saffron-400 text-xs font-hindi">न्याय साथी</span>
            </div>
          </div>

          {/* Heading */}
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-white">
              {lang === 'hi' ? 'वापस स्वागत है' : 'Welcome Back'}
            </h1>
            <p className="text-navy-300 text-xs font-hindi mt-1">
              {lang === 'hi' ? 'अपने Nyay Saathi खाते में लॉगिन करें' : 'वापस स्वागत है — अपने खाते में प्रवेश करें'}
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Sign in to access your case history, AI assistant, and legal tools.
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            {/* Email / Mobile */}
            <div>
              <label htmlFor="login-identifier" className="block text-sm font-medium text-gray-300 mb-1.5">
                Email or Mobile Number
                <span className="hindi-label text-gray-500">ईमेल या मोबाइल नंबर</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  id="login-identifier"
                  type="text"
                  inputMode="email"
                  autoComplete="username"
                  value={form.identifier}
                  onChange={(e) => update('identifier', e.target.value)}
                  placeholder="you@email.com or 9876543210"
                  className={`w-full bg-navy-800 border rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-500
                    focus:outline-none focus:ring-2 focus:ring-saffron-400 focus:border-transparent transition-all
                    ${errors.identifier ? 'border-red-500' : 'border-navy-600 hover:border-navy-500'}`}
                  aria-describedby={errors.identifier ? 'id-error' : undefined}
                />
              </div>
              {errors.identifier && (
                <p id="id-error" className="text-red-400 text-xs mt-1 flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" />{errors.identifier}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="login-password" className="text-sm font-medium text-gray-300">
                  Password
                  <span className="hindi-label text-gray-500">पासवर्ड</span>
                </label>
                <Link
                  to="/forgot-password"
                  className="text-xs text-saffron-400 hover:text-saffron-300 transition-colors"
                  aria-label="Forgot password"
                >
                  Forgot password? <span className="font-hindi">/ भूल गए?</span>
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={form.password}
                  onChange={(e) => update('password', e.target.value)}
                  placeholder="Enter your password"
                  className={`w-full bg-navy-800 border rounded-lg pl-10 pr-10 py-2.5 text-sm text-white placeholder-gray-500
                    focus:outline-none focus:ring-2 focus:ring-saffron-400 focus:border-transparent transition-all
                    ${errors.password ? 'border-red-500' : 'border-navy-600 hover:border-navy-500'}`}
                  aria-describedby={errors.password ? 'pw-error' : undefined}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && (
                <p id="pw-error" className="text-red-400 text-xs mt-1 flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" />{errors.password}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-saffron-400 hover:bg-saffron-500 disabled:opacity-60 disabled:cursor-not-allowed
                text-navy-900 font-bold py-3 rounded-lg text-sm transition-all duration-200
                flex items-center justify-center gap-2 active:scale-[0.98] shadow-sm"
              id="login-submit-btn"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-navy-700/40 border-t-navy-700 rounded-full animate-spin" />
                  Verifying...
                </>
              ) : (
                <>
                  <Shield className="w-4 h-4" />
                  {lang === 'hi' ? 'सुरक्षित लॉगिन करें' : 'Login Securely'}
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-navy-700" />
            <span className="text-xs text-gray-500 flex-shrink-0">or continue with</span>
            <div className="flex-1 h-px bg-navy-700" />
          </div>

          {/* Google OAuth */}
          <button
            type="button"
            id="google-login-btn"
            className="w-full flex items-center justify-center gap-3 border border-navy-600 hover:border-navy-400
              bg-transparent hover:bg-navy-800 text-white font-medium py-2.5 rounded-lg text-sm
              transition-all duration-200 active:scale-[0.98]"
            aria-label="Sign in with Google"
          >
            {/* Google icon */}
            <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          {/* Bottom link */}
          <p className="text-center text-sm text-gray-400 mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="text-saffron-400 hover:text-saffron-300 font-semibold transition-colors">
              Register free <span className="font-hindi font-normal">/ मुफ्त रजिस्टर करें</span>
            </Link>
          </p>

          {/* Disclaimer */}
          <div className="mt-6 flex items-start gap-2 bg-navy-900 border border-navy-700 rounded-lg px-3 py-2.5">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
            <p className="text-[11px] text-gray-500 leading-relaxed">
              This is AI-assisted and for informational purposes only. It does not constitute legal advice.{' '}
              <span className="font-hindi">यह कानूनी सलाह नहीं है।</span>
            </p>
          </div>
        </div>
      </div>

      {/* ── Right: Trust Panel (desktop only) ── */}
      <div className="hidden lg:flex w-[420px] xl:w-[460px] flex-shrink-0">
        <TrustPanel />
      </div>
    </div>
  );
}
