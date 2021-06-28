import { Button } from '@chakra-ui/button';
import { Center } from '@chakra-ui/layout';
import { Box, Heading } from '@chakra-ui/layout';
import { Flex, Text, useDisclosure } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router';

import { getMatkulByID, removeAmbilKelas } from '../redux/actions/matkulAction';
import { setPertemuanItem } from '../redux/actions/pertemuanAction';
// import { getMatkulByID, removeAmbilKelas } from '../redux/actions/pertemuanAction';

import ListPertemuan from './ListPertemuan';
import ModalDelete from './ModalDelete';
import ScanModal from './ScanModal';

function Matkul() {
  const { idMatkul } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const { matkul } = useSelector(state => state.matkulReducer);
  const { userId } = useSelector(state => state.userReducer);
  const { pertemuan } = useSelector(state => state.pertemuanReducer);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isOpenAlert, setIsOpenAlert] = useState(false)
  const onCloseAlert = () => setIsOpenAlert(false)

  
  useEffect(() => {
    dispatch(getMatkulByID(idMatkul));
  }, [dispatch, idMatkul]);

  const handleUnenrollMatkul = () => {
    let data = {
      matkul: idMatkul,
      mahasiswa: userId,
    };

    dispatch(removeAmbilKelas(data))
      .then(() => {
        history.push('/');
      })
      .catch(() => {
        console.log('gagal');
      });
  };

  // just for test
  const handleTest = () => {
    let fakePertemuan = {
      jadwal: '2021-06-17T15:00:00.000Z',
      kehadiran: {},
      nama: 'Pertemuan tes',
      _id: 'TEST_ID',
    };
    dispatch(setPertemuanItem(fakePertemuan));
    onOpen();
  };

  return (
    <Box p={2}>
      {matkul && (
        <>
          <Heading textAlign="center">{matkul.nama}</Heading>

          <Center>
            <ListPertemuan matkulId={idMatkul} onOpen={onOpen} />
          </Center>
          <Center>
            {/* <Button mt="100px" onClick={handleTest}>
              Test scan
            </Button> */}
            <Button variant="link" mt="100px" onClick={() => setIsOpenAlert(true)}>
              Unenroll
            </Button>
          </Center>

          <ScanModal isOpen={isOpen} onClose={onClose} pertemuan={pertemuan} />
          <ModalDelete isOpen={isOpenAlert} onClose={onCloseAlert} data={matkul} handleSubmit={handleUnenrollMatkul} />
          {/* <ModalDelete isOpen={isOpen} onClose={onClose} data={matkul} handleSubmit={handleUnenrollMatkul} /> */}

        </>
      )}
    </Box>
  );
}

export default Matkul;
