import React from 'react'
import { useNavigate } from 'react-router-dom';

export const RemisionPage = () => {

    const navigate = useNavigate();
	const goBack = () => {
		navigate(-1);
	}

  return (
    <>  
        <button onClick={goBack}>Back</button>	
        <h3>remision page works</h3>
    </>
  )
}
