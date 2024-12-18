import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InitializeAuthFromLocalStorage from './components/InitializeAuthFromLocalStorage ';

const App =()=>{
  return (
    <>
    <InitializeAuthFromLocalStorage />
    <Header/>
    <Outlet/>
    <ToastContainer />
    </>
  )
}

export default App;