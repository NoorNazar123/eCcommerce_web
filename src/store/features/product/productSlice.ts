// src/store/productSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from '@/lib/api-clients';
import { Product, ProductFormData } from '@/types/product.type';

interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
};

// Async thunk to fetch products
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const products = await apiClient.getProducts();
    return products;
  },
);

// Async thunk to create a product
export const createProduct = createAsyncThunk(
  'products/createProduct',
  async (productData: ProductFormData) => {
    const newProduct = await apiClient.createProduct(productData);
    return newProduct;
  },
);

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to fetch products';
        state.loading = false;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      });
  },
});

export default productSlice.reducer;
