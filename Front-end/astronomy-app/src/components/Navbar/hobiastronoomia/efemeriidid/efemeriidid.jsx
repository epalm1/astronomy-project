import React from 'react';
import { Routes, Route, Link, Outlet } from 'react-router-dom';
// import Eclipses from '././././pages/EfemPages/eclipses.jsx';
import EclipsesPage from './eclipses.jsx';
// import Eclipses from "../../../../pages/EfemPages/eclipses.jsx";
import QuadraturesPage from './quadratures.jsx';

function Efemeriidid() {
  return (
    <div>
      <p>Siit leiab erinevad Efemeriidid</p>

      <Link to="/hobiastro/efem/eclipses">Varjutused</Link>
      <br />
      <Link to="/hobiastro/efem/quadratures">Kvadratuurid</Link>
      <div className="subpage-content">
          <Outlet/>
      </div>
    </div>
  );
}
export default Efemeriidid;
