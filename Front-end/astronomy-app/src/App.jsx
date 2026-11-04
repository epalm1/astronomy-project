import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
import Footer from './components/Footer.jsx';

import EclipsesPage from './components/Navbar/hobiastronoomia/efemeriidid/eclipses.jsx';
import QuadraturesPage from "./components/Navbar/hobiastronoomia/efemeriidid/quadratures.jsx";


function App() {
  return (
      <BrowserRouter>
    <div className="App">
      <Header />
      <Navbar />

        <main>
            <Routes>
                <Route path="/" element={<div>Tere tulemast Eesti Astronoomia Seltsi uuele kodulehele. Siin leidub huvitavat ja kasulikku nii algajale astronoomia huvilisele kui ka kogenud taevavaatlejale.</div>} />
                <Route path="/eclipses" element={<EclipsesPage />} />
            </Routes>
        </main>

      <Footer />
    </div>
      </BrowserRouter>

  );
}

export default App;
