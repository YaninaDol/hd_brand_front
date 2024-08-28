import React, { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Status200 = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
   
    window.sessionStorage.removeItem("Basket");
    window.sessionStorage.removeItem("order");

    
    const loadingTimeout = setTimeout(() => {
      setLoading(false);
      navigate('/'); 
    }, 1000);

   
    return () => clearTimeout(loadingTimeout);
  }, [navigate]);

  return (
    <div className="text-center" style={{ marginTop: 100 }}>
      {loading ? (
        <div style={{ marginTop: '250px' }} className="d-flex justify-content-center">
          <Spinner variant="secondary" animation="border" />
        </div>
      ) : (
        <> </>
      )}
    </div>
  );
};

export default Status200;
