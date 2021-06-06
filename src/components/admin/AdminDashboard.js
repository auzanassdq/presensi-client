import { List, VStack, Flex, Heading } from '@chakra-ui/react';
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom';

import DashboardContent from './DashboardContent';
import MenuItem from './MenuItem';

export default function AdminDashboard() {
  let { path, url } = useRouteMatch();

  return (
    <Flex direction="row">
      <VStack mr="30px" mb="auto" display={['none', 'none', 'flex', 'flex']}>
        <List spacing={5}>
          <Link to={`/dashboard`}>
            <MenuItem text="Home" />
          </Link>
          <Link to={`${path}/dosen`}>
            <MenuItem text="Dosen" />
          </Link>
          <Link to={`${path}/mahasiswa`}>
            <MenuItem text="Mahasiswa" />
          </Link>
          <Link to={`${path}/matkul`}>
            <MenuItem text="Matkul" />
          </Link>
        </List>
      </VStack>

      <Switch>
        <Route exact path={`${path}`}>
          <Heading>Dashboard</Heading>
        </Route>
        <Route path={`${path}/:content`}>
          <DashboardContent dashboardURL={path} />
        </Route>
      </Switch>
    </Flex>
  );
}
