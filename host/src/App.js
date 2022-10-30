import React from "react";
import {
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages/Home"
import Form from "./pages/Form"
import { configureRootTheme, externalTheme } from '@npm-registry/eapteka-ui';
import './index.css'

configureRootTheme({ theme: externalTheme });



export const App = () => {
  return (
  <div className="container">
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/form" element={<Form />} />
      <Route path="*" element={<div>Не найдено</div>} />
    </Routes>
  </div>
)};
export default App;