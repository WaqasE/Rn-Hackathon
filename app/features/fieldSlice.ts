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
  isTitle: boolean;
};

const initialState: FieldState[] = [];

const fieldSlice = createSlice({
  name: "field",
  initialState,
  reducers: {
    addField: (state, action: PayloadAction<FieldState>) => {
      state.push(action.payload);
    },
    updateField: (state, action: PayloadAction<FieldState & { id: number }>) => {
      const { id, ...updatedField } = action.payload;
      const fieldIndex = state.findIndex((field) => field.id === id);
      if (fieldIndex !== -1) {
        state[fieldIndex] = {
          ...state[fieldIndex],
          ...updatedField,
        };
      }
    },
    removeField: (state, action: PayloadAction<number>) => {
      return state.filter((field) => field.id !== action.payload);
    },
  },
});

export const { addField, updateField, removeField } = fieldSlice.actions;

export default fieldSlice.reducer;
