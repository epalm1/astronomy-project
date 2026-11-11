import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Calendar from './components/Calendar.jsx';
import EclipsesPage from './components/Navbar/hobiastronoomia/efemeriidid/eclipses.jsx';
import QuadraturesPage from './components/Navbar/hobiastronoomia/efemeriidid/quadratures.jsx';
import RetrogradesPage from './components/Navbar/hobiastronoomia/efemeriidid/retrogrades.jsx';
import ConjunctionsPage from './components/Navbar/hobiastronoomia/efemeriidid/conjunctions.jsx';
import ConstellationsPage from './components/Navbar/hobiastronoomia/efemeriidid/constellations.jsx';
import MoonPhasesPage from './components/Navbar/hobiastronoomia/efemeriidid/moonphases.jsx';
import RiseSetTransitPage from './components/Navbar/hobiastronoomia/efemeriidid/rise_set_transit.jsx';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Navbar />

        <main>
          <div className="calendar">
            <Calendar />
          </div>
          <Routes>
            <Route
              path="/"
              element={
                <div>
                  Tere tulemast Eesti Astronoomia Seltsi uuele kodulehele. Siin leidub huvitavat ja
                  kasulikku nii algajale astronoomia huvilisele kui ka kogenud taevavaatlejale.
                </div>
              }
            />

            <Route path="/eclipses" element={<EclipsesPage />} />
            <Route path="/moonphases" element={<MoonPhasesPage />} />
            <Route path="/rise_set_transit" element={<RiseSetTransitPage />} />
            <Route path="/quadratures" element={<QuadraturesPage />} />
            <Route path="/retrogrades" element={<RetrogradesPage />} />
            <Route path="/constellations" element={<ConstellationsPage />} />
            <Route path="/conjunctions" element={<ConjunctionsPage />} />
          </Routes>
        </main>

        <div>
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
