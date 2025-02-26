// src/components/ProductsPage.tsx
'use client';

import { useProducts } from '@/hooks/useProducts';
import { Product } from '@/types/product.type';

export default function ProductsPage() {
  const { products, loading, error, addProduct } = useProducts();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.length > 0 ? (
          products.map((product) => (
            <li key={product.id}>
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <p>Price: ${product.price}</p>
              <p>Stock: {product.stock}</p>
              <img
                src={product.images?.[0] || ''}
                alt={product.name}
                width={200}
              />
            </li>
          ))
        ) : (
          <p>No products available</p>
        )}
      </ul>
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
