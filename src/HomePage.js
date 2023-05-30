import React from 'react';
import RecipeModal from './RecipeModal';

const HomePage = ({
  recipes,
  selectedRecipe,
  handleOpenRecipeModal,
  handleCloseRecipeModal
}) => {
  return (
    <div>
      <div className="container">
        <h1>Receptdatabasen</h1>
        {/* Render the recipes or any other content specific to the home page */}
      </div>
      {selectedRecipe && (
        <RecipeModal recipe={selectedRecipe} onClose={handleCloseRecipeModal} />
      )}
    </div>
  );
};

export default HomePage;
