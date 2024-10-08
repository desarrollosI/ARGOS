/*
  Este componente es exactamente igual que <MyLoader /> Sin embargo este se han dado las
  propiedades necesarias para que adquiera la forma de una tabla
*/
import React from 'react'
import ContentLoader from 'react-content-loader'

export const TableLoader = props => {
    const random = Math.random() * (1 - 0.7) + 0.7;
    return(
        <ContentLoader
        height={40}
        width={1800}
        speed={2}
        primarycolor="#d9d9d9"
        secondarycolor="#ecebeb"
        {...props}
      >
        <rect x="30" y="15" rx="4" ry="4" width="6" height="6.4" />
        <rect x="64" y="13" rx="6" ry="6" width={200 * random} height="12" />
        <rect x="643" y="13" rx="6" ry="6" width={23 * random} height="12" />
        <rect x="683" y="13" rx="6" ry="6" width={78 * random} height="12" />
        <rect x="785" y="13" rx="6" ry="6" width={117 * random} height="12" />
        <rect x="968" y="13" rx="6" ry="6" width={83 * random} height="12" />
        <rect x="1100" y="13" rx="6" ry="6" width={83 * random} height="12" />
        <rect x="1200" y="13" rx="6" ry="6" width={83 * random} height="12" />
        <rect x="1300" y="13" rx="6" ry="6" width={83 * random} height="12" />
  
        <rect x="0" y="39" rx="6" ry="6" width="1060" height=".3" />
      </ContentLoader>
    )
}