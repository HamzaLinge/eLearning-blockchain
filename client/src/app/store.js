import { configureStore } from '@reduxjs/toolkit';
import authenticationReducer from "../features/authentication/authenticationSlice.js"
import homeEmployeeReducer from "../features/homeEmployee/homeEmployeeSlice.js"
import homeStudentReducer from "../features/homeStudent/homeStudentSlice.js"

export const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
    homeEmployee: homeEmployeeReducer,
    homeStudent: homeStudentReducer,
  },
});
