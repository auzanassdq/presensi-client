import { Center } from '@chakra-ui/layout';
import { Box, Heading } from '@chakra-ui/layout';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';

import { getMatkulByID } from '../redux/actions/matkulAction';
import ListPertemuan from './ListPertemuan';

function Matkul() {
  const { idMatkul } = useParams();
  const dispatch = useDispatch();
  const { matkul } = useSelector(state => state.matkulReducer);

  useEffect(() => {
    dispatch(getMatkulByID(idMatkul));
  }, [dispatch, idMatkul]);

  return (
    <Box p={2}>
      {matkul && (
        <>
          <Heading textAlign="center">{matkul.nama}</Heading>
          <Center>
            <ListPertemuan matkulId={idMatkul} />
          </Center>
        </>
      )}
    </Box>
  );
}

export default Matkul;
