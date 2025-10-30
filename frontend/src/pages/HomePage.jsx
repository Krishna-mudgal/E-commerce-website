import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-4xl font-bold mb-8 text-blue-700">ShopEase</h1>
      <div className="flex space-x-4">
        <button
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition"
          onClick={() => navigate('/shop')}
        >
          Shopping
        </button>
        <button
          className="px-6 py-3 bg-green-500 text-white rounded-lg font-semibold shadow hover:bg-green-600 transition"
          onClick={() => navigate('/add-product')}
        >
          Add Product
        </button>
      </div>
    </div>
  );
}

export default Home;
