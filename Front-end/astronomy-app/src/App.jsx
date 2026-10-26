import React from 'react';
import Navbar from './components/Navbar/Navbar.jsx';
// import Eclipses from "./pages/eclipses";
// import Quadratures from "./pages/eclipses";

import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import { useState } from 'react';

function App() {
  return (
    <div className="App">
      <Header />
      <Navbar />
      <br />
      {/*<p>Tere tulemast Eesti Astronoomia seltsi uuele kodulehele. Siin leidub huvitavat ja kasulikku nii algajale astronoomia huvilisele kui ka kogenud taevavaatlejale.</p>*/}
      <br />
      <Footer />
    </div>
  );
}

export default App;
