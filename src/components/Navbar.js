import { Heading, Flex, Spacer, Box, Center, Button } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import { logout } from '../redux/actions/userAction';

function Navbar() {
  const dispatch = useDispatch();
  const { isLogin } = useSelector(state => state.userReducer);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Flex p="2">
      <Center>
        <Heading size="md">PRESENSI</Heading>
      </Center>
      <Spacer />
      {isLogin && (
        <Button variant="outline" size="xs" onClick={handleLogout}>
          Keluar
        </Button>
      )}
      <Box>
        <ColorModeSwitcher justifySelf="flex-end" />
      </Box>
    </Flex>
  );
}

export default Navbar;
