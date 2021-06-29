import moment from 'moment';
import { useEffect } from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import {
  Heading,
  Box,
  VStack,
  Flex,
  Text,
  Center,
  Tag,
  Spacer,
} from '@chakra-ui/react';

import Color from '../utilities/Color';
import { getPertemuanCurrent } from '../redux/actions/pertemuanAction';

export default function PertemuanCurrent() {
  const dispatch = useDispatch();
  const history = useHistory();

  const { pertemuanCurrent } = useSelector(state => state.pertemuanReducer);
  const { userId } = useSelector(state => state.userReducer);

  useEffect(() => {
    dispatch(getPertemuanCurrent(userId));
  }, [dispatch, userId]);

  const handleMatkul = matkul => {
    history.push(`/matkul/${matkul._id}`);
  };

  return (
    <>
      <Box w="xs">
        <Heading size="sm">Pertemuan berlangsung</Heading>
      </Box>

      {pertemuanCurrent.matkul ? (
        <Flex
          w="xs"
          h="60px"
          as="button"
          rounded={5}
          overflow="hidden"
          boxShadow="lg"
          bg={Color().cardBg}
          onClick={() => handleMatkul(pertemuanCurrent.matkul)}
        >
          <Flex
            direction="column"
            justifyContent="center"
            spacing="none"
            bg="blue.800"
            p="3"
            w="65px"
            h="100%"
          >
            <Heading size="xs">
              {moment(pertemuanCurrent.jadwal).format('ddd')}
            </Heading>
            <Heading size="xs">
              {moment(pertemuanCurrent.jadwal).format('D MMM')}
            </Heading>
          </Flex>
          
          <VStack spacing="1" flex="1" textAlign="left" h="100%">
            <Flex direction="row" w="100%">
              <Heading size="sm" p="2" pb="0">
                {pertemuanCurrent.nama}
              </Heading>
              <Spacer />
              <Tag size="md" colorScheme="red">
                NOW
              </Tag>
            </Flex>
            <Text fontSize="xs" w="100%" p="2" pt="0">
              {pertemuanCurrent.matkul.nama}
            </Text>
          </VStack>
        </Flex>
      ) : (
        <Center>Tidak ada pertemuan</Center>
      )}
    </>
  );
}
