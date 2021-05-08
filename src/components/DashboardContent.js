import React, { useEffect, useState } from 'react';
import {
  Button,
  Box,
  Heading,
  useColorModeValue,
  IconButton,
  Flex,
  useDisclosure,
  Spacer,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import MenuDrawer from './MenuDrawer';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getAllMatkul } from '../redux/actions/matkulAction';
import FormModal from './FormModal';
import TableBase from './TableBase';

export default function DashboardContent() {
  const { content } = useParams();
  const dispatch = useDispatch();
  const boxGray = useColorModeValue('gray.200', 'gray.700');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [placement, setPlacement] = useState('left');
  const { allMatkul, matkul } = useSelector(state => state.matkulReducer);
  const [columns] = useState([
    { Header: 'Kode', accessor: 'kode' },
    { Header: 'Nama', accessor: 'nama' },
    { Header: 'Jadwal', accessor: 'jadwal' },
    { Header: 'SKS', accessor: 'sks' },
    { Header: 'Semester', accessor: 'semester' },
    { Header: 'Opsi', accessor: 'opsi' },
  ]);

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
      <Flex alignItems="center" p="4">
        {/* <IconButton
          mr="1"
          size="xs"
          fontSize="md"
          variant="ghost"
          color="current"
          onClick={onOpen}
          icon={<HamburgerIcon />}
          display={['flex', 'flex', 'none', 'none']}
        /> */}
        {/* <MenuDrawer isOpen={isOpen} placement={placement} onClose={onClose} /> */}
        {/* <BreadcrumbAdmin /> */}
        <Heading size="xs">Matkul</Heading>
        <Spacer />
        <Button colorScheme="blue" size="sm" onClick={onOpen}>
          + Matkul
        </Button>
        <FormModal isOpen={isOpen} onClose={onClose} />
      </Flex>
      <TableBase columns={columns} data={allMatkul} />
    </Box>
  );
}
