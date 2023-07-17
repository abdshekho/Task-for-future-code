import './App.css';
import Login from './Pages/Login';
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import AddAd from './Pages/Admin/AddAd';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProtectedRouteHook from './hooks/ProtectedRouteHook';
import ProtectedRoute from './auth/ProtectedRoute';
import DrawerAppBar from './component/Navbar';
import Items from './Pages/Admin/items';
import EditeAd from './Pages/Admin/EditeAd';

function App() {
  const [ isAdmin, userData ] = ProtectedRouteHook()
  return (
    <div className="App">
      <BrowserRouter >
        { isAdmin ? <DrawerAppBar /> : <div></div> }
        { isAdmin ? <div style={ { width: "100%", height: "100px" } }></div> : <div></div> }


        <Routes >
          <Route element={ <ProtectedRoute auth={ !isAdmin } /> }>
            <Route path="/login" element={ <Login /> } />
          </Route>

          <Route element={ <ProtectedRoute auth={ isAdmin } /> }>
            <Route path='/ads' element={ <Items /> } />
            <Route path='/create' element={ <AddAd /> } />
            <Route path='/Edit/:id' element={ <EditeAd /> } />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
