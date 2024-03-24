import React, { useState } from "react";
import { Navbar, Container, Nav, NavDropdown, Modal, Button } from "react-bootstrap";
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

const NavBar = (props) => {
    const currentUser = useCurrentUser();
    const setCurrentUser = useSetCurrentUser();

    const handleClose = () => setShow(false);
    const [show, setShow] = useState(true);

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
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={show}
            backdrop="static"
            keyboard={false}
            onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title className="align-items-center justify-content-between">
                    <img src={logofav} alt="logo" height="95" />
                    <br />
                    Welcome to Out & About
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                We are a social platform for music and cultural events in your area and beyond.
                You can see an overview of whats on without being a member but to be able to 
                create events, subscribe to other users, leave comments, review past events 
                and much more you need to sign up
                <Link
                    className={styles.NavLink}
                    activeClassName={styles.Active}
                    to="/signup"
                >
                    <i className="fa-solid fa-user-pen"></i>
                </Link>
                <br />
                If you are already part of the community, sign in
                <Link
                    className={styles.NavLink}
                    activeClassName={styles.Active}
                    to="/signin"
                >
                    <i className="fa-solid fa-arrow-right-to-bracket"></i>
                </Link>
                <br />
                This information only appears on the homepage when you first visit us so if you
                want to see it again just refresh the page!
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>

            </Modal.Footer>
        </Modal>
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