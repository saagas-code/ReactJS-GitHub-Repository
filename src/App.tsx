import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Login } from './pages/login';
import { Home } from './pages/home';
import { RequireAuth } from './contexts/RequireAuth';

function App() {

  return (
    <div>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/home' element={<RequireAuth><Home/></RequireAuth>} />
      </Routes>
    </div>
  );
}

export default App;
