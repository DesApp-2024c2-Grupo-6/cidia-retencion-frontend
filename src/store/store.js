import { configureStore } from '@reduxjs/toolkit';
import  carreraReducer from '../redux/carreraSlice';


export const store = configureStore({

    reducer:{
        carrera: carreraReducer
    }

});