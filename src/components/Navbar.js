import { ExternalLinkIcon, HamburgerIcon } from '@chakra-ui/icons';
import {
  Heading,
  Flex,
  Spacer,
  Box,
  Center,
  Button,
  Menu,
  MenuButton,
  IconButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import { ColorModeSwitcher } from '../ColorModeSwitcher';
import { logout } from '../redux/actions/userAction';

function Navbar() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { isLogin, userId, nama } = useSelector(state => state.userReducer);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Flex pt="4" pb="4" alignItems="center">
      <Center>
        <Heading size="lg" onClick={() => history.push('/')}>
          PRESENSI
        </Heading>
      </Center>
      <Spacer />
      {isLogin && userId != 'admin' && (
        <Button
          variant="link"
          size="sm"
          mr="2"
          onClick={() => history.push('/matkul')}
        >
          Daftar Matkul
        </Button>
      )}
      {/* <Box> */}
      <ColorModeSwitcher />
      {isLogin && (
        // <Button borderRadius="full" variant="outline" size="sm" ml="2" onClick={handleLogout}>
        //   Keluar
        // </Button>
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<HamburgerIcon />}
            variant="outline"
          />
          <MenuList>
            <MenuItem>{nama}</MenuItem>
            <MenuDivider />
            <MenuItem icon={<ExternalLinkIcon />} onClick={handleLogout}>
              Keluar
            </MenuItem>
          </MenuList>
        </Menu>
      )}
      {/* </Box> */}
    </Flex>
  );
}

export default Navbar;
