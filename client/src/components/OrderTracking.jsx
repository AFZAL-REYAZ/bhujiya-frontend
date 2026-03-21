import React from 'react';

const steps = [
  'Order Placed',
  'Packed',
  'Shipped',
  'Out for Delivery',
  'Delivered',
];

const OrderTracking = ({ currentStep }) => {
  return (
    <div className="max-w-2xl mx-auto my-8">
      <h2 className="text-xl font-semibold mb-4">Order Tracking</h2>
      <div className="flex items-center justify-between">
        {steps.map((step, idx) => (
          <div key={step} className="flex-1 flex flex-col items-center">
            <div
              className={`w-8 h-8 flex items-center justify-center rounded-full border-2 ${
                idx <= currentStep ? 'bg-yellow-500 border-yellow-500 text-white' : 'bg-gray-200 border-gray-300 text-gray-500'
              }`}
            >
              {idx + 1}
            </div>
            <span className={`mt-2 text-xs ${idx <= currentStep ? 'text-yellow-600 font-semibold' : 'text-gray-400'}`}>{step}</span>
            {idx < steps.length - 1 && (
              <div className={`h-1 w-full ${idx < currentStep ? 'bg-yellow-500' : 'bg-gray-300'}`}></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderTracking;
