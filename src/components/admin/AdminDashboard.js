import { List, VStack, Flex, Heading, Box, Spacer } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
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
  const dispatch = useDispatch();

  const { allDosen } = useSelector(state => state.dosenReducer);
  const { allMahasiswa } = useSelector(state => state.mahasiswaReducer);
  const { allMatkul } = useSelector(state => state.matkulReducer);

  console.log(allDosen);

  // const [content, setstate] = useState(["Matkul", "Dosen", "Mahasiswa"])
  const [content] = useState([
    { nama: 'Matkul', total: allMatkul.length, path: `${path}/matkul` },
    { nama: 'Dosen', total: allDosen.length, path: `${path}/dosen` },
    {
      nama: 'Mahasiswa',
      total: allMahasiswa.length,
      path: `${path}/mahasiswa`,
    },
  ]);
  console.log(content);

  useEffect(() => {
    dispatch(getAllDosen());
    dispatch(getAllMatkul());
    dispatch(getAllMahasiswa());
  }, [dispatch]);

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
          <MainDashboard content={content} />
        </Route>
        <Route path={`${path}/:content`}>
          <DashboardContent dashboardURL={path} />
        </Route>
      </Switch>
    </Flex>
  );
}

function MainDashboard({ content }) {
  const history = useHistory();

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
        {content.map((item, index) => (
          <Box
            key={index}
            p="10"
            mb="5"
            bg="gray.700"
            rounded="5"
            textAlign="center"
            cursor="pointer"
            onClick={() => history.push(item.path)}
          >
            <Heading size="sm" mb="2">
              {item.nama}
            </Heading>
            <Heading size="3xl">{item.total}</Heading>
          </Box>
        ))}
      </Flex>
    </VStack>
  );
}
