// import React from 'react';

// export const SelectColumnFilterStatic = ({ nombre, opciones, column, setFilter }) => {
//     return (
//         <select
//             value={column.filterValue || ''}
//             onChange={(e) => {
//                 setFilter(nombre, e.target.value || undefined);
//             }}
//         >
//             <option value="">Todos</option>
//             {opciones.map((opcion, index) => (
//                 <option key={index} value={opcion}>
//                     {opcion}
//                 </option>
//             ))}
//         </select>
//     );
// };