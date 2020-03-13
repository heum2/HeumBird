import styled from 'styled-components';

export const SliderContainer = styled.div`
  position: relative;

  .slick-slide {
    background: white;
    text-align: center;
  }

  .slider-arrow {
    position: absolute;
    height: 100%;
    width: 100%;
  }
  .arrow-btn {
    top: 45%;
    z-index: 3;
    opacity: 0.5;
  }
  .next {
    float: right;
  }
`;
