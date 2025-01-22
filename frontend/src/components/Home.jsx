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
        <div className="flex-grow">
          <iframe 
            src="https://lumalabs.ai/embed/9ec5306a-4bd3-46fe-9522-1f8a1281f6b3?mode=sparkles&background=%23ffffff&color=%23000000&showTitle=true&loadBg=true&logoPosition=bottom-left&infoPosition=bottom-right&cinematicVideo=undefined&showMenu=false"
            className="w-full h-full border-0"
            title="Content iframe"
          />
          
          {/* Your existing MapsApp component */}
          
        </div>
      </Container>
    </>
  );
};

export default Home;