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
  middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          // Ignore these action types
          ignoredActions: ['your/action/type'],
          // Ignore these field paths in all actions
          ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
          // Ignore these paths in the state
          ignoredPaths: ['items.dates'],
        },
      }),
});
