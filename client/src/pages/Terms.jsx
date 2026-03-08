import React from "react";
import { 
  FileText, 
  Truck, 
  CreditCard, 
  RotateCcw, 
  Scissors, 
  Scale, 
  AlertCircle,
  CheckCircle2
} from "lucide-react";

export default function Terms() {
  const lastUpdated = "March 7, 2026";

  const sections = [
    { id: "orders", title: "Orders & Customization", icon: <Scissors size={18} /> },
    { id: "pricing", title: "Pricing & Payments", icon: <CreditCard size={18} /> },
    { id: "shipping", title: "Shipping & Delivery", icon: <Truck size={18} /> },
    { id: "returns", title: "Returns & Refunds", icon: <RotateCcw size={18} /> },
    { id: "legal", title: "Legal Provisions", icon: <Scale size={18} /> },
  ];

  return (
    <div className="min-h-screen bg-[#fcfcfc] pt-32 pb-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <header className="mb-16">
          <div className="flex items-center gap-3 text-amber-600 font-black uppercase tracking-[0.3em] text-[10px] mb-4">
            <div className="h-[1px] w-10 bg-amber-400"></div>
            Official Agreement
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight mb-6">
            Terms & <span className="text-amber-500">Conditions</span>
          </h1>
          <p className="text-slate-500 font-medium max-w-3xl leading-relaxed">
            Please read these terms carefully before using our services. By placing an order with 
            <strong> Zafar Suits Designer</strong>, you enter into a legally binding agreement 
            governed by the laws of India.
          </p>
          <p className="mt-4 text-xs font-bold text-slate-400">VERSION 2.4 • LAST UPDATED: {lastUpdated}</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Mobile Quick Links (Horizontal Scroll) */}
          <div className="lg:hidden flex gap-3 overflow-x-auto pb-4 no-scrollbar">
            {sections.map((s) => (
              <a key={s.id} href={`#${s.id}`} className="whitespace-nowrap px-4 py-2 bg-white border border-slate-200 rounded-full text-xs font-bold text-slate-600">
                {s.title}
              </a>
            ))}
          </div>

          {/* Desktop Navigation */}
          <aside className="hidden lg:block lg:col-span-3 space-y-1 sticky top-40 h-fit">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 px-4">Jump To Section</p>
            {sections.map((item) => (
              <a 
                key={item.id}
                href={`#${item.id}`}
                className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold text-slate-500 hover:bg-slate-900 hover:text-white transition-all duration-300"
              >
                {item.icon}
                {item.title}
              </a>
            ))}
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-9 space-y-12 bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-slate-100">
            
            {/* Section 1 */}
            <section id="orders" className="scroll-mt-40">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center">
                  <Scissors size={20} />
                </div>
                <h2 className="text-2xl font-black text-slate-900">1. Orders & Customization</h2>
              </div>
              <div className="space-y-4 text-slate-600 font-medium leading-relaxed">
                <p>
                  For custom-tailored garments, the user is responsible for providing accurate measurements. 
                  Zafar Designer will not be held liable for ill-fitting clothes resulting from incorrect measurements 
                  provided via our digital forms.
                </p>
                <div className="bg-slate-50 p-6 rounded-2xl border-l-4 border-amber-400">
                  <h4 className="text-slate-900 font-bold mb-2 flex items-center gap-2">
                    <AlertCircle size={16} className="text-amber-500"/> Production Policy
                  </h4>
                  <p className="text-sm">
                    Once a fabric has been cut for customization, orders cannot be cancelled or modified. 
                    Minor variations in fabric color (due to screen resolution) and embroidery hand-work are 
                    considered unique characteristics of artisanal products.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 2 */}
            <section id="pricing" className="scroll-mt-40">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                  <CreditCard size={20} />
                </div>
                <h2 className="text-2xl font-black text-slate-900">2. Pricing & Payments</h2>
              </div>
              <p className="text-slate-600 font-medium mb-4">
                All prices are inclusive of applicable GST unless stated otherwise. We reserve the right 
                to adjust pricing based on fabric market fluctuations or intricate design requests.
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {["Secure Encrypted Payments", "Partial Advance for Custom Suits", "Bulk Order Discounts Available", "Digital Invoice via Email"].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm font-bold text-slate-700">
                    <CheckCircle2 size={16} className="text-green-500" /> {item}
                  </li>
                ))}
              </ul>
            </section>

            {/* Section 3 */}
            <section id="shipping" className="scroll-mt-40">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center">
                  <Truck size={20} />
                </div>
                <h2 className="text-2xl font-black text-slate-900">3. Shipping & Logistics</h2>
              </div>
              <p className="text-slate-600 font-medium">
                Standard delivery within India takes 7-12 business days. For International orders, 
                custom duties and local taxes are the sole responsibility of the customer. 
                We are not liable for delays caused by third-party logistics or customs clearance.
              </p>
            </section>

            {/* Section 4 */}
            <section id="returns" className="scroll-mt-40">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
                  <RotateCcw size={20} />
                </div>
                <h2 className="text-2xl font-black text-slate-900">4. Returns & Non-Returnable Items</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="border border-slate-100 p-5 rounded-3xl">
                  <h4 className="font-black text-slate-900 mb-2 uppercase text-[10px] tracking-widest text-green-600">Returnable</h4>
                  <p className="text-sm text-slate-500">Unstitched fabrics, ready-to-wear catalog items (Standard Sizes), and manufacturing defects reported within 48 hours.</p>
                </div>
                <div className="border border-slate-100 p-5 rounded-3xl bg-red-50/30">
                  <h4 className="font-black text-slate-900 mb-2 uppercase text-[10px] tracking-widest text-red-600">Non-Returnable</h4>
                  <p className="text-sm text-slate-500">All custom-tailored suits, personalized embroidery, items with removed tags, and sales/clearance items.</p>
                </div>
              </div>
            </section>

            {/* Section 5 */}
            <section id="legal" className="scroll-mt-40">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center">
                  <Scale size={20} />
                </div>
                <h2 className="text-2xl font-black text-slate-900">5. Legal Notice</h2>
              </div>
              <div className="prose prose-slate max-w-none text-slate-500 italic text-sm">
                <p>
                  In no event shall Zafar Suits Designer be liable for any special, direct, indirect, 
                  consequential, or incidental damages or any damages whatsoever, whether in an action 
                  of contract, negligence or other tort, arising out of or in connection with the 
                  use of our products. All disputes are subject to the jurisdiction of the courts in Palghar/Maharashtra.
                </p>
              </div>
            </section>

            {/* Support Footer */}
            <div className="mt-12 p-8 rounded-[2rem] bg-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-xl font-bold">Still have questions?</h3>
                <p className="text-slate-400 text-sm">Our support team is available Mon-Sat (10AM - 7PM)</p>
              </div>
              <div className="flex gap-4">
                <a href="mailto:zafardesigner339@gmail.com" className="px-6 py-3 bg-white text-slate-900 rounded-xl font-black text-sm transition-transform hover:scale-105">
                  Email Us
                </a>
                <a href="/contactus" className="px-6 py-3 bg-amber-500 text-white rounded-xl font-black text-sm transition-transform hover:scale-105">
                  Contact Form
                </a>
              </div>
            </div>

          </main>
        </div>
      </div>
    </div>
  );
}