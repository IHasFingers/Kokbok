import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Navigation() {
  return (
    <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Kokbok</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Receptdatabasen</Nav.Link>
            <Nav.Link href="#features">Sparade Recept</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
  );
}

export default Navigation;