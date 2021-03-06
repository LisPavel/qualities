import React from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import QualityForm from "../components/ui/qualityForm";
import { useQualities } from "../hooks/useQualities";

const EditQualityPage = () => {
    const { id } = useParams();
    const { getQuality, updateQuality } = useQualities();
    const quality = getQuality(id);
    const history = useHistory();

    const handleSubmit = async (data) => {
        updateQuality(data).then((data) => {
            if (data) history.push("/");
        });
    };

    return (
        <>
            <h1>Edit Quality Page</h1>{" "}
            <QualityForm data={quality} onSubmit={handleSubmit} />
        </>
    );
};

export default EditQualityPage;
