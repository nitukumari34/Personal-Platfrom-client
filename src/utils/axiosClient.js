import axios from "axios";
import {
    getItem,
    KEY_ACCESS_TOKEN,
    removeItem,
    setItem,
} from "./localStorage";

export const axiosClient = axios.create({
    baseURL: "http://localhost:5003",

    withCredentials: true,
});


axiosClient.interceptors.request.use((request) => {
    const accessToken = getItem(KEY_ACCESS_TOKEN);
    request.headers["Authorization"] = `Bearer ${accessToken}`;
    return request;
});


axiosClient.interceptors.response.use(async (response) => {
    const data = response.data;
    if (data.status === "ok") {
        return data;
    }

    const originalRequest = response.config;
    const statusCode = data.statusCode;
    const error = data.error;

    if (

        statusCode === 401 &&
        originalRequest.url === "http://localhost:5003/auth/refresh"
    ) {
        removeItem(KEY_ACCESS_TOKEN);
        window.location.replace("/login", "_self");
        return Promise.reject(error);
    }

    if (statusCode === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        const response = await axiosClient.create({
            withCredentials: true,
        }).get("/auth/refresh");

        if (response.data.status === "ok") {
            setItem(KEY_ACCESS_TOKEN, response.data.result.accessToken);
            originalRequest.headers[
                "Authorization"
            ] = `Bearer ${response.data.result.accessToken}`

            return axios(originalRequest);

        }
        // else {
        //     removeItem(KEY_ACCESS_TOKEN);
        //     window.location.replace("/login", "_self");
        //     return Promise.reject(error);
        // }

    }

    return Promise.reject(error);
});




