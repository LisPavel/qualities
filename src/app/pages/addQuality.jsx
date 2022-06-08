import React from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import QualityForm from "../components/ui/qualityForm";
import { useQualities } from "../hooks/useQualities";
const AddQualityPage = () => {
    const { addQuality } = useQualities();
    const history = useHistory();
    const handleSubmit = (data) => {
        addQuality(data).then((data) => {
            if (data) history.push("/");
        });
    };
    return (
        <>
            <h1>Add Quality</h1>
            <QualityForm onSubmit={handleSubmit} />
        </>
    );
};

export default AddQualityPage;
