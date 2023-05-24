import React from 'react';

const RecipeCards = ({ recipes }) => {
  return (
    <div className="row">
      {Object.keys(recipes).map((key) => {
        const recipe = recipes[key];
        return (
          <div key={recipe.id} className="col-md-4">
            <div className="card mb-3">
              <img src={recipe.image} className="card-img-top" alt={recipe.title} />
              <div className="card-body">
                <h5 className="card-title">{recipe.title}</h5>
                <p className="card-text">Additional information or description here.</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RecipeCards;
