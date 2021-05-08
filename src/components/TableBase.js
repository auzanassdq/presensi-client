import { useTable, useSortBy } from 'react-table';
import React from 'react';
import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/table';
import { Button } from '@chakra-ui/button';
import { useColorModeValue } from '@chakra-ui/color-mode';
import { useHistory, useRouteMatch } from 'react-router';

export default function TableBase({ columns, data }) {
  const thColor = useColorModeValue('blackAlpha.400', 'blackAlpha.700');
  const history = useHistory();
  const { path, url } = useRouteMatch();
  console.log(path, url);
  const {
    getTableProps,
    getTableBodyProps,
    headers,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
    },
    useSortBy
  );

  const firstPageRows = rows.slice(0, 20);

  const lihatPertemuan = matkul => {
    console.log(matkul);
    history.push(`${url}/${matkul._id}`);
  };

  return (
    <Table variant="striped" colorScheme="blue" size="sm" {...getTableProps()}>
      <Thead>
        <Tr bg={thColor}>
          {headers.map((column, index) => (
            <Th
              key={index}
              {...column.getHeaderProps(column.getSortByToggleProps())}
            >
              {column.render('Header')}
              {column.isSorted ? (column.isSortedDesc ? ' ∨' : ' ∧') : ''}
            </Th>
          ))}
        </Tr>
      </Thead>
      <Tbody {...getTableBodyProps()}>
        {firstPageRows.map((row, index) => {
          prepareRow(row);
          return (
            <Tr key={index} {...row.getRowProps()}>
              {row.cells.map((cell, index) => {
                // console.log(cell);
                if (cell.column.Header === 'Opsi') {
                  return (
                    <Td key={index} p="1">
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
    </Table>
  );
}
