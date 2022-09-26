import React, { useState } from 'react';
import {FaTrashAlt} from 'react-icons/fa';

import './List.css'

export const List = () => {
    const serie= JSON.parse(localStorage.getItem('serieSave'))

    console.log(serie); 

    const handleRemoveItem = () => {
        window.localStorage.removeItem('serieSave'); 
        window.location.href = '';
    }

    return (
        <div className='list_container'>
            <div className="title">
                <h3>Minha lista de série</h3>
                {serie && <button onClick={() => handleRemoveItem()} className='btn_remove' title='Remover lista'><FaTrashAlt/></button> }
            </div>
            {
                serie ?
                    <div>
                        {
                          serie.map(serie => (
                            <div className='list'>
                               <img src={`https://image.tmdb.org/t/p/w500/${serie.image}`} alt="" />
                               <h3>{serie.name}</h3> 
                            </div>
                          ))  
                        }
                    </div>
                    :
                    (
                      <p>Não há séries salvas ainda :(</p>
                    )
            }
        </div>
    )
}
