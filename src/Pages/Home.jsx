import {useState} from "react";
import heart1 from"../Assets/heart1.png";
import heart2 from"../Assets/heart2.png";
import arrow from"../Assets/Arrow.svg";
import Hotel from './Hotel.jsx';
import { Link } from 'react-router-dom';
const Home=()=>{
    
    return (
      <div>
      <section id="hero" class="hero-welcom">
        <p class="title-large">Welcome, your tranquility oasis awaits</p>
      </section>
      <section id="find" class="browse-section">
        <p class="title-middle">Explore the hotels</p>
        <input class="searchbar" placeholder="Search by hotel name, place, description etc."/>
        <section class="grid hotel-cards">
          {Hotel.map((hotel) => (
            <article key={hotel.id} className="hotel-card">
              <div className="card-image">
                <div className="chip-footer">
                  <p className="chip">{hotel.name}</p>
                  {hotel.like === 'heart1' ? <img src={heart1} alt="Heart 1" /> : <img src={heart2} alt="Heart 2" />}
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
    )
}
export default Home;