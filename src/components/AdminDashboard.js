import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  List,
  VStack,
  ChevronRightIcon,
  Flex,
} from '@chakra-ui/react';
import React from 'react';
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom';
import DashboardContent from './DashboardContent';
import MenuItem from './MenuItem';

// function BreadcrumbAdmin(params) {
//   return (
//     <Breadcrumb spacing="8px" separator={<ChevronRightIcon color="gray.500" />}>
//       <BreadcrumbItem isCurrentPage>
//         <BreadcrumbLink href="/">Home</BreadcrumbLink>
//       </BreadcrumbItem>
//     </Breadcrumb>
//   );
// }

export default function AdminDashboard() {
  let { path, url } = useRouteMatch();
  console.log(path);

  return (
    <Flex direction="row">
      <VStack
        pl="2"
        mr="30px"
        mb="auto"
        display={['none', 'none', 'flex', 'flex']}
      >
        <List spacing={5}>
          <Link to={`/dashboard`}>
            <MenuItem>Home</MenuItem>
          </Link>
          <Link to={`${path}/dosen`}>
            <MenuItem>Dosen</MenuItem>
          </Link>
          <Link to={`${path}/matkul`}>
            <MenuItem>Matkul</MenuItem>
          </Link>
        </List>
      </VStack>

      <Switch>
        <Route exact path={`${path}`}>
          <DashboardContent />
        </Route>
        <Route path={`${path}/:content`}>
          <DashboardContent />
        </Route>
      </Switch>
    </Flex>
  );
}
