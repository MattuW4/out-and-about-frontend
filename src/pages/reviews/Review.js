import React from "react";
import styles from "../../styles/Event.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Link, useHistory } from "react-router-dom";
import { Button, Card, Media, OverlayTrigger, Tooltip } from "react-bootstrap";
import Avatar from "../../components/Avatar";
import btnStyles from "../../styles/Button.module.css";
import { Rating } from "react-simple-star-rating";

const Event = (props) => {
    const {
        id,
        owner,
        profile_id,
        profile_image,
        title,
        event_date,
        average_rating,
        reviews_count,

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
                    <Link to={`/events/${id}`}>
                        {title && <Card.Title className="text-center">{title}</Card.Title>}
                        {event_date && <Card.Text> Date: {event_date}</Card.Text>}
                    </Link>
                    <span className={`${styles.Title}`}>
                        Number of reviews: {reviews_count}
                        Rating:
                        <Rating readonly initialValue={average_rating} size={25} />
                    </span>
                </Media>

            </Card.Body>

            <Card.Body>

                {!is_owner && (
                    <Button
                        className={btnStyles.Button}
                        onClick={() => history.push(`/reviews/${id}/create`)}
                        aria-label="create-review"
                    >
                        Leave a review
                    </Button>
                )}

                <Button
                    className={btnStyles.Button}
                    onClick={() => history.push(`/reviews/${id}`)}
                    aria-label="view-reviews"
                >
                    Read the reviews
                </Button>


            </Card.Body>
            <Card.Body>

            </Card.Body>


        </Card>
    );
};

export default Event