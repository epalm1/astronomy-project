import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Hobiastronoomia from './hobiastronoomia.jsx';
import Astronoomiafestival from './astronoomiafestival.jsx';
import Efemeriidid from './hobiastronoomia/efemeriidid/efemeriidid.jsx';
import Selts from './selts.jsx';
import EclipsesPage from "./hobiastronoomia/efemeriidid/eclipses.jsx";
import QuadraturesPage from "./hobiastronoomia/efemeriidid/quadratures.jsx";

function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleBlur = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setDropdownOpen(false);
    }
  };
  return (
    <BrowserRouter>
      <nav className="navbar" onBlur={handleBlur}>
        <ul className="navList">
          <li
            className="nav-item dropdown"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <Link to="/hobiastro" className="nav-link" onFocus={() => setDropdownOpen(true)}>
              Hobiastronoomia
            </Link>
            {dropdownOpen && (
              <ul className="dropdown-menu">
                <li>
                  <Link to="/hobiastro/taevaulevaade" className="dropdown-link">
                    Taevaülevaade
                  </Link>
                </li>
                <li>
                  <Link to="/hobiastro/efem" className="dropdown-link">
                    Efemeriidid
                  </Link>
                </li>
                <li>
                  <Link to="/hobiastro/teleskoobid" className="dropdown-link">
                    Teleskoobid
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li className="nav-item">
            <Link to="/astrofest" className="nav-link">
              Astronoomiafestival
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/selts" className="nav-link">
              Selts
            </Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/hobiastro" element={<Hobiastronoomia />} />
        <Route path="/astrofestl" element={<Astronoomiafestival />} />
        <Route path="/selts" element={<Selts />} />
        <Route path="/hobiastro/efem" element={<Efemeriidid />}>
          <Route path="/hobiastro/efem/eclipses" element={<EclipsesPage />} />
          <Route path="/hobiastro/efem/quadratures" element={<QuadraturesPage />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}
export default Navbar;
