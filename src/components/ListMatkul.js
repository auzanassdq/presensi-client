import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import {
  Wrap,
  WrapItem,
  Center,
  useColorModeValue,
} from '@chakra-ui/react';

import { getMahasiswaMatkul } from '../redux/actions/matkulAction';

function ListMatkul() {
  const dispatch = useDispatch();
  const fromBg = useColorModeValue('gray.200', 'gray.700');
  const history = useHistory();

  const { mahasiswaMatkul } = useSelector(
    state => state.matkulReducer
  );
  const { userId } = useSelector(state => state.userReducer);

  useEffect(() => {
    dispatch(getMahasiswaMatkul(userId));
  }, [dispatch, userId]);

  const handleMatkul = matkul => {
    history.push(`/matkul/${matkul._id}`);
  };

  return (
    // <Container maxW="container.lg">
    <Wrap mt={5} spacing={5} justify="center">
      {mahasiswaMatkul &&
        mahasiswaMatkul.map((item, index) => (
          <WrapItem key={index} onClick={() => handleMatkul(item.matkul)}>
            <Center
              w="xs"
              rounded={5}
              p={5}
              overflow="hidden"
              boxShadow="lg"
              bg={fromBg}
            >
              {item.matkul.nama}
            </Center>
          </WrapItem>
        ))}
    </Wrap>
    // </Container>
  );
}

export default ListMatkul;
