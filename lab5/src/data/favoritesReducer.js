// favoritesReducer.js
export const initialState = JSON.parse(localStorage.getItem('favorites')) || [];

export const favoritesReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_FAVORITE':
      const updatedAddState = [...state, action.payload];
      localStorage.setItem('favorites', JSON.stringify(updatedAddState));
      return updatedAddState;
    case 'REMOVE_FAVORITE':
      const updatedRemoveState = state.filter(hotel => hotel.id !== action.payload);
      localStorage.setItem('favorites', JSON.stringify(updatedRemoveState));
      return updatedRemoveState;
    default:
      return state;
  }
};
