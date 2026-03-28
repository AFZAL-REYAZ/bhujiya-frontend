import React from "react";
import ContactEnquiriesTable from "./ContactEnquiriesTable";

export default function ContactEnquiriesPage() {
  return (
    <div className="w-full max-w-5xl mx-auto p-2 sm:p-4">
      <h1 className="text-2xl font-black text-green-700 mb-4">Contact Enquiries</h1>
      <ContactEnquiriesTable />
    </div>
  );
}
