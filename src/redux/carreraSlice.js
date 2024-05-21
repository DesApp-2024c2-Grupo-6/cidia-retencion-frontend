import { createSlice}  from '@reduxjs/toolkit';


const initialState = {
    IdCarrera: ''
};

export const carreraSlice = createSlice({
    name: "carrera",
    initialState,
    reducers:{
        addCarrera: (state, action) =>{
            state.IdCarrera = action.payload.IdCarrera;
        }
    }
});

export const { addCarrera } = carreraSlice.actions;
export default carreraSlice.reducer;