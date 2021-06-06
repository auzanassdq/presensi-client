import { Button } from '@chakra-ui/button';
import { Center } from '@chakra-ui/layout';
import { Box, Heading } from '@chakra-ui/layout';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router';

import { getMatkulByID, removeAmbilKelas } from '../redux/actions/matkulAction';

import ListPertemuan from './ListPertemuan';

function Matkul() {
  const { idMatkul } = useParams();
  const dispatch = useDispatch();
  const history = useHistory()
  const { matkul } = useSelector(state => state.matkulReducer);
  const { userId } = useSelector(state => state.userReducer);


  useEffect(() => {
    dispatch(getMatkulByID(idMatkul));
  }, [dispatch, idMatkul]);

  const handleUnenrollMatkul = () => {
    let data = {
      matkul: idMatkul,
      mahasiswa: userId
    }
    
    dispatch(removeAmbilKelas(data))
    .then(() => {
      history.push("/")
    })
    .catch(() => {
      console.log("gagal");
    })
  }

  return (
    <Box p={2}>
      {matkul && (
        <>
          <Heading textAlign="center">{matkul.nama}</Heading>
          <Center>
            <ListPertemuan matkulId={idMatkul} />
          </Center>
          <Center>
          <Button variant="link" mt="100px" onClick={handleUnenrollMatkul}>Unenroll</Button>
          </Center>
        </>
      )}
    </Box>
  );
}

export default Matkul;
