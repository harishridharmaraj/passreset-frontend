import React from "react";
import { Routes, Route } from "react-router-dom";
import Forgot from "./components/forgetpass";
import NewPass from "./components/newpassword";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/forgetpass" element={<Forgot />} />
        <Route path="/createpass/:passtoken" element={<NewPass />} />
      </Routes>
    </div>
  );
};

export default App;
