import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import gameSliceReducer from './gameSlide';


export const Store = configureStore({
    reducer: {
        user : userReducer,
        game : gameSliceReducer
        
    },
})