import React from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Container } from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';
import Header from './Header';

const Home = () => {
  return (
    <>
      <Header />
      <ToastContainer />
      <Container className="my-2">
        <Outlet />
      </Container>
    </>
  );
};

export default Home;