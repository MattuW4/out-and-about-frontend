import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import logofav from "../assets/logofav.png";
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";
import {
    useCurrentUser,
    useSetCurrentUser
} from "../contexts/CurrentUserContext";
import Avatar from "./Avatar";
import axios from "axios";

const NavBar = () => {
    const currentUser = useCurrentUser();
    const setCurrentUser = useSetCurrentUser();

    const handleSignOut = async () => {
        try {
            await axios.post("dj-rest-auth/logout/");
            setCurrentUser(null);
        } catch (err) {
            console.log(err);
        }
    };

    const addEventIcon = (
        <NavLink
            className={styles.NavLink}
            activeClassName={styles.Active}
            to="/events/create"
        >
            <i className="fa-regular fa-calendar-plus"></i>Add event
        </NavLink>
    )

    const loggedInIcons = <>
        <NavLink
            className={styles.NavLink}
            activeClassName={styles.Active}
            to="/whatson"
        >
            <i className="fa-solid fa-magnifying-glass"></i>What's on?
        </NavLink>
        <NavLink
            className={styles.NavLink}
            activeClassName={styles.Active}
            to="/attending"
        >
            <i className="fa-solid fa-heart-circle-check"></i>Attending
        </NavLink>
        <NavLink
            className={styles.NavLink}
            to="/"
            onClick={handleSignOut}
        >
            <i className="fa-solid fa-person-through-window"></i>Sign out
        </NavLink>
        <NavLink
            className={styles.NavLink}
            to={`/profiles/${currentUser?.profile_id}`}
        >
            <Avatar src={currentUser?.profile_image} text="Profile" height={40} />
        </NavLink>

    </>
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
                {currentUser && addEventIcon}
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