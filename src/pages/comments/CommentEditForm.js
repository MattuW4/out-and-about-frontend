// React
import { useState } from "react";
import Form from "react-bootstrap/Form";
// Axios
import { axiosRes } from "../../api/axiosDefaults";
// CSS
import styles from "../../styles/CommentCreateEditForm.module.css";
import btnStyles from "../../styles/Button.module.css";

// Comment edit form
function CommentEditForm(props) {
    const { id, content, setShowEditForm, setComments } = props;

    const [formContent, setFormContent] = useState(content);

    const handleChange = (event) => {
        setFormContent(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axiosRes.put(`/comments/${id}/`, {
                content: formContent.trim(),
            });
            setComments((prevComments) => ({
                ...prevComments,
                results: prevComments.results.map((comment) => {
                    return comment.id === id
                        ? {
                            ...comment,
                            content: formContent.trim(),
                            updated_at: "now",
                        }
                        : comment;
                }),
            }));
            setShowEditForm(false);
        } catch (err) {
            // continue regardless of error
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="pr-1">
                <Form.Control
                    className={styles.Form}
                    as="textarea"
                    value={formContent}
                    onChange={handleChange}
                    rows={2}
                />
            </Form.Group>
            <div className="text-right">
                <button
                    className={`${btnStyles.Button} ${btnStyles.Purple}`}
                    onClick={() => setShowEditForm(false)}
                    type="button"
                    aria-label="Button to cancel comment edit form"
                >
                    Cancel
                </button>
                <button
                    className={`${btnStyles.Button} ${btnStyles.Purple}`}
                    type="submit"
                    aria-label="Button to save edit to comment form"
                >
                    Save
                </button>
            </div>
        </Form>
    );
}

export default CommentEditForm;