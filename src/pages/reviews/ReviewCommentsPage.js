import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";

import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Card, Media } from "react-bootstrap";
import styles from "../../styles/Comment.module.css";
import { Rating } from "react-simple-star-rating";
import InfiniteScroll from "react-infinite-scroll-component";
import Asset from "../../components/Asset";
import { fetchMoreData } from "../../utils/utils";

function ReviewCommentsPage(props) {
    const { id } = useParams();
    const [event, setEvent] = useState({ results: [] });

    const currentUser = useCurrentUser();
    const [reviews, setReviews] = useState({ results: [] });

    useEffect(() => {
        const handleMount = async () => {
            try {
                const [{ data: event }, { data: reviews }] = await Promise.all([
                    axiosReq.get(`/events/${id}`),
                    axiosReq.get(`/reviews/?event=${id}`)
                ]);
                setEvent({ results: [event] });
                setReviews(reviews);
                console.log(event);
            } catch (err) {

                console.log(err);
            }
        };

        handleMount();
    }, [currentUser, id]);

    return (
        <>
            <Card className={styles.Event}>
                <Card.Body>
                    <Media>
                        <Media.Body className="align-self-center ml-2">
                            <Row className="h-100">
                                <Col className="py-2 p-0 p-lg-2" >
                                    {reviews.results.length ? (
                                        <InfiniteScroll
                                            children={reviews.results.map((review) => (
                                                <p key={review.id} className="text-center">
                                                    <Col m={6}>
                                                        <span className={styles.Owner}>{review.owner}'s review:</span>
                                                    </Col>
                                                    <Col m={6}>
                                                        <span className={styles.Date}>{review.review}</span>
                                                    </Col>
                                                    <Col m={6}>
                                                        <span className={styles.Date}>Rating: <Rating readonly initialValue={review.rating} size={25} /></span>
                                                    </Col>
                                                    <Col m={6}>
                                                        <span className={styles.Date}>{review.created_at}</span>
                                                    </Col>
                                                    <hr />
                                                </p>
                                            ))}
                                            dataLength={reviews.results.length}
                                            loader={<Asset spinner />}
                                            hasMore={!!reviews.next}
                                            next={() => fetchMoreData(reviews, setReviews)}
                                        />
                                    ) : currentUser ? (
                                        <span>No reviews yet, be the first to review!</span>
                                    ) : (
                                        <span>No reviews...yet!</span>
                                    )}
                                </Col>
                            </Row>
                        </Media.Body>
                    </Media>
                </Card.Body>
            </Card>
        </>
    );
};

export default ReviewCommentsPage;