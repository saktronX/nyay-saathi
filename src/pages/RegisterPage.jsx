import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Scale, Eye, EyeOff, Shield, Lock, Mail, User, Phone,
  AlertTriangle, ChevronRight, Globe, CheckCircle2, ArrowLeft,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import TrustPanel from '../components/auth/TrustPanel';

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra & Nagar Haveli and Daman & Diu',
  'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry',
];

// ── OTP Input component ──────────────────────────────────────────────────────
function OtpInput({ otp, setOtp }) {
  const refs = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()];

  const handleChange = (idx, val) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...otp];
    next[idx] = val;
    setOtp(next);
    if (val && idx < 5) refs[idx + 1].current?.focus();
  };

  const handleKeyDown = (idx, e) => {
    if (e.key === 'Backspace' && !otp[idx] && idx > 0) {
      refs[idx - 1].current?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const digits = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6).split('');
    const next = [...otp];
    digits.forEach((d, i) => { next[i] = d; });
    setOtp(next);
    refs[Math.min(digits.length, 5)].current?.focus();
  };

  return (
    <div className="flex gap-2 justify-center">
      {otp.map((digit, idx) => (
        <input
          key={idx}
          ref={refs[idx]}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(idx, e.target.value)}
          onKeyDown={(e) => handleKeyDown(idx, e)}
          onPaste={handlePaste}
          className={`w-11 h-12 text-center text-lg font-bold bg-navy-800 border rounded-lg text-white
            focus:outline-none focus:ring-2 focus:ring-saffron-400 focus:border-transparent transition-all
            ${digit ? 'border-saffron-400' : 'border-navy-600'}`}
          aria-label={`OTP digit ${idx + 1}`}
        />
      ))}
    </div>
  );
}

