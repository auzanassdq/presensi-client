import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import {
  Button,
  Tbody,
  Td,
  Tr,
  Flex,
  Heading,
  Spacer,
  useDisclosure,
} from '@chakra-ui/react';
import { useTable, useSortBy } from 'react-table';

import { getMatkulByID } from '../../redux/actions/matkulAction';
import { getPertemuanByMatkul } from '../../redux/actions/pertemuanAction';

import TableBase from './TableBase';
// import FormModal from './MatkulModalForm';

export default function PertemuanTable() {
  const dispatch = useDispatch();
  const { matkulId } = useParams();

  const pertemuan = useSelector(
    state => state.pertemuanReducer.pertemuanByMatkul
  );
  const { matkul } = useSelector(state => state.matkulReducer);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [columns] = useState([
    { Header: 'Nama', accessor: 'nama' },
    { Header: 'Jadwal', accessor: 'jadwal' },
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
      data: pertemuan,
    },
    useSortBy
  );
  const firstPageRows = rows.slice(0, 20);

  useEffect(() => {
    dispatch(getPertemuanByMatkul(matkulId));
    dispatch(getMatkulByID(matkulId));
  }, [dispatch, matkulId]);

  const editHandler = pertemuan => {
    // console.log(matkul);
    // history.push(`${url}/${matkul._id}`);
  };

  return (
    <>
      <Flex alignItems="center" p="4">
        <Heading size="xs">Pertemuan {matkul.nama}</Heading>
        <Spacer />
        <Button colorScheme="blue" size="sm" onClick={onOpen}>
          + Pertemuan
        </Button>
        {/* <FormModal isOpen={isOpen} onClose={onClose} /> */}
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
                      <Td {...cell.getCellProps()} pt="1" pb="1">
                        <Button
                          colorScheme="blue"
                          variant="outline"
                          size="xs"
                          onClick={() => editHandler(cell.row.original)}
                        >
                          Edit
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
