/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Container, Image } from 'semantic-ui-react';

function ImageLazy({ images, delay = 3000 }) {
  const [index, setIndex] = useState(0);
  const imgRef = useRef();

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prevIndex => (prevIndex + 1) % images.length);
    }, delay);

    return () => {
      clearInterval(interval);
    };
  }, [images, delay]);

  return (
    <Container ref={imgRef} style={{ height: window.innerHeight - 200 }}>
      {images.map((image, i) => (
        <Image
          size="medium"
          key={i}
          style={{
            opacity: i === index ? 1 : 0,
            transition: 'opacity 1s',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
          src={image.img}
        />
      ))}
    </Container>
  );
}

ImageLazy.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string,
      img: PropTypes.string.isRequired,
    }),
  ).isRequired,
  delay: PropTypes.number,
};

export default ImageLazy;
