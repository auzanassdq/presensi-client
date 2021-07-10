import { List, VStack, Flex, Heading, Box, Spacer } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Link,
  Route,
  Switch,
  useHistory,
  useRouteMatch,
} from 'react-router-dom';
import { getAllDosen } from '../../redux/actions/dosenAction';
import { getAllMahasiswa } from '../../redux/actions/mahasiswaAction';
import { getAllMatkul } from '../../redux/actions/matkulAction';

import DashboardContent from './DashboardContent';
import MenuItem from './MenuItem';

export default function AdminDashboard() {
  let { path } = useRouteMatch();

  const { role } = useSelector(state => state.userReducer);

  return (
    <Flex direction="row">
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

function MainDashboard() {
  const history = useHistory();
  let { path } = useRouteMatch();
  const dispatch = useDispatch();

  const { allDosen } = useSelector(state => state.dosenReducer);
  const { allMahasiswa } = useSelector(state => state.mahasiswaReducer);
  const { allMatkul } = useSelector(state => state.matkulReducer);
  const { role, userId } = useSelector(state => state.userReducer);

  useEffect(() => {
    dispatch(getAllDosen());
    dispatch(getAllMatkul('', {userId, role}));
    dispatch(getAllMahasiswa());
  }, [dispatch, userId, role]);

  return (
    <VStack width="100%">
      <Heading width="100%">Dashboard</Heading>

      <Spacer />
      <Spacer />

      <Flex
        wrap="wrap"
        justifyContent="space-between"
        alignContent="space-between"
        spacer="3"
        width="100%"
        height="100%"
      >
        <Box
          p="10"
          mb="5"
          bg="gray.700"
          rounded="5"
          textAlign="center"
          cursor="pointer"
          onClick={() => history.push(`${path}/matkul`)}
        >
          <Heading size="sm" mb="2">
            Matkul
          </Heading>
          <Heading size="3xl">{allMatkul.length}</Heading>
        </Box>

        {role === 'admin' && (
          <>
            <Box
              p="10"
              mb="5"
              bg="gray.700"
              rounded="5"
              textAlign="center"
              cursor="pointer"
              onClick={() => history.push(`${path}/dosen`)}
            >
              <Heading size="sm" mb="2">
                Dosen
              </Heading>
              <Heading size="3xl">{allDosen.length}</Heading>
            </Box>

            <Box
              p="10"
              mb="5"
              bg="gray.700"
              rounded="5"
              textAlign="center"
              cursor="pointer"
              onClick={() => history.push(`${path}/mahasiswa`)}
            >
              <Heading size="sm" mb="2">
                Mahasiswa
              </Heading>
              <Heading size="3xl">{allMahasiswa.length}</Heading>
            </Box>
          </>
        )}
      </Flex>
    </VStack>
  );
}
