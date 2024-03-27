import { useState } from "react";

import Form from "react-bootstrap/Form";
import Button  from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

import styles from "../../styles/CommentCreateEditForm.module.css";
import { axiosRes } from "../../api/axiosDefaults";
import { Rating } from "react-simple-star-rating";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";

import btnStyles from "../../styles/Button.module.css";

function ReviewCreateForm(props) {
    const {
        event,
        setEvent,
        setReviews,
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
            if (err.response?.status !== 401) {
                setErrors(err.response?.data);
            }
        }
    };

    return (
        <Form className="mt-2" onSubmit={handleSubmit}>



            <Form.Group>
                <Form.Label>Use the stars to rate your experience:</Form.Label>
                <Rating onClick={handleRating} />
            </Form.Group>
            {errors?.rating?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                    {message}
                </Alert>
            ))}
            <Form.Group>
                <Form.Label>Write your review below:</Form.Label>
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



            <Button
                className={`${btnStyles.Button} ${btnStyles.Purple} ${btnStyles.Form}`}
                aria-label="submit-review"
                type="submit"
            >
                Leave a review
            </Button>
        </Form>
    );
}

export default ReviewCreateForm;