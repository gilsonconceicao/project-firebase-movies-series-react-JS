import React from 'react'
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom'
import {AiOutlineHeart} from 'react-icons/ai'; 
import {MdArrowBackIos} from 'react-icons/md'
import styles from '../series/SeriesAndMovies.module.css';

export const ViewMovie = () => {
    const [btnFavorite, setInfoFavorite] = useState('Favoritar');
    const [showSerie, setSerie] = useState({});
    // Save series
    const listFavorite = []; 
    
    const { id } = useParams();
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=6faa5e90a21586090d2be6f3b012f543&language=pt-BR`

    useEffect(() => {
        const getData = async () => {
            await fetch(url)
                .then(response => response.json())
                .then((data) => {
                    setSerie(data);
                })
            }
            getData()
    }, [])
    
    const handleSaveFavororite = () => { 
        let moviesSave = new Array()

        /**
         * Verifica se a propriedade existe
         * Caso exista, converte de String para Object
         */

        if (localStorage.hasOwnProperty("moviesSave")) {
          moviesSave = JSON.parse(localStorage.getItem("moviesSave"))
        }
      
        /* Adiciona um novo valor no array criado */
        moviesSave.push({
            name: showSerie.title, 
            image: showSerie.poster_path, 
            id: showSerie.id
        })
      
        /* Salva o item */
        localStorage.setItem("moviesSave", JSON.stringify(moviesSave))
        setInfoFavorite('Salvo com sucesso!')
    }

    console.log(listFavorite)

    return (
        <section style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w500/${showSerie.backdrop_path})` }} className={styles.container_view}>

            <article>
                <img className={styles.image_poster} src={`https://image.tmdb.org/t/p/w500/${showSerie.poster_path}`} alt={showSerie.name} />

                <div className={styles.localText}>
                    <Link className={styles.btnBack} to='/movies'><MdArrowBackIos/></Link>
                    <h3>{showSerie.title} ( {new Date(showSerie.release_date).getFullYear('pt-br')} )</h3>
                    <p className={styles.popularity}>Mais de {showSerie.popularity} pessoas assistiram a série {showSerie.name}.</p>

                    <button onClick={handleSaveFavororite} className={styles.btnFavorite}><AiOutlineHeart/> {btnFavorite}</button>

                    <p className={styles.overview}>{showSerie.overview}</p>
                    <p className={styles.tagline}>{showSerie.tagline}</p>
                    <a className={styles.reference} href={showSerie.homepage} target='_blank'>Link oficial do sériado</a>

                </div>
            </article>
        </section>
    )
}
