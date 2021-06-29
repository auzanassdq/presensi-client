import { ExternalLinkIcon } from '@chakra-ui/icons';
import {
  Heading,
  Flex,
  Spacer,
  Center,
  Button,
  Icon,
  Menu,
  MenuButton,
  IconButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { BiUser } from 'react-icons/bi';

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
      {isLogin && userId !== 'admin' && (
        <Button
          variant="link"
          size="sm"
          mr="2"
          onClick={() => history.push('/matkul')}
        >
          Daftar Matkul
        </Button>
      )}
      <ColorModeSwitcher />
      {isLogin && (
        <Menu>
          <MenuButton
            as={IconButton}
            ml={2}
            aria-label="Options"
            icon={<Icon as={BiUser} />}
            variant="outline"
            rounded="50%"
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
    </Flex>
  );
}

export default Navbar;
