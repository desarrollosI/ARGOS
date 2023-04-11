
import { Navigate, Route, Routes ,Link, NavLink, useNavigate} from "react-router-dom";
import {
  BuscadorPage,
  ReconocimientoPage,
  GeoanalisisPage,
  InicioPage,
  RemisionPage,
  InspeccionPage,
  HistoricoPage,
  HistorialPage
} from "../../argos/pages";

import { useAuthStore } from "../../hooks";

import "./dashboard.css";

export const NavbarN = () => {

  const { status, user, startLogout } = useAuthStore();


  const navigate = useNavigate();

  return (
    <>
      <header className="navbar navbar-dark sticky-top bg-dark Rhino flex-md-nowrap p-0 shadow">
        <NavLink to="/" className="navbar-brand col-md-3 col-lg-1 me-0 px-3 fs-6">
          A.R.G.O.S
        </NavLink>
        <button
          className="navbar-toggler position-absolute d-md-none collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#sidebarMenu"
          aria-controls="sidebarMenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="navbar-nav">
          <div className="nav-item text-nowrap">
            <span className="me-3 text-white">{user.name}</span>
            <button className="px-3 me-5 btn btn-primary Red-Violet" 
               onClick={ startLogout }
            > 
              Cerrar Sesión
            </button>
          </div>
        </div>
      </header>

      <div className="container-fluid">
        <div className="row">
          <nav
            id="sidebarMenu"
            className="col-md-3 col-lg-1 d-md-block bg-light sidebar collapse"
          >
            <div className="position-sticky pt-3 sidebar-sticky">
              <ul className="nav flex-column">
                <li className="nav-item">
                  <NavLink  to="/" className="nav-link active" aria-current="page">
                    <span data-feather="home" className="align-text-bottom"></span>
                    Inicio
                  </NavLink>
                </li>
                {console.log(user.rol)}
    
                <li className="nav-item">
                  <NavLink to="/buscador" className="nav-link">
                    <span data-feather="file" className="align-text-bottom"></span>
                    Buscador
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/reconocimiento" className="nav-link">
                    <span
                      data-feather="shopping-cart"
                      className="align-text-bottom"
                    ></span>
                    Reconocimiento Facial
                  </NavLink>
                </li>
                {
                  (user.rol === 'ADMIN_ROLE' ) && (

                    <li className="nav-item">
                      <NavLink to="/historial" className="nav-link">
                        <span data-feather="file" className="align-text-bottom"></span>
                        Historial
                      </NavLink>
                    </li>
                    )
                }
                
                {/* <li className="nav-item">
                  <NavLink to="/geoanalisis" className="nav-link">
                    <span data-feather="users" className="align-text-bottom"></span>
                    Geoanálisis
                  </NavLink>
                </li> */}
                {/* <li className="nav-item">
                  <a className="nav-link">
                    <span
                      data-feather="bar-chart-2"
                      className="align-text-bottom"
                    ></span>
                    Estadística
                  </a>
                </li> */}
                
              </ul>
            </div>
          </nav>

          <main className="col-md-9 ms-sm-auto col-lg-11 px-md-4">
          {/* <Routes>
            <Route path="inicio" element={<InicioPage />} />
          </Routes> */}
           <Routes>
              <Route path="inicio" element={<InicioPage />} />
              <Route path="buscador" element={<BuscadorPage />} />
              <Route path="reconocimiento" element={<ReconocimientoPage />} />
              <Route path="historial" element={<HistorialPage/>} />

              <Route path="remision/:remision" element={<RemisionPage />} /> 
              <Route path="inspeccion/:inspeccion" element={<InspeccionPage />} /> 
              <Route path="historico/:folio" element={<HistoricoPage />} /> 
              
              <Route path="geoanalisis" element={<GeoanalisisPage />} />
              <Route path="/" element={<Navigate to="/inicio" />} /> 

          </Routes>
          </main>
        </div>
      </div>
    </>
  );
};
