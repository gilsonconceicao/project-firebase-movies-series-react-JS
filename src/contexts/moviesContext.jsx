import { async } from "@firebase/util";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

export const moviesContext = React.createContext();

export const MovieListProvider = ({ children }) => {
    const [movies, setMovies] = useState([]);
    const [changeList, setChangeList] = useState(1);

    // api_key=6faa5e90a21586090d2be6f3b012f543
    const urlMovie = `https://api.themoviedb.org/3/movie/popular?api_key=6faa5e90a21586090d2be6f3b012f543&language=pt-BR&page=${changeList}`;

    useEffect(() => {
        const getDataApi = async () => {

            await fetch(urlMovie)
                .then(response => response.json())
                .then(data => setMovies(data.results))
        }
        getDataApi();
 
    }, [changeList])
    console.log(movies)

    return (
        <moviesContext.Provider value={{movies, setChangeList, changeList}}>
            {children}
        </moviesContext.Provider>
    )
}

export const UseMoviesContext = () => React.useContext(moviesContext); 