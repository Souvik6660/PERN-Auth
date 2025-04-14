import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import storage from 'redux-persist/lib/storage'
import { persistStore, persistReducer } from 'redux-persist'
const persistConfig = {
    key: 'root',
    storage,
    whiteList: ['user','isAuthenticated']
}
const persistedReducer = persistReducer(persistConfig, authReducer)

const store = configureStore({
    reducer: {
      auth: persistedReducer
    },
    middleware:(getDefaultMiddleware) => getDefaultMiddleware({
            serializableCheck:{
              ignoreActions:['persist/PERSIST','persist/REHYDRATE']
            }
    })
  })

export const persistor = persistStore(store);
export default store;