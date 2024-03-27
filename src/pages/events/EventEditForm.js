import { useEffect, useRef, useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Image from "react-bootstrap/Image";

import styles from "../../styles/Event.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";

import { useHistory, useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";

function EventEditForm() {
    const [errors, setErrors] = useState({});

    const [eventData, setEventData] = useState({
        title: "",
        description: "",
        event_date: "",
        category: "",
        image: "",
    });
    const { title,
        description,
        event_date,
        category,
        image } = eventData;

    const imageInput = useRef(null);
    const history = useHistory();
    const { id } = useParams();

    useEffect(() => {
        const handleMount = async () => {
            try {
                const { data } = await axiosReq.get(`/events/${id}/`);
                const { title, description, image, event_date, category, is_owner } = data;

                is_owner ? setEventData({ title, description, image, event_date, category, }) : history.push("/");
            } catch (err) {
                // continue regardless of error
            }
        };

        handleMount();
    }, [history, id]);

    const handleChange = (event) => {
        setEventData({
            ...eventData,
            [event.target.name]: event.target.value,
        });
    };

    const handleChangeImage = (event) => {
        if (event.target.files.length) {
            URL.revokeObjectURL(image);
            setEventData({
                ...eventData,
                image: URL.createObjectURL(event.target.files[0]),
            });
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();

        formData.append("title", title);
        formData.append("description", description);
        formData.append("event_date", event_date);
        formData.append("category", category);

        if (imageInput?.current?.files[0]) {
            formData.append("image", imageInput.current.files[0]);
        }

        try {
            await axiosReq.put(`/events/${id}/`, formData);
            history.push(`/events/${id}`);
        } catch (err) {
            if (err.response?.status !== 401) {
                setErrors(err.response?.data);
            }
        }
    };

    const textFields = (
        <div className="text-center">
            <Form.Group>
                <Form.Label>Event Title</Form.Label>
                <Form.Control
                    type="text"
                    name="title"
                    value={title}
                    onChange={handleChange}
                />
            </Form.Group>
            {errors?.title?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                    {message}
                </Alert>
            ))}

            <Form.Group>
                <Form.Label>Event Description</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={4}
                    name="description"
                    value={description}
                    onChange={handleChange}
                />
            </Form.Group>
            {errors?.description?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                    {message}
                </Alert>
            ))}

            <Form.Group>
                <Form.Label>Event Date</Form.Label>
                <Form.Control
                    type="date"
                    name="event_date"
                    value={event_date}
                    onChange={handleChange}
                />
            </Form.Group>
            {errors?.event_date?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                    {message}
                </Alert>
            ))}

            <Form.Group controlId="category">
                <Form.Label>Event Category</Form.Label>
                <Form.Control
                    as="select"
                    name="category"
                    value={category}
                    onChange={handleChange}
                >
                    <option>Music</option>
                    <option>Electronic</option>
                    <option>Garage</option>
                    <option>House</option>
                    <option>DnB</option>
                    <option>Hip-Hop</option>
                    <option>Live-band</option>
                    <option>Soul/funk</option>
                </Form.Control>
            </Form.Group>
            {errors?.category?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                    {message}
                </Alert>
            ))}

            <Button
                className={`${btnStyles.Button} ${btnStyles.Blue}`}
                onClick={() => history.goBack()}
            >
                cancel
            </Button>
            <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} type="submit">
                save
            </Button>
        </div>
    );

    return (
        <Form onSubmit={handleSubmit}>
            <Row>
                <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
                    <Container
                        className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
                    >
                        <Form.Group className="text-center">
                            <figure>
                                <Image className={appStyles.Image} src={image} rounded />
                            </figure>
                            <div>
                                <Form.Label
                                    className={`${btnStyles.Button} ${btnStyles.Blue} btn`}
                                    htmlFor="image-upload"
                                >
                                    Change the event poster
                                </Form.Label>
                            </div>

                            <Form.File
                                id="image-upload"
                                accept="image/*"
                                onChange={handleChangeImage}
                                ref={imageInput}
                            />
                        </Form.Group>
                        {errors?.image?.map((message, idx) => (
                            <Alert variant="warning" key={idx}>
                                {message}
                            </Alert>
                        ))}

                        <div className="d-md-none">{textFields}</div>
                    </Container>
                </Col>
                <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2">
                    <Container className={appStyles.Content}>{textFields}</Container>
                </Col>
            </Row>
        </Form>
    );
}

export default EventEditForm;