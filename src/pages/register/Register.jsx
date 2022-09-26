import React from 'react';
import { useState } from 'react';
import { LoginPage } from '../login/Login';
//context
import { UseAuthUserAccount } from '../../contexts/authStoreUser';
//style
import styles from './Register.module.css';
import { Link } from 'react-router-dom';
import { async } from '@firebase/util';

export const Register = () => {
  //state
  const [displayName, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  //state messages
  const [msgError, setMsgErrror] = useState('');

  //get data state 
  const { getDataUserStore, loading, isLogged, isLoggedAll } = UseAuthUserAccount();

  const handleSubmitDataUser = async (e) => {
    e.preventDefault();

    if (password != confirmPassword) {
      setMsgErrror('As senhas não são iguais!');
      return
    }

    if (displayName != '' && email != '' && password != '' && confirmPassword != '') {
      await getDataUserStore(displayName, email, password);
      setMsgErrror('');
    } else {
      setMsgErrror('Preencha os dados por completo!');
    }
  }

  return (
    <div>
      {isLogged === true ?
        (<LoginPage />) :
        <div className={styles.container_register}>
          <section className='container'>
            <h1 className={styles.title}>Crie um cadastro</h1>
            <p className={styles.subtitle}>Tenha acesso a todos os recursos da aplicação.</p>
            <form onSubmit={handleSubmitDataUser} className='form_global'>
              {/* get name */}
              <label>
                Nome
                <input
                  type="text"
                  name='displayName'
                  required
                  onChange={(e) => setName(e.target.value)}
                  placeholder='Digite o seu nome'
                />
              </label>
              {/* get email */}
              <label>
                Email
                <input
                  type="email"
                  name='email'
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='Digite o seu email'
                />
              </label>
              {/* get password */}
              <label>
                Crie uma senha
                <input
                  type="password"
                  name='password'
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder='Digite uma senha'
                />
              </label>
              {/* get confirmPassword */}
              <label>
                Confirmar senha
                <input
                  type="password"
                  name='confirmPassword'
                  required
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder='Confirme a sua senha'
                />
              </label>
              {msgError && <p className='message_error'>{msgError}</p>}
              {loading &&
                <p className='loading'>Carregando...</p>
              }
              <button className='button_global'>Cadastrar usuário</button>
            </form>
          </section>
        </div>
      }
    </div>
  )
}
