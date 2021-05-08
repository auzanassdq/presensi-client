import { useTable, useSortBy } from 'react-table';
import React from 'react';
import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/table';
import { Button } from '@chakra-ui/button';

export default function TableBase({ columns, data }) {
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
  console.log(headers);
  const firstPageRows = rows.slice(0, 20);

  const lihatPertemuan = matkul => {
    console.log(matkul);
  };

  return (
    <Table variant="striped" colorScheme="blue" size="sm" {...getTableProps()}>
      <Thead>
        <Tr>
          {headers.map(column => (
            <Th p="1" {...column.getHeaderProps(column.getSortByToggleProps())}>
              {column.render('Header')}
              {column.isSorted ? (column.isSortedDesc ? ' ∨' : ' ∧') : ''}
            </Th>
          ))}
        </Tr>
      </Thead>
      <Tbody {...getTableBodyProps()}>
        {firstPageRows.map((row, i) => {
          prepareRow(row);
          return (
            <Tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                if (cell.column.Header === 'Opsi') {
                  return (
                    <Td p="1">
                      <Button
                        colorScheme="blue"
                        variant="outline"
                        size="xs"
                        onClick={() => lihatPertemuan(cell.row.values)}
                      >
                        Pertemuan
                      </Button>
                    </Td>
                  );
                }
                return <Td {...cell.getCellProps()} p="1" fontSize="xs">{cell.render('Cell')}</Td>;
              })}
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
}
