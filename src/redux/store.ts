import { configureStore,combineReducers } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from "redux-thunk";
import userSlice from "./userSlice";


const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['userStore']
};


const rootReducer = combineReducers({ 
     userStore: userSlice.reducer,
});


const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools : true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
});

export const persistor = persistStore(store);