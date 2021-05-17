import React from 'react';
import { ChakraProvider, Container, Heading, theme } from '@chakra-ui/react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import ListMatkul from './components/ListMatkul';
import Matkul from './components/Matkul';
import Login from './components/Login';
import Navbar from './components/Navbar';
import AdminDashboard from './components/admin/AdminDashboard';
import { NotFound404Page } from './pages/NotFound404Page';

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
        <Switch>
          <Route exact path="/">
            <Navbar />
            <Home isLogin={isLogin} userId={userId} />
          </Route>
          <Route path="/login">
            <Navbar />
            {isLogin ? <Redirect to="/" /> : <Login />}
          </Route>
          <Route path="/dashboard">
            <Navbar />
            {isLogin ? <AdminDashboard /> : <Redirect to="/" />}
          </Route>
          <Route path="/matkul/:idMatkul">
            <Navbar />
            {isLogin ? <Matkul /> : <Redirect to="/" />}
          </Route>
          <NotFound404Page />
        </Switch>
      </Container>
    </ChakraProvider>
  );
}

export default App;
