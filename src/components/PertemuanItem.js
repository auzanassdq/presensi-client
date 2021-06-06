import moment from 'moment';
import {
  Center,
  Circle,
  Divider,
  Flex,
  Heading,
  ListItem,
  Spacer,
  Text,
  useDisclosure,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import { CheckIcon, CloseIcon, MinusIcon } from '@chakra-ui/icons';

import ScanModal from './ScanModal';
import Color from '../utilities/Color';

export default function PertemuanItem({ pertemuan, lastItem }) {
  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleMatkul = item => {
    let jadwalPertemuan = new Date(item.jadwal).getTime();
    let batasHadir = jadwalPertemuan + 1800000;

    if (Date.now() < jadwalPertemuan) {
      console.log('belum waktunya');
      toast({
        title: 'Pertemuan belum dimulai',
        status: 'info',
        duration: 2000,
        isClosable: true,
      });
    } else if (Date.now() >= jadwalPertemuan && Date.now() <= batasHadir) {
      console.log('silahkan');
      onOpen();
    } else {
      console.log('dah lewat');
      toast({
        title: 'Pertemuan sudah berlalu',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
    // onOpen();
  };

  return (
    <ListItem
      w="xs"
      rounded={5}
      overflow="hidden"
      onClick={() => handleMatkul(pertemuan)}
    >
      <ScanModal isOpen={isOpen} onClose={onClose} pertemuan={pertemuan} />
      <Flex direction="row">
        <Flex direction="column" spacing="0">
          {new Date(pertemuan.jadwal).getTime() > Date.now() ? (
            <Circle size="40px" bg={Color().netralColor}>
              <MinusIcon color={Color().textNetralColor} />
            </Circle>
          ) : (
            <Circle
              size="40px"
              bg={pertemuan.kehadiran.status ? Color().checkColor : Color().unCheckColor}
            >
              {pertemuan.kehadiran.status ? (
                <CheckIcon color={Color().textCheckColor} />
              ) : (
                <CloseIcon color={Color().textUnCheckColor} />
              )}
            </Circle>
          )}

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
            {moment(pertemuan.jadwal).format('dddd, DD MMMM YYYY, kk:mm')}
          </Text>
          <Flex rounded={5} bg={Color().cardBg} mt="10px" p="2" justifyContent="center">
            {/* {pertemuan.kehadiran.checkIn < pertemuan.jadwal
              ? '-'
              : moment(pertemuan.kehadiran.checkIn).format('kk:mm')} */}

            {pertemuan.kehadiran.status
              ? moment(pertemuan.kehadiran.checkIn).format('kk:mm')
              : '-'}
          </Flex>
        </Flex>
      </Flex>
    </ListItem>
  );
}
