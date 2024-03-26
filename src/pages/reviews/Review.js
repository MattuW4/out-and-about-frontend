import React from "react";
import styles from "../../styles/Event.module.css";
import { Link, useHistory } from "react-router-dom";
import { Button, Card, Col, Media, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import Avatar from "../../components/Avatar";
import btnStyles from "../../styles/Button.module.css";
import { Rating } from "react-simple-star-rating";
import DateFormatUtil from "../../utils/DateFormatUtil";

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
                <Row className="h-100">
                    <Col className="py-2 p-0 p-lg-2" >
                        <Media className="align-items-center space-between">
                            <Col m={2}>
                                <Link to={`/profiles/${profile_id}`}>
                                    <Avatar src={profile_image} height={55} />
                                    {owner}
                                </Link>
                            </Col>
                            <Col m={4}>
                                <Link to={`/events/${id}`}>
                                    {title && <Card.Title className="text-center">{title}</Card.Title>}
                                </Link>

                            </Col>
                            <div>



                                <Col m={4}>
                                    <span>
                                        {event_date && <Card.Text> Date: <DateFormatUtil event_date={event_date}/></Card.Text>}
                                    </span>
                                </Col>

                                <Col m={4}>
                                    <span className={`${styles.Title}`}>
                                        Reviews: {reviews_count}
                                    </span>
                                </Col>
                                <Col m={4}>
                                    <span>
                                        Rating:
                                        <Rating readonly initialValue={average_rating} size={25} />
                                    </span>
                                </Col>
                            </div>
                        </Media>
                    </Col>
                </Row>
            </Card.Body>

            <Card.Body>
                {review_id ? (
                    <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip>You've already reviewed this event</Tooltip>}
                    ><Button
                        className={`${btnStyles.Button} ${btnStyles.Form}`}
                        aria-label="submit-review"
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

        </Card >
    );
};

export default Event