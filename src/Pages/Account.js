import { useEffect,useState } from "react";
import React from 'react';
import PxMainPage from './PxMainPage';
import Footer from '../Components/Footer';
import { Link} from "react-router-dom";
const Account = () => {
  
  useEffect(() => {
    
   

    if(!window.sessionStorage.getItem("AccessToken"))
     {
    
     window.location.href='/';
    }
  }, []);


  return (
    <div >
    <PxMainPage />
    <div className="stock-status">
      <Link to="/"><div className="div33">Головна </div></Link>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
<path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
</svg>
<Link to={`/account`}><div className="div34">Особистий кабінет</div></Link>
</div>
    <Footer />
    </div>
  );
};

export default Account;
