import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function RecipeModal({ recipe, onClose }) {
  return (
    <Modal show={recipe !== null} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{recipe && recipe.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {recipe && (
          <div>
            <img src={recipe.image} alt={recipe.title} />
            <p>Additional information or description here.</p>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={onClose}>
          Save Recipe
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default RecipeModal;
