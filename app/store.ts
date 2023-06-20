// store.js
import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./features/categorySlice";
import fieldReducer from "./features/fieldSlice";
import machineRedcuer from "./features/machineSlice";

const store = configureStore({
  reducer: {
    category: categoryReducer,
    field: fieldReducer,
    machine: machineRedcuer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
