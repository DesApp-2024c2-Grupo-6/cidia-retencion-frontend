import { createSlice}  from '@reduxjs/toolkit';


const initialState = {
    IdCarrera: '',
    nombreCarrera:''
};

export const carreraSlice = createSlice({
    name: "carrera",
    initialState,
    reducers:{
      addCarrera: (state, action) => {
          state.IdCarrera = action.payload.IdCarrera;
          state.nombreCarrera = action.payload.nombreCarrera;
          state.unahur = action.payload.unaHurSubjects;
          state.englishLevel = action.payload.englishLevel;
          state.suggestionSubjects = action.payload.suggestionSubjects;
        }
    }
});

export const { addCarrera } = carreraSlice.actions;
export default carreraSlice.reducer;