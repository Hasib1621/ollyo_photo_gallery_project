import React, { useEffect, useState } from "react";
import Product from "./Product";
import classes from "./Products.module.css";

const Products = ({ array }) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    setImages(array);
  }, [array]);

  const handleDragStart = (e, image) => {
    e.dataTransfer.setData("imageId", image.id);
  };

  const handleDrop = (e, targetImage) => {
    e.preventDefault();
    const imageId = e.dataTransfer.getData("imageId");
    const draggedImage = images.find((image) => image.id === +imageId);
    let isBigImage = false;
    if (targetImage.status === 1) {
      draggedImage.status = 1;
      draggedImage.order = 1;
      targetImage.status = 0;
      targetImage.order += 1;
      isBigImage = true;
    } else if (draggedImage.status === 1) {
      targetImage.status = 1;
      draggedImage.status = 0;
      let temp = targetImage.order;
      targetImage.order = 1;
      draggedImage.order = temp;
    }
    const updatedImages = [...images];

    const targetIndex = updatedImages.indexOf(targetImage);
    const draggedIndex = updatedImages.indexOf(draggedImage);
    if (targetIndex !== draggedIndex) {
      let updatedImages = [...images];

      if (targetImage.order !== 1) {
        if (isBigImage) {
          targetImage.order -= 1;
        }
        // Calculate the new order
        const newOrder = updatedImages[targetIndex].order;
        draggedImage.order = newOrder;

        // Shift the orders
        const step = targetIndex < draggedIndex ? 1 : -1;
        for (let i = targetIndex; i !== draggedIndex; i += step) {
          updatedImages[i].order += step;
        }

        // Update the state
        updatedImages.splice(draggedIndex, 1);
        updatedImages.splice(targetIndex, 0, draggedImage);
      } else {
        updatedImages = updatedImages.sort((a, b) => a.order - b.order);
      }
      setImages(updatedImages);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className={classes["gallery"]}>
      {images.map((image) => (
        <Product
          key={image.id}
          data={image}
          draggable
          onDragStart={(e) => handleDragStart(e, image)}
          onDrop={(e) => handleDrop(e, image)}
          onDragOver={handleDragOver}
        />
      ))}
      <div className={classes["image-container"]}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-image"
          viewBox="0 0 16 16"
        >
          <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
          <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z" />
        </svg>
        Add Images
      </div>
    </div>
  );
};

export default Products;
