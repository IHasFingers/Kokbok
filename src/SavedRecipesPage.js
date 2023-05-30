import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './style.css'

const SavedRecipesPage = () => {
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  // Retrieve saved recipes from local storage
  const savedRecipes = JSON.parse(localStorage.getItem('savedRecipes')) || [];

  const handleOpenRecipeModal = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleCloseRecipeModal = () => {
    setSelectedRecipe(null);
  };

  const handleDeleteRecipe = (index) => {
    const updatedRecipes = [...savedRecipes];
    updatedRecipes.splice(index, 1);
    localStorage.setItem('savedRecipes', JSON.stringify(updatedRecipes));
    // Refresh the component after deleting the recipe
    window.location.reload();
  };

  return (
    <div className="container">
      <h1>Sparade recept</h1>
      {savedRecipes.length > 0 ? (
        <div className="row">
          {savedRecipes.map((recipe, index) => (
            <div key={index} className="col-md-4 mb-4">
              <Card>
                <Card.Img variant="top" src={recipe.image} alt={recipe.title} />
                <Card.Body>
                  <Card.Title class="name">{recipe.title}</Card.Title>
                  <div className='d-grid gap-2'>
                  <Button variant="primary" size="lg" onClick={() => handleOpenRecipeModal(recipe)}>
                    Öppna
                  </Button>
                  </div>
                  <div className='d-grid gap-2'>
                  <Button variant="danger" size="lg" onClick={() => handleDeleteRecipe(index)}>
                    Ta bort
                  </Button>
                  </div>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      ) : (
        <p>Inga recept hittade</p>
      )}

      {selectedRecipe && selectedRecipe.extendedIngredients && selectedRecipe.analyzedInstructions && (
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
            <Button variant="danger" onClick={handleCloseRecipeModal}>
              Stäng
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default SavedRecipesPage;
