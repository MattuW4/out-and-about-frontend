import React from "react";
import styles from "../../styles/Event.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Link, useHistory } from "react-router-dom";
import { Card, Media, OverlayTrigger, Tooltip } from "react-bootstrap";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";
import { MoreDropdown } from "../../components/MoreDropdown";

const Event = (props) => {
    const {
        id,
        owner,
        profile_id,
        profile_image,
        review,
        title,
        event_date,
        eventPage,

    } = props;

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;
    const history = useHistory();

    const handleEdit = async () => {
        history.push(`/events/${id}/edit`)
    };

    const handleDelete = async () => {
        try {
            await axiosRes.delete(`/events/${id}/`);
            history.goBack();

        } catch (err) {
            console.log(err)
        }
    };


    return (
        <Card className={styles.Event}>
            <Card.Body>
                <Media className="align-items-center justify-content-between">
                    <Link to={`/profiles/${profile_id}`}>
                        <Avatar src={profile_image} height={55} />
                        {owner}
                    </Link>
                    <div className="d=flex align-items-center">

                        {is_owner && eventPage && (
                            <MoreDropdown
                                handleEdit={handleEdit}
                                handleDelete={handleDelete}
                            />
                        )}
                    </div>
                </Media>
            </Card.Body>
            <Link to={`/events/${id}`}>
                <Card.Body>
                    {title && <Card.Title className="text-center">{title}</Card.Title>}
                    {event_date && <Card.Text> Date: {event_date}</Card.Text>}
                    <p>
                        Review:
                        {review}
                    </p>

                </Card.Body>
            </Link>

        </Card>
    );
};

export default Event