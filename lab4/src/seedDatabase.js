import { firestore } from './firebase.js';
import { collection, addDoc, getDocs } from 'firebase/firestore';

const Hotel = [
  { id: 1, name: "Florence", like: 'heart2', textmiddle: "Harmony Hideaway Hotel", star: "★★★★★", cena: "100€/room", textsmall: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dapibus quis felis a venenatis. Suspendisse accumsan aliquam lorem, sit amet ultricies justo tristique nec." },
  { id: 2, name: "Madrid", like: 'heart1', textmiddle: "Serene Retreat", star: "★★★★☆", cena: "70€/room", textsmall: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dapibus quis felis a venenatis. Suspendisse accumsan aliquam lorem, sit amet ultricies justo tristique nec." },
  { id: 3, name: "Sintra", like: 'heart1', textmiddle: "Palm Springs", star: "★★★★☆", cena: "65€/room", textsmall: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dapibus quis felis a venenatis. Suspendisse accumsan aliquam lorem, sit amet ultricies justo tristique nec." },
  { id: 4, name: "Sienna", like: 'heart1', textmiddle: "Oasis Resort", star: "★★★★★", cena: "115€/room", textsmall: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dapibus quis felis a venenatis. Suspendisse accumsan aliquam lorem, sit amet ultricies justo tristique nec." },
];

const uploadData = async () => {
  const hotelCollection = collection(firestore, 'hotels');
  try {
    for (const hotel of Hotel) {
      await addDoc(hotelCollection, hotel);
    }
    console.log('Data uploaded successfully!');
  } catch (error) {
    console.error('Error uploading data:', error);
  }
};

const fetchData = async () => {
  const hotelCollection = collection(firestore, 'hotels');
  try {
    const hotelSnapshot = await getDocs(hotelCollection);
    const hotelList = hotelSnapshot.docs.map(doc => doc.data());
    console.log(hotelList);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

// Execute the functions
uploadData().then(() => {
  fetchData();
});
