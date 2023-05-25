import React, { useState } from 'react';
import SearchBar from './SearchBar';
import axios from 'axios';

function App() {
  const [recipes, setRecipes] = useState([]);

  const handleSearch = async (searchInput) => {
    try {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=4eea7cb447ec44139a6d8c9ed91581c7&query=${searchInput}`
      );
      const fetchedRecipes = response.data.results;
      setRecipes(fetchedRecipes);
    } catch (error) {
      console.error('Error fetching recipes:', error);
      setRecipes([]);
    }
  };

  return (
    <div>
      <h1>Recipe App</h1>
      <SearchBar onSearch={handleSearch} recipes={recipes} />
    </div>
  );
}

export default App;
