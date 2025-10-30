import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantities, setQuantities] = useState({});
  const navigate = useNavigate();

  const fetchAllProducts = () => {
    fetch("http://localhost:3000/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        // Initialize quantities for each product as 1
        const initQuantities = {};
        data.forEach((p) => (initQuantities[p._id] = 1));
        setQuantities(initQuantities);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch products.");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const increaseQuantity = (productId) => {
    setQuantities((prev) => {
      const maxQty = products.find((p) => p._id === productId)?.quantity || 1;
      const currentQty = prev[productId] || 1;
      if (currentQty < maxQty) {
        return { ...prev, [productId]: currentQty + 1 };
      }
      return prev;
    });
  };

  const decreaseQuantity = (productId) => {
    setQuantities((prev) => {
      const currentQty = prev[productId] || 1;
      if (currentQty > 1) {
        return { ...prev, [productId]: currentQty - 1 };
      }
      return prev;
    });
  };

  const handleBuyNow = (product) => {
    const quantity = quantities[product._id] || 1;
    navigate(`/checkout/${product._id}`, {
      state: {
        product: {
          title: product.title,
          imageUrl: product.imageUrl,
          description: product.description,
          price: product.price,
          quantity,
          _id: product._id,
        },
      },
    });
  };

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50 pt-8">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">
        ShopEase - Products
      </h1>
      <div className="max-w-6xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 gap-6 px-4">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
          >
            {product.imageUrl && (
              <img
                src={product.imageUrl}
                alt={product.title}
                loading="lazy"
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4 flex-1 flex flex-col">
              <h2 className="text-lg font-bold mb-2 text-blue-900">
                {product.title}
              </h2>
              <p className="text-sm text-gray-600 mb-2 flex-1">
                {product.description || "No description."}
              </p>
              <div className="mt-2">
                <span className="text-green-700 font-bold mr-2">${product.price}</span>
                <span className="text-gray-600 text-sm">{product.quantity} left in stock</span>
              </div>
              {/* Quantity selector */}
              <div className="flex items-center space-x-4 mt-3">
                <button
                  onClick={() => decreaseQuantity(product._id)}
                  disabled={(quantities[product._id] || 1) <= 1}
                  className="bg-gray-200 hover:bg-gray-300 rounded px-3 py-1 text-lg font-bold disabled:opacity-50"
                >
                  –
                </button>
                <span className="text-lg font-semibold">{quantities[product._id] || 1}</span>
                <button
                  onClick={() => increaseQuantity(product._id)}
                  disabled={
                    (quantities[product._id] || 1) >= product.quantity || product.quantity === 0
                  }
                  className="bg-gray-200 hover:bg-gray-300 rounded px-3 py-1 text-lg font-bold disabled:opacity-50"
                >
                  +
                </button>
              </div>
              {/* Buy Now button */}
              <button
                onClick={() => handleBuyNow(product)}
                disabled={product.quantity === 0}
                className="mt-5 bg-blue-600 text-white py-2 rounded shadow hover:bg-blue-700 transition disabled:opacity-50"
              >
                Buy Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Shop;
