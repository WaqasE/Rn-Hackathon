// categorySlice.js
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CategoryState = {
  id: number;
  name: string;
};

const initialState: Array<CategoryState> = [];

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    addCategory: (state, action: PayloadAction<CategoryState>) => {
      state.push(action.payload);
    },
    updateCategory: (state, action: PayloadAction<CategoryState>) => {
      const { id, name } = action.payload;
      const categoryIndex = state.findIndex((category) => category.id === id);
      if (categoryIndex !== -1) {
        state[categoryIndex].name = name;
      }
    },
    removeCategory: (state, action: PayloadAction<Number>) => {
      return state.filter((category) => category.id !== action.payload);
    },
  },
});

export const { addCategory, updateCategory, removeCategory } =
  categorySlice.actions;

export default categorySlice.reducer;
