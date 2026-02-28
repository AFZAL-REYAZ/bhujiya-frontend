import React from "react";

const ContactForm = () => {
  return (
    <div className="bg-slate-800 text-white py-16 px-20 md:px-2">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 px-20">

        {/* LEFT SIDE */}
        <div className="md:w-1/2 space-y-6">
          <h1 className="text-4xl font-bold">Contact Us</h1>

          <div>
            <p className="text-lg">Hadhubha Vaghela (Proprietor)</p>
            <h3 className="text-xl font-semibold">Sonai Foods</h3>
          </div>

          <p className="text-gray-300 leading-relaxed">
            Gala No. B-14, 15, 16, 17, 18, Floor Ground, First Floor,
            Building Name Hira Hari Industrial Estate, Block Sector,
            Vasai East, Road Palshicya Pada, City Pelhar, District Palghar
          </p>

          <p className="text-gray-300">
            Vasai - 401208, Palghar, Maharashtra, India
          </p>

          <p className="font-semibold cursor-pointer hover:text-green-400">
            Get Directions →
          </p>

          <div className="space-y-2 pt-4">
            <p>📧 Send Email</p>
            <p>📞 08048962778</p>
          </div>

          {/* Social */}
          <div className="flex items-center gap-4 pt-4">
            <span>Share:</span>
            <div className="flex gap-3">
              <button className="w-9 h-9 rounded-full border border-white flex items-center justify-center hover:bg-white hover:text-slate-800 transition">
                f
              </button>
              <button className="w-9 h-9 rounded-full border border-white flex items-center justify-center hover:bg-white hover:text-slate-800 transition">
                in
              </button>
              <button className="w-9 h-9 rounded-full border border-white flex items-center justify-center hover:bg-white hover:text-slate-800 transition">
                X
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="md:w-1/2 bg-gray-100 text-black rounded-xl p-8 shadow-lg">
          <form className="space-y-6">

            <div>
              <label className="block mb-2 font-medium">
                Describe Your Requirement
              </label>
              <textarea
                placeholder="I would like to..."
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600"
                rows="4"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Phone Number</label>
              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-green-600">
                <span className="px-3 bg-gray-200">+91</span>
                <input
                  type="text"
                  placeholder="Enter Your Number"
                  className="w-full p-3 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block mb-2 font-medium">Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-700 hover:bg-green-800 text-white py-3 rounded-lg font-semibold transition"
            >
              Submit
            </button>

          </form>
        </div>

      </div>
    </div>
  );
};

export default ContactForm;