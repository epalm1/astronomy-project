import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Hobiastronoomia from './hobiastronoomia.jsx';
import Astronoomiafestival from './astronoomiafestival.jsx';
import Efemeriidid from './hobiastronoomia/efemeriidid/efemeriidid.jsx';
import Selts from './selts.jsx';

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
            <Link to="/hobiastronoomia" className="nav-link" onFocus={() => setDropdownOpen(true)}>
              Hobiastronoomia
            </Link>
            {dropdownOpen && (
              <ul className="dropdown-menu">
                <li>
                  <Link to="/hobiastronoomia/taevaulevaade" className="dropdown-link">
                    Taevaülevaade
                  </Link>
                </li>
                <li>
                  <Link to="/hobiastronoomia/efemeriidid" className="dropdown-link">
                    Efemeriidid
                  </Link>
                </li>
                <li>
                  <Link to="/hobiastronoomia/teleskoobid" className="dropdown-link">
                    Teleskoobid
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li className="nav-item">
            <Link to="/astronoomiafestival" className="nav-link">
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
        <Route path="/hobiastronoomia" element={<Hobiastronoomia />} />
        <Route path="/astronoomiafestival" element={<Astronoomiafestival />} />
        <Route path="/selts" element={<Selts />} />
        <Route path="/hobiastronoomia/efemeriidid/*" element={<Efemeriidid />} />
      </Routes>
    </BrowserRouter>
  );
}
export default Navbar;
