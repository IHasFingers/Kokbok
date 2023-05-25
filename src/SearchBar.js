import React, { useState } from 'react';
import axios from 'axios';

const SearchBar = () => {
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
                  <p className="card-text">Additional information or description here.</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No recipes found.</p>
      )}
    </div>
  );
};

export default SearchBar;
