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
                        
                        {is_owner && eventPage && (
                            <MoreDropdown
                                handleEdit={handleEdit}
                                handleDelete={handleDelete}
                            />
                        )}
                    </div>
                </Media>
            </Card.Body>
            <Card.Body>
                {title && <Card.Title className="text-center">{title}</Card.Title>}
                {event_date && <Card.Text> Date: {event_date}</Card.Text>}
                
            </Card.Body>
        </Card>
    );
};

export default Event