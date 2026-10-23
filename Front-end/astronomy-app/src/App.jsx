import React from "react";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import {useState} from "react";

function App() {
  return (
      <div className="App">
          <Header />
          <br/>
          <p>Tere tulemast Eesti Astronoomia seltsi uuele kodulehele. Siin leidub huvitavat ja kasulikku nii algajale astronoomia huvilisele kui ka kogenud taevavaatlejale.</p>
          <br/>
          <Footer />
      </div>
  );
}

export default App;