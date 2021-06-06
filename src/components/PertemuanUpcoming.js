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
  HStack,
  Center,
  Spacer,
  Tag,
} from '@chakra-ui/react';

import Color from '../utilities/Color';
import { getPertemuanUpcoming } from '../redux/actions/pertemuanAction';

export default function PertemuanUpcoming() {
  const dispatch = useDispatch();
  const history = useHistory();

  const { pertemuanUpcoming } = useSelector(state => state.pertemuanReducer);
  const { userId } = useSelector(state => state.userReducer);

  useEffect(() => {
    dispatch(getPertemuanUpcoming(userId));
  }, [dispatch, userId]);

  const handleMatkul = () => {
    history.push(`/matkul/${pertemuanUpcoming.matkul._id}`);
  };

  return (
    <>
      <Box w="xs">
        <Heading size="sm">Pertemuan akan datang</Heading>
      </Box>

      {pertemuanUpcoming.matkul ? (
        <Flex
          w="xs"
          h="60px"
          as="button"
          rounded={5}
          overflow="hidden"
          boxShadow="lg"
          bg={Color().cardBg}
          onClick={handleMatkul}
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
              {moment(pertemuanUpcoming.jadwal).format('ddd')}
            </Heading>
            <Heading size="xs">
              {moment(pertemuanUpcoming.jadwal).format('D MMM')}
            </Heading>
          </Flex>
          
          <VStack spacing="auto" flex="1" textAlign="left" h="100%">
            <Flex direction="row" w="100%">
              <Heading size="sm" p="2" pb="0">
                {pertemuanUpcoming.nama}
              </Heading>
              <Spacer />
              <Tag size="md" colorScheme="red">
                {moment(pertemuanUpcoming.jadwal).format('kk:mm')}
              </Tag>
            </Flex>
            <Text fontSize="xs" w="100%" p="2" pt="0">
              {pertemuanUpcoming.matkul.nama}
            </Text>
          </VStack>
        </Flex>
      ) : (
        <Center>Tidak ada pertemuan</Center>
      )}
    </>
  );
}
