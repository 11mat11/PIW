import React, { createContext, useReducer, useContext } from 'react'; // Dodaj import useContext
import { favoritesReducer, initialState } from './favoritesReducer';

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(favoritesReducer, initialState);

  return (
    <FavoritesContext.Provider value={{ state, dispatch }}>
      {children}
    </FavoritesContext.Provider>
  );
};
export const useFavorites = () => {
    return useContext(FavoritesContext);
};
