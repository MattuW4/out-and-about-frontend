import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import logofav from "../assets/logofav.png";

const NavBar = () => {
    return (
        <Navbar bg="light" expand="md" fixed="top">
            <Container>
                <Navbar.Brand>
                    <img src={logofav} alt="logo" height="95" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto text-left">
                        <Nav.Link>
                            <i class="fa-brands fa-space-awesome"></i>Home
                        </Nav.Link>
                        <Nav.Link>
                            <i class="fa-solid fa-arrow-right-to-bracket"></i>Sign in
                        </Nav.Link>
                        <Nav.Link>
                            <i class="fa-solid fa-user-pen"></i>Sign up
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar