import React from 'react'
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';

function Header() {
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Link to='/all'>
                        <li>All</li>
                    </Link>
                    <Link to='/shortlisted'>
                        <li>Shortlisted</li>
                    </Link>

                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Header;
