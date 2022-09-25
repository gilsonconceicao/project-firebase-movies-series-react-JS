import React from 'react'; 
import { BrowserRouter, Route, Routes } from 'react-router-dom'; 
import { NavBar } from '../components/NavBar';
// pages
import { Home } from '../pages/home/Home'
import { Register } from '../pages/register/Register'; 
import  {LoginPage} from '../pages/login/Login'
import Series from '../pages/series/Series';
import { ViewSerie } from '../pages/series/ViewSerie';

export const RoutesPage = () => {
  return (
    <BrowserRouter>
      <NavBar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        {/* with recursos */}
        <Route path='/series' element={<Series/>}/>
        <Route path='/viewserie/:id' element={<ViewSerie/>}/>
      </Routes>
    </BrowserRouter>
  )
}
