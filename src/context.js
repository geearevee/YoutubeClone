import { createContext, useState } from "react";

export const appContext = createContext()

const ContextProvider = ({ children }) => {
    const [history, setHistory] = useState([]);
    const [favourites, setFavourites] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("New");

    const value = {
        history, setHistory,
        selectedCategory, setSelectedCategory,
        favourites, setFavourites
    }
    return (
        <appContext.Provider value={value}>
            {children}
        </appContext.Provider>
    )
}

export default ContextProvider;

