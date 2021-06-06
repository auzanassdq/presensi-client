import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Webcam from 'react-webcam';
import axios from 'axios';
import * as tf from '@tensorflow/tfjs';
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
        'https://raw.githubusercontent.com/auzanassdq/tfjsmodel/main/model.json',
        modelWeight => {
          console.log(modelWeight);
        }
      );
      setModel(result);
    }
    loadModel();
    setSrc('');
    setPredictLabel('');
    setAccPercent('');
  }, [isOpen]);

  const handleImageChange = e => {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      setinputImage({
        file: file,
        imagePreviewUrl: reader.result,
      });
      setSrc(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = () => {
    const img = document.getElementById('face-image');
    let image = tf.browser
      .fromPixels(img)
      .resizeNearestNeighbor([224, 224])
      .toFloat();
    console.log('IMAGE', image);
    console.log('IMAGE', image.dataSync());

    let offset = tf.scalar(127.5);
    image = image.sub(offset).div(offset).expandDims();
    console.log(image);

    const resizeImage = tf.reshape(image, [1, 224, 224, 3], 'resize');
    console.log(resizeImage);

    let prediction = model.predict(resizeImage);
    let predictClass = prediction.argMax(1).dataSync();

    console.log(prediction.dataSync());
    console.log(prediction.dataSync()[predictClass] * 100);
    console.log(predictClass);

    let accuration = (prediction.dataSync()[predictClass] * 100).toFixed(2);
    setAccPercent(`${accuration}%`);

    if (accuration < 50) {
      setPredictLabel('siapa anda??');
    } else {
      setPredictLabel(labels[predictClass]);
    }

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
            <WebcamCapture src={src} setSrc={setSrc} />
            {/* // ) : (
            //   <img id="face-image" src={src} height={224} />
            // )} */}
          </Center>
          <input type="file" onChange={handleImageChange} />

          <Heading size="sm">{predictLabel}</Heading>
          <Heading size="sm">{accPercent}</Heading>

          {/* <img width={100} src={inputImage.imagePreviewUrl}/> */}
        </ModalBody>

        <ModalFooter>
          {src ? (
            <Button
              colorScheme="blue"
              width="100%"
              onClick={handleSubmit}
            >
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
