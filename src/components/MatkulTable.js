import React, { useState } from 'react';
import { useTable, useSortBy } from 'react-table';
import { useHistory, useRouteMatch } from 'react-router';
import { useSelector } from 'react-redux';
import {
  Button,
  Flex,
  Heading,
  Spacer,
  Tbody,
  Tr,
  Td,
  useDisclosure,
} from '@chakra-ui/react';

import FormModal from './FormModal';
import TableBase from './TableBase';

export default function MatkulTable() {
  const history = useHistory();
  const { path, url } = useRouteMatch();
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

  const {
    getTableProps,
    getTableBodyProps,
    headers,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data: allMatkul,
    },
    useSortBy
  );
  const firstPageRows = rows.slice(0, 20);

  const lihatPertemuan = matkul => {
    console.log(matkul);
    history.push(`${url}/${matkul._id}`);
  };

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

      <TableBase tableHead={{ headers, getTableProps }}>
        <Tbody {...getTableBodyProps()}>
          {firstPageRows.map(row => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  if (cell.column.Header === 'Opsi') {
                    // console.log(cell.getCellProps());
                    return (
                      <Td {...cell.getCellProps()} p="1">
                        <Button
                          colorScheme="blue"
                          variant="outline"
                          size="xs"
                          onClick={() => lihatPertemuan(cell.row.original)}
                        >
                          Pertemuan
                        </Button>
                      </Td>
                    );
                  }
                  return (
                    <Td {...cell.getCellProps()} fontSize="xs">
                      {cell.render('Cell')}
                    </Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </TableBase>
    </>
  );
}
