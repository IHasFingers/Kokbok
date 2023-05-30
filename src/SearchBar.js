import React, { useState , useEffect} from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './style.css'

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
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=9f3b681f5b444fa4b78b471f5f1bc70d&query=${searchInput}`
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
  
  const handleSaveRecipe = () => {
    if (selectedRecipe) {
      const savedRecipes = JSON.parse(localStorage.getItem('savedRecipes')) || [];
      savedRecipes.push(selectedRecipe);
      localStorage.setItem('savedRecipes', JSON.stringify(savedRecipes));
    }
  };

  useEffect(() => {
    const savedRecipes = JSON.parse(localStorage.getItem('savedRecipes')) || [];
    if (savedRecipes.length > 0) {
      setSelectedRecipe(savedRecipes[savedRecipes.length - 1]);
    }
  }, []);

  return (
    <div>
      <input className='search-bar-container' type="text" placeholder='Sök efter recept eller ingredienser...' onChange={(event) => handleSearch(event.target.value)} />
      <h2>Recept</h2>
      {recipes.length > 0 ? (
        <div className="row">
          {recipes.map((recipe) => (
            <div key={recipe.id} className="col-md-4">
              <div className="card mb-3">
                <img src={recipe.image} className="card-img-top" alt={recipe.title} />
                <div className="card-body">
                  <h5 className="card-title">{recipe.title}</h5>
                  <Button variant="primary" onClick={() => handleOpenRecipeModal(recipe.id)}>
                    Se recept
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Inga recept funna!</p>
      )}
      {selectedRecipe && (
        <Modal show={true} onHide={handleCloseRecipeModal}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedRecipe.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img src={selectedRecipe.image} alt={selectedRecipe.title} />
            <p>Receptet:</p>
            <h5>Ingredienser:</h5>
            <ul>
              {selectedRecipe.extendedIngredients.map((ingredient) => (
                <li key={ingredient.id}>{ingredient.original}</li>
              ))}
            </ul>
            <h5>Instruktioner:</h5>
            <ol>
              {selectedRecipe.analyzedInstructions[0].steps.map((step) => (
                <li key={step.number}>{step.step}</li>
              ))}
            </ol>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseRecipeModal}>
              Stängggg
            </Button>
            <Button variant="primary" onClick={handleSaveRecipe}>
              Spara recept
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default SearchBar;
