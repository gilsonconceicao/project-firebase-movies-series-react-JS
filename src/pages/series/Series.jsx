import React, { useEffect, useState } from 'react';
import {BsSearch} from 'react-icons/bs'
import { Link } from 'react-router-dom';
import { UseAuthUserAccount } from '../../contexts/authStoreUser';
import {RiPlayList2Fill} from 'react-icons/ri'; 

import { SeriesListProvider, UseSeriesContext } from '../../contexts/seriesContext'

import styles from './SeriesAndMovies.module.css';

const Series = () => {
  const [search, setSearch] = useState('');
  const [listSearch, setListSearch] = useState([]);

  const { series, changeList, setChangeList } = UseSeriesContext();
  const { isLoggedAll } = UseAuthUserAccount();

  // function of search tv
  const url = `https://api.themoviedb.org/3/search/tv?api_key=6faa5e90a21586090d2be6f3b012f543&language=en-US&page=1&query=${search}`;

  const handleGetSerieSearch = async (e) => {
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
            <h1 id='updateList'>Séries e novelas</h1>
            <form onSubmit={handleGetSerieSearch} >
                    <input
                        type="text"
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder='Buscar por uma série'
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
          {listSearch.map(serie => (
            <div key={serie.id} className={styles.box_series}>
              <img src={`https://image.tmdb.org/t/p/w500/${serie.poster_path}`} alt={serie.name} />
              <h2 className={styles.titleBox}>{serie.name}</h2>
              {isLoggedAll && <Link className={styles.btnViewDetals} to={`/viewserie/${serie.id}`}>
                <RiPlayList2Fill/> Ver mais
              </Link>}
              <p className={styles.numberLike}>{serie.vote_average}</p>
             
            </div>
          ))}
        </div>
        ) : (
          <div className={styles.container_series}>
          {series.map(serie => (
            <div key={serie.id} className={styles.box_series}>
              <img src={`https://image.tmdb.org/t/p/w500/${serie.poster_path}`} alt={serie.name} />
              <div>
                <h2 className={styles.titleBox}>{serie.name}</h2>
                {isLoggedAll && <Link className={styles.btnViewDetals} to={`/viewserie/${serie.id}`}>
                  <RiPlayList2Fill/> Ver mais
                </Link>}
                <p className={styles.numberLike}>{serie.vote_average}</p>
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

export default Series