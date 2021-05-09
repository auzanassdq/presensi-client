import React, { useEffect, useState } from 'react';
import { Button } from '@chakra-ui/button';
import { useDisclosure } from '@chakra-ui/hooks';
import { Flex, Heading, Spacer } from '@chakra-ui/layout';
import { useDispatch, useSelector } from 'react-redux';
import FormModal from './FormModal';
import TableBase from './TableBase';
import { getPertemuanByMatkul } from '../redux/actions/pertemuanAction';
import { useParams } from 'react-router';
import { useTable, useSortBy } from 'react-table';
import { Tbody, Td, Tr } from '@chakra-ui/table';

import { getMatkulByID } from '../redux/actions/matkulAction';

export default function PertemuanTable() {
  const dispatch = useDispatch()
  const {matkulId} = useParams()

  const pertemuan = useSelector(
    state => state.pertemuanReducer.pertemuanByMatkul
  );
  const { matkul } = useSelector(state => state.matkulReducer);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [columns] = useState([
    { Header: 'Nama', accessor: 'nama' },
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
      data: pertemuan,
    },
    useSortBy
  );
  const firstPageRows = rows.slice(0, 20);


  useEffect(() => {
    dispatch(getPertemuanByMatkul(matkulId))
    dispatch(getMatkulByID(matkulId));
  }, [dispatch])

  return (
    <>
      <Flex alignItems="center" p="4">
        <Heading size="xs">Pertemuan {matkul.nama}</Heading>
        <Spacer />
        <Button colorScheme="blue" size="sm" onClick={onOpen}>
          + Pertemuan
        </Button>
        <FormModal isOpen={isOpen} onClose={onClose} />
      </Flex>
      
      <TableBase tableHead={{headers, getTableProps}}>
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
                          // onClick={() => lihatPertemuan(cell.row.original)}
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
