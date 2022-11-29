import { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Navigate, Route, Routes } from 'react-router-dom';
import { BuscadorPage, ReconocimientoPage, GeoanalisisPage, InicioPage } from '../../argos/pages';
import { AuthContext } from '../../auth/context/AuthContext';

import './header.css'

export const Navbar = () => {

    const { user, logout } = useContext( AuthContext );
    

    const navigate = useNavigate();

    const onLogout = () => {
        logout();
        navigate('/login', {
            replace: true
        });
    }

    return (

        <>
            <div className="container-fluid">
                <div className="row flex-nowrap">
                    <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-success Rhino">
                        <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                            <NavLink ro="/" className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                                <span className="fs-5 d-none d-sm-inline">A.R.G.O.S.</span>
                                </NavLink>
                            <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                                <li className="nav-item">
                                    <NavLink  className="nav-link align-middle px-0"  to="/">
                                        <span className="ms-1 d-none d-sm-inline text-white">Inicio</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink  className="nav-link align-middle px-0"  to="/buscador">
                                        <span className="ms-1 d-none d-sm-inline text-white">Buscador</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink  className="nav-link align-middle px-0"  to="/reconocimiento">
                                        <span className="ms-1 d-none d-sm-inline text-white">Reconocimiento Facial</span>
                                    </NavLink>
                                </li>
                            </ul>
                            <hr /> 
                            <div className="dropdown pb-4">
                                <a className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                                    <img src="https://github.com/mdo.png" alt="hugenerd" width="30" height="30" className="rounded-circle" />
                                    <span className="d-none d-sm-inline mx-1">Usuario</span>
                                </a>
                                <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
                                    <li><a className="dropdown-item">Perfil</a></li>
                                    <li>
                                        <hr className="dropdown-divider" />
                                    </li>
                                    <li><a className="dropdown-item" onClick={ onLogout }>Cerrar Sesión</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    
                        <div className="col page-backgrond">
                            <div className="row pt-3 pb-3 Red-Violet">
                                <div className="col-md-8">
                                    <h5 className="text-white">Sistema Avanzado de Reconocimiento, Geoanalisis y Estadística</h5>
                                </div>
                                <div className="col-md-4">
                                    <h6 className="text-white">Bienvenido: </h6>
                                </div>
                            </div>
                            <div className="row page-backgrond">
                                {/* TODO ROUTER REACT */}
                                {/* <InicioPage /> */}

                                <Routes>
                                    <Route path="inicio" element={<InicioPage />} />
                                    <Route path="buscador" element={<BuscadorPage />} />
                                    <Route path="reconocimiento" element={<ReconocimientoPage />} />
                                    
                                    <Route path="geoanalisis" element={<GeoanalisisPage />} />
                                    {/* <Route path="hero/:id" element={<HeroPage />} /> */}
                                                    

                                    <Route path="/" element={<Navigate to="/inicio" />} />

                                </Routes>
                            </div>
                            
                        </div>
                    
                </div>
            </div>
        </>
























        // <nav className="navbar navbar-expand-sm navbar-dark bg-dark p-2">
            
        //     <Link 
        //         className="navbar-brand" 
        //         to="/"
        //     >
        //         A.R.G
        //     </Link>

        //     <div className="navbar-collapse">
        //         <div className="navbar-nav">

        //             <NavLink 
        //                 className={ ({isActive}) => `nav-item nav-link  ${ isActive ? 'active':'' }` }
        //                 to="/buscador"
        //             >
        //                 Marvel
        //             </NavLink>

        //             <NavLink 
        //                 className={ ({isActive}) => `nav-item nav-link  ${ isActive ? 'active':'' }` }
        //                 to="/reconocimiento"
        //             >
        //                 DC
        //             </NavLink>
                    
        //             <NavLink 
        //                 className={ ({isActive}) => `nav-item nav-link  ${ isActive ? 'active':'' }` }
        //                 to="/geoanalisis"
        //             >
        //                 Search
        //             </NavLink>
        //         </div>
        //     </div>

        //     <div className="navbar-collapse collapse w-100 order-3 dual-collapse2 d-flex justify-content-end">
        //         <ul className="navbar-nav ml-auto">
                   
        //             <span className="nav-item nav-link text-primary">
        //                 { user?.name }
        //             </span>

        //             <button
        //                 className="nav-item nav-link btn"
        //                 onClick={ onLogout }
        //             >
        //                 Logout
        //             </button>

        //         </ul>
        //     </div>
        // </nav>
    )
}