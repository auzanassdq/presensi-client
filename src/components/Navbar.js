import {
  Heading,
  Flex, 
  Spacer,
  Box,
  Center
} from '@chakra-ui/react';
import { ColorModeSwitcher } from '../ColorModeSwitcher';


function Navbar() {
  return (
    <Flex p="2">
      <Center>
        <Heading size="md">PRESENSI</Heading>
      </Center>
      <Spacer />
      <Box>
        <ColorModeSwitcher justifySelf="flex-end" />
      </Box>
    </Flex>
  );
}

export default Navbar;
