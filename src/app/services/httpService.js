import axios from "axios";
import * as Sentry from "@sentry/react";

axios.interceptors.response.use(
    (res) => res,
    function (error) {
        const expectedError =
            error.response &&
            error.response.status >= 400 &&
            error.response.status < 500;
        if (!expectedError) {
            console.log("unexpected");
            Sentry.captureException(error);
        }
        return Promise.reject(error);
    },
);

const httpService = {
    get: axios.get,
    put: axios.put,
    post: axios.post,
    delete: axios.delete,
};

export default httpService;
