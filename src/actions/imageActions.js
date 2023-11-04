// actions/imageActions.js
export const selectImage = (imageId) => ({
    type: 'SELECT_IMAGE',
    payload: imageId,
  });
  
  export const unselectImage = (imageId) => ({
    type: 'UNSELECT_IMAGE',
    payload: imageId,
  });

  export const deleteSelectedImages = (imageIds) => ({
    type: 'DELETE_SELECTED_IMAGES',
    payload: imageIds,
  });
  
  export const resetSelectedImages = () => ({
    type: 'DELETE_SELECTED_IMAGES',
  });
  