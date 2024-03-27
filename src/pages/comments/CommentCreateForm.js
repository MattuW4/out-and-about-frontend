import { useState } from "react";
import { Link } from "react-router-dom";

import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import InputGroup from "react-bootstrap/InputGroup";

import styles from "../../styles/CommentCreateEditForm.module.css";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";
import btnStyles from "../../styles/Button.module.css";


function CommentCreateForm(props) {
    const { event, setEvent, setComments, profileImage, profile_id } = props;
    const [content, setContent] = useState("");
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setContent(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axiosRes.post("/comments/", {
                content,
                event,
            });
            setComments((prevComments) => ({
                ...prevComments,
                results: [data, ...prevComments.results],
            }));
            setEvent((prevEvent) => ({
                results: [
                    {
                        ...prevEvent.results[0],
                        comments_count: prevEvent.results[0].comments_count + 1,
                    },
                ],
            }));
            setContent("");
        } catch (err) {
            if (err.response?.status !== 401) {
                setErrors(err.response?.data)
            }
        }
    };

    return (
        <Form className="mt-2" onSubmit={handleSubmit}>
            <Form.Group>
                <InputGroup>
                    <Link to={`/profiles/${profile_id}`}>
                        <Avatar src={profileImage} />
                    </Link>
                    <Form.Control
                        className={styles.Form}
                        placeholder="Write a comment..."
                        as="textarea"
                        value={content}
                        onChange={handleChange}
                        rows={2}
                    />
                </InputGroup>
            </Form.Group>
            {errors?.content?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                    {message}
                </Alert>
            ))}
            <button
                className={`${btnStyles.Button} ${btnStyles.Purple} btn d-block ml-auto`}
                disabled={!content.trim()}
                type="submit"
            >
                Submit
            </button>
        </Form>
    );
}

export default CommentCreateForm;