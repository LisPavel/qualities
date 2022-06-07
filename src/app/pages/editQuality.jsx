import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import EditForm from "../components/ui/editForm";

axios.interceptors.response.use(
    (res) => res,
    function (error) {
        const expectedError =
            error.response &&
            error.response.status >= 400 &&
            error.response.status < 500;
        if (!expectedError) {
            console.log("unexpected");
        }
        return Promise.reject(error);
    },
);

const EditQualityPage = () => {
    const { id } = useParams();
    const [quality, setQuality] = useState(null);
    const qualityEndPoint = `http://localhost:4000/api/v1/quality/${id}`;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get(qualityEndPoint);
                setQuality(data.content);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    const handleSubmit = async (data) => {
        try {
            await axios.put(qualityEndPoint, data);
            // .then((res) => console.log(res.data.content));
        } catch (error) {
            //  else {
            console.log("expected");
            // }
        }
    };

    return (
        <>
            <h1>Edit Quality Page</h1>{" "}
            {quality != null ? (
                <EditForm data={quality} onSubmit={handleSubmit} />
            ) : (
                "Loading..."
            )}
        </>
    );
};

export default EditQualityPage;
