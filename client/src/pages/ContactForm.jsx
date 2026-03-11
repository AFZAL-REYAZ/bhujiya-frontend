// import React, { useState } from "react";

// const ContactForm = () => {
//   const [form, setForm] = useState({ name: "", phone: "", requirement: "", email: "" });
//   const [submitting, setSubmitting] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!form.name || !form.phone || !form.requirement) {
//       alert("Please fill name, phone and requirement.");
//       return;
//     }
//     setSubmitting(true);
//     try {
//       const subject = "New Contact Enquiry";
//       const message = `Requirement: ${form.requirement}\nName: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email || "N/A"}`;
//       await sendEmail({
//         subject,
//         message,
//         fromName: form.name,
//         fromEmail: form.email,
//         phone: form.phone,
//       });
//       alert("Thanks! Your message has been sent.");
//       setForm({ name: "", phone: "", requirement: "", email: "" });
//     } catch {
//       alert("Could not send message. Please try again later.");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div className="bg-slate-800 text-white py-16 px-20 md:px-2">
//       <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 px-20">

//         {/* LEFT SIDE */}
//         <div className="md:w-1/2 space-y-6">
//           <h1 className="text-4xl font-bold">Contact Us</h1>

//           <div>
//             <p className="text-lg">Hadhubha Vaghela (Proprietor)</p>
//             <h3 className="text-xl font-semibold">Sonai Foods</h3>
//           </div>

//           <p className="text-gray-300 leading-relaxed">
//             Gala No. B-14, 15, 16, 17, 18, Floor Ground, First Floor,
//             Building Name Hira Hari Industrial Estate, Block Sector,
//             Vasai East, Road Palshicya Pada, City Pelhar, District Palghar
//           </p>

//           <p className="text-gray-300">
//             Vasai - 401208, Palghar, Maharashtra, India
//           </p>

//           <p className="font-semibold cursor-pointer hover:text-green-400">
//             Get Directions →
//           </p>

//           <div className="space-y-2 pt-4">
//             <p>📧 Send Email</p>
//             <p>📞 08048962778</p>
//           </div>

//           {/* Social */}
//           <div className="flex items-center gap-4 pt-4">
//             <span>Share:</span>
//             <div className="flex gap-3">
//               <button className="w-9 h-9 rounded-full border border-white flex items-center justify-center hover:bg-white hover:text-slate-800 transition">
//                 f
//               </button>
//               <button className="w-9 h-9 rounded-full border border-white flex items-center justify-center hover:bg-white hover:text-slate-800 transition">
//                 in
//               </button>
//               <button className="w-9 h-9 rounded-full border border-white flex items-center justify-center hover:bg-white hover:text-slate-800 transition">
//                 X
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* RIGHT SIDE */}
//         <div className="md:w-1/2 bg-gray-100 text-black rounded-xl p-8 shadow-lg">
//           <form className="space-y-6" onSubmit={handleSubmit}>

//             <div>
//               <label className="block mb-2 font-medium">
//                 Describe Your Requirement
//               </label>
//               <textarea
//                 placeholder="I would like to..."
//                 className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600"
//                 rows="4"
//                 value={form.requirement}
//                 onChange={(e) => setForm((f) => ({ ...f, requirement: e.target.value }))}
//               />
//             </div>

//             <div>
//               <label className="block mb-2 font-medium">Phone Number</label>
//               <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-green-600">
//                 <span className="px-3 bg-gray-200">+91</span>
//                 <input
//                   type="text"
//                   placeholder="Enter Your Number"
//                   className="w-full p-3 outline-none"
//                   value={form.phone}
//                   onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="block mb-2 font-medium">Name</label>
//               <input
//                 type="text"
//                 placeholder="Enter your name"
//                 className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600"
//                 value={form.name}
//                 onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
//               />
//             </div>

//             <div>
//               <label className="block mb-2 font-medium">Email (optional)</label>
//               <input
//                 type="email"
//                 placeholder="you@example.com"
//                 className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600"
//                 value={form.email}
//                 onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
//               />
//             </div>

//             <button
//               type="submit"
//               className="w-full bg-green-700 hover:bg-green-800 text-white py-3 rounded-lg font-semibold transition disabled:opacity-60"
//               disabled={submitting}
//             >
//               {submitting ? "Submitting..." : "Submit"}
//             </button>

//           </form>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default ContactForm;


import React, { useState } from "react";
import { sendEmail } from "../utils/email"; 
import { 
  FaPhoneAlt, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaFacebookF, 
  FaTwitter,
  FaLinkedinIn,
  FaPaperPlane,
  FaExternalLinkAlt
} from "react-icons/fa";

