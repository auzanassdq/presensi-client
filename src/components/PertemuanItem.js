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
  Icon,
  useToast,
} from '@chakra-ui/react';
import { CheckIcon, CloseIcon, MinusIcon } from '@chakra-ui/icons';
import { IoMdQrScanner } from 'react-icons/io';

import Color from '../utilities/Color';
import { useDispatch } from 'react-redux';

import { setPertemuanItem } from '../redux/actions/pertemuanAction';

export default function PertemuanItem({ pertemuan, lastItem, onOpen }) {
  const toast = useToast();
  const dispatch = useDispatch();

  // const { isOpen, onOpen, onClose } = useDisclosure();

  const handlePertemuan = () => {
    dispatch(setPertemuanItem(pertemuan));

    let jadwalPertemuan = new Date(pertemuan.jadwal).getTime();
    let batasHadir = jadwalPertemuan + 1800000;

    if (Date.now() < jadwalPertemuan) {
      console.log('belum waktunya');
      toast({
        title: 'Pertemuan belum dimulai',
        status: 'info',
        duration: 2000,
        isClosable: true,
      });
    } else if (pertemuan.kehadiran.status) {
      toast({
        title: 'Anda Sudah CheckIn',
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
        title: 'Pertemuan sudah lewat',
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
      onClick={handlePertemuan}
    >
      <Flex direction="row">
        <Flex direction="column" spacing="0">
          <CircleKehadiran pertemuan={pertemuan} />

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
          <Flex
            rounded={5}
            bg={Color().cardBg}
            mt="10px"
            p="2"
            justifyContent="center"
          >
            {pertemuan.kehadiran && pertemuan.kehadiran.status
              ? moment(pertemuan.kehadiran.checkIn).format('kk:mm')
              : '-'}
          </Flex>
        </Flex>
      </Flex>
    </ListItem>
  );
}

function CircleKehadiran({ pertemuan }) {
  let jadwalPertemuan = new Date(pertemuan.jadwal).getTime();
  let batasHadir = jadwalPertemuan + 1800000;

  if (Date.now() < jadwalPertemuan) {
    return (
      <Circle size="40px" bg={Color().netralColor}>
        <MinusIcon color={Color().textNetralColor} />
      </Circle>
    );
  }

  if (Date.now() >= jadwalPertemuan && Date.now() <= batasHadir) {
    if (pertemuan.kehadiran.status) {
      return (
        <Circle
          size="40px"
          bg={
            pertemuan.kehadiran.status
              ? Color().checkColor
              : Color().unCheckColor
          }
        >
          {pertemuan.kehadiran.status ? (
            <CheckIcon color={Color().textCheckColor} />
          ) : (
            <CloseIcon color={Color().textUnCheckColor} />
          )}
        </Circle>
      );
    }
    return (
      <Circle size="40px" bg={Color().netralColor}>
        <Icon as={IoMdQrScanner} color={Color().textNetralColor} />
      </Circle>
    );
  }

  return (
    <Circle
      size="40px"
      bg={
        pertemuan.kehadiran.status ? Color().checkColor : Color().unCheckColor
      }
    >
      {pertemuan.kehadiran.status ? (
        <CheckIcon color={Color().textCheckColor} />
      ) : (
        <CloseIcon color={Color().textUnCheckColor} />
      )}
    </Circle>
  );
}
