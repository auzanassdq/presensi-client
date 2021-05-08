import { useColorModeValue } from '@chakra-ui/color-mode';
import { Flex } from '@chakra-ui/layout';
import React from 'react';

export default function CardForm(props) {
  const fromBg = useColorModeValue('gray.200', 'gray.700');

  return (
    <Flex 
      direction="column" 
      bg={fromBg} 
      rounded={10} 
      p={12}
      {...props}
    >
      {props.children}
    </Flex>
  );
}
