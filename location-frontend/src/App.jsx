import { useState } from "react";
import Home from "./sections/Home.jsx";
import Form from "./sections/Form.jsx";

const App = () => {
  return (
    <main className="max-w-7xl mx-auto">
      <Home />
      <Form />
    </main>
  );
};

export default App;
