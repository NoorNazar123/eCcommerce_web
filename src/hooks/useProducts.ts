// src/hooks/useProducts.ts
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '.';
import {
  fetchProducts,
  createProduct,
} from '@/store/features/product/productSlice';
import { ProductFormData } from '@/types/product.type';

export const useProducts = () => {
  const dispatch = useAppDispatch();
  const { products, loading, error } = useAppSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const addProduct = async (productData: ProductFormData) => {
    try {
      await dispatch(createProduct(productData)).unwrap();
    } catch (error) {
      console.error('Failed to create product:', error);
    }
  };

  return { products, loading, error, addProduct };
};
