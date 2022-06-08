import React, { useContext } from "react";

const QualitiesContext = React.createContext();
const data = { _id: "tst", name: "tst" };

export const QualitiesProvider = ({ children }) => (
    <QualitiesContext.Provider value={data}>
        {children}
    </QualitiesContext.Provider>
);
export const useQualities = () => useContext(QualitiesContext);
