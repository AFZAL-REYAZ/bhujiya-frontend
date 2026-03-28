import React from "react";
import ContactUsEnquiriesTable from "./ContactUsEnquiriesTable";

export default function ContactUsEnquiriesPage() {
  return (
    <div className="w-full max-w-5xl mx-auto p-2 sm:p-4">
      <h1 className="text-2xl font-black text-blue-700 mb-4">Contact Us Enquiries</h1>
      <ContactUsEnquiriesTable />
    </div>
  );
}
