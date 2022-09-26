import React from 'react';
import { NavLink } from 'react-router-dom';
import { AiFillGitlab, AiOutlineMenu } from 'react-icons/ai'
import { BiUserCircle } from 'react-icons/bi'
import {AiOutlineLogin} from 'react-icons/ai'

import styles from './NavBar.module.css';
import { UseAuthUserAccount } from '../contexts/authStoreUser';

export const NavBar = () => {

  const { isLogged, isLoggedAll } = UseAuthUserAccount();

  return (
    <nav className={styles['navbar']}>
      <h2><AiFillGitlab /></h2>
      <div className={styles['itens_menu_left']}>
        {isLoggedAll === true ?
          <ul className={styles['list_link_nav']}>
            <li>
              <NavLink className={({ isActive }) =>
                (isActive ? styles.active : styles.isNot)} to='/series'>Séries</NavLink >
              <NavLink className={({ isActive }) =>
                (isActive ? styles.active : styles.isNot)} to='/movies'>Movies</NavLink >
              <NavLink className={({ isActive }) =>
                (isActive ? styles.active : styles.isNot)} to='/list'>my list</NavLink >

            </li>
          </ul> :
          <ul className={styles['list_link_nav']}>
            <li>
              <NavLink className={styles.btnHome} to='/'>Home</NavLink >
            </li>
            <li>
              <NavLink className={({ isActive }) =>
                (isActive ? styles.active : styles.isNot)} to='/series'>Series</NavLink >
            </li>
            <li>
              <NavLink className={({ isActive }) =>
                (isActive ? styles.active : styles.isNot)} to='/movies'>Movies</NavLink >
            </li>
          </ul>
        }
      </div>


      <button className={styles.btnMenu}><AiOutlineMenu /></button>
      <span className={styles['button_register']}>
        {isLoggedAll === true ? <NavLink to='/register' title='Meu perfil'><BiUserCircle />
        </NavLink > : <NavLink to='/register'>
          <AiOutlineLogin/>
        </NavLink >}
      </span>
    </nav>
  )
}