const ContactForm = () => {
  const [form, setForm] = useState({ name: "", phone: "", requirement: "", email: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.requirement) {
      alert("Please fill Name, Phone and Requirement.");
      return;
    }

    setSubmitting(true);
    try {
      const emailSent = await sendEmail({
        subject: `New Business Enquiry from ${form.name}`,
        message: form.requirement,
        fromName: form.name,
        fromEmail: form.email,
        phone: form.phone,
      });

      if (emailSent) {
        alert("Enquiry Sent! We will contact you shortly.");
        setForm({ name: "", phone: "", requirement: "", email: "" });
      }
    } catch (error) {
      alert("Error sending message. Please try calling us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#0f172a] text-white py-12 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-20">

        {/* LEFT SIDE: Company Info */}
        <div className="w-full lg:w-1/2 space-y-10">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter">
              Contact <span className="text-green-500">Us</span>
            </h1>
            <div className="h-2 w-20 bg-green-500 rounded-full"></div>
            <p className="text-gray-400 text-lg font-medium">
              Have questions about our products or bulk orders? Reach out to the experts at Maa Kavita Laxmi Pvt. Ltd.
            </p>
          </div>

          {/* Detailed Address Block */}
          <div className="space-y-8">
            <div className="flex items-start gap-5 group">
              <div className="bg-green-600/10 p-4 rounded-2xl group-hover:bg-green-600/20 transition-colors">
                <FaMapMarkerAlt className="text-green-500" size={24} />
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-green-500 mb-1">Our Location</p>
                <h3 className="text-xl font-bold mb-2">Maa Kavita Laxmi Pvt. Ltd.</h3>
                <p className="text-gray-400 leading-relaxed text-sm md:text-base italic">
                  Ward No.-71, Holding No.- 171/225/182A, Circle No.-226, Simlli Murarour, Sahdara, Patna, Bihar - 800008
                </p>
                {/* <a 
                  href="https://www.google.com/maps" 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-green-500 font-bold text-sm mt-3 hover:underline"
                >
                  Get Directions <FaExternalLinkAlt size={12}/>
                </a> */}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              <div className="flex items-center gap-4">
                <div className="bg-blue-500/10 p-3 rounded-xl">
                  <FaPhoneAlt className="text-blue-400" size={18} />
                </div>
                <p className="font-bold text-gray-200">+91-8492995999</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-red-500/10 p-3 rounded-xl">
                  <FaEnvelope className="text-red-400" size={18} />
                </div>
                <p className="font-bold text-gray-200">maakavitalaxmi@gmail.com</p>
              </div>
            </div>
          </div>

          {/* Social Links Updated */}
          <div className="pt-8 border-t border-gray-800">
            <p className="text-xs font-black uppercase tracking-widest text-gray-500 mb-5">Connect with us</p>
            <div className="flex gap-4">
              <a 
                href="https://www.facebook.com/people/Maa-Kavita-Laxmi-Pvt-Ltd/61584024615846/" 
                target="_blank" 
                rel="noreferrer"
                className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center hover:bg-[#1877F2] hover:-translate-y-1 transition-all duration-300"
              >
                <FaFacebookF size={20} />
              </a>
              <a 
                href="https://x.com/yourpage" 
                target="_blank" 
                rel="noreferrer"
                className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center hover:bg-black hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-gray-700"
              >
                <FaTwitter size={20} />
              </a>
              {/* <a 
                href="#" 
                target="_blank" 
                rel="noreferrer"
                className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center hover:bg-[#0A66C2] hover:-translate-y-1 transition-all duration-300"
              >
                <FaLinkedinIn size={20} />
              </a> */}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: Form Container */}
        <div className="w-full lg:w-1/2">
          <div className="bg-white rounded-[2.5rem] p-6 sm:p-10 lg:p-12 shadow-2xl transform lg:translate-y-6">
            <h2 className="text-3xl font-black text-slate-900 mb-2">Send Message</h2>
            <p className="text-gray-500 mb-8 font-medium">We usually respond within 24 hours.</p>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Requirement Details</label>
                <textarea
                  rows="4"
                  placeholder="Tell us what you are looking for..."
                  className="w-full p-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-green-500 focus:bg-white text-slate-900 outline-none transition-all resize-none font-medium"
                  value={form.requirement}
                  onChange={(e) => setForm({ ...form, requirement: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Full Name</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full p-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-green-500 focus:bg-white text-slate-900 outline-none transition-all font-bold"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+91 00000 00000"
                    className="w-full p-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-green-500 focus:bg-white text-slate-900 outline-none transition-all font-bold"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Email (Optional)</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full p-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-green-500 focus:bg-white text-slate-900 outline-none transition-all font-medium"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-5 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all active:scale-95 disabled:opacity-50 shadow-xl shadow-green-100 mt-4"
              >
                {submitting ? "Processing..." : <>Send Enquiry <FaPaperPlane size={14}/></>}
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ContactForm;
