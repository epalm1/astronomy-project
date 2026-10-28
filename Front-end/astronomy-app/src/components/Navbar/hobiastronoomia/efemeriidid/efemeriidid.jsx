import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
// import Eclipses from '././././pages/EfemPages/eclipses.jsx';
import EclipsesPage from '../../../../pages/EfemPages/eclipses.jsx';
// import Eclipses from "../../../../pages/EfemPages/eclipses.jsx";
import QuadraturesPage from '../../../../pages/EfemPages/quadratures.jsx';

function Efemeriidid() {
  return (
    <div>
      <p>Siit leiab erinevad Efemeriidid</p>
      <Link to="eclipses">Varjutused</Link>
      <br />
      <Link to="quadratures">Kvadratuurid</Link>
      <Routes>
        <Route path="eclipses" element={<EclipsesPage />} />
        <Route path="quadratures" element={<QuadraturesPage />} />
      </Routes>
    </div>
  );
}
export default Efemeriidid;
