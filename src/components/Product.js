import React from 'react';
import classes from './Product.module.css';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { selectImage, unselectImage } from '../actions/imageReducer';

const Product = ({ data, draggable, onDragStart, onDragOver, onDrop }) => {

  const dispatch = useDispatch();
  const selectedImages = useSelector((state) => state.images.selectedImages);

  const handleCheckboxChange = () => {
    if (selectedImages.includes(data.id)) {
      dispatch(unselectImage(data.id));
    } else {
      dispatch(selectImage(data.id));
    }
  };

  return (
    <div
      className={`${data.status === 1 ? classes['big-image-section'] : classes['image-container']} ${selectedImages.includes(data.id) ? classes['dim-image'] : ''}`}
      draggable={draggable} // Add draggable attribute
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      <input type="checkbox" className={classes['checkbox']} checked={selectedImages.includes(data.id)} onChange={handleCheckboxChange} />
      <img
        className={`${data.status === 1 ? classes['big-image'] : classes['small-image']} `}
        src={data.picture}
        alt={data.text}
      />
    </div>
  );
};

export default Product;
