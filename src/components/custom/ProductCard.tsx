// src/components/ProductsPage.tsx
'use client';

import Loading from '@/app/loading';
import { useProducts } from '@/hooks/useProducts';

export default function ProductsPage() {
  const { products, loading, error, addProduct } = useProducts();

  if (loading) return <Loading size="w-[70px] h-[70px]" />;
  if (error) return <p>{error}</p>;

  function handleAddToCart(id: string | number): void {
    throw new Error('Function not implemented.');
  }

  return (
    <div className="min-h-screen p-6">
      <div className="container mx-auto">
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.length > 0 ? (
            products.map((product) => (
              <li
                key={product.id}
                className="bg-[#fffffffd] dark:bg-[#000000ea] rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105"
              >
                <img
                  src={product.images?.[0] || ''}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                  <p className="text-sm mb-4 line-clamp-3">
                    {product.description}
                  </p>
                  <p className="text-lg font-bold  mb-2">
                    Price: ${product.price}
                  </p>
                  <p className="text-sm text-gray-400 mb-4">
                    Stock: {product.stock}
                  </p>
                  <button
                    onClick={() => handleAddToCart(product.id)}
                    className="w-full btn btn-outline"
                  >
                    Add to Cart
                  </button>
                </div>
              </li>
            ))
          ) : (
            <p className="text-center col-span-full">No products available</p>
          )}
        </ul>
      </div>
    </div>
  );
}

// 'use client';

// import { useEffect, useState } from 'react';
// import { apiClient } from '@/lib/api-clients';
// import { Product } from '@/types/product.type';

// export default function ProductsPage() {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const data = await apiClient.getProducts();
//         console.log('Fetched Products:', data);

//         setProducts(data);
//       } catch (err) {
//         setError('Failed to fetch products');
//         console.error('❌ Fetch error:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div>
//       <h1>Products</h1>
// <ul>
//   {products.length > 0 ? (
//     products.map((product) => (
//       <li key={product.id}>
//         <h2>{product.name}</h2>
//         <p>{product.description}</p>
//         <p>Price: ${product.price}</p>
//         <p>Stock: {product.stock}</p>
//         <img
//           src={product.images?.[0] || ''}
//           alt={product.name}
//           width={200}
//         />
//       </li>
//     ))
//   ) : (
//     <p>No products available</p>
//   )}
// </ul>
//     </div>
//   );
// }
