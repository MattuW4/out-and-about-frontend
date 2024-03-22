import React, { useState } from "react";

import Form from "react-bootstrap/Form";

import styles from "../../styles/CommentCreateEditForm.module.css";
import { axiosRes } from "../../api/axiosDefaults";
import { Rating } from "react-simple-star-rating";
import { useRedirect } from "../../hooks/useRedirect";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Alert, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import btnStyles from "../../styles/Button.module.css";

function ReviewCreateForm(props) {
    useRedirect("loggedOut");
    const {
        event,
        setEvent,
        setReviews,
        is_owner,
        review_id,
    } = props;

    const { id } = useParams();

    const [review, setReview] = useState("");
    const [rating, setRating] = useState(0);
    const [errors, setErrors] = useState({});
    const history = useHistory();

    const handleChange = (e) => {
        setReview(e.target.value);
    };

    const handleRating = (rate) => {
        setRating(rate / 20);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("event", id);
        formData.append("rating", rating);
        formData.append("review", review);

        try {
            const { data } = await axiosRes.post("/reviews/", formData, {
                review,
                event,
            });
            history.goBack();
            setReviews((prevReviews) => ({
                ...prevReviews,
                results: [data, ...prevReviews.results],
            }));
            setEvent((prevEvent) => ({
                ...prevEvent,
                results: prevEvent.results.map((event) => {
                    return event.id === id
                        ? {
                            ...event,
                            reviews_count: event.reviews_count + 1,
                            average_rating: ((event.average_rating + rating) / event.review_count)
                        }
                        : event;
                }),
            }));
            setReview("");
            history.push(`/reviews`);
        } catch (err) {
            console.log(err);
            if (err.response?.status !== 401) {
                setErrors(err.response?.data);
            }
        }
    };

    return (
        <Form className="mt-2" onSubmit={handleSubmit}>

            

            <Form.Group>
                <Rating onClick={handleRating} />
            </Form.Group>
            {errors?.rating?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                    {message}
                </Alert>
            ))}
            <Form.Group>
                <Form.Label>Review</Form.Label>
                <Form.Control
                    className={styles.Form}
                    placeholder="my review..."
                    as="textarea"
                    value={review}
                    onChange={handleChange}
                    rows={4}
                />
            </Form.Group>
            {errors?.review?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                    {message}
                </Alert>
            ))}

            {!is_owner ? (
                <OverlayTrigger
                    placement="top"
                    overlay={
                        <Tooltip>Sorry, you can't review your own event!</Tooltip>
                    }
                >
                    <Button
                        className={`${btnStyles.Button} ${btnStyles.Form}`}
                        aria-label="submit-review"
                        disabled={!review.trim()}
                        type="submit"
                    >
                        Submit review
                    </Button>
                </OverlayTrigger>
            ) : review_id ? (
                <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip>You've already reviewed this event</Tooltip>}
                ><Button
                    className={`${btnStyles.Button} ${btnStyles.Form}`}
                    aria-label="submit-review"
                    disabled={!review.trim()}
                    type="submit"
                >
                        Submit review
                    </Button>
                </OverlayTrigger>
            ) : (

                <Button
                    className={`${btnStyles.Button} $${btnStyles.Form}`}
                    aria-label="submit-review"
                    disabled={!review.trim()}
                    type="submit"
                >
                    Submit review
                </Button>
            )}
        </Form>
    );
};

export default ReviewCreateForm;