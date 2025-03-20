import { configureStore } from "@reduxjs/toolkit";
import answersReducer from "./features/answersSlice";

export const store = configureStore({
  reducer: {
    answers: answersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
