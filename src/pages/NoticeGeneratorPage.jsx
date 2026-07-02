import { useState } from 'react';
import { FileText, Download, CheckCircle2, Circle, AlertTriangle, ChevronRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const NOTICE_TYPES = [
  { id: 'consumer', labelEn: 'Consumer Complaint', labelHi: 'उपभोक्ता शिकायत' },
  { id: 'cheque', labelEn: 'Cheque Bounce (NI Act 138)', labelHi: 'चेक बाउंस' },
  { id: 'employer', labelEn: 'Against Employer', labelHi: 'नियोक्ता के विरुद्ध' },
  { id: 'landlord', labelEn: 'Landlord Deposit Dispute', labelHi: 'मकान मालिक विवाद' },
  { id: 'rti', labelEn: 'RTI Application', labelHi: 'RTI आवेदन' },
  { id: 'harassment', labelEn: 'Harassment Notice', labelHi: 'उत्पीड़न नोटिस' },
];

const STATES = [
  'Andhra Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Delhi', 'Goa', 'Gujarat',
  'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh',
  'Maharashtra', 'Manipur', 'Meghalaya', 'Odisha', 'Punjab', 'Rajasthan', 'Tamil Nadu',
  'Telangana', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
];

const STEPS = [
  { num: 1, labelEn: 'Notice Type', labelHi: 'नोटिस प्रकार' },
  { num: 2, labelEn: 'Your Details', labelHi: 'आपकी जानकारी' },
  { num: 3, labelEn: 'Respondent', labelHi: 'प्रतिवादी' },
  { num: 4, labelEn: 'Grievance', labelHi: 'शिकायत विवरण' },
  { num: 5, labelEn: 'Preview & Download', labelHi: 'पूर्वावलोकन और डाउनलोड' },
];

function StepIndicator({ current }) {
  return (
    <div className="flex items-center mb-8">
      {STEPS.map((step, idx) => (
        <div key={step.num} className="flex items-center flex-1">
          <div className="flex flex-col items-center flex-shrink-0">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
              step.num < current ? 'bg-green-500 text-white' :
              step.num === current ? 'bg-navy-700 text-white ring-2 ring-navy-300' :
              'bg-gray-200 text-gray-400'
            }`}>
              {step.num < current ? <CheckCircle2 className="w-5 h-5" /> : step.num}
            </div>
            <div className="text-center mt-1 hidden sm:block">
              <p className={`text-[10px] font-medium ${step.num === current ? 'text-navy-700' : 'text-gray-400'}`}>
                {step.labelEn}
              </p>
              <p className={`text-[9px] font-hindi ${step.num === current ? 'text-navy-500' : 'text-gray-300'}`}>
                {step.labelHi}
              </p>
            </div>
          </div>
          {idx < STEPS.length - 1 && (
            <div className={`flex-1 h-0.5 mx-1 mt-[-16px] transition-all ${step.num < current ? 'bg-green-400' : 'bg-gray-200'}`} />
          )}
        </div>
      ))}
    </div>
  );
}

function NoticePreview({ data }) {
  const today = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' });
  const typeName = NOTICE_TYPES.find((t) => t.id === data.noticeType)?.labelEn || '';

  return (
    <div className="bg-white border-2 border-gray-200 rounded-xl p-8 font-serif text-sm leading-relaxed" id="notice-preview">
      <div className="text-center border-b-2 border-gray-800 pb-4 mb-6">
        <p className="font-bold text-base uppercase tracking-widest text-gray-800">LEGAL NOTICE</p>
        <p className="text-xs text-gray-500 font-sans mt-1">Under the relevant provisions of Indian Law</p>
      </div>

      <div className="mb-4">
        <p className="font-bold">Date: {today}</p>
        <p className="mt-2 font-bold">From:</p>
        <p>{data.senderName || '[Your Name]'}</p>
        <p>{data.senderAddress || '[Your Address]'}</p>
        <p>{data.senderCity || '[City]'}, {data.senderState || '[State]'}</p>
        <p>Ph: {data.senderPhone || '[Phone]'}</p>
      </div>

      <div className="mb-6">
        <p className="font-bold">To:</p>
        <p>{data.respondentName || '[Respondent Name]'}</p>
        <p>{data.respondentAddress || '[Respondent Address]'}</p>
        <p>{data.respondentDesignation || '[Designation/Company]'}</p>
      </div>

      <p className="font-bold mb-3">Sub: Legal Notice for {typeName}</p>

      <p className="mb-3">Sir/Madam,</p>

      <p className="mb-4 text-gray-700">
        Under the instructions and authority of my client, <strong>{data.senderName || '[Your Name]'}</strong>,
        I hereby serve you this legal notice in connection with the matter described herein.
      </p>

      <p className="mb-4 text-gray-700">
        {data.grievanceDetails || '[Grievance details will appear here...]'}
      </p>

      <p className="mb-4 text-gray-700">
        You are therefore called upon to <strong>{data.demand || 'rectify the grievance, make due payment, or take the corrective action'}</strong>
        {' '}within <strong>15 (fifteen) days</strong> from the receipt of this notice,
        failing which my client shall be constrained to initiate appropriate legal proceedings at your risk, cost, and consequence.
      </p>

      <div className="mt-8 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-400 font-sans">Sent via Nyay Saathi | न्याय साथी — AI-Assisted Legal Notice Generator</p>
        <p className="text-[10px] text-red-500 font-sans mt-1">⚠ This notice is AI-generated for informational purposes. Please review with a qualified lawyer before sending.</p>
      </div>
    </div>
  );
}

export default function NoticeGeneratorPage() {
  const { lang } = useLanguage();
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    noticeType: '',
    senderName: '', senderPhone: '', senderEmail: '', senderAddress: '', senderCity: '', senderState: '',
    respondentName: '', respondentAddress: '', respondentDesignation: '',
    grievanceDetails: '', demand: '', amount: '',
  });

  const update = (field, value) => setData((prev) => ({ ...prev, [field]: value }));

  const InputField = ({ label, labelHi, field, type = 'text', placeholder, required }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
        <span className="hindi-label">{labelHi}</span>
      </label>
      <input
        type={type}
        value={data[field]}
        onChange={(e) => update(field, e.target.value)}
        placeholder={placeholder}
        className="input-field"
        aria-label={label}
      />
    </div>
  );

  const canProceed = () => {
    if (step === 1) return !!data.noticeType;
    if (step === 2) return data.senderName && data.senderPhone && data.senderAddress;
    if (step === 3) return data.respondentName && data.respondentAddress;
    if (step === 4) return data.grievanceDetails.length > 20;
    return true;
  };

  const handleDownload = () => {
    window.print();
  };

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="bg-navy-700 px-4 py-10">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-saffron-400 rounded-xl flex items-center justify-center">
              <FileText className="w-5 h-5 text-navy-700" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Legal Notice Generator</h1>
              <p className="text-saffron-300 text-xs font-hindi">कानूनी नोटिस जनरेटर</p>
            </div>
          </div>
          <p className="text-gray-300 text-sm mt-3">
            Generate a professional legal notice in minutes. Fill in the details and download as PDF.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        {/* Disclaimer */}
        <div className="disclaimer-bar mb-8">
          <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
          <p>This is AI-assisted and for informational purposes only. It does not constitute legal advice. Please have a lawyer review this notice before sending. <span className="font-hindi">यह कानूनी सलाह नहीं है।</span></p>
        </div>

        {/* Step indicator */}
        <StepIndicator current={step} />

        {/* Step content */}
        <div className="card p-6 md:p-8">
          {/* Step 1: Notice Type */}
          {step === 1 && (
            <div>
              <h2 className="font-bold text-navy-700 text-lg mb-1">Select Notice Type</h2>
              <p className="text-gray-400 text-xs font-hindi mb-6">नोटिस का प्रकार चुनें</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {NOTICE_TYPES.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => update('noticeType', type.id)}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${
                      data.noticeType === type.id
                        ? 'border-navy-700 bg-navy-50'
                        : 'border-gray-200 hover:border-navy-300 hover:bg-gray-50'
                    }`}
                    aria-pressed={data.noticeType === type.id}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        data.noticeType === type.id ? 'border-navy-700 bg-navy-700' : 'border-gray-300'
                      }`}>
                        {data.noticeType === type.id && <div className="w-2 h-2 bg-white rounded-full" />}
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-gray-800">{type.labelEn}</p>
                        <p className="text-xs text-gray-400 font-hindi">{type.labelHi}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Your Details */}
          {step === 2 && (
            <div>
              <h2 className="font-bold text-navy-700 text-lg mb-1">Your Details</h2>
              <p className="text-gray-400 text-xs font-hindi mb-6">आपकी जानकारी (नोटिस भेजने वाला)</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <InputField label="Full Name" labelHi="पूरा नाम" field="senderName" placeholder="Rahul Kumar" required />
                <InputField label="Phone Number" labelHi="फोन नंबर" field="senderPhone" type="tel" placeholder="+91 98765 43210" required />
                <InputField label="Email Address" labelHi="ईमेल पता" field="senderEmail" type="email" placeholder="rahul@example.com" />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    State <span className="text-red-500">*</span>
                    <span className="hindi-label">राज्य</span>
                  </label>
                  <select value={data.senderState} onChange={(e) => update('senderState', e.target.value)} className="select-field">
                    <option value="">Select state / राज्य चुनें</option>
                    {STATES.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <InputField label="City" labelHi="शहर" field="senderCity" placeholder="New Delhi" required />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Address <span className="text-red-500">*</span>
                    <span className="hindi-label">पूरा पता</span>
                  </label>
                  <textarea
                    value={data.senderAddress}
                    onChange={(e) => update('senderAddress', e.target.value)}
                    rows={3}
                    placeholder="House/Flat no., Street, Area..."
                    className="input-field resize-none"
                    aria-label="Your full address"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Respondent */}
          {step === 3 && (
            <div>
              <h2 className="font-bold text-navy-700 text-lg mb-1">Respondent Details</h2>
              <p className="text-gray-400 text-xs font-hindi mb-6">प्रतिवादी की जानकारी (जिसे नोटिस भेजना है)</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <InputField label="Name / Company Name" labelHi="नाम / कंपनी का नाम" field="respondentName" placeholder="ABC Electronics Pvt. Ltd." required />
                <InputField label="Designation / Role" labelHi="पद / भूमिका" field="respondentDesignation" placeholder="Manager / Company / Employer" />
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Address <span className="text-red-500">*</span>
                    <span className="hindi-label">पूरा पता</span>
                  </label>
                  <textarea
                    value={data.respondentAddress}
                    onChange={(e) => update('respondentAddress', e.target.value)}
                    rows={3}
                    placeholder="Respondent's full address..."
                    className="input-field resize-none"
                    aria-label="Respondent full address"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Grievance */}
          {step === 4 && (
            <div>
              <h2 className="font-bold text-navy-700 text-lg mb-1">Grievance Details</h2>
              <p className="text-gray-400 text-xs font-hindi mb-6">शिकायत विवरण — क्या हुआ और आप क्या चाहते हैं</p>
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Describe the Issue in Detail <span className="text-red-500">*</span>
                    <span className="hindi-label">समस्या का विस्तृत विवरण लिखें</span>
                  </label>
                  <textarea
                    value={data.grievanceDetails}
                    onChange={(e) => update('grievanceDetails', e.target.value)}
                    rows={6}
                    placeholder="On [date], I purchased [product/service] from [respondent]. Despite repeated requests, [describe the problem in detail]..."
                    className="input-field resize-none"
                    aria-label="Grievance details"
                  />
                  <p className="text-xs text-gray-400 mt-1">{data.grievanceDetails.length} characters (minimum 20 required)</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    What You Demand <span className="hindi-label">आप क्या मांगते हैं</span>
                  </label>
                  <input
                    type="text"
                    value={data.demand}
                    onChange={(e) => update('demand', e.target.value)}
                    placeholder="e.g., Replace the product / Refund ₹15,000 / Pay pending salary"
                    className="input-field"
                    aria-label="Your demand"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Amount Involved (if any) <span className="hindi-label">शामिल राशि (यदि हो)</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-medium">₹</span>
                    <input
                      type="number"
                      value={data.amount}
                      onChange={(e) => update('amount', e.target.value)}
                      placeholder="15000"
                      className="input-field pl-8"
                      aria-label="Amount involved"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Preview */}
          {step === 5 && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="font-bold text-navy-700 text-lg">Notice Preview</h2>
                  <p className="text-gray-400 text-xs font-hindi">नोटिस का पूर्वावलोकन</p>
                </div>
                <button
                  onClick={handleDownload}
                  className="btn-primary text-sm"
                  aria-label="Download notice as PDF"
                >
                  <Download className="w-4 h-4" />
                  Download PDF
                </button>
              </div>
              <NoticePreview data={data} />
              <div className="disclaimer-bar mt-6">
                <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <p className="text-xs">Please review this notice with a qualified lawyer before sending. This is AI-generated and does not constitute legal advice.</p>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
            {step > 1 ? (
              <button onClick={() => setStep(step - 1)} className="btn-outline text-sm">
                ← Previous
              </button>
            ) : <div />}

            {step < 5 ? (
              <button
                onClick={() => setStep(step + 1)}
                disabled={!canProceed()}
                className="btn-primary text-sm disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button onClick={() => setStep(1)} className="btn-outline text-sm">
                Start Over
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
