// components/FavoriteHotels.jsx
import React, { useContext } from 'react';
import { FavoritesContext } from '../data/FavoritesContext';

const FavoriteHotels = () => {
  const { state } = useContext(FavoritesContext);

  return (
    <div>
        <section id="hero" className="hero-section">
      <h2>Your Favorite Hotels</h2>
      {state.length === 0 ? (
        <p>No favorite hotels added.</p>
      ) : (
        <ul>
          {state.map(hotel => (
            <li key={hotel.id}>
              {hotel.name} - {hotel.cena}
            </li>
          ))}
        </ul>
      )}
    </section>
    </div>
  );
};

export default FavoriteHotels;
