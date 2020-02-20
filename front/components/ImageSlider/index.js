import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import Slick from 'react-slick';

const ImageSlider = memo(({ images }) => {
  const settings = {
    // dots: true,
    // initialSlide: 0,
    // infinite: false,
    // slidesToShow: 1,
    // slidesToScroll: 1,
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Slick {...settings} style={{ zIndex: 2, position: 'relative' }}>
      {images.map(v => (
        <img
          key={v}
          src={`http://localhost:3060/${v.src}`}
          style={{
            maxWidth: '100%',
            width: '600px',
          }}
        />
      ))}
    </Slick>
  );
});

ImageSlider.proptypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string,
    }),
  ).isRequired,
};
export default ImageSlider;
