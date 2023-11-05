import { createSlice } from '@reduxjs/toolkit';
  
  const imageSlice = createSlice({
    name: 'images',
    initialState: {
      selectedImages: [],
    },
    reducers: {
      selectImage: (state, action) => {
        state.selectedImages.push(action.payload); 
      },
      unselectImage: (state, action) => {
        state.selectedImages = state.selectedImages.filter((id) => id !== action.payload);
      },
      resetSelectedImages: (state) => {
        state.selectedImages = [];
      },
    },
  });
  
  export const { selectImage, unselectImage, resetSelectedImages } = imageSlice.actions;
  export default imageSlice.reducer;
  

  