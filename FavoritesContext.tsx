import React, { createContext, useContext, useState } from 'react';
import { recipes } from '../data/recipes';

const FavoritesContext = createContext<any>(null);

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(
    recipes.reduce((acc, r) => ({ ...acc, [r.id]: r.isFavorite }), {})
  );

  const toggleFavorite = (id) => {
    setFavorites(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const isFavorite = (id) => !!favorites[id];

  const favoriteRecipes = recipes.filter(r => favorites[r.id]);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite, favoriteRecipes }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}