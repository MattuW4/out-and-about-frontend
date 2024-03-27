import jwtDecode from "jwt-decode";
import { axiosReq } from "../api/axiosDefaults";

export const fetchMoreData = async (resource, setResource) => {
    try {
        const { data } = await axiosReq.get(resource.next);
        setResource((prevResource) => ({
            ...prevResource,
            next: data.next,
            results: data.results.reduce((acc, cur) => {
                return acc.some((accResult) => accResult.id === cur.id)
                    ? acc
                    : [...acc, cur];
            }, prevResource.results),
        }));
    } catch (err) {
        // continue regardless of error
    }
};

export const subscribeHelper = (profile, clickedProfile, subscribing_id) => {
    return profile.id === clickedProfile.id
        ? // This is the profile I clicked on,
        // update its subsrciber count and set its subscribing id
        {
            ...profile,
            subscribers_count: profile.subscribers_count + 1,
            subscribing_id,
        }
        : profile.is_owner
            ? // This is the profile of the logged in user
            // update its subscribing count
            { ...profile, subscribing_count: profile.subscribing_count + 1 }
            : // this is not the profile the user clicked on or the profile
            // the user owns, so just return it unchanged
            profile;
};

export const unsubscribeHelper = (profile, clickedProfile) => {
    return profile.id === clickedProfile.id
        ? {
            ...profile,
            subscribers_count: profile.subscribers_count - 1,
            subscribing_id: null,
        }
        : profile.is_owner
            ? { ...profile, subscribing_count: profile.subscribing_count - 1 }
            : profile;
}

export const setTokenTimestamp = (data) => {
    const refreshTokenTimestamp = jwtDecode(data?.refresh_token).exp;
    localStorage.setItem("refreshTokenTimestamp", refreshTokenTimestamp);
};

export const shouldRefreshToken = () => {
    return !!localStorage.getItem("refreshTokenTimestamp");
};

export const removeTokenTimestamp = () => {
    localStorage.removeItem("refreshTokenTimestamp");
};