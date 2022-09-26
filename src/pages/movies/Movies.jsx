import React, { useEffect, useState } from 'react';
import {BsSearch} from 'react-icons/bs'
import { Link } from 'react-router-dom';
import { UseAuthUserAccount } from '../../contexts/authStoreUser';
import {RiPlayList2Fill} from 'react-icons/ri'; 

import { UseMoviesContext } from '../../contexts/moviesContext'

import styles from '../series/SeriesAndMovies.module.css';

const Movies = () => {
  const [search, setSearch] = useState('');
  const [listSearch, setListSearch] = useState([]);

  const {movies, changeList, setChangeList } = UseMoviesContext();
  const { isLoggedAll } = UseAuthUserAccount();

  // function of search tv
  const url = `https://api.themoviedb.org/3/search/movie/popular?api_key=6faa5e90a21586090d2be6f3b012f543&language=en-US&page=1&query=${search}`;

  const handleGetMovieSearch = async (e) => {
    e.preventDefault(); 

    try {
      const response = await fetch(url); 

      const responseData = await response.json();

      setListSearch(responseData.results);
  } catch (error) {
      console.log('Error')
  }        
  }

  console.log(listSearch)

  return (
    <div className='container'>
      <section >
        {isLoggedAll == true ?
          <div className={styles['title_series']}>
            <h1 id='updateList'>Filmes e documentários</h1>
            <form onSubmit={handleGetMovieSearch} >
                    <input
                        type="text"
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder='Buscar por um filme'
                    />
                    <button className={styles.btnSearch}><BsSearch/></button>
                </form>
          </div>
          :
          /* no logged  */
          <div className={styles['title_series']}>
            <h1 id='updateList'>Cadastre-se ou entre para obter mais recursos</h1>
            <Link to='/register'>Entrar/cadastrar</Link>
          </div>
        }

        {search.length > 0 ? 
        (
        <div className={styles.container_series}>
          {listSearch.map(movie => (
            <div key={movie.id} className={styles.box_series}>
              <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.name} />
              <h2 className={styles.titleBox}>{movie.title}</h2>
              {isLoggedAll && <Link className={styles.btnViewDetals} to={`/viewmovie/${movie.id}`}>
                <RiPlayList2Fill/> Ver mais
              </Link>}
              <p className={styles.numberLike}>{movie.vote_average}</p>
             
            </div>
          ))}
        </div>
        ) : (
          <div className={styles.container_series}>
          {movies.map(movie => (
            <div key={movie.id} className={styles.box_series}>
              <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.name} />
              <div>
                <h2 className={styles.titleBox}>{movie.title}</h2>
                {isLoggedAll && <Link className={styles.btnViewDetals} to={`/viewmovie/${movie.id}`}>
                  <RiPlayList2Fill/> Ver mais
                </Link>}
                <p className={styles.numberLike}>{movie.vote_average}</p>
              </div>
             
            </div>
          ))}
        </div>
        )}


        {
          isLoggedAll == true ? 
          (
            search.length > 0 ?
              '' :
              <a href="#updateList">
               <button onClick={() => setChangeList(changeList + 1)} style={{ margin: 'auto', width: '300px' }} className='button_global'>
                 Atualizar a lista
               </button>
              </a>
             
          ) :
          (
            <button className='button_global'>
                Entre ou cadastre para atualizar e ver mais
               </button>
          )
        }    
      </section>
    </div>

  )
}

export default Movies