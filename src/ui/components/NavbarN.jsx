/*
  La carpeta ui se puede considerar un tercer modulo
  ui hace referencia uiser interface, componentes que pueden considerarse superglobales que no cambian mucho
  y siempre seran necesario ser mostrados al usuario en este caso es la barra de navegacion
*/
//Se importan los componentes necesarios de react router
import { Navigate, Route, Routes ,Link, NavLink, useNavigate,useLocation} from "react-router-dom";
import gsap from "gsap";
//Se improtan los componentes hoc, paginas para la barra de navegacion
import {
  BuscadorPage,
  ReconocimientoPage,
  GeoanalisisPage,
  InicioPage,
  RemisionPage,
  InspeccionPage,
  HistoricoPage,
  HistorialPage,
  EstadisticaPage,
  UsuariosPage,
  UsuarioPage,
  SicEventoPage,
  IncidenciaDelictivaPage,
  AtlasPage
} from "../../argos/pages";
//Se importa el store 
import { useAuthStore } from "../../hooks";
//se improtan los estilos necesarios para el componente
import "./dashboard.css";
import { useEffect } from "react";

import perfil from "../../assets/default.png"
import logo21 from "../../assets/logo21.png"
import sia from "../../assets/SIA.png"

//El componente resultante es la barra de navegacion
export const NavbarN = () => {
  //se extrae del store el usuario y la funcion de logout, se deja tambien el status de ser necesario a futuro
  const { status, user, startLogout } = useAuthStore();
  // se deja el navigate del router antes se usaba para redirigir al usuario en caso de ser necesario
  const navigate = useNavigate();

  let location = useLocation();
  useEffect(() => {
    gsap.fromTo(".content", { opacity: 0, x: 300 }, { opacity: 1, x: 0 });
}, [location]);

  return (
    <>
      <header className="navbar navbar-dark sticky-top bg-dark Rhino flex-md-nowrap p-0 shadow">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 fondo-blanco">
              <div className="navbar-nav">
                <div className="row">
                  <div className="col-md-7">
                  <img src={sia} alt="sia" width={150} height={85} />
                  <img src={logo21} alt="scc" width={150} />
                  </div>
                  <div className="col-md-5">
                    <div className="nav-item">
                      
                      <button
                        data-bs-toggle="tooltip" data-bs-placement="top" title="Cerrar Sesión"
                        className="px-2 me-5 btn btn-primary-outline"
                        onClick={startLogout}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fillRule="currentColor" className="bi bi-box-arrow-in-right" viewBox="0 0 16 16">
                          <path fillRule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0z"/>
                          <path fillRule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
                        </svg>
                      </button>

                      <span className="me-3 text-white user">Bienvenido {user.name}</span>
                      <img src={perfil} alt="perfil" width={50} />
                    </div>
                  </div>
                </div>
                
              </div>
            </div>
            <div className="col-md-12 border-bottom">
              <div className="row ">
                {/* <div className="col-md-2">
                  {/* <NavLink to="/" className="navbar-brand col-md-3 col-lg-1 me-0 px-3 fs-6">
                    A.R.G.O.S
                  </NavLink> */}
                {/* </div> */} 
                <div className="col-md-12">
                  <div className="navbar-nav d-flex flex-row justify-content-center">
                    <div className="nav-item">
                      <NavLink to="/" className="me-3 text-white nav-link">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-house-door-fill me-2 icono" viewBox="0 0 16 16">
                        <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5"/>
                      </svg>
                        Inicio
                      </NavLink>
                    </div>
                    {(user.permisos.buscar) &&(
                    <div className="nav-item">
                      <NavLink to="/buscador" className="me-3 text-white nav-link">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search me-2 icono" viewBox="0 0 16 16">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                        </svg>
                        Buscador
                      </NavLink>
                    </div>
                    )}
                    {(user.permisos.reconocimiento) &&(
                    <div className="nav-item">
                      <NavLink to="/reconocimiento" className="me-3 text-white nav-link">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-square me-2 icono" viewBox="0 0 16 16">
                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                        <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1v-1c0-1-1-4-6-4s-6 3-6 4v1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z"/>
                      </svg>

                        Reconocimiento Facial
                      </NavLink>
                    </div>
                    )}
                    {(user.permisos.geoanalisis) &&( 
                    <div className="nav-item">
                      <NavLink to="/geoanalisis" className="me-3 text-white nav-link">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-globe-americas me-2 icono" viewBox="0 0 16 16">
                        <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0M2.04 4.326c.325 1.329 2.532 2.54 3.717 3.19.48.263.793.434.743.484q-.121.12-.242.234c-.416.396-.787.749-.758 1.266.035.634.618.824 1.214 1.017.577.188 1.168.38 1.286.983.082.417-.075.988-.22 1.52-.215.782-.406 1.48.22 1.48 1.5-.5 3.798-3.186 4-5 .138-1.243-2-2-3.5-2.5-.478-.16-.755.081-.99.284-.172.15-.322.279-.51.216-.445-.148-2.5-2-1.5-2.5.78-.39.952-.171 1.227.182.078.099.163.208.273.318.609.304.662-.132.723-.633.039-.322.081-.671.277-.867.434-.434 1.265-.791 2.028-1.12.712-.306 1.365-.587 1.579-.88A7 7 0 1 1 2.04 4.327Z"/>
                      </svg>
                        Geoanálisis
                      </NavLink>
                    </div>
                    )}
                    {(user.permisos.estadistica) &&( 
                      <div className="nav-item">
                        <NavLink to="/estadistica" className="me-3 text-white nav-link">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bar-chart-fill  me-2 icono" viewBox="0 0 16 16">
                          <path d="M1 11a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1zm5-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1z"/>
                        </svg>

                          Estádistica
                        </NavLink>
                      </div>
                    )}
                    {(user.permisos.usuarios) &&( 
                    <div className="nav-item">
                      <NavLink to="/usuarios" className="me-3 text-white nav-link">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-people-fill me-2 icono" viewBox="0 0 16 16">
                        <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"/>
                      </svg>
                        Usuarios
                      </NavLink>
                    </div>
                    )}
                    {(user.permisos.historial) &&( 
                    <div className="nav-item">
                      <NavLink to="/historial" className="me-3 text-white nav-link">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clock-history me-2 icono" viewBox="0 0 16 16">
                        <path d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022zm2.004.45a7 7 0 0 0-.985-.299l.219-.976q.576.129 1.126.342zm1.37.71a7 7 0 0 0-.439-.27l.493-.87a8 8 0 0 1 .979.654l-.615.789a7 7 0 0 0-.418-.302zm1.834 1.79a7 7 0 0 0-.653-.796l.724-.69q.406.429.747.91zm.744 1.352a7 7 0 0 0-.214-.468l.893-.45a8 8 0 0 1 .45 1.088l-.95.313a7 7 0 0 0-.179-.483m.53 2.507a7 7 0 0 0-.1-1.025l.985-.17q.1.58.116 1.17zm-.131 1.538q.05-.254.081-.51l.993.123a8 8 0 0 1-.23 1.155l-.964-.267q.069-.247.12-.501m-.952 2.379q.276-.436.486-.908l.914.405q-.24.54-.555 1.038zm-.964 1.205q.183-.183.35-.378l.758.653a8 8 0 0 1-.401.432z"/>
                        <path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0z"/>
                        <path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5"/>
                      </svg>
                        Historial
                      </NavLink>
                    </div>
                    )}
                  </div>
                </div>
              </div>
              
             
            </div>
          </div>
        </div>

{/*       
      <NavLink to="/" className="navbar-brand col-md-3 col-lg-1 me-0 px-3 fs-6">
        A.R.G.O.S
      </NavLink>
      <div className="navbar-nav d-flex flex-row float-start">
        <div className="nav-item">
          <NavLink to="/" className="me-3 text-white nav-link active">Inicio</NavLink>
        </div>
        {(user.permisos.buscar) &&(
        <div className="nav-item">
          <NavLink to="/buscador" className="me-3 text-white nav-link">Buscador</NavLink>
        </div>
        )}
        {(user.permisos.reconocimiento) &&(
        <div className="nav-item">
          <NavLink to="/reconocimiento" className="me-3 text-white nav-link">Reconocimiento Facial</NavLink>
        </div>
        )}
        {(user.permisos.geoanalisis) &&( 
        <div className="nav-item">
          <NavLink to="/geoanalisis" className="me-3 text-white nav-link">Geoanálisis</NavLink>
        </div>
        )}
        {(user.permisos.estadistica) &&( 
          <div className="nav-item">
            <NavLink to="/estadistica" className="me-3 text-white nav-link">Estádistica</NavLink>
          </div>
        )}
        {(user.permisos.usuarios) &&( 
        <div className="nav-item">
          <NavLink to="/usuarios" className="me-3 text-white nav-link">Usuarios</NavLink>
        </div>
        )}
        {(user.permisos.historial) &&( 
        <div className="nav-item">
          <NavLink to="/historial" className="me-3 text-white nav-link">Historial</NavLink>
        </div>
        )}
      </div>

      <div className="navbar-nav">
        <div className="nav-item">
          <span className="me-3 text-white">{user.name}</span>
          <button
            className="px-3 me-5 btn btn-primary Red-Violet"
            onClick={startLogout}
          >
            Cerrar Sesión
          </button>
        </div>
      </div> */}
    </header>

      <div className="container-fluid">
        <div className="row mt-5">
          <main className="col-md-12 ms-sm-auto col-lg-12 area-visual">
          {/* <Routes>
            <Route path="inicio" element={<InicioPage />} />
          </Routes> */}
           <Routes>
              <Route path="inicio" element={<InicioPage />} />
              {(user.permisos.buscar) &&(
              <Route path="buscador" element={<BuscadorPage />} />
              )}
              {(user.permisos.reconocimiento) &&(
              <Route path="reconocimiento" element={<ReconocimientoPage />} />
               )}
              {(user.permisos.estadistica) &&(
              <Route path="estadistica" element={<EstadisticaPage />} />
              )}
              {(user.permisos.historial) &&(
              <Route path="historial" element={<HistorialPage/>} />
              )}
              {(user.permisos.geoanalisis) &&(
              <Route path="geoanalisis" element={<GeoanalisisPage />} />
              )}
              {(user.permisos.usuarios) &&(
              <Route path="usuarios" element={<UsuariosPage />} />
              )}
              <Route path="remision/:remision" element={<RemisionPage />} /> 
              <Route path="inspeccion/:inspeccion" element={<InspeccionPage />} /> 
              <Route path="evento/:folio_infra" element={<SicEventoPage />} /> 
              <Route path="incidencia/:id_incidencia" element={<IncidenciaDelictivaPage />} /> 
              <Route path="integrante/:id_persona" element={<AtlasPage />} /> 
              <Route path="historico/:folio" element={<HistoricoPage />} /> 
              <Route path="usuario/:uid" element={<UsuarioPage />} /> 
              <Route path="usuarios/usuario" element={<UsuarioPage />} /> 
              <Route path="*" element={<Navigate to="inicio" />} /> 
          </Routes>
          </main>
        </div>
      </div>
    </>
  );
};
