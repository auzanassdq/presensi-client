import {
  VStack,
} from '@chakra-ui/react';

import PertemuanUpcoming from '../../components/PertemuanUpcoming';
import MyKelas from '../../components/MyKelas';
import PertemuanCurrent from '../../components/PertemuanCurrent';

function MyDashboard() {
  return (
    <VStack mt={5} spacing={5}>
      <PertemuanCurrent />
      <PertemuanUpcoming />
      <MyKelas />
    </VStack>
  );
}

export default MyDashboard;
