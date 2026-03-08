import React from "react";
import { submitQuote } from "../../utils/orderApi";

const QuoteModal = ({
  open,
  product,
  source,
  sourceLabel,
  quoteForm,
  setQuoteForm,
  onClose,
  getProductDetails,
}) => {
  if (!open || !product) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex">
          <div className="hidden md:block w-1/3 bg-gray-50 p-4">
            <div className="rounded-xl overflow-hidden border border-gray-100">
              <img src={product.image} alt={product.title} className="w-full h-auto object-contain" />
            </div>
            <p className="mt-3 text-xs text-gray-600">
              {product.title}
              <br />₹ {product.price} / {product.quantity}
            </p>
            <div className="mt-3 text-[11px] text-gray-700 space-y-4">
              {(() => {
                const d = getProductDetails(product);
                return (
                  <>
                    <p>
                      <span className="font-bold">Brand</span>: {d.brand}
                    </p>
                    <p>
                      <span className="font-bold">Packaging Size</span>: {d.packagingSize}
                    </p>
                    <p>
                      <span className="font-bold">Shelf Life</span>: {d.shelfLife}
                    </p>
                    <p>
                      <span className="font-bold">Country of Origin</span>: {d.origin}
                    </p>
                    <p>
                      <span className="font-bold">Ingredients</span>: {d.ingredients}
                    </p>
                    <p>
                      <span className="font-bold">100% Vegetarian</span>: {d.vegetarian}
                    </p>
                  </>
                );
              })()}
            </div>
          </div>
          <div className="flex-1 p-6">
            <div className="flex items-start justify-between">
              <h3 className="text-lg font-bold text-gray-900">Get Best Quote and quick callback</h3>
              <button onClick={onClose} className="text-gray-500 hover:text-gray-900">
                ×
              </button>
            </div>
            <form
              className="mt-4 grid gap-3"
              onSubmit={async (e) => {
                  e.preventDefault();
                  try {
                    await submitQuote({
                      source: source || "featured",
                      sourceLabel: sourceLabel || "Featured Products",
                      product: {
                        id: product.id,
                        title: product.title,
                        price: product.price,
                        quantity: product.quantity,
                        image: product.image,
                      },
                      customer: {
                        name: quoteForm.name,
                        phone: quoteForm.mobile,
                        email: quoteForm.email,
                      },
                      message: quoteForm.message,
                      page: "home",
                      section: sourceLabel || "",
                    });
                    alert("Your order is confirmed.");
                    onClose();
                    setQuoteForm({ name: "", mobile: "", email: "", message: "" });
                  } catch (error) {
                    alert(error.message || "Could not submit your order.");
                  }
              }}
            >
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-gray-700">Name</label>
                  <input
                    type="text"
                    required
                    value={quoteForm.name}
                    onChange={(e) => setQuoteForm({ ...quoteForm, name: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600/30"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700">Mobile Number</label>
                  <input
                    type="tel"
                    required
                    value={quoteForm.mobile}
                    onChange={(e) => setQuoteForm({ ...quoteForm, mobile: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600/30"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-700">Email (optional)</label>
                <input
                  type="email"
                  value={quoteForm.email}
                  onChange={(e) => setQuoteForm({ ...quoteForm, email: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600/30"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-700">Message (optional)</label>
                <textarea
                  rows={3}
                  value={quoteForm.message}
                  onChange={(e) => setQuoteForm({ ...quoteForm, message: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600/30 resize-none"
                  placeholder="Share any specific requirements"
                />
              </div>
              <button
                type="submit"
                className="mt-2 w-full inline-flex items-center justify-center rounded-xl bg-[#0b3b2a] text-white text-sm font-bold px-6 py-3"
              >
                Submit Now
              </button>
              <p className="mt-2 text-[11px] text-gray-500">
                We will contact you on the provided number/email.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteModal;
