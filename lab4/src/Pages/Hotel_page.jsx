import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { firestore } from '../firebaseConfig'; // Importuj obiekt Firestore
import heart from '../Assets/heart.png';
import mail from "../Assets/mail.png";
import cards1 from "../Assets/cards1.jpg";
import cards2 from "../Assets/cards2.jpg";
import cards3 from "../Assets/cards3.jpg";
import cards4 from "../Assets/cards4.jpg";
import heart1 from "../Assets/heart1.png";
import heart2 from "../Assets/heart2.png";
import arrow from "../Assets/Arrow.svg";
import Hotel from './Hotel.jsx';
import { useUser } from '../data/userService'; // Importujemy funkcję do pobierania zalogowanego użytkownika
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
const Hotel_page = () => {
    const { id } = useParams();
    const user = useUser(); // Pobieramy zalogowanego użytkownika
    const hotel = Hotel.find(Hotel => Hotel.id === parseInt(id));

    const [editable, setEditable] = useState(false); // Stan do przechowywania informacji, czy edycja jest włączona
    const [formData, setFormData] = useState({
        name: hotel.name,
        star: hotel.star,
        cena: hotel.cena,
        textsmall: hotel.textsmall,
    }); // Stan do przechowywania danych formularza

    if (!hotel) {
        // Obsługa, gdy hotel o podanym identyfikatorze nie został znaleziony
        return <div>Hotel not found</div>;
    }

    // Warunek sprawdzający, czy zalogowany użytkownik jest właścicielem hotelu
    const isOwner = user && user.email === hotel.owner;

    const handleEdit = () => {
        setEditable(true); // Ustawiamy edycję jako włączoną
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
          if (hotel) {
              // Uzyskaj referencję do dokumentu w bazie danych Firestore
              const hotelRef = doc(firestore, 'hotels', hotel.idd.toString());
  
              // Zaktualizuj pola dokumentu na podstawie danych z formularza
              await updateDoc(hotelRef, {
                  name: formData.name,
                  star: formData.star,
                  cena: formData.cena,
                  textsmall: formData.textsmall,
              });
              
              // Zakończ tryb edycji i zaktualizuj stan formularza
              setEditable(false);
          } else {
              console.error('Hotel not found');
          }
      } catch (error) {
          console.error('Error updating document:', error);
      }
  };

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
                    {isOwner && !editable && <button className="button primary" onClick={handleEdit}>Edit</button>} {/* Przycisk edycji dla właściciela */}
                </div>
                <article className="hero-details-widok">
                    <div className="dane">
                        <b>Location:</b> {editable ? <input type="text" name="name" value={formData.name} onChange={handleChange} /> : hotel.name}<br />
                        <b>Local category:</b> {editable ? <input type="text" name="star" value={formData.star} onChange={handleChange} /> : hotel.star}<br />
                        <b>Price:</b> {editable ? <input type="text" name="cena" value={formData.cena} onChange={handleChange} /> : hotel.cena}<br />
                        <b>Description</b>
                    </div>
                    <p className="text-middle">{editable ? <textarea name="textsmall" value={formData.textsmall} onChange={handleChange} /> : hotel.textsmall}</p>
                    <div>
                        <button className="button primary" id="openModal">Contact<img src={mail} alt="Mail" /></button>
                    </div>
                    <div className="hero-cards">
                        <div className="card-image-widok" style={backgroundStyle}></div>
                        <div className="card-image-widok" style={backgroundStyle}></div>
                    </div>
                    {editable && <button className="button primary" onClick={handleSubmit}>Save</button>} {/* Przycisk zapisywania zmian */}
                </article>
            </section>
            {/*<div id="modal" className="modal">
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
            </div>*/}
        </div>
    );
}

export default Hotel_page;
