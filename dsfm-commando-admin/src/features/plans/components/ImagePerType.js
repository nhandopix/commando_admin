import PropTypes from 'prop-types';
import React, { useState, Fragment } from 'react';
import Lightbox from 'react-images-extended';

import ImageItem from './ImageItem';

export default function ImagePerType({ images = [], items = [] }) {
  const [lightboxIsOpen, setLightboxIsOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  //Lightbox
  const openLightbox = (index, event) => {
    event.preventDefault();
    setCurrentImage(index);
    setLightboxIsOpen(true);
  };
  const closeLightbox = () => {
    setCurrentImage(0);
    setLightboxIsOpen(false);
  };
  const gotoPrevious = () => {
    setCurrentImage(currentImage - 1);
  };
  const gotoNext = async () => {
    await setCurrentImage(currentImage + 1);
  };

  const generateImagesLightbox = (items) => {
    return items.map((item) => {
      if (item.file || item.file_origin) {
        return {
          src: item.file || item.file_origin
        };
      }
      return {
        src: `https://via.placeholder.com/300x300?text=${item.image_type_id}-${item.id}`
      };
    });
  };

  return (
    <Fragment>
      <Lightbox
        currentImage={currentImage}
        images={generateImagesLightbox(images)}
        isOpen={lightboxIsOpen}
        onClose={closeLightbox}
        onClickNext={gotoNext}
        onClickPrev={gotoPrevious}
        rotatable={true}
        zoomable={true}
      />
      {
        images.map((image, index) => {
          return (
            <ImageItem
              key={image.id}
              {...image}
              index={index}
              handleClickImage={openLightbox}
              items={items}
            />
          )
        })
      }
    </Fragment>
  )
}

ImagePerType.propTypes = {
  images: PropTypes.array.isRequired,
};