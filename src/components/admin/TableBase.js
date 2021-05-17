import React from 'react';
import { Table } from '@chakra-ui/react';

import TableHeadBase from './TableHeadBase';

export default function TableBase(props) {
  const { headers, getTableProps } = props.tableHead;

  return (
    <Table variant="striped" colorScheme="blue" size="sm" {...getTableProps()}>
      <TableHeadBase headers={headers} />
      {props.children}
    </Table>
  );
}
