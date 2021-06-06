import { Button } from '@chakra-ui/button';
import { VStack } from '@chakra-ui/layout';
import React, { Component, useState } from 'react';
import Webcam from 'react-webcam';

const WebcamComponent = () => <Webcam />;

const videoConstraints = {
  width: 224,
  height: 224,
  facingMode: 'user',
};

const WebcamCapture = ({ src, setSrc }) => {
  const webcamRef = React.useRef(null);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setSrc(imageSrc);
  }, [webcamRef, setSrc]);

  return (
    <VStack>
      {src ? (
        <img id="face-image" src={src} height={224} />
      ) : (
        <Webcam
          audio={false}
          height={224}
          // width={224}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          // videoConstraints={videoConstraints}
        />
      )}

      {src ? (
        <Button
          onClick={e => {
            setSrc('');
          }}
        >
          Reset
        </Button>
      ) : (
        <Button
          onClick={e => {
            e.preventDefault();
            capture();
          }}
        >
          Capture
        </Button>
      )}
    </VStack>
  );
};

export default WebcamCapture;
