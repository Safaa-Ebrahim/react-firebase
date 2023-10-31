import { configureStore } from "@reduxjs/toolkit";

// components
import toastSlice from "./slices/toastSlice";

export default configureStore({
  reducer: {
    toastInfo: toastSlice,
  },
});
