import { useState } from "react";

import Form from "react-bootstrap/Form";

import btnStyles from "../../styles/Button.module.css";

import styles from "../../styles/EventCreateEditForm.module.css";
import { axiosRes } from "../../api/axiosDefaults";
import { Alert, Button, Col, Row } from "react-bootstrap";
import { Rating } from "react-simple-star-rating";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function ReviewCreateForm(props) {
    const {
        id,
        setEvents,
        setReviewComments,
    } = props;

    const [review, setReview] = useState("");
    const [rating, setRating] = useState(0);
    const [errors, setErrors] = useState({});
    const history = useHistory();

    const handleChange = (event) => {
        setReview(event.target.value);
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
            const { data } = await axiosRes.post("/reviews/", formData);
            setReviewComments((prevComments) => ({
                ...prevComments,
                results: [data, ...prevComments.results],
            }));
            setEvents((prevEvents) => ({
                ...prevEvents,
                results: prevEvents.results.map((event) => {
                    return event.id === id
                        ? { ...event, review_count: event.review_count + 1, average_rating: ((event.average_rating + rating) / event.review_count) }
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
        <Row>
            <Col className="py-2 mx-auto text-center" md={6}>
                <Form className="mt-2 text-center" onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Group>
                            <Rating onClick={handleRating} />
                        </Form.Group>
                        {errors?.rating?.map((message, idx) => (
                            <Alert variant="warning" key={idx}>
                                {message}
                            </Alert>
                        ))}
                        <Form.Control
                            className={styles.Form}
                            placeholder="Leave a review here..."
                            as="textarea"
                            value={review}
                            onChange={handleChange}
                            rows={2}
                        />
                    </Form.Group>
                    {errors?.review?.map((message, idx) => (
                        <Alert variant="warning" key={idx}>
                            {message}
                        </Alert>
                    ))}
                    <Button
                        className={`${btnStyles.Button} ${btnStyles.Form} btn d-block ml-auto`}
                        type="Submit"
                    >
                        submit
                    </Button>
                    {errors.non_field_errors?.map((message, idx) => (
                        <Alert variant="warning" className="mt-3" key={idx}>
                            {message}{" "}
                        </Alert>
                    ))}
                </Form>
            </Col>
        </Row>
    );
}

export default ReviewCreateForm;