import React from 'react';
import { ImgContainer, Image } from './style';

const ImageContainer = () => {
  return (
    <ImgContainer>
      <div
        style={{
          width: '100%',
          flex: '0 0 auto',
          justifyContent: 'flex-start',
          alignItems: 'stretch',
          alignContent: 'stretch',
          display: 'block',
          position: 'relative',
        }}
      >
        <a>
          <div className="imgbackgroud">
            <div className="KL4Bh">
              <Image src="https://cdn.pixabay.com/photo/2020/02/07/14/15/landscape-4827278__340.jpg" />
            </div>
            <div className="_9AhH0"></div>
          </div>

          <div></div>
        </a>
      </div>
    </ImgContainer>
  );
};

export default ImageContainer;
