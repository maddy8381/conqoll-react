
import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom';

function Header() {
    return (
        <Navbar bg="dark" expand="md" variant="dark">
            <Navbar.Brand href="#home">
                Conquoll
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link as={Link} to="/all">All</Nav.Link>
                    <Nav.Link as={Link} to="/shortlisted">Shortlisted</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Header;
