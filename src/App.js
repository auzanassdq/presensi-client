import React from 'react';
import { ChakraProvider, Grid, theme } from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Switch, Route, Link, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import ListMatkul from './components/ListMatkul';
import Matkul from './components/Matkul';
import Login from './components/Login';
import Navbar from './components/Navbar';


function App() {
  const { isLogin } = useSelector(state => state.userReducer);
  console.log(isLogin)
  return (
    <ChakraProvider theme={theme}>
      <Grid p={3}>
        <Navbar />
      

      <Switch>
        <Route exact path="/">
          {isLogin ? <ListMatkul /> : <Redirect to="/login" />}
        </Route>
        <Route path="/login">
          {isLogin ? <Redirect to="/" /> : <Login />}
        </Route>
        <Route path="/matkul/:idMatkul">
          <Matkul />
        </Route>
      </Switch>
      </Grid>
    </ChakraProvider>
  );
}

export default App;
