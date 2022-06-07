import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import QualitiesTable from "../components/ui/qualitiesTable";

const QualitiesListPage = () => {
    const history = useHistory();

    const [qualities, setQualities] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get(
                    "http://localhost:4000/api/v1/quality",
                );
                setQualities(data.content);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    const handleEdit = (param) => {
        console.log(param);
        history.push(`/edit/${param}`);
    };
    const handleDelete = (param) => {
        console.log(param);
    };
    return (
        <>
            <h1>Qualitites List Page</h1>
            <QualitiesTable
                onDelete={handleDelete}
                onEdit={handleEdit}
                data={qualities}
            />
        </>
    );
};

export default QualitiesListPage;
