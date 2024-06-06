import './App.css';
import Home from './Pages/Home.jsx';
import Hotel_page from './Pages/Hotel_page.jsx';
import logo from './Assets/logo.svg';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import { logout, useUser } from './data/userService';
import Login from './Pages/Login';
import ChatView from './Pages/Chat.jsx';
import FavoriteHotels from './Pages/FavoriteHotels';
import { FavoritesProvider } from './data/FavoritesContext';


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
                {user && <li><NavLink to="/chat" className="nav-link">Chat</NavLink></li>}
                {!user && <NavLink to="/login" className="App-mini-button">Login</NavLink>}
                {user && <button className="App-mini-button" onClick={logout}>Logout {user?.displayName}</button>}
              </ul>
            </nav>
            <button className="button primary hidden">Menu</button>
          </header>
          <FavoritesProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/hotel/:id" element={<Hotel_page />} />
            <Route path="/login" element={<Login />} />
            <Route path="/favorites" element={<FavoriteHotels />} />
            <Route path="/chat" element={<ChatView />} />
          </Routes>
          </FavoritesProvider>
        </Router>
    </div>
  );
}

export default App;
