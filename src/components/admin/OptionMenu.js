import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';

function OptionMenu({editHandler, deleteHandler}) {
  return (
    <Menu>
      <MenuButton colorScheme="blue" size="sm" as={Button}>
        Opsi
      </MenuButton>
      <MenuList minWidth="1">
        <MenuItem
          icon={<EditIcon />}
          onClick={editHandler}
        >
          Ubah
        </MenuItem>
        <MenuItem
          icon={<DeleteIcon />}
          onClick={deleteHandler}
        >
          Hapus
        </MenuItem>
      </MenuList>
    </Menu>
  );
}

export default OptionMenu;
