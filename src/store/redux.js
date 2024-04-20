import { configureStore } from '@reduxjs/toolkit';
import appSlice from './app/appSlice';
import productSlice from './products/productSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist'
import userSlice from './user/userSlice';
const commonConfig = {
  storage
}

const userConfig = {
  ...commonConfig,
  key: 'shop/user',
  whitelist: ['isLoggedIn', 'token', 'current', 'currentCart']
}

const productConfig = {
  ...commonConfig,
  key: 'shop/deal',
  whitelist: ['dealDay']
}

export const store = configureStore({
  reducer: {
    app: appSlice,
    product: persistReducer(productConfig, productSlice),
    user: persistReducer(userConfig, userSlice)
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store)