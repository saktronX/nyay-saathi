import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, AlertTriangle } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import clsx from 'clsx';

const QUICK_CHIPS_EN = [
  'Consumer complaint process',
  'Workplace harassment',
  'Tenant rights',
  'Property dispute',
  'File an RTI',
  'Domestic violence help',
  'Cheque bounce case',
];

const QUICK_CHIPS_HI = [
  'उपभोक्ता शिकायत प्रक्रिया',
  'कार्यस्थल उत्पीड़न',
  'किरायेदार अधिकार',
  'संपत्ति विवाद',
  'RTI दाखिल करना',
  'घरेलू हिंसा सहायता',
  'चेक बाउंस मामला',
];

const BOT_RESPONSES = {
  'consumer complaint process': `Under the Consumer Protection Act, 2019, you can file a complaint at:
• **District Forum** — for claims up to ₹1 crore
• **State Commission** — for ₹1–10 crore
• **National Commission** — above ₹10 crore

You can also file online at consumerhelpline.gov.in or call 1800-11-4000 (free).

*Relevant Law: Consumer Protection Act, 2019 | Section 35*`,

  'उपभोक्ता शिकायत प्रक्रिया': `उपभोक्ता संरक्षण अधिनियम, 2019 के तहत आप यहाँ शिकायत दर्ज कर सकते हैं:
• **जिला फोरम** — ₹1 करोड़ तक के दावों के लिए
• **राज्य आयोग** — ₹1–10 करोड़ के लिए
• **राष्ट्रीय आयोग** — ₹10 करोड़ से अधिक के लिए

आप consumerhelpline.gov.in पर ऑनलाइन भी दर्ज कर सकते हैं या 1800-11-4000 (निःशुल्क) पर कॉल करें।`,

  'workplace harassment': `The POSH Act, 2013 (Prevention of Sexual Harassment) requires every employer with 10+ employees to:
• Form an **Internal Complaints Committee (ICC)**
• Display POSH policy prominently

You can file a complaint with the ICC within **3 months** of the incident. If no ICC exists, approach the **Local Complaints Committee (LCC)** at the district level.

*Relevant Law: POSH Act, 2013 | Sections 4, 9, 11*`,

  'tenant rights': `As a tenant in India, you are protected under:
• **Transfer of Property Act, 1882** — governs rental agreements
• **Specific Relief Act** — protects against illegal eviction

Key rights:
✓ Landlord cannot enter without notice
✓ 15–30 days eviction notice required (varies by state)
✓ Security deposit must be returned within 30 days of vacating
✓ Cannot cut off utilities to force eviction

*Check your state's Rent Control Act for specific provisions.*`,

  'default': `I understand you're looking for legal information. As an AI legal assistant, I can help you with:

• Understanding your **legal rights** under Indian law
• Guidance on **consumer complaints, property, family, and labor law**
• How to **file complaints** with the right authority
• Information on **relevant laws and sections**

Please note: This is **general legal information** only — not legal advice. For your specific situation, please consult a qualified lawyer.

Could you tell me more about your specific concern?`,
};

function getResponse(input) {
  const lower = input.toLowerCase();
  for (const [key, resp] of Object.entries(BOT_RESPONSES)) {
    if (key !== 'default' && lower.includes(key.toLowerCase())) return resp;
  }
  return BOT_RESPONSES['default'];
}

function formatMessage(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/✓/g, '<span class="text-green-600">✓</span>')
    .replace(/•/g, '<span class="text-navy-500">•</span>')
    .replace(/\n/g, '<br/>');
}

export default function ChatBox() {
  const { lang, t } = useLanguage();
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'bot',
      text: lang === 'hi'
        ? 'नमस्ते! मैं न्याय साथी हूं, आपका AI कानूनी सहायक। आज मैं आपकी कैसे मदद कर सकता हूं?'
        : 'Namaste! I am Nyay Saathi, your AI legal assistant. How can I help you understand your legal rights today?',
    },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const sendMessage = (text) => {
    const userMsg = { id: Date.now(), role: 'user', text };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setTyping(true);

    setTimeout(() => {
      const botText = getResponse(text);
      setTyping(false);
      setMessages((prev) => [...prev, { id: Date.now() + 1, role: 'bot', text: botText }]);
    }, 1200 + Math.random() * 800);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage(input.trim());
  };

  const chips = lang === 'hi' ? QUICK_CHIPS_HI : QUICK_CHIPS_EN;

  return (
    <div className="flex flex-col h-full max-h-[520px] bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-navy-700 px-5 py-3.5 flex items-center gap-3">
        <div className="w-9 h-9 bg-saffron-400 rounded-full flex items-center justify-center flex-shrink-0">
          <Bot className="w-5 h-5 text-navy-700" />
        </div>
        <div>
          <p className="text-white font-semibold text-sm">Nyay Saathi AI</p>
          <p className="text-saffron-300 text-xs font-hindi">न्याय साथी</p>
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse-slow" />
          <span className="text-green-300 text-xs">Online</span>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-amber-50 border-b border-amber-100 px-4 py-2 flex items-start gap-2">
        <AlertTriangle className="w-3.5 h-3.5 text-amber-600 flex-shrink-0 mt-0.5" />
        <p className="text-[11px] text-amber-700 leading-relaxed">
          {t('disclaimer')}
        </p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 scrollbar-thin">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={clsx('chat-bubble flex gap-2', msg.role === 'user' ? 'flex-row-reverse' : 'flex-row')}
          >
            <div className={clsx(
              'w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5',
              msg.role === 'bot' ? 'bg-navy-100' : 'bg-saffron-100'
            )}>
              {msg.role === 'bot'
                ? <Bot className="w-4 h-4 text-navy-600" />
                : <User className="w-4 h-4 text-saffron-600" />}
            </div>
            <div className={clsx(
              'max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed',
              msg.role === 'bot'
                ? 'bg-navy-50 text-gray-800 rounded-tl-sm'
                : 'bg-navy-700 text-white rounded-tr-sm'
            )}>
              <p dangerouslySetInnerHTML={{ __html: formatMessage(msg.text) }} />
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {typing && (
          <div className="chat-bubble flex gap-2">
            <div className="w-7 h-7 rounded-full bg-navy-100 flex items-center justify-center flex-shrink-0">
              <Bot className="w-4 h-4 text-navy-600" />
            </div>
            <div className="bg-navy-50 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1">
              <span className="typing-dot w-2 h-2 bg-navy-400 rounded-full" />
              <span className="typing-dot w-2 h-2 bg-navy-400 rounded-full" />
              <span className="typing-dot w-2 h-2 bg-navy-400 rounded-full" />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Quick chips */}
      <div className="px-4 py-2 border-t border-gray-100 flex gap-2 overflow-x-auto scrollbar-thin">
        {chips.slice(0, 4).map((chip) => (
          <button
            key={chip}
            onClick={() => sendMessage(chip)}
            className="flex-shrink-0 text-xs bg-navy-50 hover:bg-navy-100 text-navy-700 border border-navy-100 px-3 py-1.5 rounded-full transition-colors font-medium font-hindi"
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="px-4 py-3 border-t border-gray-100 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t('askQuestion')}
          className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-transparent transition-all font-hindi"
          aria-label="Legal question input"
        />
        <button
          type="submit"
          disabled={!input.trim() || typing}
          className="bg-navy-700 hover:bg-navy-600 disabled:opacity-40 text-white p-2.5 rounded-xl transition-colors flex-shrink-0"
          aria-label="Send message"
        >
          {typing ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
        </button>
      </form>
    </div>
  );
}
