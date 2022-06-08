import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import qualityService from "../services/qualityService";

const QualitiesContext = React.createContext();

export const QualitiesProvider = ({ children }) => {
    const [qualities, setQualities] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getQualities = async () => {
            try {
                const { content } = await qualityService.fetchAll();
                setQualities(content);
            } catch (error) {
                errorCatcher(error);
            } finally {
                setIsLoading(false);
            }
        };
        getQualities();
    }, []);

    useEffect(() => {
        if (error != null) {
            toast.error(error);
            setError(null);
        }
    }, [error]);

    const getQuality = (id) => {
        return qualities.find((q) => q._id === id);
    };

    const updateQuality = async ({ _id: id, ...data }) => {
        try {
            const { content } = await qualityService.update(id, data);
            setQualities((prevState) =>
                prevState.map((item) => (item._id === id ? content : item)),
            );

            return content;
        } catch (error) {
            errorCatcher(error);
        }
    };

    const addQuality = async (data) => {
        try {
            const { content } = await qualityService.create(data);
            setQualities((prevState) => [...prevState, content]);

            return content;
        } catch (error) {
            errorCatcher(error);
        }
    };

    const deleteQuality = async (id) => {
        try {
            const { content } = await qualityService.delete(id);
            setQualities((prevState) =>
                prevState.filter((q) => q._id !== content._id),
            );
            return content;
        } catch (error) {
            errorCatcher(error);
        }
    };

    function errorCatcher(error) {
        const { message } = error.response.data;
        setError(message);
    }

    return (
        <QualitiesContext.Provider
            value={{
                qualities,
                isLoading,
                getQuality,
                updateQuality,
                addQuality,
                deleteQuality,
            }}
        >
            {isLoading ? <h1>Qualities loading...</h1> : children}
        </QualitiesContext.Provider>
    );
};

export const useQualities = () => useContext(QualitiesContext);
