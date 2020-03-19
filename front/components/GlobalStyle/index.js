import React from 'react';

const GlobalStyle = () => {
  return (
    <>
      <style global jsx>{`
        html,
        body,
        body > div:first-child,
        div#__next,
        div#__next > div,
        div#__next > div > div {
          height: 100%;
          background: #fafafa;
        }
      `}</style>
    </>
  );
};

export default GlobalStyle;
