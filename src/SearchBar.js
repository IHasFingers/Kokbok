import React, { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const SearchBar = () => {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const handleSearch = async (searchInput) => {
    if (searchInput.trim() === '') {
      setRecipes([]);
      return;
    }

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
        `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=4eea7cb447ec44139a6d8c9ed91581c7`
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
    <div>
      <input type="text" onChange={(event) => handleSearch(event.target.value)} />
      <h2>Recipe Cards</h2>
      {recipes.length > 0 ? (
        <div className="row">
          {recipes.map((recipe) => (
            <div key={recipe.id} className="col-md-4">
              <div className="card mb-3">
                <img src={recipe.image} className="card-img-top" alt={recipe.title} />
                <div className="card-body">
                  <h5 className="card-title">{recipe.title}</h5>
                  <Button variant="primary" onClick={() => handleOpenRecipeModal(recipe.id)}>
                    View Recipe
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No recipes found.</p>
      )}
      {selectedRecipe && (
        <Modal show={true} onHide={handleCloseRecipeModal}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedRecipe.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img src={selectedRecipe.image} alt={selectedRecipe.title} />
            <p>Additional information or description here.</p>
            <h5>Ingredients:</h5>
            <ul>
              {selectedRecipe.extendedIngredients.map((ingredient) => (
                <li key={ingredient.id}>{ingredient.original}</li>
              ))}
            </ul>
            <h5>Instructions:</h5>
            <ol>
              {selectedRecipe.analyzedInstructions[0].steps.map((step) => (
                <li key={step.number}>{step.step}</li>
              ))}
            </ol>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseRecipeModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default SearchBar;
