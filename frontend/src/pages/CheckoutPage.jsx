import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

function Checkout() {
    const { productId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    // Get product details passed via state
    const { product } = location.state || {};

    // Local state for form data
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [agree, setAgree] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    if (!product) {
        return <div className="p-8">Product data not available.</div>;
    }

    const totalPrice = product.price * product.quantity;

    const handleConfirm = async () => {
        setSubmitting(true);
        try {
            const response = await fetch("http://localhost:3000/book", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    productId: product._id,
                    productTitle: product.title,
                    productImage: product.imageUrl,
                    productDescription: product.description,
                    price: product.price,
                    quantity: product.quantity,
                    customerName: fullName,
                    customerEmail: email,
                    deliveryAddress: address,
                }),
            });

            if (!response.ok) {
                throw new Error('Order confirmation failed');
            }

            const result = await response.json();

            alert('Order Confirmed!');
            navigate('/success', { state: { bookingId: result.bookingId || result._id } });
        } catch (err) {
            alert('Failed to confirm order.');
        } finally {
            setSubmitting(false);
        }
    };


    return (
        <div className="min-h-screen p-4 bg-gray-50 flex flex-col md:flex-row gap-4 md:gap-8 max-w-7xl mx-auto">

            {/* Left: Product Details */}
            <div className="flex-1 bg-white p-4 rounded-lg shadow-md flex flex-col md:flex-row gap-4">
                <img src={product.imageUrl} alt={product.title} className="w-full md:w-1/2 h-64 object-cover rounded" />
                <div className="flex-1 flex flex-col justify-between">
                    <div>
                        <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
                        <p className="mb-2 text-gray-700">{product.description}</p>
                        <p className="text-lg font-semibold mb-2">
                            ${product.price.toFixed(2)} x {product.quantity} = <span className="text-xl">${totalPrice.toFixed(2)}</span>
                        </p>
                    </div>
                </div>
            </div>

            {/* Right: Checkout Form */}
            <div className="flex-1 bg-white p-6 rounded-lg shadow-md flex flex-col gap-4">
                {/* Form */}
                <h3 className="text-xl font-semibold mb-4">Checkout Details</h3>
                <div className="flex flex-col space-y-3">
                    <input
                        type="text"
                        placeholder="Full Name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                    />
                    <textarea
                        placeholder="Delivery Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none h-24"
                    />

                    <div className="flex items-center mt-2 space-x-2">
                        <input
                            type="checkbox"
                            id="terms"
                            checked={agree}
                            onChange={(e) => setAgree(e.target.checked)}
                        />
                        <label htmlFor="terms" className="text-sm text-gray-700">
                            Agree to Terms & Conditions
                        </label>
                    </div>

                    <button
                        disabled={!agree || fullName === '' || email === '' || address === '' || submitting}
                        onClick={handleConfirm}
                        className={`w-full py-3 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                        {submitting ? 'Processing...' : 'Confirm Purchase'}
                    </button>
                </div>

                {/* Summary */}
                <div className="mt-6 border-t pt-4">
                    <h4 className="text-lg font-semibold mb-2">Order Summary</h4>
                    <div className="flex justify-between mb-1">
                        <span>Product Price:</span>
                        <span>${product.price.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between mb-1">
                        <span>Quantity:</span>
                        <span>{product.quantity}</span>
                    </div>
                    <div className="flex justify-between font-semibold text-lg">
                        <span>Subtotal / Total:</span>
                        <span>${totalPrice.toFixed(2)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Checkout;
