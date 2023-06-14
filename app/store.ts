// store.js
import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./features/categorySlice";

const store = configureStore({
  reducer: {
    category: categoryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;