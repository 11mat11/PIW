import React, { useState, useEffect } from 'react';
import heart1 from "../Assets/heart1.png";
import heart2 from "../Assets/heart2.png";
import arrow from "../Assets/Arrow.svg";
import { Link } from 'react-router-dom';
import { useFavorites } from '../data/FavoritesContext'; // Import favorites context
import fetchHotels from './fetchHotels'; // Import function to fetch hotels

const Home = () => {
  const { state: favorites, dispatch } = useFavorites(); // Domyślna wartość dla favorites

  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    const loadHotels = async () => {
      const hotelList = await fetchHotels();
      setHotels(hotelList);
    };
    loadHotels();
  }, []);

  const handleFavoriteToggle = (hotel) => {
    const isFavorite = favorites.some(favorite => favorite.id === hotel.id);
    if (isFavorite) {
        dispatch({ type: 'REMOVE_FAVORITE', payload: hotel.id });
    } else {
        dispatch({ type: 'ADD_FAVORITE', payload: hotel });
    }
};


  return (
    <div>
      <section id="hero" className="hero-welcom">
        <p className="title-large">Welcome, your tranquility oasis awaits</p>
      </section>
      <section id="find" className="browse-section">
        <p className="title-middle">Explore the hotels</p>
        <input className="searchbar" placeholder="Search by hotel name, place, description etc." />
        <section className="grid hotel-cards">
          {hotels.map((hotel) => (
            <article key={hotel.id} className="hotel-card">
              <div className="card-image">
                <div className="chip-footer">
                  <p className="chip">{hotel.name}</p>
                  <img src={favorites.some(favorite => favorite.id === hotel.id) ? heart2 : heart1} alt="Heart" onClick={() => handleFavoriteToggle(hotel)} />


                </div>
              </div>
              <p className="text-middle">{hotel.textmiddle}</p>
              <p className="text-small">{hotel.textsmall}</p>
              <div className="hotel-card-footer">
                <p className="text-middle">{hotel.star}</p>
                <p className="text-middle">{hotel.cena}</p>
              </div>
              <Link to={`/hotel/${hotel.id}`} className="button primary">Find more <img src={arrow} alt="Arrow" /></Link>
            </article>
          ))}
        </section>
      </section>
    </div>
  );
};

export default Home;
