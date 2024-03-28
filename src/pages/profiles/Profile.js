import styles from "../../styles/Profile.module.css";
import btnStyles from "../../styles/Button.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import Button from "react-bootstrap/Button";
import { useSetProfileData } from "../../contexts/ProfileDataContext";

const Profile = (props) => {
    const { profile, mobile, imageSize = 55 } = props;
    const { id, subscribing_id, image, owner } = profile;

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;

    const { handleSubscribe, handleUnsubscribe } = useSetProfileData();

    return (
        <div
            className={`my-3 d-flex align-items-center ${mobile && "flex-column"}`}
        >
            <div>
                <Link
                    className="align-self-center"
                    to={`/profiles/${id}`}
                    aria-label="Navigate to user profile"
                >
                    <Avatar
                        alt="Profile image"
                        src={image}
                        height={imageSize}
                    />
                </Link>
            </div>
            <div className={`mx-2 ${styles.WordBreak}`}>
                <strong>{owner}</strong>
            </div>
            <div className={`text-right ${!mobile && "ml-auto"}`}>
                {!mobile &&
                    currentUser &&
                    !is_owner &&
                    (subscribing_id ? (
                        <Button
                            className={`${btnStyles.Button} ${btnStyles.BlackOutline}`}
                            onClick={() => handleUnsubscribe(profile)}
                            aria-label="Button to unsubscribe from a user profile"
                        >
                            Unsubscribe
                        </Button>
                    ) : (
                        <Button
                            className={`${btnStyles.Button} ${btnStyles.Black}`}
                            onClick={() => handleSubscribe(profile)}
                            aria-label="Button to subscribe to a user profile"
                        >
                            Subscribe
                        </Button>
                    ))}
            </div>
        </div>
    );
};

export default Profile;