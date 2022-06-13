import { Link, Route, Routes } from 'react-router-dom'
import Home from "./pages/Home";
import NewUser from './pages/NewUser';
import Users from './pages/Users';

function App() {

  return (
    <div className="container">
        <div>
            <h1 className="display-4 text-center mt-4"> QR App </h1>
            <ul className="nav justify-content-center">
              <li className="nav-item">
                <Link to='/' className="nav-link active">Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/new-user" className="nav-link">Nuevo usuario</Link>
              </li>
              <li className="nav-item">
                <Link to="/users" className="nav-link">Lista de usuarios</Link>
              </li>
            </ul>
        </div>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/new-user' element={<NewUser/>} />
          <Route path='/users' element={<Users />} />
        </Routes>
    </div>
  );
}

export default App;
