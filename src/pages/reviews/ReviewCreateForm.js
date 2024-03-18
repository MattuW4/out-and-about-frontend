import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";

import btnStyles from "../../styles/Button.module.css";

import { axiosRes } from "../../api/axiosDefaults";

import { Rating } from "react-simple-star-rating";
import { useRedirect } from "../../hooks/useRedirect";

function ReviewCreateForm(props) {
    useRedirect('loggedOut');

    const [errors, setErrors] = useState({});

    const [reviewData, setReviewData] = useState("");

    const [rating, setRating] = useState(0);

    const history = useHistory();

    const {
        id,
        showReviewModal,
        handleCloseCreateForm,
        setReviewComments,
        setEvents,
    } = props;

    const handleChange = (event) => {
        setReviewData(event.target.value);
    };

    const handleRating = (rate) => {
        setRating(rate / 20);

    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();


        formData.append("review", reviewData);
        formData.append("event", id);
        formData.append("rating", rating);

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
            setReviewData("");
            handleCloseCreateForm();
            history.push(`/reviews`);
        } catch (err) {
            console.log(err);
            if (err.response?.status !== 401) {
                setErrors(err.response?.data);
            }
        }
    };

    return (
        <Modal show={showReviewModal} onHide={handleCloseCreateForm}>
            <Modal.Header closeButton>
                <Modal.Title>Review this event</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col className="py-2 mx-auto text-center" md={6}>
                        <Form className="mt-2 text-center" onSubmit={handleSubmit}>
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
                                    as="textarea"
                                    rows={2}
                                    placeholder="Write your review"
                                    name="review"
                                    value={reviewData}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            {errors?.review?.map((message, idx) => (
                                <Alert variant="warning" key={idx}>
                                    {message}
                                </Alert>
                            ))}
                            <Button
                                className={`${btnStyles.Button} ${btnStyles.Review} btn d-block ml-auto`}
                                type="submit"
                            >
                                Post review
                            </Button>
                            {errors.non_field_errors?.map((message, idx) => (
                                <Alert variant="warning" className="mt-3" key={idx}>
                                    {message}{" "}
                                </Alert>
                            ))}
                        </Form>
                    </Col>
                </Row>
            </Modal.Body>
        </Modal>
    );
}

export default ReviewCreateForm;