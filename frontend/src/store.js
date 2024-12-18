import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Default is localStorage
import authReducer from './slices/features/auth/authSlice';
import tasksReducer from './slices/features/tasks/taskSlice';
import apiSlice from "./slices/apislice/apiSlice";

// persistConfig object
const persistConfig = {
  key: "root", // The key for the persisted state in localStorage
  storage, // The storage method (localStorage in this case)
  whitelist: ["auth"], // Specify the reducers you want to persist, here it's just auth
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

// Set up the store
const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    tasks: tasksReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

// Create a persistor to handle persistence
export const persistor = persistStore(store);

export default store;
