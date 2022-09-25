import React from 'react'
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom'
import {GrView} from 'react-icons/gr'; 
import {MdArrowBackIos} from 'react-icons/md'
import styles from './Series.module.css';

export const ViewSerie = () => {
    const { id } = useParams();
    const [showSerie, setSerie] = useState({});
    const url = `https://api.themoviedb.org/3/tv/${id}?api_key=6faa5e90a21586090d2be6f3b012f543&language=pt-BR`

    useEffect(() => {
        const getData = async () => {
            await fetch(url)
                .then(response => response.json())
                .then(data => setSerie(data))
        }
        getData()
    }, [])

    console.log(showSerie)

    return (
        <section style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w500/${showSerie.backdrop_path})` }} className={styles.container_view}>

            <article>
                <img className={styles.image_poster} src={`https://image.tmdb.org/t/p/w500/${showSerie.poster_path}`} alt={showSerie.name} />

                <div className={styles.localText}>
                    <Link className={styles.btnBack} to='/series'><MdArrowBackIos/></Link>
                    <h3>{showSerie.name} ( {new Date(showSerie.first_air_date).getFullYear('pt-br')} )</h3>
                    <p className={styles.popularity}>{<GrView/>} {showSerie.popularity}</p>
                    <p className={styles.overview}>{showSerie.overview}</p>
                    <p className={styles.tagline}>{showSerie.tagline}</p>
                    
                    <a className={styles.reference} href={showSerie.homepage} target='_blank'>Link oficial do sériado</a>

                </div>
            </article>
        </section>
    )
}
