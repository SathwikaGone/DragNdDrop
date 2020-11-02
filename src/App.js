import React, { useEffect, useState } from "react";
import "./App.css";

import DragAndDrop from "./Components/DragAndDrop";

const defaultData = [
  { title: "group 1", items: ["1", "2", "3"] },
  { title: "group 2", items: ["4", "5"] },
];

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <DragAndDrop data={defaultData} />
      </header>
    </div>
  );
}

export default App;
