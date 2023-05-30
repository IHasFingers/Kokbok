import React, { useState } from 'react';
import SearchBar from './SearchBar';
import axios from 'axios';
import RecipeModal from './RecipeModal';
import Navbar from './Navbar'
import './style.css'

function App() {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

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

  const handleOpenRecipeModal = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleCloseRecipeModal = () => {
    setSelectedRecipe(null);
  };

  return (
    <div>
      <Navbar />
  
      <div className="container">
        <h1>Receptdatabasen</h1>
        <SearchBar onSearch={handleSearch} recipes={recipes} onOpenRecipeModal={handleOpenRecipeModal} />
        {selectedRecipe && <RecipeModal recipe={selectedRecipe} onClose={handleCloseRecipeModal} />}
      </div>
    </div>
  );
}

export default App;
