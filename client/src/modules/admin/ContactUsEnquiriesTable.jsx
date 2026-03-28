import React, { useEffect, useState } from "react";
import API from "../../config/api/apiconfig";

function ContactUsEnquiriesTable() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    API.get("/admin/contact-enquiries", { params: { source: "contactus" } })
      .then((res) => {
        setEnquiries(res.data.enquiries || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch enquiries failed:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow border border-slate-100 p-4 mt-8">
      <h2 className="text-lg font-bold mb-4 text-blue-700">Contact Us Enquiries</h2>
      {loading ? (
        <div className="text-center text-gray-400 py-8">Loading...</div>
      ) : enquiries.length === 0 ? (
        <div className="text-center text-gray-400 py-8">No enquiries found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="bg-blue-50 text-blue-800">
                <th className="px-2 py-2 font-bold text-left">Name</th>
                <th className="px-2 py-2 font-bold text-left">Phone</th>
                <th className="px-2 py-2 font-bold text-left">Email</th>
                <th className="px-2 py-2 font-bold text-left">Message</th>
                <th className="px-2 py-2 font-bold text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {enquiries.map((enq, idx) => (
                <tr
                  key={enq._id}
                  className={
                    idx % 2 === 0
                      ? "bg-white hover:bg-blue-50"
                      : "bg-blue-50 hover:bg-blue-100"
                  }
                >
                  <td className="px-2 py-2 font-semibold text-slate-800 whitespace-nowrap">{enq.name}</td>
                  <td className="px-2 py-2 text-blue-700 font-bold whitespace-nowrap">
                    {selected === enq._id ? enq.phone : "••••••••••"}
                  </td>
                  <td className="px-2 py-2 text-slate-600 whitespace-nowrap">{enq.email || "-"}</td>
                  <td className="px-2 py-2 text-slate-600 min-w-[200px]">{enq.message}</td>
                  <td className="px-2 py-2">
                    <button
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs font-bold shadow"
                      onClick={() => setSelected(selected === enq._id ? null : enq._id)}
                    >
                      {selected === enq._id ? "Hide" : "Call Now"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ContactUsEnquiriesTable;
