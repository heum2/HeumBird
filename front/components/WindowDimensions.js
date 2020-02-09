import { useState, useEffect } from 'react';

const getWindowDimensions = () => {
  const client = typeof window === 'object';
  return {
    width: client ? window.innerWidth : 'undefined',
    height: client ? window.innerHeight : 'undefined',
  };
};

const WindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions);

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions(getWindowDimensions());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
};

export default WindowDimensions;
