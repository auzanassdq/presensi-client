import { Box, Heading, useColorModeValue } from '@chakra-ui/react';
import { Route, Switch, useParams, useRouteMatch } from 'react-router';

import MatkulTable from './matkul/MatkulTable';
import PertemuanTable from './pertemuan/PertemuanTable';
import DosenTable from './dosen/DosenTable';
import MahasiswaTable from './mahasiswa/MahasiswaTable';
import MahasiswaInPertemuanTable from './mahasiswaInPertemuan/MahasiswaInPertemuanTable';

export default function DashboardContent({ dashboardURL }) {
  const { content } = useParams();
  let { path } = useRouteMatch();

  const boxGray = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box rounded={5} bg={boxGray} h="100%" w="100%" ml="0px">
      <Switch>
        <Route exact path={`${path}`}>
          <ContentSwitcher content={content} />
        </Route>
        <Route exact path={`${dashboardURL}/matkul/:matkulId`}>
          <PertemuanTable />
        </Route>
        <Route path={`${dashboardURL}/matkul/:matkulId/:pertemuanId`}>
          <MahasiswaInPertemuanTable />
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
      return <DosenTable />;
    case 'mahasiswa':
      return <MahasiswaTable />;
    default:
      break;
  }
}
