import {
  Button,
  Heading,
  Flex, 
  Spacer,
  Box
} from '@chakra-ui/react';
import { ColorModeSwitcher } from '../ColorModeSwitcher';


function Navbar() {
  return (
    <Flex>
      <Box p="2">
        <Heading size="md">PRESENSI</Heading>
      </Box>
      <Spacer />
      <Box>
        <ColorModeSwitcher justifySelf="flex-end" />
      </Box>
    </Flex>
  );
}

export default Navbar;
