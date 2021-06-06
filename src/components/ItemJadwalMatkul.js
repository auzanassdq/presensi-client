import React from 'react';
import {
  Heading,
  Flex,
} from '@chakra-ui/react';
import Color from '../utilities/Color';
import moment from 'moment';

export default function ItemJadwalMatkul({ matkul, handleMatkul }) {
  return (
    <Flex
      w="xs"
      h="60px"
      as="button"
      rounded={5}
      overflow="hidden"
      boxShadow="lg"
      bg={Color().cardBg}
      onClick={() => handleMatkul(matkul)}
    >
      {/* <HStack width="100%" spacing="none"> */}
      <Flex
        direction="column"
        justifyContent="center"
        spacing="none"
        bg="blue.800"
        p="3"
        w="65px"
        h="100%"
      >
        <Heading size="xs">{moment(matkul.jadwal).format('ddd')}</Heading>
        <Heading size="xs">{moment(matkul.jadwal).format('kk:mm')}</Heading>
      </Flex>

      <Flex h="100%" spacing="auto" flex="1" alignItems="center">
        <Heading size="xs" p="2">
          {matkul.nama}
        </Heading>
      </Flex>
      {/* </HStack> */}
    </Flex>
  );
}
