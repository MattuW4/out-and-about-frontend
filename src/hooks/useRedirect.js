import axios from "axios";
import { useEffect } from "react";
import { useHistory } from "react-router";

// Redirects user to homepage depending on authentication status
export const useRedirect = (userAuthStatus) => {
    const history = useHistory();

    useEffect(() => {
        const handleMount = async () => {
            try {
                await axios.post("/dj-rest-auth/token/refresh/");
                // if user is logged in, the code below runs
                if (userAuthStatus === "loggedIn") {
                    history.push("/");
                }
            } catch (err) {
                // if user is not logged in, the code below runs
                if (userAuthStatus === "loggedOut") {
                    history.push("/");
                }
            }
        };

        handleMount();
    }, [history, userAuthStatus]);
};