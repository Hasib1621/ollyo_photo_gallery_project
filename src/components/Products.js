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
      // let temp = draggedImage.order;
      targetImage.order += 1;
      isBigImage = true;
    }
    else if (draggedImage.status === 1) {
      targetImage.status = 1;
      draggedImage.status = 0;
      let temp = targetImage.order;
      targetImage.order = 1;
      draggedImage.order = temp;
    }
    const updatedImages = [...images];

    const targetIndex = updatedImages.indexOf(targetImage);
    console.log(targetIndex);
    const draggedIndex = updatedImages.indexOf(draggedImage);
    // [updatedImages[targetIndex].order, updatedImages[draggedIndex].order] = [updatedImages[draggedIndex].order, updatedImages[targetIndex].order];
    if (targetIndex !== draggedIndex) {
      // setImages(updatedImages);
      
      let updatedImages = [...images];
      
     if(targetImage.order!==1){
      if(isBigImage) {
        targetImage.order -= 1;
      }
      // Calculate the new order for the dragged image
      const newOrder = updatedImages[targetIndex].order;
      draggedImage.order = newOrder;

      // Shift the orders of other images between the target and dragged indices
      const step = targetIndex < draggedIndex ? 1 : -1;
      for (let i = targetIndex; i !== draggedIndex; i += step) {
        updatedImages[i].order += step;
      }
      // Update the state with the updated order and images
    
      updatedImages.splice(draggedIndex, 1);
      updatedImages.splice(targetIndex, 0, draggedImage);
    }else{
      updatedImages = updatedImages.sort((a, b) => a.order - b.order)
    }
      console.log(updatedImages);
      setImages(updatedImages);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragEnd = () => {
    // Handle the ending of the drag here
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
          onDragEnd={handleDragEnd}
        />
      ))}
    </div>
  );
};

export default Products;
