import { useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import { useHistory } from "react-router-dom";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import { axiosReq } from "../../api/axiosDefaults";
import { useRedirect } from "../../hooks/useRedirect";

const ContactCreateForm = () => {
    useRedirect("loggedOut");
    const [errors, setErrors] = useState({});

    const [contactData, setContactData] = useState({
        message: "",
    });
    const { message } = contactData;

    const history = useHistory();

    const handleChange = (event) => {
        setContactData({
            ...contactData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();

        formData.append("message", message);

        try {
            await axiosReq.post("/contacts/", formData);
            history.goBack();
        } catch (err) {
            if (err.response?.status !== 401) {
                setErrors(err.response?.data);
            }
        }
    };

    const textFields = (
        <div className="text-center">

            <Form.Group>
                <Form.Label>Use this form to send the site admin a message if you are having any issues or want to provide feedback</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={5}
                    name="message"
                    placeholder="Type your message here"
                    value={message}
                    onChange={handleChange}
                />
            </Form.Group>
            {errors?.message?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                    {message}
                </Alert>
            ))}

            <Button 
            className={`${btnStyles.Button} ${btnStyles.Purple}`} onClick={() => history.goBack()}
            aria-label="Button to cancel creation of a contact message for admin"
            >
                Cancel
            </Button>
            <Button 
            className={`${btnStyles.Button} ${btnStyles.Purple} ${btnStyles.Form}`} type="submit"
            aria-label="Button to send contact message to admin"
            >
                Send message
            </Button>
            
        </div>
    );

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Container className={appStyles.Content}>{textFields}</Container>
            </Form>
        </Container>
    );
};

export default ContactCreateForm;