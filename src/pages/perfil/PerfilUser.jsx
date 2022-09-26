import React from 'react'
import { Link } from 'react-router-dom';
import styles from './PerfilUser.module.css';

export const PerfilUser = () => {
    const getShowInfo = JSON.parse(localStorage.getItem('@User-auth-doc-create'));

    const handleLogOutUser = () => {
        window.localStorage.removeItem("@Resgate-user-sigin");
        window.location.href = '';
    }

    const handleRemovePeramanent = () => {
        window.localStorage.clear(); 
        window.location.href = ''; 
    }

    return (
        <div className={styles['info-user']}>
            <h1>Você está logado!</h1>
            <h3>Olá, {getShowInfo.displayName}!</h3>
            <p>E-mail: {getShowInfo.email}</p>
            
            <div className={styles.flex_buttons}>
                <button onClick={handleLogOutUser} style={{ width: '100px', margin: '20px 0' }} className='button_actions'>Sair</button>
                <button onClick={handleRemovePeramanent} style={{ width: '100px', margin: '20px 0' }} className='button_actions'>Excluir conta</button>
            </div>
        </div>
    )
}
