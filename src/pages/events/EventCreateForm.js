// React
import { useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Alert from "react-bootstrap/Alert";
import { useHistory } from "react-router";
// Component
import Upload from "../../assets/upload.webp";
import Asset from "../../components/Asset";
import { useRedirect } from "../../hooks/useRedirect";
// CSS
import styles from "../../styles/EventCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
// Axios
import { axiosReq } from "../../api/axiosDefaults";

// Event create form
function EventCreateForm() {
    useRedirect('loggedOut');
    const [errors, setErrors] = useState({});

    const [eventData, setEventData] = useState({
        title: "",
        description: "",
        event_date: "",
        category: "",
        image: "",
    });

    const {
        title,
        description,
        event_date,
        category,
        image } = eventData;

    const imageInput = useRef(null);
    const history = useHistory();


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
        formData.append("image", imageInput.current.files[0]);

        try {
            const { data } = await axiosReq.post("/events/", formData);
            history.push(`/events/${data.id}`);
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
                    aria-label="Input for event title"
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
                    aria-label="Input for event description"
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
                    aria-label="Input for event date"
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
                    aria-label="Input for event category"
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
                className={`${btnStyles.Button} ${btnStyles.Purple}`}
                onClick={() => history.goBack()}
                aria-label="Button to cancel creation of an event"
            >
                Cancel
            </Button>
            <Button 
            className={`${btnStyles.Button} ${btnStyles.Purple}`} type="submit"
            aria-label="Button to create event"
            >
                Create
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
                            {image ? (
                                <>
                                    <figure>
                                        <Image 
                                        alt="Profile image"
                                        className={appStyles.Image} 
                                        src={image} rounded />
                                    </figure>
                                    <div>
                                        <Form.Label
                                            className={`${btnStyles.Button} ${btnStyles.Purple} btn`}
                                            htmlFor="image-upload"
                                            aria-label="Click here to change event poster"
                                        >
                                            Change the poster
                                        </Form.Label>

                                    </div>
                                </>
                            ) : (
                                <Form.Label
                                    className="d-flex justify-content-center"
                                    htmlFor="image-upload"
                                >
                                    <Asset src={Upload} message="Click or tap to upload an event poster" />
                                </Form.Label>
                            )}


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
        </Form >
    );
}

export default EventCreateForm;