import { async } from "@firebase/util";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

export const seriesContext = React.createContext();

export const SeriesListProvider = ({ children }) => {
    const [series, setSeries] = useState([]);
    const [changeList, setChangeList] = useState(1);
    // api_key=6faa5e90a21586090d2be6f3b012f543
    const url = `https://api.themoviedb.org/3/tv/popular?api_key=6faa5e90a21586090d2be6f3b012f543&language=pt-BR&page=${changeList}`;

    useEffect(() => {
        const getDataApi = async () => {

            await fetch(url)
                .then(response => response.json())
                .then(data => setSeries(data.results))
        }
        getDataApi();
 
    }, [changeList])

    console.log(series);
    console.log(url)

    return (
        <seriesContext.Provider value={{series, setSeries, changeList, setChangeList}}>
            {children}
        </seriesContext.Provider>
    )
}

export const UseSeriesContext = () => React.useContext(seriesContext); 