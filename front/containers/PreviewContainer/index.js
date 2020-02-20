import React, { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Container } from './style';
import PreviewImage from '../../components/PreviewImage';

const PreviewContainer = () => {
  const { imagePaths } = useSelector(state => state.post);
  const [hover, setHover] = useState('');

  const hoverOn = useCallback(
    e => {
      setHover(e.target.alt);
    },
    [hover],
  );

  const hoverOff = useCallback(
    e => {
      setHover('');
    },
    [hover],
  );

  return (
    <Container>
      {imagePaths.map((v, i) => (
        <div key={v} className="content" onMouseLeave={hoverOff}>
          <img
            className={hover === v ? 'hover' : 'image'}
            src={`http://localhost:3060/${v}`}
            alt={v}
            onMouseEnter={hoverOn}
          />
          {hover === v ? <PreviewImage index={i} value={v} /> : null}
        </div>
      ))}
    </Container>
  );
};

export default PreviewContainer;
