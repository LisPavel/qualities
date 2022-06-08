import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import EditForm from "../components/ui/editForm";
import qualityService from "../services/qualityService";

const EditQualityPage = () => {
    const { id } = useParams();
    const [quality, setQuality] = useState(null);
    const getQuality = async (id) => {
        try {
            const data = await qualityService.get(id);
            console.log(data);
            return data;
        } catch (error) {
            const { message } = error.response.data;
            toast.error(message);
        }
    };
    const updateQuality = async (id, content) => {
        try {
            const data = await qualityService.update(id, content);
            return data;
        } catch (error) {
            const { message } = error.response.data;
            toast.error(message);
        }
    };

    useEffect(() => {
        getQuality(id).then((data) => setQuality(data.content));
    }, []);

    const handleSubmit = async (data) => {
        updateQuality(id, data);
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
