import React from 'react';

const Loading = () => {
  return (
    <div
      style={{
        margin: '0 auto',
        height: '100vh',
        lineHeight: '100vh',
        textAlign: 'center',
      }}
    >
      <img
        src="/favicon.png"
        style={{
          display: 'block',
          width: '80px',
          height: '80px',
        }}
      ></img>
    </div>
  );
};

export default Loading;
