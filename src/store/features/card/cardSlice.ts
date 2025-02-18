import { createSlice } from '@reduxjs/toolkit';

export interface CartState {
  items: String[];
}

const initialState: CartState = {
  items: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    add(state, action) {
      //Immer js will handle the mutaion we do not need to manage mutation it will do auto
      state.items.push(action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { add } = cartSlice.actions;

export default cartSlice.reducer;
