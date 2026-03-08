import emailjs from "@emailjs/browser";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const TO_EMAIL = import.meta.env.VITE_CONTACT_TO_EMAIL || "afjalreyaz@gmail.com";

export async function sendEmail({ subject, message, fromName, fromEmail, phone }) {
  if (SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY) {
    emailjs.init(PUBLIC_KEY);
    const templateParams = {
      subject: subject || "New Enquiry",
      message: message || "",
      from_name: fromName || "Website Visitor",
      reply_to: fromEmail || "",
      phone: phone || "",
      to_email: TO_EMAIL,
    };
    await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams);
    return true;
  }
  const body = encodeURIComponent(
    `${subject ? subject + "\n\n" : ""}${message || ""}${
      fromName || fromEmail || phone ? `\n\nFrom: ${fromName || ""} ${fromEmail || ""} ${phone || ""}` : ""
    }`
  );
  window.location.href = `mailto:${TO_EMAIL}?subject=${encodeURIComponent(subject || "Website Enquiry")}&body=${body}`;
  return true;
}

