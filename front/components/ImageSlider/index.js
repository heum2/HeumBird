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

const ImageSlider = memo(({ images, origin }) => {
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

  const imageSrc = value => {
    if (origin) {
      return value.src;
    }
    const data = value.src.replace(/original\//, 'thumb/');
    const ext = data.split('.')[data.split('.').length - 1];
    if (ext === 'gif') {
      return data.replace(/\.gif/, 'png');
    }
    return data;
  };

  return (
    <>
      {images && (
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
            {images.map((v, i) => (
              <div key={i} style={{ paddingBottom: '100%' }}>
                <img
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                  key={v}
                  src={imageSrc(v)}
                />
              </div>
            ))}
          </Slider>
        </SliderContainer>
      )}
    </>
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
