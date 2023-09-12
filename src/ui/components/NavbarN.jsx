/*
  La carpeta ui se puede considerar un tercer modulo
  ui hace referencia uiser interface, componentes que pueden considerarse superglobales que no cambian mucho
  y siempre seran necesario ser mostrados al usuario en este caso es la barra de navegacion
*/
//Se importan los componentes necesarios de react router
import { Navigate, Route, Routes ,Link, NavLink, useNavigate} from "react-router-dom";
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
//El componente resultante es la barra de navegacion
export const NavbarN = () => {
  //se extrae del store el usuario y la funcion de logout, se deja tambien el status de ser necesario a futuro
  const { status, user, startLogout } = useAuthStore();
  // se deja el navigate del router antes se usaba para redirigir al usuario en caso de ser necesario
  const navigate = useNavigate();

  return (
    <>
      <header className="navbar navbar-dark sticky-top bg-dark Rhino flex-md-nowrap p-0 shadow">
      <NavLink to="/" className="navbar-brand col-md-3 col-lg-1 me-0 px-3 fs-6">
        A.R.G.O.S
      </NavLink>
      <div className="navbar-nav d-flex flex-row float-start">
        <div className="nav-item">
          <NavLink to="/" className="me-3 text-white nav-link active">Inicio</NavLink>
        </div>
        <div className="nav-item">
          <NavLink to="/buscador" className="me-3 text-white nav-link">Buscador</NavLink>
        </div>
        <div className="nav-item">
          <NavLink to="/reconocimiento" className="me-3 text-white nav-link">Reconocimiento Facial</NavLink>
        </div>
        <div className="nav-item">
          <NavLink to="/geoanalisis" className="me-3 text-white nav-link">Geoanálisis</NavLink>
        </div>
        <div className="nav-item">
          <NavLink to="/estadistica" className="me-3 text-white nav-link">Estádistica</NavLink>
        </div>
        <div className="nav-item">
          <NavLink to="/usuarios" className="me-3 text-white nav-link">Usuarios</NavLink>
        </div>
        <div className="nav-item">
          <NavLink to="/historial" className="me-3 text-white nav-link">Historial</NavLink>
        </div>
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
      </div>
    </header>

      <div className="container-fluid">
        <div className="row mt-5">
          <main className="col-md-12 ms-sm-auto col-lg-12 area-visual">
          {/* <Routes>
            <Route path="inicio" element={<InicioPage />} />
          </Routes> */}
           <Routes>
              <Route path="inicio" element={<InicioPage />} />
              <Route path="buscador" element={<BuscadorPage />} />
              <Route path="reconocimiento" element={<ReconocimientoPage />} />
              <Route path="estadistica" element={<EstadisticaPage />} />
              <Route path="historial" element={<HistorialPage/>} />
              <Route path="remision/:remision" element={<RemisionPage />} /> 
              <Route path="inspeccion/:inspeccion" element={<InspeccionPage />} /> 
              <Route path="evento/:folio_infra" element={<SicEventoPage />} /> 
              <Route path="incidencia/:id_incidencia" element={<IncidenciaDelictivaPage />} /> 
              <Route path="integrante/:id_persona" element={<AtlasPage />} /> 
              <Route path="historico/:folio" element={<HistoricoPage />} /> 
              <Route path="usuario/:uid" element={<UsuarioPage />} /> 
              <Route path="usuarios/usuario" element={<UsuarioPage />} /> 
              <Route path="geoanalisis" element={<GeoanalisisPage />} />
              <Route path="usuarios" element={<UsuariosPage />} />
              <Route path="*" element={<Navigate to="inicio" />} /> 
          </Routes>
          </main>
        </div>
      </div>
    </>
  );
};
