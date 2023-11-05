import React, { useState } from "react";
import Products from "./components/Products";
import { useSelector, useDispatch } from "react-redux";
import { resetSelectedImages, unselectImage } from "./actions/imageReducer";
import IMAGES from "./util/images";
import "./App.css"

function App() {
  const selectedImages = useSelector((state) => state.images.selectedImages);
  const dispatch = useDispatch();
  const sortedImages = IMAGES.sort((a, b) => a.order - b.order);

  const [filteredImages, setFilteredImages] = useState(sortedImages);
  const handleDeleteFiles = (e) => {
    e.preventDefault();
    const updatedImages = filteredImages.filter(
      (image) => !selectedImages.includes(image.id)
    );
    let bigImage = updatedImages.filter((image) => image.status === 1);
    if (bigImage.length === 0 && updatedImages.length > 0) {
      updatedImages[0].status = 1;
    }
    setFilteredImages(updatedImages);
    dispatch(unselectImage(selectedImages));
    dispatch(resetSelectedImages());
  };
  return (
    <>
    {filteredImages.length >= 1 && (
  <div className="app-container">
    {selectedImages.length === 0 && (
      <h1 className="gallery-title">Gallery</h1>
    )}
    {selectedImages.length > 0 && (
      <div className="gallery-title">
        <span>{selectedImages.length} {selectedImages.length === 1 ? 'File' : 'Files'} Selected</span>
        <button onClick={handleDeleteFiles} className="delete-button">
          Delete {selectedImages.length === 1 ? 'file' : 'files'}
        </button>
      </div>
    )}
    <hr />
    <Products array={filteredImages} />
  </div>
)}
    </>
  );
}

export default App;
