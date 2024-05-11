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
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <link rel="preconnect" href="https://fonts.googleapis.com"/>
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
    <link href="https://fonts.googleapis.com/css2?family=Italiana&family=Roboto+Flex:opsz,wght@8..144,300&display=swap" rel="stylesheet"></link>
    <nav class="fixed-navigation">
        <img class="logo" src={logo}/>
        <ul class="nav-links">
            <li><a class="nav-link" href="#">Home</a></li>
            <li><a class="nav-link" href="#find">Find offers</a></li>
            <li><a class="nav-link" href="#add">Add new offers</a></li>
            <li><a class="nav-link" href="#my">My offers</a></li>
            <li><a class="nav-link" href="#favorites">Favorites</a></li>
            <button class="button primary">Log out</button>
        </ul>
        <button class="button primary hidden">Menu</button>
    </nav>
    <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/hotel/:id" element={<Hotel_page />} />
    </Routes>
    </Router>
    </div>
  );
}

export default App;
