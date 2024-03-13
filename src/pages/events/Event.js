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
        comments_count,
        attending_count,
        attend_id,
        title,
        description,
        event_date,
        image,
        updated_at,
        eventPage,
        category,
        setEvents,

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

    const handleAttend = async () => {
        try {
            const { data } = await axiosRes.post("/attending/", { event: id });
            setEvents((prevEvents) => ({
                ...prevEvents,
                results: prevEvents.results.map((event) => {
                    return event.id === id
                        ? { ...event, attending_count: event.attending_count + 1, attend_id: data.id }
                        : event;
                }),
            }));
        } catch (err) {
            console.log(err);
        }
    };

    const handleUnAttend = async () => {
        try {
            await axiosRes.delete(`/attending/${attend_id}`);
            setEvents((prevEvents) => ({
                ...prevEvents,
                results: prevEvents.results.map((event) => {
                    return event.id === id
                        ? { ...event, attending_count: event.attending_count - 1, attend_id: null }
                        : event;
                }),
            }));
        } catch (err) {
            console.log(err);
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
                        <span>{updated_at}</span>
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
                <Card.Img src={image} alt={title} />
            </Link>
            <Card.Body>
                {title && <Card.Title className="text-center">{title}</Card.Title>}
                {event_date && <Card.Text> Date: {event_date}</Card.Text>}
                {category && <Card.Text>Category: {category}</Card.Text>}
                {description && <Card.Text>{description}</Card.Text>}
                <div className={styles.EventBar}>
                    {is_owner ? (
                        <OverlayTrigger placement="top" overlay={<Tooltip>You can't attend an event you created!</Tooltip>}>
                            <i className="fa-regular fa-circle-check" />
                        </OverlayTrigger>
                    ) : attend_id ? (
                        <span onClick={handleUnAttend}>
                            <i className={`fa-solid fa-circle-check ${styles.Going}`} />
                        </span>
                    ) : currentUser ? (
                        <span onClick={handleAttend}>
                            <i className={`fa-regular fa-circle-check ${styles.GoingOutline}`} />
                        </span>
                    ) : (
                        <OverlayTrigger placement='top' overlay={<Tooltip>Log in to confirm attendance!</Tooltip>}>
                            <i className="fa-regular fa-circle-check" />
                        </OverlayTrigger>
                    )}
                    {attending_count}
                    <Link to={`/events/${id}`}>
                        <i className="fa-regular fa-comments" />
                    </Link>
                    {comments_count}
                </div>
            </Card.Body>
        </Card>
    );
};

export default Event