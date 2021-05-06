import { useColorModeValue } from '@chakra-ui/color-mode';
import {
  Center,
  Circle,
  Divider,
  Flex,
  Heading,
  ListItem,
  Spacer,
  Text,
} from '@chakra-ui/layout';
import { CheckIcon, CloseIcon } from '@chakra-ui/icons'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDisclosure } from '@chakra-ui/hooks';

import Modal from './ScanModal'

export default function PertemuanItem({ pertemuan, lastItem }) {
  const fromBg = useColorModeValue('gray.200', 'gray.700');
  const checkColor = useColorModeValue('blue.300', 'blue.600');
  const unCheckColor = useColorModeValue('red.300', 'red.600');
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [kehadiran, setKehadiran] = useState({})

  useEffect(() => {
    let token = localStorage.getItem("token")
    axios.get(`${process.env.REACT_APP_API}/kehadiran/?pertemuanId=${pertemuan._id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(result => setKehadiran(result.data.data))
    .catch(error => console.log(error))
  }, [pertemuan._id])

  const handleMatkul = item => {
    console.log(item);
    console.log(kehadiran)
    console.log(new Date(kehadiran.checkIn))
    onOpen()
  };

  return (
    <ListItem
      w="xs"
      rounded={5}
      overflow="hidden"
      onClick={() => handleMatkul(pertemuan)}
    >
      <Modal isOpen={isOpen} onClose={onClose}/> 
      {kehadiran &&      
      <Flex direction="row">
        <Flex direction="column" spacing="0">
          <Circle size="40px" bg={kehadiran.status ? checkColor : unCheckColor} color="white">
            {kehadiran.status ? 
              <CheckIcon /> : <CloseIcon />
            }
          </Circle>
          {!lastItem && (
            <Center height="100px" size="10px">
              <Divider orientation="vertical" />
            </Center>
          )}
        </Flex>
        <Spacer />
        <Flex direction="column" w="260px">
          <Heading size="sm">{pertemuan.nama}</Heading>
          <Text fontSize="xs" color="gray.400">
            Tes
          </Text>
          <Flex rounded={5} h="50px" bg={fromBg} mt="10px"></Flex>
        </Flex>
      </Flex>
      }
    </ListItem>
  );
}
