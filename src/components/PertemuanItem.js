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
import { CheckIcon, CloseIcon } from '@chakra-ui/icons';
import { useDisclosure } from '@chakra-ui/hooks';

import Modal from './ScanModal';
import moment from 'moment';

export default function PertemuanItem({ pertemuan, lastItem }) {
  const fromBg = useColorModeValue('gray.200', 'gray.700');

  const checkColor = useColorModeValue('blue.100', 'blue.900');
  const textCheckColor = useColorModeValue('blue.500', 'blue.500');

  const unCheckColor = useColorModeValue('pink.100', 'pink.900');
  const textUnCheckColor = useColorModeValue('pink.500', 'pink.500');

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleMatkul = item => {
    console.log(item);
    onOpen();
  };

  return (
    <ListItem
      w="xs"
      rounded={5}
      overflow="hidden"
      onClick={() => handleMatkul(pertemuan)}
    >
      <Modal isOpen={isOpen} onClose={onClose} pertemuan={pertemuan} />
      <Flex direction="row">
        <Flex direction="column" spacing="0">
          <Circle
            size="40px"
            bg={pertemuan.kehadiran.status ? checkColor : unCheckColor}
          >
            {pertemuan.kehadiran.status ? (
              <CheckIcon color={textCheckColor} />
            ) : (
              <CloseIcon color={textUnCheckColor} />
            )}
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
            {moment(pertemuan.kehadiran.checkIn).format(
              'DD MMMM YYYY, kk:mm:ss'
            )}
            {/* {Date(pertemuan.kehadiran.checkIn)} */}
          </Text>
          <Flex rounded={5} h="50px" bg={fromBg} mt="10px"></Flex>
        </Flex>
      </Flex>
    </ListItem>
  );
}
