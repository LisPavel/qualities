import React, { useContext, useEffect, useState } from "react";
import qualityService from "../services/qualityService";

const QualitiesContext = React.createContext();

export const QualitiesProvider = ({ children }) => {
    const [qualities, setQualities] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [, setError] = useState(null);

    useEffect(() => {
        const getQualities = async () => {
            try {
                const { content } = await qualityService.fetchAll();
                setQualities(content);
            } catch (error) {
                const { message } = error.response.data;
                setError(message);
            } finally {
                setIsLoading(false);
            }
        };
        getQualities();
    }, []);

    return (
        <QualitiesContext.Provider value={{ qualities, isLoading }}>
            {isLoading ? <h1>Qualities loading...</h1> : children}
        </QualitiesContext.Provider>
    );
};

export const useQualities = () => useContext(QualitiesContext);
