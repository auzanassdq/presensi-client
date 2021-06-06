import {
  VStack,
} from '@chakra-ui/react';

import PertemuanUpcoming from './PertemuanUpcoming';
import MyKelas from './MyKelas';
import PertemuanCurrent from './PertemuanCurrent';

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
