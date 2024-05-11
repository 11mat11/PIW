import React from 'react';
import { useParams } from 'react-router-dom';
import heart from '../Assets/heart.png';
import mail from"../Assets/mail.png";
import cards1 from"../Assets/cards1.jpg";
import cards2 from"../Assets/cards2.jpg";
import cards3 from"../Assets/cards3.jpg";
import cards4 from"../Assets/cards4.jpg";
import heart1 from"../Assets/heart1.png";
import heart2 from"../Assets/heart2.png";
import arrow from"../Assets/Arrow.svg";
import Hotel from './Hotel.jsx';
import { useLayoutEffect } from 'react';
const Hotel_page = () => {
    const { id } = useParams();
    const hotel = Hotel.find(Hotel => Hotel.id === parseInt(id));
    useLayoutEffect(() => {
        // Pobierz elementy DOM
        var modal = document.getElementById('modal');
        var btnOpenModal = document.getElementById("openModal");
        var spanCloseModal = document.getElementsByClassName("close")[0];
        modal.style.display = "none";
        // Po kliknięciu przycisku otwierającego modal, pokaż modal
        btnOpenModal.onclick = function() {
          modal.style.display = "block";
        }
        
        // Po kliknięciu na przycisk zamykający modal, ukryj modal
        spanCloseModal.onclick = function() {
          modal.style.display = "none";
        }
        
        // Po kliknięciu w obszar poza modalem, ukryj modal
        window.onclick = function(event) {
          if (event.target == modal) {
            modal.style.display = "none";
          }
        }
      }, []);
  if (!hotel) {
    // Obsługa, gdy hotel o podanym identyfikatorze nie został znaleziony
    return <div>Hotel not found</div>;
  }
  let backgroundImage;
  
  switch (hotel.id) {
    case 1:
      backgroundImage = cards1;
      break;
    case 2:
      backgroundImage = cards2;
      break;
    case 3:
      backgroundImage = cards3;
      break;
    case 4:
      backgroundImage = cards4;
      break;
    default:
      backgroundImage = cards2;
  }

  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`, 
    // Dodatkowe style...
  };
        return (
          <div>
            <section id="hero" className="grid hero-section">
              <div className="title-grid">
                <p className="title-large">{hotel.textmiddle}</p>
              </div>
              <div className="hero-image-container2" style={backgroundStyle}>
                <p className="chip-widok">Add to favorites<img src={hotel.like === 'heart1' ? heart1 : heart2} alt="Heart" /></p>
              </div>
              <article className="hero-details-widok">
                <div className="dane">
                  <b>Location:</b> {hotel.name}<br />
                  <b>Local category:</b> {hotel.star}<br />
                  <b>Price:</b> {hotel.cena}<br />
                  <b>Description</b>
                </div>
                <p className="text-middle">{hotel.textsmall}</p>
                <div>
                  <button className="button primary" id="openModal">Contact<img src={mail} alt="Mail" /></button>
                </div>
                <div className="hero-cards">
                  <div className="card-image-widok" style={backgroundStyle}>
                  </div>
                  <div className="card-image-widok" style={backgroundStyle}>
                  </div>
                </div>
              </article>
            </section>
            <div id="modal" className="modal">
              <div className="modal-content">
                <span className="close">&times;</span>
                <p className="title-large">Contact</p>
                You're contacting the {hotel.name} hotel
                <form>
                  <textarea className="textarea-modal"></textarea>
                  <div className="modal-button">
                    Cancel   <button className="button primary" id="openModal">Send <img src={mail} alt="Mail" /></button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        );
 }
export default Hotel_page;