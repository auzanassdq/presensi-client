import { Heading, Flex, Spacer, Box, Center, Button } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import { logout } from '../redux/actions/userAction';

function Navbar() {
  const dispatch = useDispatch();
  const { isLogin, userId } = useSelector(state => state.userReducer);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Flex pt="4" pb="4" alignItems="center">
      <Center>
        <Heading size="lg">PRESENSI</Heading>
      </Center>
      <Spacer />
      {isLogin && userId != 'admin' && (
        <Button variant="link" size="sm" mr="2" onClick={handleLogout}>
          Daftar Matkul
        </Button>
      )}
      {/* <Box> */}
      <ColorModeSwitcher />
      {isLogin && (
        <Button variant="outline" size="sm" ml="2" onClick={handleLogout}>
          Keluar
        </Button>
      )}
      {/* </Box> */}
    </Flex>
  );
}

export default Navbar;
