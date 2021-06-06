import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Heading, Box } from '@chakra-ui/react';

import { getMahasiswaMatkul } from '../redux/actions/matkulAction';
import ItemJadwalMatkul from './ItemJadwalMatkul';

export default function MyKelas() {
  const dispatch = useDispatch();
  const history = useHistory();

  const { mahasiswaMatkul } = useSelector(state => state.matkulReducer);
  const { userId } = useSelector(state => state.userReducer);

  useEffect(() => {
    dispatch(getMahasiswaMatkul(userId));
  }, [dispatch, userId]);

  const handleMatkul = matkul => {
    history.push(`/matkul/${matkul._id}`);
  };

  return (
    <>
      <Box w="xs">
        <Heading size="sm">Kelas Saya</Heading>
      </Box>
      {mahasiswaMatkul &&
        mahasiswaMatkul.map((item, index) => (
          <ItemJadwalMatkul
            key={index}
            matkul={item.matkul}
            handleMatkul={handleMatkul}
          />
        ))}
    </>
  );
}
