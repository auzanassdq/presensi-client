import {
  Box,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  VStack,
  useToast,
  useDisclosure,
  InputRightElement,
  IconButton,
} from '@chakra-ui/react';
import { Search2Icon, SmallCloseIcon } from '@chakra-ui/icons';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  getAllMatkul,
  cekAmbilMatkul,
  ambilMatkul,
} from '../redux/actions/matkulAction';
import ModalAdd from './ModalAdd';

function CariMatkul() {
  const [state, setstate] = useState('');
  const [matkulId, setMatkulId] = useState('');

  const dispatch = useDispatch();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { userId } = useSelector(state => state.userReducer);
  const { allMatkul } = useSelector(state => state.matkulReducer);

  useEffect(() => {
    dispatch(getAllMatkul(state));
  }, [dispatch, state]);

  console.log(allMatkul);

  const handleClick = async idMatkul => {
    setMatkulId(idMatkul);

    let data = {
      matkul: idMatkul,
      mahasiswa: userId,
    };

    dispatch(cekAmbilMatkul(data))
      .then(res => {
        console.log(res);
        onOpen();
      })
      .catch(err => {
        console.log(err);
        toast({
          title: `Anda sudah terdaftar di kelas ini`,
          isClosable: true,
        });
      });
  };

  const handleAmbilMatkul = () => {
    let data = {
      matkul: matkulId,
      mahasiswa: userId,
    };

    dispatch(ambilMatkul(data))
      .then(res => {
        console.log(res);
        toast({
          title: `Kelas berhasil di enroll`,
          status: 'success',
          isClosable: true,
        });
        onClose();
      })
      .catch(err => {
        console.log(err);
        toast({
          title: `Terjadi Kesalahan`,
          status: 'error',
          isClosable: true,
        });
      });
  };

  return (
    // <Stack >
    <VStack spacing={4}>
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          children={<Search2Icon color="gray.300" />}
        />
        <Input
          type="tel"
          placeholder="Cari matkul"
          variant="filled"
          value={state}
          onChange={e => setstate(e.target.value)}
        />
        {state && (
          <InputRightElement>
            <IconButton
              icon={<SmallCloseIcon />}
              size="xs"
              onClick={() => setstate('')}
            />
          </InputRightElement>
        )}
      </InputGroup>

      {allMatkul.map((item, index) => (
        <Box
          key={index}
          width="100%"
          textAlign="left"
          onClick={() => handleClick(item._id)}
        >
          <Heading size="sm" key={index}>
            {item.nama}
          </Heading>
          <Text></Text>
        </Box>
      ))}

      <ModalAdd
        isOpen={isOpen}
        onClose={onClose}
        title="Ambil Matkul"
        txtButton="Enroll"
        handleSubmit={handleAmbilMatkul}
      > 
        <Text>Ingin bergabung ke dalam kelas ini?</Text>
      </ModalAdd>
    </VStack>
    // </Stack>
  );
}

export default CariMatkul;
