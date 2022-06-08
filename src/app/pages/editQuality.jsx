import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import EditForm from "../components/ui/editForm";
import httpService from "../services/httpService";

const EditQualityPage = () => {
    const { id } = useParams();
    const [quality, setQuality] = useState(null);
    const qualityEndPoint = `http://localhost:4000/api/v1/quality/${id}`;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await httpService.get(qualityEndPoint);
                setQuality(data.content);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    const handleSubmit = async (data) => {
        try {
            await httpService.put(qualityEndPoint, data);
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
