import React, { useState } from 'react';

const OrderForm = ({ onConfirm }) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    payment: 'Online',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm(form);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md space-y-4">
      <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        required
        className="w-full border rounded px-3 py-2"
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
        className="w-full border rounded px-3 py-2"
      />
      <input
        type="tel"
        name="phone"
        placeholder="Phone Number"
        value={form.phone}
        onChange={handleChange}
        required
        className="w-full border rounded px-3 py-2"
      />
      <textarea
        name="address"
        placeholder="Address"
        value={form.address}
        onChange={handleChange}
        required
        className="w-full border rounded px-3 py-2"
      />
      <div>
        <label className="font-medium">Payment Method:</label>
        <div className="flex gap-4 mt-1">
          <label>
            <input
              type="radio"
              name="payment"
              value="Online"
              checked={form.payment === 'Online'}
              onChange={handleChange}
            />{' '}
            Online
          </label>
          <label>
            <input
              type="radio"
              name="payment"
              value="COD"
              checked={form.payment === 'COD'}
              onChange={handleChange}
            />{' '}
            C.O.D
          </label>
        </div>
      </div>
      <button
        type="submit"
        className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 rounded"
      >
        Confirm Order
      </button>
    </form>
  );
};

export default OrderForm;
