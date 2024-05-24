import './App.css';
import Home from './Pages/Home.jsx';
import Hotel_page from './Pages/Hotel_page.jsx';
import logo from './Assets/logo.svg';
import heart from './Assets/heart.png';
import mail from"./Assets/mail.png";
import heart1 from"./Assets/heart1.png";
import heart2 from"./Assets/heart2.png";
import arrow from"./Assets/Arrow.svg";
import Hotel from './Pages/Hotel.jsx';
import Login from './Pages/Login.jsx';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import { logout, useUser } from './data/userService';

function App() {
  const user = useUser();
  return (
    <div className="App">
      <Router>
        <header className="fixed-navigation">
          <img className="logo" src={logo} alt="logo"/>
          <nav>
            <ul className="nav-links">
              <li><NavLink to="/" className="nav-link">Home</NavLink></li>
              <li><NavLink to="/find" className="nav-link">Find offers</NavLink></li>
              <li><NavLink to="/add" className="nav-link">Add new offers</NavLink></li>
              <li><NavLink to="/my" className="nav-link">My offers</NavLink></li>
              <li><NavLink to="/favorites" className="nav-link">Favorites</NavLink></li>
              {!user && <NavLink to="/login" className="App-mini-button">Login</NavLink>}
              {user && <button className="App-mini-button" onClick={logout}>Logout {user?.displayName}</button>}
            </ul>
          </nav>
          <button className="button primary hidden">Menu</button>
        </header>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hotel/:id" element={<Hotel_page />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
