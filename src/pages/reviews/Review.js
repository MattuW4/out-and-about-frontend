import React from "react";
import styles from "../../styles/Event.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Link, useHistory } from "react-router-dom";
import {
    Card,
    Media,
    OverlayTrigger,
    Tooltip,
    Button
}
    from "react-bootstrap";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";
import { MoreDropdown } from "../../components/MoreDropdown";

const Review = (props) => {
    const {
        id,
        owner,
        profile_id,
        profile_image,
        comments_count,
        attending_count,
        attend_id,
        title,
        description,
        event_date,
        image,
        updated_at,
        eventPage,
        category,
        setEvents,

    } = props;

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;
    const history = useHistory();

    return (
        <Card className={styles.Event}>
            <Card.Body>
                <Media className="align-items-center justify-content-between">
                    <Link to={`/profiles/${profile_id}`}>
                        <Avatar src={profile_image} height={55} />
                        {owner}
                    </Link>
                </Media>
            </Card.Body>
            <Card.Body>
                {title && <Card.Title className="text-center">{title}</Card.Title>}
                {event_date && <Card.Text> Date: {event_date}</Card.Text>}
                {category && <Card.Text>Category: {category}</Card.Text>}

            </Card.Body>
            <Button
                to="/reviews/:id/create/"
                type="submit"
            >
                Create Review
            </Button>
        </Card>
    );
};

export default Review;