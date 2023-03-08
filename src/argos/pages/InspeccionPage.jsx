import React from 'react'

import { useParams } from 'react-router-dom';

export const InspeccionPage = () => {

    const { inspeccion } = useParams();



  return (
    <div>InspeccionPage Works {inspeccion}</div>
  )
}
