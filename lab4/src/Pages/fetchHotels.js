import { firestore } from '../firebaseConfig.js';
import { collection, getDocs } from 'firebase/firestore';

// Function to fetch data from Firestore
const fetchHotels = async () => {
  const hotelCollection = collection(firestore, 'hotels');
  try {
    const hotelSnapshot = await getDocs(hotelCollection);
    const hotelList = hotelSnapshot.docs.map(doc => ({
      idd: doc.id,  // Use Firestore document ID as the hotel ID
      ...doc.data()  // Spread the document data
    }));
    return hotelList;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

export default fetchHotels;