// ── Field wrapper ────────────────────────────────────────────────────────────
function Field({ id, label, labelHi, icon: Icon, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-1.5">
        {label}
        {labelHi && <span className="hindi-label text-gray-500">{labelHi}</span>}
      </label>
      <div className="relative">
        {Icon && <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 z-10 pointer-events-none" />}
        {children}
      </div>
      {error && (
        <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
          <AlertTriangle className="w-3 h-3 flex-shrink-0" />{error}
        </p>
      )}
    </div>
  );
}

const INPUT_BASE = `w-full bg-navy-800 border rounded-lg py-2.5 text-sm text-white placeholder-gray-500
  focus:outline-none focus:ring-2 focus:ring-saffron-400 focus:border-transparent transition-all`;
const inputClass = (hasIcon, error) =>
  `${INPUT_BASE} ${hasIcon ? 'pl-10 pr-4' : 'px-4'} ${error ? 'border-red-500' : 'border-navy-600 hover:border-navy-500'}`;

export default function RegisterPage() {
  const { lang } = useLanguage();
  const navigate = useNavigate();

  // Registeration form state
  const [form, setForm] = useState({
    fullName: '', mobile: '', email: '', password: '',
    preferredLang: 'en', state: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  // OTP step state
  const [otpStep, setOtpStep] = useState(false);   // false = form, true = otp verify
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [otpSent, setOtpSent] = useState(false);
  const [otpError, setOtpError] = useState('');
  const [resendTimer, setResendTimer] = useState(0);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  // Resend countdown
  useEffect(() => {
    if (resendTimer <= 0) return;
    const t = setTimeout(() => setResendTimer((r) => r - 1), 1000);
    return () => clearTimeout(t);
  }, [resendTimer]);

  const update = (field, value) => {
    setForm((p) => ({ ...p, [field]: value }));
    if (errors[field]) setErrors((p) => ({ ...p, [field]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.fullName.trim()) e.fullName = 'Full name is required.';
    if (!form.mobile.trim()) e.mobile = 'Mobile number is required.';
    else if (!/^[6-9]\d{9}$/.test(form.mobile)) e.mobile = 'Enter a valid 10-digit Indian mobile number.';
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email address.';
    if (!form.password) e.password = 'Password is required.';
    else if (form.password.length < 8) e.password = 'Password must be at least 8 characters.';
    if (!form.state) e.state = 'Please select your state.';
    return e;
  };

  const handleSendOtp = (e) => {
    e.preventDefault();
    const e_ = validate();
    if (Object.keys(e_).length) { setErrors(e_); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOtpStep(true);
      setOtpSent(true);
      setResendTimer(30);
    }, 1200);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    const entered = otp.join('');
    if (entered.length < 6) { setOtpError('Please enter the complete 6-digit OTP.'); return; }
    setLoading(true);
    setOtpError('');
    setTimeout(() => {
      setLoading(false);
      // Mock: accept any 6-digit OTP for demo
      if (entered === '123456' || entered.length === 6) {
        setDone(true);
        setTimeout(() => navigate('/dashboard'), 1800);
      } else {
        setOtpError('Incorrect OTP. Please try again.');
      }
    }, 1200);
  };

  const handleResend = () => {
    setOtp(['', '', '', '', '', '']);
    setOtpError('');
    setResendTimer(30);
  };

  // ── Success screen ───────────────────────────────────────────────────────
  if (done) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-navy-950 flex items-center justify-center px-4">
        <div className="text-center animate-slide-up">
          <div className="w-20 h-20 bg-green-500/10 border-2 border-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Account Created!</h2>
          <p className="text-gray-400 text-sm">Redirecting to your dashboard…</p>
          <p className="text-saffron-400 text-xs font-hindi mt-1">आपका खाता बन गया। डैशबोर्ड पर जा रहे हैं…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-navy-950 flex items-stretch">
      {/* ── Left: Form panel ── */}
      <div className="flex-1 flex items-center justify-center px-4 py-10 sm:px-8 lg:px-16 overflow-y-auto">
        <div className="w-full max-w-md animate-slide-up">

          {/* Mobile logo */}
          <div className="flex items-center gap-2.5 mb-6 lg:hidden">
            <div className="w-9 h-9 bg-saffron-400 rounded-lg flex items-center justify-center">
              <Scale className="w-5 h-5 text-navy-700" />
            </div>
            <div>
              <span className="block text-white font-bold text-base">Nyay Saathi</span>
              <span className="block text-saffron-400 text-xs font-hindi">न्याय साथी</span>
            </div>
          </div>

          {/* ════ OTP STEP ════ */}
          {otpStep ? (
            <div>
              <button
                onClick={() => setOtpStep(false)}
                className="flex items-center gap-1.5 text-gray-400 hover:text-white text-sm mb-6 transition-colors"
                aria-label="Go back to registration form"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>

              <div className="mb-8">
                <h1 className="text-2xl font-bold text-white">Verify Mobile</h1>
                <p className="text-navy-300 text-xs font-hindi mt-1">मोबाइल सत्यापन</p>
                <p className="text-gray-400 text-sm mt-2">
                  We sent a 6-digit OTP to{' '}
                  <span className="text-white font-medium">+91 {form.mobile}</span>
                </p>
                <p className="text-gray-500 text-xs font-hindi mt-1">
                  (Demo: enter any 6 digits to continue)
                </p>
              </div>

              <form onSubmit={handleVerifyOtp} className="space-y-6">
                <OtpInput otp={otp} setOtp={setOtp} />

                {otpError && (
                  <p className="text-red-400 text-xs text-center flex items-center justify-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5" />{otpError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading || otp.join('').length < 6}
                  className="w-full bg-saffron-400 hover:bg-saffron-500 disabled:opacity-50 disabled:cursor-not-allowed
                    text-navy-900 font-bold py-3 rounded-lg text-sm transition-all
                    flex items-center justify-center gap-2 active:scale-[0.98]"
                  id="verify-otp-btn"
                >
                  {loading ? (
                    <span className="w-4 h-4 border-2 border-navy-700/40 border-t-navy-700 rounded-full animate-spin" />
                  ) : (
                    <><Shield className="w-4 h-4" /> Verify & Create Account</>
                  )}
                </button>
              </form>

              {/* Resend */}
              <p className="text-center text-sm text-gray-400 mt-5">
                {resendTimer > 0 ? (
                  <span>Resend OTP in <span className="text-saffron-400 font-medium">{resendTimer}s</span></span>
                ) : (
                  <button
                    onClick={handleResend}
                    className="text-saffron-400 hover:text-saffron-300 font-semibold transition-colors"
                    aria-label="Resend OTP"
                  >
                    Resend OTP <span className="font-hindi font-normal">/ OTP दोबारा भेजें</span>
                  </button>
                )}
              </p>
            </div>
          ) : (
          /* ════ REGISTRATION FORM ════ */
            <div>
              <div className="mb-7">
                <h1 className="text-2xl md:text-3xl font-bold text-white">Create Account</h1>
                <p className="text-navy-300 text-xs font-hindi mt-1">मुफ्त खाता बनाएं</p>
                <p className="text-gray-400 text-sm mt-2">Free forever. No credit card required.</p>
              </div>

              <form onSubmit={handleSendOtp} noValidate className="space-y-4">
                {/* Full Name */}
                <Field id="reg-name" label="Full Name" labelHi="पूरा नाम" icon={User} error={errors.fullName}>
                  <input
                    id="reg-name"
                    type="text"
                    autoComplete="name"
                    value={form.fullName}
                    onChange={(e) => update('fullName', e.target.value)}
                    placeholder="Rahul Kumar"
                    className={inputClass(true, errors.fullName)}
                    aria-required="true"
                  />
                </Field>

                {/* Mobile */}
                <Field id="reg-mobile" label="Mobile Number" labelHi="मोबाइल नंबर" icon={Phone} error={errors.mobile}>
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-1 z-10 pointer-events-none">
                    <Phone className="w-4 h-4 text-gray-500" />
                  </div>
                  <div className="flex">
                    <span className="flex items-center bg-navy-700 border border-navy-600 border-r-0 rounded-l-lg px-3 text-sm text-gray-400 flex-shrink-0">
                      +91
                    </span>
                    <input
                      id="reg-mobile"
                      type="tel"
                      inputMode="numeric"
                      maxLength={10}
                      autoComplete="tel"
                      value={form.mobile}
                      onChange={(e) => update('mobile', e.target.value.replace(/\D/g, ''))}
                      placeholder="98765 43210"
                      className={`flex-1 bg-navy-800 border rounded-r-lg px-3 py-2.5 text-sm text-white placeholder-gray-500
                        focus:outline-none focus:ring-2 focus:ring-saffron-400 focus:border-transparent transition-all
                        ${errors.mobile ? 'border-red-500' : 'border-navy-600 hover:border-navy-500'}`}
                      aria-required="true"
                      aria-describedby={errors.mobile ? 'mobile-error' : undefined}
                    />
                  </div>
                  {errors.mobile && (
                    <p id="mobile-error" className="text-red-400 text-xs mt-1 flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" />{errors.mobile}
                    </p>
                  )}
                </Field>

                {/* Email */}
                <Field id="reg-email" label="Email Address (optional)" labelHi="ईमेल पता (वैकल्पिक)" icon={Mail} error={errors.email}>
                  <input
                    id="reg-email"
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={(e) => update('email', e.target.value)}
                    placeholder="you@email.com"
                    className={inputClass(true, errors.email)}
                  />
                </Field>

                {/* Password */}
                <Field id="reg-password" label="Password" labelHi="पासवर्ड" icon={Lock} error={errors.password}>
                  <input
                    id="reg-password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    value={form.password}
                    onChange={(e) => update('password', e.target.value)}
                    placeholder="Min. 8 characters"
                    className={`${inputClass(true, errors.password)} pr-10`}
                    aria-required="true"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                  {/* Password strength indicator */}
                  {form.password && (
                    <div className="flex gap-1 mt-1.5">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className={`h-1 flex-1 rounded-full transition-all ${
                            form.password.length >= i * 3
                              ? i <= 1 ? 'bg-red-500' : i <= 2 ? 'bg-amber-500' : i <= 3 ? 'bg-yellow-400' : 'bg-green-500'
                              : 'bg-navy-700'
                          }`}
                        />
                      ))}
                      <span className="text-[10px] text-gray-500 ml-1">
                        {form.password.length < 4 ? 'Weak' : form.password.length < 7 ? 'Fair' : form.password.length < 10 ? 'Good' : 'Strong'}
                      </span>
                    </div>
                  )}
                </Field>

                {/* Two columns: Preferred Lang + State */}
                <div className="grid grid-cols-2 gap-3">
                  {/* Preferred Language */}
                  <div>
                    <label htmlFor="reg-lang" className="block text-sm font-medium text-gray-300 mb-1.5">
                      Language
                      <span className="hindi-label text-gray-500">भाषा</span>
                    </label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none z-10" />
                      <select
                        id="reg-lang"
                        value={form.preferredLang}
                        onChange={(e) => update('preferredLang', e.target.value)}
                        className="w-full bg-navy-800 border border-navy-600 hover:border-navy-500 rounded-lg pl-9 pr-3 py-2.5 text-sm text-white
                          focus:outline-none focus:ring-2 focus:ring-saffron-400 focus:border-transparent transition-all appearance-none"
                        aria-label="Preferred language"
                      >
                        <option value="en">English</option>
                        <option value="hi">हिंदी</option>
                        <option value="mr">मराठी</option>
                        <option value="gu">ગુજરાતી</option>
                        <option value="ta">தமிழ்</option>
                        <option value="te">తెలుగు</option>
                        <option value="bn">বাংলা</option>
                      </select>
                    </div>
                  </div>

                  {/* State */}
                  <div>
                    <label htmlFor="reg-state" className="block text-sm font-medium text-gray-300 mb-1.5">
                      State <span className="text-red-400">*</span>
                      <span className="hindi-label text-gray-500">राज्य</span>
                    </label>
                    <select
                      id="reg-state"
                      value={form.state}
                      onChange={(e) => update('state', e.target.value)}
                      className={`w-full bg-navy-800 border rounded-lg px-3 py-2.5 text-sm
                        focus:outline-none focus:ring-2 focus:ring-saffron-400 focus:border-transparent transition-all appearance-none
                        ${errors.state ? 'border-red-500 text-white' : 'border-navy-600 hover:border-navy-500 text-white'}
                        ${!form.state ? 'text-gray-500' : ''}`}
                      aria-required="true"
                      aria-label="Select state"
                    >
                      <option value="" disabled>Select state</option>
                      {INDIAN_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                    {errors.state && (
                      <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" />{errors.state}
                      </p>
                    )}
                  </div>
                </div>

                {/* Terms */}
                <p className="text-[11px] text-gray-500 leading-relaxed">
                  By registering, you agree to our{' '}
                  <span className="text-saffron-400 cursor-pointer hover:underline">Terms of Use</span> and{' '}
                  <span className="text-saffron-400 cursor-pointer hover:underline">Privacy Policy</span>.
                  Your data is never sold.{' '}
                  <span className="font-hindi">आपका डेटा कभी नहीं बेचा जाएगा।</span>
                </p>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-saffron-400 hover:bg-saffron-500 disabled:opacity-60 disabled:cursor-not-allowed
                    text-navy-900 font-bold py-3 rounded-lg text-sm transition-all
                    flex items-center justify-center gap-2 active:scale-[0.98]"
                  id="register-submit-btn"
                >
                  {loading ? (
                    <span className="w-4 h-4 border-2 border-navy-700/40 border-t-navy-700 rounded-full animate-spin" />
                  ) : (
                    <><Shield className="w-4 h-4" /> Send OTP & Register <ChevronRight className="w-4 h-4" /></>
                  )}
                </button>
              </form>

              {/* Bottom link */}
              <p className="text-center text-sm text-gray-400 mt-5">
                Already have an account?{' '}
                <Link to="/login" className="text-saffron-400 hover:text-saffron-300 font-semibold transition-colors">
                  Login <span className="font-hindi font-normal">/ लॉगिन करें</span>
                </Link>
              </p>

              {/* Disclaimer */}
              <div className="mt-5 flex items-start gap-2 bg-navy-900 border border-navy-700 rounded-lg px-3 py-2.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
                <p className="text-[11px] text-gray-500 leading-relaxed">
                  This is AI-assisted and for informational purposes only. It does not constitute legal advice.{' '}
                  <span className="font-hindi">यह कानूनी सलाह नहीं है।</span>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Right: Trust Panel ── */}
      <div className="hidden lg:flex w-[420px] xl:w-[460px] flex-shrink-0">
        <TrustPanel />
      </div>
    </div>
  );
}
