import fetchHotels from './fetchHotels.js';

// IIFE to fetch data and export it
let Hotel = [];

const initializeHotels = async () => {
  Hotel = await fetchHotels();
};

await initializeHotels();

export default Hotel;
