import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import { LoadingSpinner, Detenido } from '../components/';

export const RemisionPage = () => {

    const navigate = useNavigate();
    const {remision} = useParams();
    console.log('Params: ',remision)
    const { data, isLoading, hasError } = useFetch(`http://172.18.10.71:9090/api/base/remision`,`POST`,JSON.stringify({remision:remision.trim()}));
     console.log('despues del fetch: ',data)

    const goBack = () => {
      navigate(-1);
    }



  return (
    <>
      <button onClick={goBack}>Back</button>	

      {
       
       (isLoading) 
       ? <LoadingSpinner/>
       : <Detenido data={data.data.Remisiones[0]}/>    
      }
    
    </>


  )
}
