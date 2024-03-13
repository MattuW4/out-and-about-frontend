import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import Asset from "../../components/Asset";

import styles from "../../styles/ProfilePage.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";

import PopularProfiles from "./PopularProfiles";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useProfileData, useSetProfileData } from "../../contexts/ProfileDataContext";
import { axiosReq } from "../../api/axiosDefaults";
import { Button, Image } from "react-bootstrap";
import { fetchMoreData } from "../../utils/utils";
import Event from "../events/Event";
import InfiniteScroll from "react-infinite-scroll-component";
import NoResults from "../../assets/no-results.png";

function ProfilePage() {
    const [hasLoaded, setHasLoaded] = useState(false);
    const [profileEvents, setProfileEvents] = useState({ results: [] });

    const currentUser = useCurrentUser();
    const { id } = useParams();
    const setProfileData = useSetProfileData();
    const { pageProfile } = useProfileData();
    const [profile] = pageProfile.results;
    const is_owner = currentUser?.username;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [{ data: pageProfile }, { data: profileEvents }] =
                    await Promise.all([
                        axiosReq.get(`/profiles/${id}/`),
                        axiosReq.get(`/events/?owner__profile=${id}`),
                    ]);
                setProfileData((prevState) => ({
                    ...prevState,
                    pageProfile: { results: [pageProfile] },
                }));
                setProfileEvents(profileEvents);
                setHasLoaded(true);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, [id, setProfileData]);

    const mainProfile = (
        <>
            <Row noGutters className="px-3 text-center">
                <Col lg={3} className="text-lg-left">
                    <Image
                        className={styles.ProfileImage}
                        roundedCircle
                        src={profile?.image}
                    />
                </Col>
                <Col lg={6}>
                    <h3 className="m-2">{profile?.owner}</h3>
                    <Row className="justify-content-center bo-gutters">
                        <Col xs={4} className="my-2">
                            <div>{profile?.events_count}</div>
                            <div>events</div>
                        </Col>
                        <Col xs={4} className="my-2">
                            <div>{profile?.subscribers_count}</div>
                            <div>subscribers</div>
                        </Col>
                        <Col xs={4} className="my-2">
                            <div>{profile?.subscribing_count}</div>
                            <div>subscribing</div>
                        </Col>
                    </Row>
                </Col>
                <Col lg={3} className="text-lg-right">
                    {currentUser &&
                        !is_owner &&
                        (profile?.subscribing_id ? (
                            <Button
                                className={`${btnStyles.Button} ${btnStyles.BlackOutline}`}
                                onClick={() => { }}
                            >
                                unsubcribe
                            </Button>
                        ) : (
                            <Button
                                className={`${btnStyles.Button} ${btnStyles.Black}`}
                                onClick={() => { }}
                            >
                                subscribe
                            </Button>
                        ))}
                </Col>
                {profile?.content && <Col className="p-3">{profile.content}</Col>}
            </Row>
        </>
    );

    const mainProfileEvents = (
        <>
            <hr />
            <p className="text-center">{profile?.owner}'s events</p>
            <hr />
            {profileEvents.results.length ? (
                <InfiniteScroll
                    children={profileEvents.results.map((event) => (
                        <Event key={event.id} {...event} setEvents={setProfileEvents} />
                    ))}
                    dataLength={profileEvents.results.length}
                    loader={<Asset spinner />}
                    hasMore={!!profileEvents.next}
                    next={() => fetchMoreData(profileEvents, setProfileEvents)}
                />
            ) : (
                <Asset
                    src={NoResults}
                    message={`No results found, ${profile?.owner} hasn't created an event yet.`}
                />
            )}
        </>
    );

    return (
        <Row>
            <Col className="py-2 p-0 p-lg-2" lg={8}>
                <PopularProfiles mobile />
                <Container className={appStyles.Content}>
                    {hasLoaded ? (
                        <>
                            {mainProfile}
                            {mainProfileEvents}
                        </>
                    ) : (
                        <Asset spinner />
                    )}
                </Container>
            </Col>
            <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
                <PopularProfiles />
            </Col>
        </Row>
    );
}

export default ProfilePage;