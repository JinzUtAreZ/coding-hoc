import React from "react";
import Header from "./components/header/header.comp";
import MainRoutes from "./routes/main.routes";
//import Header from "./components/header/headernavi.comp";

function App() {
  return (
    <div>
      <Header />
      <MainRoutes />
    </div>
  );
}

export default App;
