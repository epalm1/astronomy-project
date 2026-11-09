//import React, { useState } from 'react';
//import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
//import Hobiastronoomia from './hobiastronoomia.jsx';
//import Astronoomiafestival from './astronoomiafestival.jsx';
//import Efemeriidid from './hobiastronoomia/efemeriidid/efemeriidid.jsx';
//import Selts from './selts.jsx';
//import EclipsesPage from "./hobiastronoomia/efemeriidid/eclipses.jsx";
//import QuadraturesPage from "./hobiastronoomia/efemeriidid/quadratures.jsx";
//import "../../styles/navbar.css"
//
//function Navbar() {
//  const [dropdownOpen, setDropdownOpen] = useState(false);
//
//  const handleBlur = (e) => {
//    if (!e.currentTarget.contains(e.relatedTarget)) {
//      setDropdownOpen(false);
//    }
//  };
//  return (
//    <BrowserRouter>
//      <nav className="navbar" onBlur={handleBlur}>
//        <ul className="navList">
//          <li
//            className="nav-item"
//            onMouseEnter={() => setDropdownOpen(true)}
//            onMouseLeave={() => setDropdownOpen(false)}
//          >
//            <Link to="/hobiastro" className="nav-link" onFocus={() => setDropdownOpen(true)}>
//              Hobiastronoomia
//            </Link>
//            {dropdownOpen && (
//              <ul className="dropdown-menu">
//                <li>
//                  <Link to="/hobiastro/taevaulevaade" className="dropdown-link">
//                    Taevaülevaade
//                  </Link>
//                </li>
//                <li>
//                  <Link to="/hobiastro/efem" className="dropdown-link">
//                    Efemeriidid
//                  </Link>
//                </li>
//                <li>
//                  <Link to="/hobiastro/teleskoobid" className="dropdown-link">
//                    Teleskoobid
//                  </Link>
//                </li>
//              </ul>
//            )}
//          </li>
//          <li className="nav-item">
//            <Link to="/astrofest" className="nav-link">
//              Astronoomiafestival
//            </Link>
//          </li>
//          <li className="nav-item">
//            <Link to="/selts" className="nav-link">
//              Selts
//            </Link>
//          </li>
//        </ul>
//      </nav>
//      <Routes>
//        <Route path="/hobiastro" element={<Hobiastronoomia />} />
//        <Route path="/astrofestl" element={<Astronoomiafestival />} />
//        <Route path="/selts" element={<Selts />} />
//        <Route path="/hobiastro/efem" element={<Efemeriidid />}>
//          <Route path="/hobiastro/efem/eclipses" element={<EclipsesPage />} />
//          <Route path="/hobiastro/efem/quadratures" element={<QuadraturesPage />} />
//        </Route>
//
//      </Routes>
//    </BrowserRouter>
//  );
//}
//export default Navbar;

// src/components/Navbar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/navbar.css';

function Navbar() {
  const [hobbiesOpen, setHobbiesOpen] = useState(false);
  const [ephemerisOpen, setEphemerisOpen] = useState(false);

  // Sulgeb kõik menüüd
  const handleCloseAll = () => {
    setHobbiesOpen(false);
    setEphemerisOpen(false);
  };

  return (
    <nav className="site-navbar">
      <Link to="/" className="nav-link">
        Avaleht
      </Link>

      {/* Dropdown Menu Container */}
      {/* 1. Tase: Hobiastronoomia dropdown */}
      <div className="dropdown">
        <button onClick={() => setHobbiesOpen(!hobbiesOpen)} className="dropdown-btn">
          Hobiastronoomia ▾
        </button>

        {hobbiesOpen && (
          <div className="dropdown-menu">
            {/* 2. Tase: Efemeriidid alam-dropdown */}
            <div className="dropdown-submenu">
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Hoiab ära ülemise menüü sulgumise
                  setEphemerisOpen(!ephemerisOpen);
                }}
                className="dropdown-sub-btn"
              >
                Efemeriidid ▾
              </button>

              {ephemerisOpen && (
                <div className="submenu-items">
                  <Link to="/rise_set_transit" onClick={handleCloseAll}>
                    Tõus, loojang ja meridiaaniületus
                  </Link>
                  <Link to="/eclipses" onClick={handleCloseAll}>
                    Varjutused
                  </Link>
                  <Link to="/moonphases" onClick={handleCloseAll}>
                    Kuu faasid
                  </Link>
                  <Link to="/quadratures" onClick={handleCloseAll}>
                    Kvadratuurid
                  </Link>
                  <Link to="/retrogrades" onClick={handleCloseAll}>
                    Retrograadid
                  </Link>
                  <Link to="/conjunctions" onClick={handleCloseAll}>
                    Ühendused
                  </Link>

                  <Link to="/constellations" onClick={handleCloseAll}>
                    Üldised efemeriidid
                  </Link>
                </div>
              )}
            </div>

            {/* Siia saad vajadusel lisada veel Hobiastronoomia valikuid */}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
