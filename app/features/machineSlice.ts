import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FieldType } from "./fieldSlice";

export type MachineFieldType = {
  fieldId: number;
  fieldType: FieldType;
  fieldTitle: string;
  fieldValue: string;
};

export type MachineState = {
  id: number;
  fields: Array<MachineFieldType>;
  categoryID: number;
  title: string;
};

const initialState: MachineState[] = [];

const machineSlice = createSlice({
  name: "field",
  initialState,
  reducers: {
    addMachine: (state, action: PayloadAction<MachineState>) => {
      state.push(action.payload);
    },
    updateMachine: (
      state,
      action: PayloadAction<MachineState & { id: number }>
    ) => {
      const { id, ...updatedMachine } = action.payload;
      const machineIndex = state.findIndex((machine) => machine.id === id);
      if (machineIndex !== -1) {
        state[machineIndex] = {
          ...state[machineIndex],
          ...updatedMachine,
        };
      }
    },
    removeMachine: (state, action: PayloadAction<number>) => {
      return state.filter((machine) => machine.id !== action.payload);
    },
  },
});

export const { addMachine, updateMachine, removeMachine } =
  machineSlice.actions;

export default machineSlice.reducer;
