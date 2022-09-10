import React from 'react';
import "./assets/Style.scss"
import "../src/assets/fr.css"
import "../src/assets/ar.css"
import MainRoute from "./Routes/MainRoute"
import 'antd/dist/antd.css'

function App() {
  return (
    <div className="overflow-hidden">
     <MainRoute/>
    </div>
  );
}

export default App;
