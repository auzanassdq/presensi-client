import React, { useEffect } from 'react';
import {
  Box,
  useColorModeValue,
} from '@chakra-ui/react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getAllMatkul } from '../redux/actions/matkulAction';
import MatkulTable from './MatkulTable';

export default function DashboardContent() {
  const { content } = useParams();
  const dispatch = useDispatch();
  const boxGray = useColorModeValue('gray.200', 'gray.700');
  const { allMatkul, matkul } = useSelector(state => state.matkulReducer);

  console.log(allMatkul);
  useEffect(() => {
    switch (content) {
      case 'dosen':
        // dispatch(getDosen())
        break;
      case 'matkul':
        dispatch(getAllMatkul());
        break;
      default:
        break;
    }
  }, [dispatch, content, matkul]);

  return (
    <Box rounded={5} bg={boxGray} h="600px" w="100%" ml="0px">
      <MatkulTable />
    </Box>
  );
}
