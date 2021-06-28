import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Webcam from 'react-webcam';
import axios from 'axios';
import * as tf from '@tensorflow/tfjs';
import * as blazeface from '@tensorflow-models/blazeface';
import {
  Button,
  ModalCloseButton,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Modal,
  useToast,
  Center,
  Heading,
} from '@chakra-ui/react';

import {
  checkInKehadiran,
  getKehadiranSuccess,
} from '../redux/actions/kehadiranAction';
import WebcamCapture from './WebcamCapture';

export default function ScanModal({ isOpen, onClose, pertemuan }) {
  const dispatch = useDispatch();
  const toast = useToast();
  const { userId } = useSelector(state => state.userReducer);
  const [dataCheckIn] = useState({ mahasiswa: userId, pertemuan });
  const [src, setSrc] = useState('');
  const [hadir, setHadir] = useState(false);

  const [inputImage, setinputImage] = useState({
    file: '',
    imagePreviewUrl: '',
  });

  const [model, setModel] = useState(null);
  const [labels, setLabels] = useState([
    'Defi',
    'Everet',
    'Farhan',
    'Huda',
    'Ilham',
    'Jennie',
    'Mayang',
    'Nadila',
    'Raihan',
    'Silmi',
  ]);
  const [predictLabel, setPredictLabel] = useState('');
  const [accPercent, setAccPercent] = useState('');

  useEffect(() => {

    async function loadModel() {
      const result = await tf.loadLayersModel(
        'https://raw.githubusercontent.com/auzanassdq/tfjsmodel/main/model-edit-1.json'
      );
      setModel(result);
    }
    
    loadModel();
    setSrc('');
    setPredictLabel('');
    setAccPercent('');
  }, [isOpen]);

  // const handleImageChange = e => {
  //   e.preventDefault();

  //   let reader = new FileReader();
  //   let file = e.target.files[0];

  //   reader.onloadend = () => {
  //     setinputImage({
  //       file: file,
  //       imagePreviewUrl: reader.result,
  //     });
  //     setSrc(reader.result);
  //   };

  //   reader.readAsDataURL(file);
  // };

  const handleSubmit = () => {
    const img = document.getElementById('canvas-face');

    let image = tf.browser.fromPixels(img)

    const ctx = img.getContext('2d');
    ctx.drawImage(img, 0, 0, 400, 300);

    // resize
    image = image.resizeNearestNeighbor([224, 224])

    // green box face
    // drawCanvas(image);

    let offset = tf.scalar(127.5);
    image = image.sub(offset).div(offset).expandDims();
    console.log(image);

    const resizeImage = tf.reshape(image, [1, 224, 224, 3], 'resize');
    console.log(resizeImage);

    let prediction = model.predict(resizeImage);
    let predictClass = prediction.argMax(1).dataSync();

    let accuration = (prediction.dataSync()[predictClass] * 100).toFixed(2);
    setAccPercent(`${accuration}%`);

    // ceK akurasi
    if (accuration < 50) {
      setPredictLabel('no body');
    } else {
      setPredictLabel(labels[predictClass]);
    }

    // kirim ke backend
    if (pertemuan._id !== 'TEST_ID') {
      // dispatch(checkInKehadiran(dataCheckIn))
      //   .then(result => {
      //     dispatch(getKehadiranSuccess(result));
      //     toast({
      //       title: 'Berhasil CheckIn',
      //       status: 'success',
      //       duration: 5000,
      //       isClosable: true,
      //     });
      //   })
      //   .catch(error => {
      //     toast({
      //       title: 'Gagal CheckIn',
      //       status: 'error',
      //       duration: 5000,
      //       isClosable: true,
      //     });
      //   });
    }
  };

  const drawCanvas = async image => {
    // blazeface
    const canvas = document.getElementById('canvas-face');
    const ctx = canvas.getContext('2d');

    const blazeModel = await blazeface.load();
    const blazePredict = await blazeModel.estimateFaces(image, false);
    console.log(blazePredict);

    blazePredict.forEach(async item => {
      const start = item.topLeft;
      const end = item.bottomRight;
      const size = [end[0] - start[0], end[1] - start[1]];
      
      ctx.beginPath();
      ctx.lineWidth = '4';
      ctx.strokeStyle = 'blue';
      ctx.rect(
        start[0],
        start[1],
        size[0], size[1]
        // item.bottomRight[0] - item.topLeft[0],
        // item.bottomRight[1] - item.topLeft[1]
      );
      ctx.stroke();

      console.log(item);

      console.log(item.topLeft[0]);
      console.log(item.topLeft[1]);
      console.log(item.bottomRight[0] - item.topLeft[0]);
      console.log(item.bottomRight[1] - item.topLeft[1]);

      let width = parseInt(item.bottomRight[1] - item.topLeft[1]);
      let height = parseInt(item.bottomRight[0] - item.topLeft[0]);

      let faceTensor = image.slice(
        [parseInt(item.topLeft[1]), parseInt(item.topLeft[0]), 0],
        [width, height, 3]
      );

      console.log(faceTensor);

      faceTensor = faceTensor
        .resizeNearestNeighbor([224, 224])
        // .reshape([1, 224, 224, 3]);

        // const canvasCrop = document.getElementById('canvas-face-crop')
        // await tf.browser.toPixels(faceTensor, canvasCrop);

      let offset = tf.scalar(127.5);
      faceTensor = faceTensor.sub(offset).div(offset).expandDims()
      console.log(faceTensor);

      const resizeImage = tf.reshape(faceTensor, [1, 224, 224, 3], 'resize');
      console.log(resizeImage);

      let result = await model.predict(resizeImage);
      let predictClass = result.argMax(1).dataSync();

      let accuration = (result.dataSync()[predictClass] * 100).toFixed(2);
      setAccPercent(`${accuration}%`);

      // cek akurasi
      if (accuration < 50) {
        setPredictLabel('no body');
      } else {
        setPredictLabel(labels[predictClass]);
      }

      console.log(predictClass);
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{pertemuan.nama}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Center>
            {/* {src == '' ? ( */}
            <WebcamCapture
              src={src}
              setSrc={setSrc}
              hadir={hadir}
              setHadir={setHadir}
            />
            {/* // ) : (
            //   <img id="face-image" src={src} height={224} />
            // )} */}
          </Center>
          {/* <input type="file" onChange={handleImageChange} /> */}

          {predictLabel === 'no body' ? (
            'Anda siapa??'
          ) : (
            <>
              <Heading size="sm">{predictLabel}</Heading>
              <Heading size="sm">{accPercent}</Heading>
            </>
          )}

          {/* <img width={100} src={inputImage.imagePreviewUrl}/> */}
        </ModalBody>

        <ModalFooter>
          {src ? (
            <Button colorScheme="blue" width="100%" onClick={handleSubmit}>
              Hadir
            </Button>
          ) : (
            <Button colorScheme="blue" width="100%" isDisabled>
              Hadir
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
