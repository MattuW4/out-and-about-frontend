import React from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import logofav from "../assets/logofav.png";
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";
import {
    useCurrentUser,
    useSetCurrentUser
} from "../contexts/CurrentUserContext";
import Avatar from "./Avatar";
import axios from "axios";
import { useClickOutsideToggle } from "../hooks/useClickOutsideToggle";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const NavBar = () => {
    const currentUser = useCurrentUser();
    const setCurrentUser = useSetCurrentUser();

    const { expanded, setExpanded, ref } = useClickOutsideToggle();

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

    const loggedInIcons = (
        <>
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
                activeClassName={styles.Active}
                to="/reviews"
            >
                <i className="fa-solid fa-star"></i>Reviews
            </NavLink>

            <NavDropdown
                id={styles.dropDownMenu}
                onClick={() => setExpanded(!expanded)}
                title={
                    <span>
                        <i className="fa-solid fa-bars"></i>
                    </span>
                }
            >

                <NavDropdown.Item
                    id={styles.dropdownItem}
                    as={Link}
                    className={styles.NavLink}
                    to={`/profiles/${currentUser?.profile_id}`}
                    onClick={() => setExpanded(!expanded)}
                >
                    <Avatar src={currentUser?.profile_image} text="Profile" height={40} />
                </NavDropdown.Item>
                <NavDropdown.Item
                    id={styles.dropdownItem}
                    as={Link}
                    className={styles.NavLink}
                    to="/contact/create/"
                    onClick={() => setExpanded(!expanded)}
                >
                    <i className="fa-solid fa-phone-volume"></i>Contact
                </NavDropdown.Item>
                <NavDropdown.Item
                    id={styles.dropdownItem}
                    as={Link}
                    className={styles.NavLink}
                    to="/"
                    onClick={handleSignOut}
                >
                    <i className="fa-solid fa-person-through-window"></i>Sign out
                </NavDropdown.Item>
            </NavDropdown>

            {/* <NavLink
            className={styles.NavLink}
            to="/"
            onClick={handleSignOut}
        >
            <i className="fa-solid fa-person-through-window"></i>Sign out
        </NavLink> */}
            {/* <NavLink
            className={styles.NavLink}
            activeClassName={styles.Active}
            to="/contact/create/"
        >
            <i className="fa-solid fa-phone-volume"></i>Contact
        </NavLink> */}
            {/* <NavLink
            className={styles.NavLink}
            to={`/profiles/${currentUser?.profile_id}`}
        >
            <Avatar src={currentUser?.profile_image} text="Profile" height={40} />
        </NavLink> */}

        </>
    );
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
        <Navbar expanded={expanded} className={styles.NavBar} bg="light" expand="md" fixed="top">
            <Container>
                <NavLink to="/">
                    <Navbar.Brand>
                        <img src={logofav} alt="logo" height="95" />
                    </Navbar.Brand>
                </NavLink>
                {currentUser && addEventIcon}
                <Navbar.Toggle
                    ref={ref}
                    onClick={() => setExpanded(!expanded)}
                    aria-controls="basic-navbar-nav"
                />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto text-left">
                        <NavLink
                            exact
                            className={styles.NavLink}
                            activeClassName={styles.Active}
                            to="/"
                            onClick={() => setExpanded(!expanded)}
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