import React, { useEffect, useState } from "react";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import styles from "../../styles/EventsPage.module.css";
import { useLocation } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";

import NoResults from "../../assets/no-results.png";

import Event from "../events/Event";
import Review from "./Review";
import Asset from "../../components/Asset";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import PopularProfiles from "../profiles/PopularProfiles";


function ReviewsPage({ message, filter = "" }) {

    const [events, setEvents] = useState({ results: [] });
    const [hasLoaded, setHasLoaded] = useState(false);
    const { pathname } = useLocation();

    const [query, setQuery] = useState("");
    const [category, setCategory] = useState("");

    const current = new Date();
    const date = `${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()}`;

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const { data } = await axiosReq.get(`/events/?${filter}search=${query}&category=${category}&event_date__lte=${date}`);
                setEvents(data);
                setHasLoaded(true);
            } catch (err) {
                console.log(err);
            }
        };

        setHasLoaded(false);
        const timer = setTimeout(() => {
            fetchEvents();
        }, 500);

        return () => {
            clearTimeout(timer);
        };

    }, [filter, pathname, category, query, date]);

    return (
        <Row className="h-100">
            <Col className="py-2 p-0 p-lg-2" lg={8}>
                <PopularProfiles mobile />
                <i className={`fa-solid fa-binoculars ${styles.SearchIcon}`} />
                <Form
                    className={styles.SearchBar}
                    onSubmit={(event) => event.preventDefault()}
                >
                    <Form.Control
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        type="text"
                        className="mr-sm-2"
                        placeholder="Search events"
                    />

                    <Form.Control
                        size="sm"
                        as="select"
                        placeholder="Search by category"
                        value={category}
                        onChange={(event) => setCategory(event.target.value)}
                    >
                        <option key="blankChoice" hidden value>
                            {" "}
                            Search by category{" "}
                        </option>
                        <option>Music</option>
                        <option>Electronic</option>
                        <option>Garage</option>
                        <option>House</option>
                        <option>DnB</option>
                        <option>Hip-Hop</option>
                        <option>Live-band</option>
                        <option>Soul/funk</option>
                    </Form.Control>
                </Form>


                {hasLoaded ? (
                    <>
                        {events.results.length ? (
                            <InfiniteScroll
                                children={
                                    events.results.map((event) => (
                                        <Review key={event.id} {...event} setEvents={setEvents} />
                                    ))
                                }
                                dataLength={events.results.length}
                                loader={<Asset />}
                                hasMore={!!events.next}
                                next={() => fetchMoreData(events, setEvents)}
                            />

                        ) : (
                            <Container className={appStyles.Content}>
                                <Asset src={NoResults} message={message} />
                            </Container>
                        )}
                    </>
                ) : (
                    <Container className={appStyles.Content}>
                        <Asset spinner />
                    </Container>
                )}
            </Col>
            <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
                <PopularProfiles />
            </Col>
        </Row>
    );
}

export default ReviewsPage;