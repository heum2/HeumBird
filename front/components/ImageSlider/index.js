import React, { memo, useState, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import { Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronRight,
  faChevronLeft,
} from '@fortawesome/free-solid-svg-icons';
import { SliderContainer } from './style';

const ImageSlider = memo(({ images }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slider = useRef();
  const onClickPrev = useCallback(() => {
    slider.current.slickPrev();
  }, [slider]);
  const onClickNext = useCallback(() => {
    slider.current.slickNext();
  }, [slider]);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    ref: c => (slider.current = c),
    afterChange: slide => setCurrentSlide(slide),
  };
  return (
    <SliderContainer>
      <div className="slider-arrow">
        {currentSlide + 1 === 1 ? null : (
          <Button
            className="arrow-btn prev"
            shape="circle"
            onClick={onClickPrev}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </Button>
        )}
        {currentSlide + 1 === images.length ? null : (
          <Button
            className="arrow-btn next"
            shape="circle"
            onClick={onClickNext}
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </Button>
        )}
      </div>
      <Slider {...settings} style={{ zIndex: 2, position: 'relative' }}>
        {images.map(v => (
          <img
            style={{ width: '604px', height: '604px', objectFit: 'contain' }}
            key={v}
            src={`http://localhost:3060/${v.src}`}
          />
        ))}
      </Slider>
    </SliderContainer>
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
