import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage/session";
import {authSlice } from '../reducer/AuthReducer';

const rootReducer = combineReducers({
    AuthUser: authSlice.reducer,
  });

const persistConfig = {
    key: "root",
    storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const reduxStore = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware()
});

export const persistor = persistStore(reduxStore);
