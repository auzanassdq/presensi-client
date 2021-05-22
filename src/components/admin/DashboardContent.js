import React, { useEffect } from 'react';
import { Box, Heading, useColorModeValue } from '@chakra-ui/react';
import { Route, Switch, useParams, useRouteMatch } from 'react-router';
import { useDispatch } from 'react-redux';

import MatkulTable from './matkul/MatkulTable';
import PertemuanTable from './pertemuan/PertemuanTable';

export default function DashboardContent({ dashboardURL }) {
  const { content } = useParams();
  let { path } = useRouteMatch();

  const dispatch = useDispatch();
  const boxGray = useColorModeValue('gray.200', 'gray.700');

  useEffect(() => {
    switch (content) {
      case 'dosen':
        // dispatch(getDosen())
        break;
      case 'matkul':
        
        break;
      default:
        break;
    }
  }, [dispatch, content]);

  return (
    <Box rounded={5} bg={boxGray} h="600px" w="100%" ml="0px">
      <Switch>
        <Route exact path={`${path}`}>
          <ContentSwitcher content={content} />
        </Route>
        <Route path={`${dashboardURL}/matkul/:matkulId`}>
          <PertemuanTable />
        </Route>
        <Heading>Ngaco</Heading>
      </Switch>
    </Box>
  );
}

function ContentSwitcher({ content }) {
  switch (content) {
    case 'matkul':
      return <MatkulTable />;
    case 'dosen':
      return <Heading>Konten Dosen</Heading>;
  }
}
