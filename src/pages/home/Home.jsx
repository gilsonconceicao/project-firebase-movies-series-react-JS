import React from 'react'; 
import { Link } from 'react-router-dom';
import './Home.css'; 

export const Home = () => {
  return (
    <section className='container'>
        <div className='welcom_home'>
          <h1>Bem vindo ao Series Play</h1>
          <Link className='button_global play' to='/series'>Play</Link>
        </div>
    </section>
  )
}
