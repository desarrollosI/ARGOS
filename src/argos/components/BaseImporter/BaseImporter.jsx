import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';
import Papa from 'papaparse';
import axios from 'axios';
import { generadorApi } from '../../../api/generadorApi';

export const BaseImporter = () => {
  const [headers, setHeaders] = useState([]);
  const [columnCategories, setColumnCategories] = useState({});
  const [insertCommands, setInsertCommands] = useState([]);
  const [jsonData, setJsonData] = useState('');
  const [fullTextQueries, setFullTextQueries] = useState([]);
  const [tableName, setTableName] = useState('');
  const [parsedData, setParsedData] = useState(null);

  const handleFileUpload = async (e) => {
    
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const data = reader.result;
      const workbook = XLSX.read(data, { type: 'binary' });

      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_csv(sheet);
      const results = Papa.parse(parsedData, { header: true });

      if (results && results.meta && results.meta.fields) {
        setHeaders(results.meta.fields);
        setParsedData(results);
        generateInsertCommands(results.data);
      }
    };

    reader.readAsBinaryString(file);
  };

  const generateInsertCommands = (data) => {
    if (!tableName.trim()) {
      console.error('El nombre de la tabla está en blanco');
      return;
    }
  
    const commands = data.map((row) => {
      const values = Object.keys(row).map((key) => `'${row[key]}'`).join(', ');
      return `INSERT INTO ${tableName} (${Object.keys(row).join(', ')}) VALUES (${values});`;
    });
    setInsertCommands(commands);
  };
  

  const handleCategoryChange = (e, header) => {
    const newColumnCategories = { ...columnCategories };
    newColumnCategories[header] = e.target.value;
    setColumnCategories(newColumnCategories);
  };

  const generateJsonData = async () => {
    const rowData = {};
    const categoriesArray = Object.values(columnCategories);
    const allColumns = Object.keys(columnCategories); // Obtener todas las columnas
  
    allColumns.forEach((header, index) => {
      // Verificar si la columna tiene una categoría asignada
      if (categoriesArray[index]) {
        rowData[header] = categoriesArray[index];
      } else {
        rowData[header] = ''; // Si no tiene categoría, asignar un valor vacío
      }
    });
  
    setJsonData(JSON.stringify(rowData, null, 2));
  
    generateInsertCommands(parsedData.data);
    await createTableAndIndexes();
    await generateFullTextQueries();
  };

  const generateFullTextQueries = async () => {
    const queries = [];
    const categoriesMap = {};

    headers.forEach(header => {
      const category = columnCategories[header];
      if (category) {
        if (!categoriesMap[category]) {
          categoriesMap[category] = [];
        }
        categoriesMap[category].push(header);
      }
    });

    Object.keys(categoriesMap).forEach(category => {
      const columns = categoriesMap[category].join('_');
      const query = `ALTER TABLE ${tableName} ADD FULLTEXT INDEX ft_${columns} (${categoriesMap[category].join(', ')});`;
      queries.push(query);
    });

    setFullTextQueries(queries);
  };

  const createTableAndIndexes = async () => {
    try {



      if (!tableName.trim()) {
        console.error('El nombre de la tabla está en blanco');
        return;
      }

      const headersWithCategories = headers.filter(header => columnCategories[header]);
      

      console.warn('headers con categorias', headersWithCategories)

      const responseCreateTable = await generadorApi.post('crear_tabla', {
          headers: headers,
          columnCategories: Object.values(columnCategories),
          tableName: tableName
      });

      console.log('Respuesta de creación de tabla:', responseCreateTable.data);
     

      if (responseCreateTable.data) {
        const responseInsertCommands = await generadorApi.post('insertar_datos', {

            tableName: tableName,
            headers: headers,
            data: parsedData.data
        });

        console.log('Respuesta de inserción de datos:', responseInsertCommands.data);
       

       // Llamar al endpoint con los encabezados que tienen categoría asociada
      const responseFullTextQueries = await generadorApi.post('crear_indices_fulltext', {
        tableName: tableName,
        headers: headersWithCategories,
        columnCategories: Object.values(columnCategories)
      });

      console.log('Respuesta de creación de índices FULLTEXT:', responseFullTextQueries.data);
    
      // Llamar al endpoint con los encabezados que tienen categoría asociada
      const responseClaves = await generadorApi.post('claves', {
        tableName: tableName,
        headers: headersWithCategories,
        columnCategories: Object.values(columnCategories).filter(Boolean) // Enviar las columnas con categorías no vacías al backend
      });

        console.log('Respuesta de creación de Claves:', responseClaves.data);
        if(responseClaves.data.message){
            Swal.fire('Base Agregada', 'La tabla, datos y llaves se han creado correctamente', 'success')
          }
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
      <div>
        <h2>Encabezados del archivo:</h2>
        <ul>
          {headers.map((header, index) => (
            <li key={index}>
                <div className="row">

                    <div class="col-md-4 mb-1">
                        <label className='form-label'>{header}</label> 
                        <select className="form-select" onChange={(e) => handleCategoryChange(e, header)}>
                            <option value="">Seleccione categoría</option>
                            <option value="nombre">Nombre</option>
                            <option value="telefono">Teléfono</option>
                            <option value="direccion">Dirección</option>
                            <option value="alias">Alias</option>
                            <option value="placaniv">Placa Niv</option>
                            <option value="miscelaneo">Misceláneo</option>
                        </select>
                    </div>
                </div>
            </li>
          ))}
        </ul>

        {/* <h2>Comandos de inserción SQL:</h2>
        <ul>
          {insertCommands.map((command, index) => (
            <li key={index}>{command}</li>
          ))}
        </ul> */}

        <div className="row">
            <div className="col-md-4">
                <input
                type="text"
                value={tableName}
                onChange={(e) => setTableName(e.target.value)}
                placeholder="Ingrese el nombre de la tabla"
                className='form-control'
                />
                <button className="btn btn-primary mt-3" onClick={generateJsonData}>Insertar Base de Datos</button>

            </div>
        </div>
        {/* <h2>JSON generado:</h2>
        <pre>{jsonData}</pre> */}
        {/* <h2>Consultas FT generadas:</h2>
        <ul>
          {fullTextQueries.map((query, index) => (
            <li key={index}>{query}</li>
          ))}
        </ul> */}
      </div>
    </div>
  );
};
