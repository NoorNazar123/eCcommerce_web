'use client';

import { add } from '@/store/features/card/cardSlice';
import React from 'react';
import { useDispatch } from 'react-redux';

const AddToCart = () => {
  interface Product {
    id: string;
  }

  // Properly initializing the product array
  const products: Product[] = [{ id: '1' }, { id: '2' }, { id: '3' }];
  const dispatch = useDispatch();

  const handleAddToCart = (productId: Product) => {
    console.log('Added to cart:', productId);
    dispatch(add(productId));
  };
  return (
    <div className="font-mono font-semibold">
      <p>Testing reduxTookit Store</p>
      {/* Passing a valid product object and we should better to make it saperate component. here we are making all component client. so make it saperate component */}
      <button onClick={() => handleAddToCart(products[0])}>Add to Cart</button>
    </div>
  );
};

export default AddToCart;
