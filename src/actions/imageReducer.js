// actions/imageReducer.js
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
      deleteSelectedImages: (state, action) => {
        const imageIdsToDelete = action.payload;
        state.selectedImages = state.selectedImages.filter((id) => !imageIdsToDelete.includes(id));
      },
      resetSelectedImages: (state) => {
        state.selectedImages = [];
      },
    },
  });
  
  export const { selectImage, unselectImage, deleteSelectedImages, resetSelectedImages } = imageSlice.actions;
  export default imageSlice.reducer;
  

  