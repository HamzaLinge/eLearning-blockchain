import { configureStore } from '@reduxjs/toolkit';
import authenticationReducer from "../features/authentication/authenticationSlice.js"
import homeEmployerReducer from "../features/homeEmployer/homeEmployerSlice.js"
import homeStudentReducer from "../features/homeStudent/homeStudentSlice.js"
import setCoursesReducer from "../features/setCourse/setCourseSlice.js"

export const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
    homeEmployer: homeEmployerReducer,
    homeStudent: homeStudentReducer,
    setCourse: setCoursesReducer,
  },
});
