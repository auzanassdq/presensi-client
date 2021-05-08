import { Button } from '@chakra-ui/button';
import { useDisclosure } from '@chakra-ui/hooks';
import { Flex, Heading, Spacer } from '@chakra-ui/layout';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import FormModal from './FormModal';
import TableBase from './TableBase';

export default function MatkulTable() {
  const { allMatkul } = useSelector(state => state.matkulReducer);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [columns] = useState([
    { Header: 'Kode', accessor: 'kode' },
    { Header: 'Nama', accessor: 'nama' },
    { Header: 'Jadwal', accessor: 'jadwal' },
    { Header: 'SKS', accessor: 'sks' },
    { Header: 'Semester', accessor: 'semester' },
    { Header: 'Opsi', accessor: 'opsi' },
  ]);

  return (
    <>
      <Flex alignItems="center" p="4">
        <Heading size="xs">Matkul</Heading>
        <Spacer />
        <Button colorScheme="blue" size="sm" onClick={onOpen}>
          + Matkul
        </Button>
        <FormModal isOpen={isOpen} onClose={onClose} />
      </Flex>
      <TableBase columns={columns} data={allMatkul} />
    </>
  );
}
