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
            <p>Följande nedan kommer receptet. Vill du spara den klickar du på Spara recept</p>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Stäng
        </Button>
        <Button variant="primary" onClick={onClose}>
          Spara recept
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default RecipeModal;
