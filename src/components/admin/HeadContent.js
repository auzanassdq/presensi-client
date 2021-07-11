import { Button, Flex, Heading, Spacer } from '@chakra-ui/react';
import React from 'react';

export default function HeadContent({ title, setData, onOpen }) {
  return (
    <Flex alignItems="center" p="4">
      <Heading size="md">{title}</Heading>
      <Spacer />

      {title !== "Kehadiran" && 
      <Button
      colorScheme="blue"
      size="sm"
      onClick={() => {
        setData({});
        onOpen();
      }}
      >
        + {title}
      </Button>
      }
    </Flex>
  );
}
