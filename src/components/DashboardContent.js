import React, { useEffect } from 'react';
import { Box, Heading, useColorModeValue } from '@chakra-ui/react';
import { Route, Switch, useParams, useRouteMatch } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import { getAllMatkul } from '../redux/actions/matkulAction';

import MatkulTable from './MatkulTable';
import PertemuanTable from './PertemuanTable';

export default function DashboardContent({ dashboardURL }) {
  const { content } = useParams();
  let { path, url } = useRouteMatch();
  // console.log(content);
  // console.log(path, url);

  const dispatch = useDispatch();
  const boxGray = useColorModeValue('gray.200', 'gray.700');
  const { allMatkul, matkul } = useSelector(state => state.matkulReducer);

  useEffect(() => {
    switch (content) {
      case 'dosen':
        // dispatch(getDosen())
        break;
      case 'matkul':
        dispatch(getAllMatkul());
        break;
      default:
        break;
    }
  }, [dispatch, content, matkul]);

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
