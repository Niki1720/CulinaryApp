import { createContext, useState, useContext } from "react";

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
    const initialIsAdmin = localStorage.getItem('isAdmin') === 'true';
    const [isAdmin, setIsAdmin] = useState(initialIsAdmin);

    const setAdmin = (value) => {
        setIsAdmin(value);
        localStorage.setItem('isAdmin', value ? 'true' : 'false');
    };

    return (
        <AdminContext.Provider value={{ isAdmin, setAdmin }}>
            {children}
        </AdminContext.Provider>
    );
};

export const useAdmin = () => {
    const context = useContext(AdminContext);
    if (context === undefined) {
        throw new Error("useAdmin must be used within an AdminProvider");
    }
    return context;
};