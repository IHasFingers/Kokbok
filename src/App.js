import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import SearchBar from './SearchBar';
import RecipeModal from './RecipeModal';
import HomePage from './HomePage';
import SavedRecipesPage from './SavedRecipesPage';

function App() {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(
          `https://api.spoonacular.com/recipes/complexSearch?apiKey=4eea7cb447ec44139a6d8c9ed91581c7`
        );
        const fetchedRecipes = response.data.results;
        setRecipes(fetchedRecipes);
      } catch (error) {
        console.error('Error fetching recipes:', error);
        setRecipes([]);
      }
    };

    fetchRecipes();
  }, []);

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

  const handleOpenRecipeModal = async (recipeId) => {
    try {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=9f3b681f5b444fa4b78b471f5f1bc70d`
      );
      const fullRecipe = response.data;
      setSelectedRecipe(fullRecipe);
    } catch (error) {
      console.error('Error fetching recipe details:', error);
      setSelectedRecipe(null);
    }
  };

  const handleCloseRecipeModal = () => {
    setSelectedRecipe(null);
  };

  return (
    <Router>
      <div>
        <Navbar />
        <div className="container">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <HomePage
                    recipes={recipes}
                    handleOpenRecipeModal={handleOpenRecipeModal}
                    handleCloseRecipeModal={handleCloseRecipeModal}
                  />
                  <SearchBar onSearch={handleSearch} />
                </>
              }
            />
            <Route
              path="/saved-recipes"
              element={<SavedRecipesPage />}
            />
          </Routes>
          {selectedRecipe && (
            <RecipeModal
              recipe={selectedRecipe}
              onClose={handleCloseRecipeModal}
            />
          )}
        </div>
      </div>
    </Router>
  );
}

export default App;
