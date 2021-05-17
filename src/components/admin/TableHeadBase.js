import React from 'react';
import { Th, Thead, Tr, useColorModeValue } from '@chakra-ui/react';

export default function TableHeadBase({ headers }) {
  const thColor = useColorModeValue('blackAlpha.400', 'blackAlpha.700');

  return (
    <Thead bg={thColor}>
      <Tr>
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
  );
}
