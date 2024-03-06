import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import logofav from "../assets/logofav.png";
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";
import { useCurrentUser } from "../contexts/CurrentUserContext";

const NavBar = () => {
    const currentUser = useCurrentUser();

    const loggedInIcons = <>{currentUser?.username}</>
    const loggedOutIcons = (<>
        <NavLink
            className={styles.NavLink}
            activeClassName={styles.Active}
            to="/signin"
        >
            <i className="fa-solid fa-arrow-right-to-bracket"></i>Sign in
        </NavLink>
        <NavLink
            className={styles.NavLink}
            activeClassName={styles.Active}
            to="/signup"
        >
            <i className="fa-solid fa-user-pen"></i>Sign up
        </NavLink>
    </>
    );

    return (
        <Navbar className={styles.NavBar} bg="light" expand="md" fixed="top">
            <Container>
                <NavLink to="/">
                    <Navbar.Brand>
                        <img src={logofav} alt="logo" height="95" />
                    </Navbar.Brand>
                </NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto text-left">
                        <NavLink
                            exact
                            className={styles.NavLink}
                            activeClassName={styles.Active}
                            to="/"
                        >
                            <i className="fa-brands fa-space-awesome"></i>Home
                        </NavLink>
                        {currentUser ? loggedInIcons : loggedOutIcons}

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar