import React from 'react';
import RecipeModal from './RecipeModal';
// retunerar saker specifikt för homepage
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
        {/* renderar recept */}
      </div>
      {selectedRecipe && (
        <RecipeModal recipe={selectedRecipe} onClose={handleCloseRecipeModal} />
      )}
    </div>
  );
};

export default HomePage;
