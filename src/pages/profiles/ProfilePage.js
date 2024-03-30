// React
import { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
// Component
import Asset from "../../components/Asset";
import PopularProfiles from "./PopularProfiles";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { fetchMoreData } from "../../utils/utils";
import Event from "../events/Event";
import InfiniteScroll from "react-infinite-scroll-component";
import NoResults from "../../assets/no-results.webp";
import { useProfileData, useSetProfileData } from "../../contexts/ProfileDataContext";
import { ProfileEditDropdown } from "../../components/MoreDropdown";
// CSS
import styles from "../../styles/ProfilePage.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
// Axios
import { axiosReq } from "../../api/axiosDefaults";

function ProfilePage() {
    const [hasLoaded, setHasLoaded] = useState(false);
    const [profileEvents, setProfileEvents] = useState({ results: [] });

    const currentUser = useCurrentUser();
    const { id } = useParams();
    const { setProfileData, handleSubscribe, handleUnsubscribe } = useSetProfileData();
    const { pageProfile } = useProfileData();
    const [profile] = pageProfile.results;
    const is_owner = currentUser?.username === profile?.owner;

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
                // continue regardless of error
            }
        };
        fetchData();
    }, [id, setProfileData]);

    const mainProfile = (
        <>
            {profile?.is_owner && <ProfileEditDropdown id={profile?.id} />}
            <Row noGutters className="px-3 text-center">
                <Col lg={3} className="text-lg-left">
                    <Image
                        className={styles.ProfileImage}
                        roundedCircle
                        src={profile?.image}
                        aria-label="User profile image"
                        alt="Profile image"
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
            </Row>

            <Row className="justify-content-center no-gutters my-3">
                <div className="text-align-center">
                    {currentUser &&
                        !is_owner &&
                        (profile?.subscribing_id ? (
                            <Button
                                className={`${btnStyles.Button} ${btnStyles.Purple}`}
                                onClick={() => handleUnsubscribe(profile)}
                                aria-label="Button to unsubscribe from a user profile"
                            >
                                Unsubcribe
                            </Button>
                        ) : (
                            <Button
                                className={`${btnStyles.Button} ${btnStyles.Purple}`}
                                onClick={() => handleSubscribe(profile)}
                                aria-label="Button to subscribe to a user profile"
                            >
                                Subscribe
                            </Button>
                        ))}
                </div>
            </Row>

            <Row className="justify-content-center no-gutters my-3">
                <div>
                    {profile?.content && <Col className="p-3">Bio: {profile.content}</Col>}
                </div>
            </Row>
        </>
    );

    const mainProfileEvents = (
        <>
            <hr />
            <p className="text-center">{profile?.owner}&apos;s events</p>
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