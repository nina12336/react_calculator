import React, { useState } from "react";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Background from "./components/Background";
import Calculator from "./components/Calculator";
import "normalize.css";
import "./style/app.css";

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Background>
        <Calculator />
      </Background>
    </DndProvider>
  );
}

export default App;
