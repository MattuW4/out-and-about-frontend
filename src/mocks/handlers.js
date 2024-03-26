import { rest } from "msw";

const baseURL = "https://oaa-app-2b3d894f937e.herokuapp.com/"

export const handlers = [
    rest.get(`${baseURL}dj-rest-auth/user/`, (req, res, ctx) => {
        return res(
            ctx.json({
                "pk": 11,
                "username": "Mike",
                "email": "",
                "first_name": "",
                "last_name": "",
                "profile_id": 11,
                "profile_image": "https://res.cloudinary.com/deoxxigyw/image/upload/v1/media/../default_profile_gfyvrr"
            })
        );
    }),
    rest.event(`${baseURL}dj-rest-auth/user/logout/`, (req, res, ctx) => {
        return res(ctx.status(200));
    })
];