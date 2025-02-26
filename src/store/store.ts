// import { configureStore } from '@reduxjs/toolkit';
// import cartReducer from './features/card/cardSlice';
// import productSlice from './features/product/productSlice'

// export const makeStore = () => {
//   return configureStore({
//     reducer: cartReducer,
//     reducer: car
//   });
// };

// // Infer the type of makeStore
// export type AppStore = ReturnType<typeof makeStore>;
// // Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<AppStore['getState']>;
// export type AppDispatch = AppStore['dispatch'];
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/card/cardSlice';
import productReducer from './features/product/productSlice';

// Combine reducers to avoid overwriting
const rootReducer = {
  cart: cartReducer,
  product: productReducer,
};

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

// In Next.js, avoid creating a new Redux store instance on every render because it handles both server-side and client-side rendering. Creating a new store on each render can lead to state loss, performance issues, and unexpected behavior. Instead, define the store in a separate file and use a singleton pattern to ensure the store is created only once per request. This approach ensures state persistence, improves performance, and prevents unnecessary re-renders. 🚀

// export const store = configureStore({
//   reducer: cartReducer,
// });

// // Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>;
// // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch;
