import React from "react";
import { 
  ShieldCheck, 
  Lock, 
  Eye, 
  Database, 
  UserCheck, 
  Cookie, 
  Mail, 
  RefreshCcw 
} from "lucide-react";

export default function Privacy() {
  const lastUpdated = "October 30, 2026";

  const sections = [
    { id: "intro", title: "1. Introduction", icon: <ShieldCheck size={20} /> },
    { id: "collect", title: "2. Information We Collect", icon: <Database size={20} /> },
    { id: "usage", title: "3. How We Use Data", icon: <Eye size={20} /> },
    { id: "cookies", title: "4. Cookies & Tracking", icon: <Cookie size={20} /> },
    { id: "security", title: "6. Data Security", icon: <Lock size={20} /> },
    { id: "rights", title: "7. Your Rights", icon: <UserCheck size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-32 pb-20 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Section */}
        <header className="mb-12 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 text-emerald-700 text-xs font-black uppercase tracking-widest mb-6">
            <ShieldCheck size={14} />
            Secure & Private
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tighter mb-4">
            Privacy <span className="text-emerald-600">Policy</span>
          </h1>
          <p className="text-slate-500 font-medium max-w-2xl">
            At Maa Kavita Laxmi Pvt. Ltd., we value your trust. This policy outlines how we handle your data with the same care we put into our craftsmanship.
          </p>
          <div className="mt-8 flex items-center gap-4 text-sm text-slate-400 font-bold border-t border-slate-200 pt-6">
            <span className="flex items-center gap-1"><RefreshCcw size={14}/> Last Updated: {lastUpdated}</span>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          
          {/* Sidebar Navigation (Desktop Only) */}
          <aside className="hidden lg:block space-y-2 sticky top-40 h-fit">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4 px-4">Contents</p>
            {sections.map((item) => (
              <a 
                key={item.id}
                href={`#${item.id}`}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-slate-600 hover:bg-white hover:text-emerald-600 hover:shadow-sm transition-all group"
              >
                <span className="text-slate-300 group-hover:text-emerald-500 transition-colors">{item.icon}</span>
                {item.title.split('. ')[1]}
              </a>
            ))}
          </aside>

          {/* Policy Content */}
          <main className="lg:col-span-3 space-y-16">
            
            <section id="intro" className="scroll-mt-40">
              <h2 className="text-2xl font-black text-slate-900 mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center text-sm">1</span>
                Introduction
              </h2>
              <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed font-medium">
                <p>
                  Welcome to <strong>Maa Kavita Laxmi Pvt. Ltd.</strong>. This Privacy Policy governs your visit to our website and explains how we collect, safeguard, and disclose information that results from your use of our Service. We use your data to provide and improve our specialized tailoring and retail services.
                </p>
              </div>
            </section>

            <section id="collect" className="scroll-mt-40">
              <h2 className="text-2xl font-black text-slate-900 mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center text-sm">2</span>
                Information Collection
              </h2>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="p-6 rounded-3xl bg-white border border-slate-100 shadow-sm">
                  <h3 className="font-bold text-slate-800 mb-2 uppercase text-xs tracking-widest text-emerald-600">Personal Data</h3>
                  <p className="text-sm text-slate-500 leading-snug">Name, email, phone number, shipping address, and body measurements for custom tailoring.</p>
                </div>
                <div className="p-6 rounded-3xl bg-white border border-slate-100 shadow-sm">
                  <h3 className="font-bold text-slate-800 mb-2 uppercase text-xs tracking-widest text-emerald-600">Usage Data</h3>
                  <p className="text-sm text-slate-500 leading-snug">IP address, browser type, pages visited, and time spent on our designer gallery.</p>
                </div>
              </div>
            </section>

            <section id="usage" className="scroll-mt-40">
              <h2 className="text-2xl font-black text-slate-900 mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center text-sm">3</span>
                How We Use Your Information
              </h2>
              <ul className="grid gap-4">
                {[
                  "To fulfill and manage your designer suit orders.",
                  "To maintain your tailoring profile for future customizations.",
                  "To communicate updates regarding your delivery status.",
                  "To prevent fraudulent transactions and maintain site security."
                ].map((text, i) => (
                  <li key={i} className="flex items-start gap-3 p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100 text-slate-700 text-sm font-semibold">
                    <div className="mt-1 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                    {text}
                  </li>
                ))}
              </ul>
            </section>

            <section id="cookies" className="scroll-mt-40">
              <h2 className="text-2xl font-black text-slate-900 mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center text-sm">4</span>
                Cookies Policy
              </h2>
              <p className="text-slate-600 leading-relaxed font-medium">
                We use cookies to track activity on our service and hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
              </p>
            </section>

            <section id="security" className="scroll-mt-40">
              <div className="p-8 rounded-[2.5rem] bg-slate-900 text-white shadow-2xl relative overflow-hidden">
                <div className="relative z-10">
                  <h2 className="text-2xl font-black mb-4 flex items-center gap-3">
                    <Lock className="text-emerald-400" />
                    Data Security
                  </h2>
                  <p className="text-slate-300 text-sm leading-relaxed mb-6">
                    The security of your data is critical to us. We use SSL encryption and industry-standard security protocols to protect your personal information during transmission and storage.
                  </p>
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Encrypted Connection Active
                  </div>
                </div>
                <ShieldCheck size={180} className="absolute -right-10 -bottom-10 text-white/5" />
              </div>
            </section>

            <section id="rights" className="scroll-mt-40 border-t border-slate-200 pt-16 text-center md:text-left">
              <h2 className="text-2xl font-black text-slate-900 mb-6">Your Data Rights</h2>
              <p className="text-slate-600 font-medium mb-8">
                Depending on your location, you have rights to access, delete, or limit the use of your data. If you wish to be informed what personal data we hold about you or want it removed, please contact us.
              </p>
              {/* <a 
                href="mailto:zafardesigner339@gmail.com"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-white border border-slate-200 text-slate-900 font-black hover:bg-slate-50 hover:border-emerald-500 transition-all shadow-sm"
              >
                <Mail className="text-emerald-600" size={20} />
                zafardesigner339@gmail.com
              </a> */}
            </section>

          </main>
        </div>
      </div>
    </div>
  );
}