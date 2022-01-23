import { List, VStack } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { Link, useRouteMatch } from 'react-router-dom';

import MenuItem from '../../components/admin/MenuItem';

function SideBar() {
  let { path } = useRouteMatch();

  const { role } = useSelector(state => state.userReducer);

  return (
    <VStack mr="30px" mb="auto" display={['none', 'none', 'flex', 'flex']}>
      <List spacing={5}>
        <Link to={`/dashboard`}>
          <MenuItem text="Home" />
        </Link>
        <Link to={`${path}/matkul`}>
          <MenuItem text="Matkul" />
        </Link>
        {role === 'admin' && (
          <>
            <Link to={`${path}/dosen`}>
              <MenuItem text="Dosen" />
            </Link>
            <Link to={`${path}/mahasiswa`}>
              <MenuItem text="Mahasiswa" />
            </Link>
          </>
        )}
      </List>
    </VStack>
  );
}

export default SideBar;
