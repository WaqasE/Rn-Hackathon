// categorySlice.js
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Category {
  id: number;
  name: string;
}

const initialState: Array<Category> = [];

const categorySlice = createSlice({
  name: "category",
  initialState,

  reducers: {
    addCategory: (state, action: PayloadAction<Category>) => {
      state.push(action.payload);
    },
    removeCategory: (state, action: PayloadAction<Number>) => {
      return state.filter((category) => category.id !== action.payload);
    },
  },
});

export const { addCategory, removeCategory } = categorySlice.actions;

export default categorySlice.reducer;
