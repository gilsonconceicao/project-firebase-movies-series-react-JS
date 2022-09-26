import React, { useState } from 'react';
// fire base
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../../services/firebaseConfig";
import { UseAuthUserAccount } from '../../contexts/authStoreUser';

import styles from './Login.module.css'
import { Link } from 'react-router-dom';
import { PerfilUser } from '../perfil/PerfilUser';

export const LoginPage = () => {
  //state
  const [displayName, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  //state messages
  const [msgError, setMsgErrror] = useState('');

  // chacked email get data
  const checkedPassWord = JSON.parse(localStorage.getItem('@User-auth-doc-create'));

  //auth firebase
  const auth = getAuth(app);
  const userRegisterd = auth.currentUser;

  const { isLoggedAll } = UseAuthUserAccount();

  const handleValidDataPermission = async (e) => {
    e.preventDefault();


    if (userRegisterd !== null) {
      const emailUser = userRegisterd.email;
      const uid = userRegisterd.uid;

      if (email == '' && password == '') {
        setMsgErrror('Digite algo para continuar...');
        return
      }
      if (emailUser != email) {
        setMsgErrror('Email não corresponde!')
        return
      }
      if (checkedPassWord.password != password) {
        setMsgErrror('A senha digitada não corresponde.');
        return
      }

      if (checkedPassWord.password == password && email === emailUser) {
        setMsgErrror('');

        //Resgate date created

        await signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed in
            const userResgate = userCredential.user;
            localStorage.setItem("@Resgate-user-sigin", JSON.stringify(userResgate));
            console.log('USER RESGATE' + userResgate)
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
          });

        window.location.href = '/series'
      }
    }
  }


  return (
    <div className={styles.container_login}>
      <div className='form_global'>
        {isLoggedAll === true ?
          <PerfilUser/>
          :
          <form onSubmit={handleValidDataPermission}>
            <h1 style={{ fontSize: '2.3em', marginBottom: '20px' }}>Entrar com a sua conta</h1>
            {/* get email */}
            <label>
              Email
              <input
                type="email"
                name='email'
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Digite o seu email'
              />
            </label>
            {/* get password */}
            <label>
              Senha
              <input
                type="password"
                name='password'
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Digite uma senha'
              />
            </label>
            {msgError && <p className='message_error'>{msgError}</p>}
            <button className='button_global'>Entrar</button>
          </form>}
      </div>
    </div>
  )
}
