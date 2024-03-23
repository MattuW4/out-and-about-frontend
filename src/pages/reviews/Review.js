import React from "react";
import styles from "../../styles/Event.module.css";
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
        review_id,

    } = props;

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
                        Reviews: {reviews_count}
                        Rating:
                        <Rating readonly initialValue={average_rating} size={25} />
                    </span>
                </Media>

            </Card.Body>

            <Card.Body>

                {review_id ? (
                    <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip>You've already reviewed this event</Tooltip>}
                    ><Button
                        className={`${btnStyles.Button} ${btnStyles.Form}`}
                        aria-label="submit-review"
                        // disabled={!review.trim()}
                        type="submit"
                    >
                            Leave a review
                        </Button>
                    </OverlayTrigger>
                ) : (
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