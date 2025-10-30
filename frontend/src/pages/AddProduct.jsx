import React from 'react';
import { useForm } from 'react-hook-form';

const AddProduct = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await fetch('http://localhost:3000/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
      if (!response.ok) throw new Error('Failed to add product');
      alert('Product added successfully!');
      reset();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-8 bg-gray-100 rounded-lg shadow-md mt-12">
      <h2 className="text-2xl font-semibold text-center text-gray-700 mb-8">Add New Product</h2>
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col space-y-4">
        
        <input
          type="text"
          placeholder="Title"
          {...register("title", { required: "Title is required" })}
          className={`p-3 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.title && <p className="text-red-600 text-sm">{errors.title.message}</p>}

        <textarea
          placeholder="Description"
          {...register("description", {
            maxLength: {
              value: 2000,
              message: "Description cannot exceed 2000 characters"
            }
          })}
          className={`p-3 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500 resize-vertical ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
          rows={4}
        />
        {errors.description && <p className="text-red-600 text-sm">{errors.description.message}</p>}

        <input
          type="text"
          placeholder="Image URL"
          {...register("imageUrl", { required: "Image URL is required" })}
          className={`p-3 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.imageUrl ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.imageUrl && <p className="text-red-600 text-sm">{errors.imageUrl.message}</p>}

        <input
          type="number"
          step="0.01"
          placeholder="Price"
          {...register("price", {
            required: "Price is required",
            min: { value: 0.01, message: "Minimum price is 0.01" }
          })}
          className={`p-3 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.price ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.price && <p className="text-red-600 text-sm">{errors.price.message}</p>}

        <input
          type="number"
          placeholder="Quantity"
          {...register("quantity", {
            required: "Quantity is required",
            min: { value: 0, message: "Minimum quantity is 0" }
          })}
          className={`p-3 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.quantity ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.quantity && <p className="text-red-600 text-sm">{errors.quantity.message}</p>}

        <input
          type="text"
          placeholder="Seller Name"
          {...register("sellerName", { required: "Seller name is required" })}
          className={`p-3 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.sellerName ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.sellerName && <p className="text-red-600 text-sm">{errors.sellerName.message}</p>}

        <input
          type="text"
          placeholder="Seller Phone"
          {...register("sellerPhone", { required: "Seller phone is required" })}
          className={`p-3 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.sellerPhone ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.sellerPhone && <p className="text-red-600 text-sm">{errors.sellerPhone.message}</p>}

        <input
          type="email"
          placeholder="Seller Email"
          {...register("sellerEmail", {
            required: "Seller email is required",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Invalid email address"
            }
          })}
          className={`p-3 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.sellerEmail ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.sellerEmail && <p className="text-red-600 text-sm">{errors.sellerEmail.message}</p>}

        <input
          type="number"
          placeholder="Discount Percent"
          {...register("discountPercent", {
            min: { value: 0, message: "Minimum discount is 0" },
            max: { value: 100, message: "Maximum discount is 100" }
          })}
          className={`p-3 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.discountPercent ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.discountPercent && <p className="text-red-600 text-sm">{errors.discountPercent.message}</p>}

        <button 
          type="submit" 
          className="w-full py-3 mt-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
