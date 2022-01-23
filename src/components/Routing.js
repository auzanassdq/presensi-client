import { Switch, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { NotFound404Page } from '../pages/NotFound404Page';

import AdminDashboard from '../pages/dosen/AdminDashboard';
import MyDashboard from '../pages/mahasiswa/MyDashboard';
import CariMatkul from '../pages/mahasiswa/CariMatkul';
import Matkul from '../pages/mahasiswa/Matkul';
import Login from '../pages/Login';

function Home({ isLogin, role }) {
  if (isLogin) {
    if (role !== 'mahasiswa') return <Redirect to="/dashboard" />;
    return <MyDashboard />;
  }
  return <Redirect to="/login" />;
}

function Routing() {
  const { isLogin, role } = useSelector(state => state.userReducer);

  return (
    <Switch>
      <Route exact path="/">
        <Home isLogin={isLogin} role={role} />
      </Route>
      <Route path="/login">{isLogin ? <Redirect to="/" /> : <Login />}</Route>
      <Route path="/dashboard">
        {isLogin ? <AdminDashboard /> : <Redirect to="/" />}
      </Route>
      {role === 'mahasiswa' ? (
        <>
          <Route exact path="/matkul/">
            {isLogin ? <CariMatkul /> : <Redirect to="/" />}
          </Route>
          <Route path="/matkul/:idMatkul">
            {isLogin ? <Matkul /> : <Redirect to="/" />}
          </Route>
        </>
      ) : (
        <Redirect to="/dashboard" />
      )}
      <NotFound404Page />
    </Switch>
  );
}

export default Routing;
