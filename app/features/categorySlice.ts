import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type CategoryState = {
  id: number;
  name: string;
  fieldIds: number[];
};

const initialState: CategoryState[] = [];

const categorySlice = createSlice({
  name: "category",
  initialState,

  reducers: {
    addCategory: (state, action: PayloadAction<CategoryState>) => {
      state.push(action.payload);
    },
    updateCategory: (
      state,
      action: PayloadAction<CategoryState>
    ) => {
      const { id, name, fieldIds } = action.payload;
      const category = state.find((category) => category.id === id);
      if (category) {
        category.name = name;
        category.fieldIds = fieldIds;
      }
    },
    removeCategory: (state, action: PayloadAction<number>) => {
      return state.filter((category) => category.id !== action.payload);
    },
    addFieldToCategory: (
      state,
      action: PayloadAction<{ categoryId: number; fieldId: number }>
    ) => {
      const { categoryId, fieldId } = action.payload;
      const category = state.find((category) => category.id === categoryId);
      if (category) {
        category.fieldIds.push(fieldId);
      }
    },
    removeFieldFromCategory: (
      state,
      action: PayloadAction<{ categoryId: number; fieldId: number }>
    ) => {
      const { categoryId, fieldId } = action.payload;
      const category = state.find((category) => category.id === categoryId);
      if (category) {
        category.fieldIds = category.fieldIds.filter((id) => id !== fieldId);
      }
    },
  },
});

export const {
  addCategory,
  updateCategory,
  removeCategory,
  addFieldToCategory,
  removeFieldFromCategory,
} = categorySlice.actions;

export default categorySlice.reducer;
