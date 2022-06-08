import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import QualitiesTable from "../components/ui/qualitiesTable";
import httpService from "../services/httpService";

const QualitiesListPage = () => {
    const history = useHistory();

    const [qualities, setQualities] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await httpService.get("quality");
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
