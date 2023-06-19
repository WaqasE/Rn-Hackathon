import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum FieldType {
  Date = "DATE",
  Text = "TEXT",
  Checkbox = "CHECKBOX",
  Number = "NUMBER",
}

export type FieldState = {
  id: number;
  name: string;
  type: FieldType;
  isTitle: Boolean;
};

type CategoryState = {
  id: number;
  name: string;
  field: Array<FieldState>;
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
    removeCategory: (state, action: PayloadAction<number>) => {
      return state.filter((category) => category.id !== action.payload);
    },
    addField: (
      state,
      action: PayloadAction<FieldState & { categoryId: number }>
    ) => {
      const { categoryId, ...field } = action.payload;
      const categoryIndex = state.findIndex(
        (category) => category.id === categoryId
      );
      if (categoryIndex !== -1) {
        state[categoryIndex].field.push(field);
      }
    },
    updateField: (
      state,
      action: PayloadAction<FieldState & { categoryId: number; id: number }>
    ) => {
      const { categoryId, id, ...updatedField } = action.payload;
      const categoryIndex = state.findIndex(
        (category) => category.id === categoryId
      );
      if (categoryIndex !== -1) {
        const category = state[categoryIndex];
        const fieldIndex = category.field.findIndex((field) => field.id === id);
        if (fieldIndex !== -1) {
          state[categoryIndex].field = category.field.map((field) => ({
            ...field,
            isTitle: field.id === id ? true : false,
          }));
          state[categoryIndex].field[fieldIndex] = {
            ...state[categoryIndex].field[fieldIndex],
            ...updatedField,
          };
        }
      }
    },
    removeField: (
      state,
      action: PayloadAction<{ categoryId: number; id: number }>
    ) => {
      const { categoryId, id } = action.payload;
      const categoryIndex = state.findIndex(
        (category) => category.id === categoryId
      );
      if (categoryIndex !== -1) {
        const updatedCategory = { ...state[categoryIndex] };
        updatedCategory.field = updatedCategory.field.filter((item) => {
          return item.id !== id;
        });
        state[categoryIndex] = updatedCategory;
      }
    },
  },
});

export const {
  addCategory,
  updateCategory,
  removeCategory,
  addField,
  updateField,
  removeField,
} = categorySlice.actions;

export default categorySlice.reducer;
