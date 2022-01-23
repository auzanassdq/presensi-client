import { Flex } from '@chakra-ui/react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import DashboardContent from '../../components/admin/DashboardContent';
import MainDashboard from '../../components/admin/MainDashboard';
import SideBar from '../../components/admin/SideBar';

export default function AdminDashboard() {
  let { path } = useRouteMatch();
  return (
    <Flex direction="row">
      <SideBar />

      <Switch>
        <Route exact path={`${path}`}>
          <MainDashboard />
        </Route>
        <Route path={`${path}/:content`}>
          <DashboardContent dashboardURL={path} />
        </Route>
      </Switch>
    </Flex>
  );
}
