import React from 'react';
import { ChakraProvider, Container, theme } from '@chakra-ui/react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import MyDashboard from './components/MyDashboard';
import Matkul from './components/Matkul';
import Login from './components/Login';
import Navbar from './components/Navbar';
import CariMatkul from './components/CariMatkul';
import AdminDashboard from './components/admin/AdminDashboard';
import { NotFound404Page } from './pages/NotFound404Page';

function Home({ isLogin, userId }) {
  if (isLogin) {
    if (userId === 'admin') return <Redirect to="/dashboard" />;
    return <MyDashboard />;
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
          <Route exact path="/matkul/">
            {isLogin ? <CariMatkul /> : <Redirect to="/" />}
          </Route>
          <Route path="/matkul/:idMatkul">
            {isLogin ? <Matkul /> : <Redirect to="/" />}
          </Route>
          <NotFound404Page />
        </Switch>
      </Container>
    </ChakraProvider>
  );
}

export default App;
