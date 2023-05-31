import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Navigation() {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">Kokbok</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/saved-recipes">Sparade Recept</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Navigation;
