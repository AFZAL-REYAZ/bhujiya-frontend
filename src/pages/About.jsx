import React from "react";
import { motion } from "framer-motion";
import {
  MdCheckCircle,
  MdBusiness,
  MdAccountBalance,
  MdVerifiedUser,
} from "react-icons/md";
import { FaBuilding, FaUserTie } from "react-icons/fa";

// Certificate Assets
import cert1 from "../assets/certificate/cert1.png";
import cert2 from "../assets/certificate/cert2.png";
import cert3 from "../assets/certificate/cert3.png";
import cert4 from "../assets/certificate/cert4.png";
import cert5 from "../assets/certificate/cert5.png";

// Office Assets
import office_1 from "../assets/office_1.webp";
import office_2 from "../assets/office_2.webp";
import office_3 from "../assets/office_3.webp";
import office_4 from "../assets/office_4.webp";

/* ---------------- ANIMATIONS ---------------- */
const fadeUp = {
  initial: { opacity: 0, y: 60 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: "easeOut" },
};

const stagger = {
  whileInView: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

export default function About() {
  return (
    <section className="mt-24 pb-32 bg-gradient-to-b from-[#fafafa] to-[#f1f5f9] overflow-hidden">
      {/* ================= HERO ================= */}
      <div className="relative bg-gradient-to-br from-black via-[#052e16] to-black py-32 px-6">
        <div className="absolute inset-0 opacity-40">
          <div className="absolute -top-20 -left-20 w-[45%] h-[90%] bg-emerald-600 blur-[140px] rounded-full" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[45%] h-[90%] bg-green-500 blur-[140px] rounded-full" />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative z-10 max-w-6xl mx-auto text-center"
        >
          <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tight mb-6">
            Our <span className="text-emerald-400">Legacy</span> & Trust
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            A premium food manufacturing enterprise delivering authentic taste,
            certified hygiene, and uncompromising quality.
          </p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-24 relative z-20">
        {/* ================= FACT SHEET ================= */}
        <motion.div
          variants={stagger}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-32"
        >
          {/* Card */}
          <motion.div
            variants={fadeUp}
            className="bg-white/80 backdrop-blur-xl p-10 rounded-[3rem] shadow-2xl border border-gray-100 hover:shadow-emerald-200/40 transition"
          >
            <IconBox>
              <MdBusiness size={30} />
            </IconBox>
            <CardTitle>Basic Information</CardTitle>
            <InfoRow label="Business Nature" value="Manufacturer" />
            <InfoRow label="Segments" value="Retail, Wholesale, Factory" />
            <InfoRow label="CEO" value="Dharmendra Kumar" />
            <InfoRow label="Turnover" value="0 – 40 L (Annual)" />
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="bg-white/80 backdrop-blur-xl p-10 rounded-[3rem] shadow-2xl border border-gray-100 hover:shadow-blue-200/40 transition"
          >
            <IconBox color="blue">
              <MdAccountBalance size={30} />
            </IconBox>
            <CardTitle>Statutory Profile</CardTitle>
            <InfoRow label="Banker" value="Axis Bank" />
            <InfoRow label="GST No." value="10AAOCM9571F1ZB" />
            <InfoRow label="CIN No." value="U15419BR2021PTC053992" />
            <InfoRow label="Legal Status" value="Limited Company" />
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="bg-gradient-to-br from-black to-[#052e16] text-white p-10 rounded-[3rem] shadow-2xl"
          >
            <IconBox dark>
              <FaUserTie size={24} />
            </IconBox>
            <CardTitle light>GST Partners</CardTitle>

            <Partner name="Dharmendra Kumar" initials="DK" />
            <Partner name="Satyendra Kumar" initials="SK" />

            <div className="mt-8 pt-6 border-t border-white/20">
              <p className="text-xs text-gray-300 uppercase tracking-widest">
                Registration Date
              </p>
              <p className="text-2xl font-black text-emerald-400">11-02-2025</p>
            </div>
          </motion.div>
        </motion.div>

        {/* ================= CERT HERO ================= */}
        <motion.div
          {...fadeUp}
          className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-40"
        >
          <div>
            <span className="text-emerald-600 font-black uppercase tracking-[0.35em] text-xs">
              Quality First
            </span>
            <h2 className="text-5xl font-black mt-6 mb-8 uppercase leading-tight">
              Manufacturing <br /> Excellence
            </h2>
            <p className="text-gray-600 text-lg mb-10">
              Every product is manufactured under strict food safety norms,
              supervised hygienic conditions, and certified government standards.
            </p>

            <div className="grid sm:grid-cols-2 gap-5">
              {[
                "Certified Food Safety Supervisor",
                "Registered MSME Enterprise",
                "Health Department Approved",
                "Government Form-C Certified",
              ].map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.04 }}
                  className="flex items-center gap-3 bg-white px-5 py-4 rounded-2xl shadow border"
                >
                  <MdCheckCircle className="text-emerald-500" size={22} />
                  <span className="text-xs font-black uppercase text-gray-700">
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            whileHover={{ scale: 1.03 }}
            className="relative rounded-[3rem] overflow-hidden shadow-[0_40px_120px_rgba(0,0,0,0.25)] border-8 border-white bg-white"
          >
            <img
              src={cert1}
              className="w-full h-[520px] object-contain p-10 transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-x-6 bottom-6 bg-black/80 backdrop-blur-xl p-6 rounded-[2rem] text-white flex items-center gap-3">
              <MdVerifiedUser className="text-emerald-400" size={26} />
              <p className="font-black uppercase tracking-widest text-xs">
                Government Verified Facility
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* ================= OFFICE GALLERY ================= */}
        <div className="mb-40">
          <div className="flex items-end justify-between mb-14">
            <div>
              <h2 className="text-5xl font-black uppercase">Infrastructure</h2>
              <p className="text-gray-400 uppercase text-xs tracking-widest mt-2">
                Modern Facilities
              </p>
            </div>
            <FaBuilding className="text-gray-200" size={48} />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[office_1, office_2, office_3, office_4].map((img, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -12 }}
                className="relative h-80 rounded-[2.5rem] overflow-hidden shadow-xl group"
              >
                <img
                  src={img}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent opacity-0 group-hover:opacity-100 transition flex items-end p-8">
                  <p className="text-white font-black uppercase tracking-widest text-xs">
                    Corporate Unit {i + 1}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ================= CERT GRID ================= */}
        <div className="bg-gradient-to-br from-gray-100 to-white rounded-[4rem] p-14 md:p-24">
          <h2 className="text-5xl font-black text-center uppercase mb-20">
            Compliance <span className="text-emerald-600">Vault</span>
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {[
              { title: "Food Safety Certificate", img: cert2 },
              { title: "MSME Registration", img: cert4 },
              { title: "Health Approval", img: cert3 },
              { title: "Form-C Certificate", img: cert5 },
            ].map((c, i) => (
              <motion.div
                whileHover={{ scale: 1.05 }}
                key={i}
                className="bg-white rounded-3xl p-6 shadow-lg border"
              >
                <div className="h-60 flex items-center justify-center bg-gray-50 rounded-2xl mb-6 p-6">
                  <img
                    src={c.img}
                    className="max-h-full object-contain transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <p className="text-xs font-black uppercase tracking-widest text-center">
                  {c.title}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- COMPONENTS ---------------- */
function InfoRow({ label, value }) {
  return (
    <div className="flex justify-between items-center py-2 border-b last:border-0">
      <span className="text-[10px] uppercase tracking-widest text-gray-400 font-black">
        {label}
      </span>
      <span className="font-bold text-gray-800 text-sm">{value}</span>
    </div>
  );
}

function IconBox({ children, color = "green", dark }) {
  const styles = dark
    ? "bg-emerald-400 text-black"
    : color === "blue"
    ? "bg-blue-100 text-blue-600"
    : "bg-emerald-100 text-emerald-600";

  return (
    <div
      className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${styles}`}
    >
      {children}
    </div>
  );
}

function CardTitle({ children, light }) {
  return (
    <h3
      className={`text-xl font-black uppercase mb-6 tracking-tight ${
        light ? "text-white" : "text-gray-900"
      }`}
    >
      {children}
    </h3>
  );
}

function Partner({ name, initials }) {
  return (
    <div className="flex items-center gap-4 mb-4">
      <div className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center font-black">
        {initials}
      </div>
      <p className="font-bold">{name}</p>
    </div>
  );
}
