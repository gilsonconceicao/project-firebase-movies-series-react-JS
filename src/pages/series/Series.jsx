import React, { useEffect, useState } from 'react';
import {BsSearch} from 'react-icons/bs'
//bootstrap 
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { UseAuthUserAccount } from '../../contexts/authStoreUser';

import { SeriesListProvider, UseSeriesContext } from '../../contexts/seriesContext'

import styles from './Series.module.css';

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
          {listSearch.map(serie => (
            <div key={serie.id} className={styles.box_series}>
              <Link className={styles.btnViewDetals} to={`/viewserie/${serie.id}`}>
              <img src={`https://image.tmdb.org/t/p/w500/${serie.poster_path}`} alt={serie.name} />
              <h2>{serie.name}</h2>

              <p className={styles.numberLike}>{serie.vote_average}</p>
              <p>{new Date(serie.first_air_date).toLocaleDateString('pt-br')}</p>
              </Link>
            </div>
          ))}
        </div>
        ) : (
          <div className={styles.container_series}>
          {series.map(serie => (
            <div key={serie.id} className={styles.box_series}>
              <Link className={styles.btnViewDetals} to={`/viewserie/${serie.id}`}>
              <img src={`https://image.tmdb.org/t/p/w500/${serie.poster_path}`} alt={serie.name} />
              <h2>{serie.name}</h2>
                
              <p className={styles.numberLike}>{serie.vote_average}</p>
              <p>{new Date(serie.first_air_date).toLocaleDateString('pt-br')}</p>
              </Link>
            </div>
          ))}
        </div>
        )}

      {search.length > 0 ?
       '' :
       <a href="#updateList"><button onClick={() => setChangeList(changeList + 1)} style={{ margin: 'auto', width: '300px' }} className='button_global'>Atualizar a lista</button></a>
      }

      </section>
    </div>

  )
}

export default Series