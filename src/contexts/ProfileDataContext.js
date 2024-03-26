import { createContext, useContext, useEffect, useState } from "react";
import { useCurrentUser } from "./CurrentUserContext";
import { axiosReq, axiosRes } from "../api/axiosDefaults";
import { subscribeHelper, unsubscribeHelper } from "../utils/utils";

export const ProfileDataContext = createContext();
export const SetProfileDataContext = createContext();

export const useProfileData = () => useContext(ProfileDataContext);
export const useSetProfileData = () => useContext(SetProfileDataContext);

export const ProfileDataProvider = ({ children }) => {
    const [profileData, setProfileData] = useState({

        pageProfile: { results: [] },
        popularProfiles: { results: [] },
    });

    const currentUser = useCurrentUser();

    const handleSubscribe = async (clickedProfile) => {
        try {
            const { data } = await axiosRes.post("/subscribers/", {
                subscribed: clickedProfile.id,
            });

            setProfileData((prevState) => ({
                ...prevState,
                pageProfile: {
                    results: prevState.pageProfile.results.map((profile) =>
                        subscribeHelper(profile, clickedProfile, data.id)
                    ),
                },
                popularProfiles: {
                    ...prevState.popularProfiles,
                    results: prevState.popularProfiles.results.map((profile) =>
                        subscribeHelper(profile, clickedProfile, data.id)
                    ),
                },
            }));
        } catch (err) {
        }
    };

    const handleUnsubscribe = async (clickedProfile) => {
        try {
            axiosRes.delete(`/subscribers/${clickedProfile.subscribing_id}/`);
            setProfileData((prevState) => ({
                ...prevState,
                pageProfile: {
                    results: prevState.pageProfile.results.map((profile) =>
                        unsubscribeHelper(profile, clickedProfile)
                    ),
                },
                popularProfiles: {
                    ...prevState.popularProfiles,
                    results: prevState.popularProfiles.results.map((profile) =>
                        unsubscribeHelper(profile, clickedProfile)
                    ),
                },
            }));
        } catch (err) {
        }
    };

    useEffect(() => {
        const handleMount = async () => {
            try {
                const { data } = await axiosReq.get(
                    "/profiles/?ordering=-subscribers_count"
                );
                setProfileData((prevState) => ({
                    ...prevState,
                    popularProfiles: data,
                }));
            } catch (err) {
            }
        };
        handleMount();
    }, [currentUser]);

    return (
        <ProfileDataContext.Provider value={profileData}>
            <SetProfileDataContext.Provider value={{ setProfileData, handleSubscribe, handleUnsubscribe }}>
                {children}
            </SetProfileDataContext.Provider>
        </ProfileDataContext.Provider>
    );
};

