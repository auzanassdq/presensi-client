import React from 'react';
import { ChakraProvider, Container, theme } from '@chakra-ui/react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import ListMatkul from './components/ListMatkul';
import Matkul from './components/Matkul';
import Login from './components/Login';
import Navbar from './components/Navbar';
import AdminDashboard from './components/AdminDashboard';

function Home({ isLogin, userId }) {
  if (isLogin) {
    if (userId === 'admin') return <Redirect to="/dashboard" />;
    return <ListMatkul />;
  }
  return <Redirect to="/login" />;
}

function App() {
  const { isLogin, userId } = useSelector(state => state.userReducer);
  console.log(isLogin);

  return (
    <ChakraProvider theme={theme}>
      <Container maxW="container.xl">
        <Navbar />

        <Switch>
          <Route exact path="/">
            <Home isLogin={isLogin} userId={userId} />
          </Route>
          <Route path="/login">
            {isLogin ? <Redirect to="/" /> : <Login />}
          </Route>
          <Route path="/dashboard">
            {isLogin ? <AdminDashboard /> : <Redirect to="/" />}
          </Route>
          <Route path="/matkul/:idMatkul">
            {isLogin ? <Matkul /> : <Redirect to="/" />}
          </Route>
        </Switch>
      </Container>
    </ChakraProvider>
  );
}

export default App;
