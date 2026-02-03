import { Route, Routes } from 'react-router-dom';
import './App.css'
import NavBar from './components/Navbar/Navbar';
import Home from './views/Home/Home';
import MyAppointments from './views/MisTurnos/MisTurnos';
import Register from "./views/Register/Register";
import Login from "./views/Login/Login";
import PageNotFound from "./views/PageNotFound/PageNotFound";

function App() {

  return (
  <>
    <NavBar/>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/appointments' element={<MyAppointments/>} />
      <Route path='/register' element={<Register/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='*' element={<PageNotFound />} />
    </Routes>
  </>
  );
};

export default App
