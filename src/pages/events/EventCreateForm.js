import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";

import Upload from "../../assets/upload.png";

import styles from "../../styles/EventCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import Asset from "../../components/Asset";

function EventCreateForm() {
    const [errors, setErrors] = useState({});

    const [eventData, setEventData] = useState({
        title: '',
        description: '',
        event_date: '',
        category: '',
        image: '',
    });

    const { title, description, event_date, category, image } = eventData;


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
            <Form.Group>
                <Form.Label>Event Date</Form.Label>
                <Form.Control
                    type="date"
                    name="event_date"
                    value={event_date}
                    onChange={handleChange}
                />
            </Form.Group>
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



            <Button
                className={`${btnStyles.Button} ${btnStyles.Blue}`}
                onClick={() => { }}
            >
                cancel
            </Button>
            <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} type="submit">
                create
            </Button>
        </div>
    );

    return (
        <Form>
            <Row>
                <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
                    <Container
                        className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
                    >
                        <Form.Group className="text-center">
                            {image ? (
                                <>
                                    <figure>
                                        <Image className={appStyles.Image} src={image} rounded />
                                    </figure>
                                    <div>
                                        <Form.Label
                                            className={`${btnStyles.Button} ${btnStyles.Blue} btn`}
                                            htmlFor="image-upload"
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
                            />

                        </Form.Group>
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