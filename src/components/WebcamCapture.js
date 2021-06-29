import { Button } from '@chakra-ui/button';
import { VStack } from '@chakra-ui/layout';
import React, { useEffect } from 'react';
import Webcam from 'react-webcam';

// const WebcamComponent = () => <Webcam />;

// const videoConstraints = {
//   width: 224,
//   height: 224,
//   facingMode: 'user',
// };

const WebcamCapture = ({ src, setSrc}) => {
  const webcamRef = React.useRef(null);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setSrc(imageSrc);
  }, [webcamRef, setSrc]);

  useEffect(() => {
    if (src) {
      let myCanvas = document.getElementById('canvas-face');
      let ctx = myCanvas.getContext('2d');
      let img = new Image();
      img.onload = function () {
        ctx.drawImage(img, 0, 0); // Or at whatever offset you like
      };
      img.src = src;
    }
  }, [src])

  return (
    <VStack>
      {src ? (
        <>
          {/* <img id="face-image" src={src} width={400} height={300} /> */}
          <canvas id="canvas-face" src={src} width={400} height={300} />
          {/* <canvas id="canvas-face-crop" src={src} width={400} height={300} /> */}
        </>
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
