import { useState } from "react";
import Home from "./sections/Home.jsx";
import Form from "./sections/Form.jsx";

const App = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <main className="max-w-7xl mx-auto relative">
      <Home onApplyClick={() => setShowForm(true)} />
      {showForm && <Form onClose={() => setShowForm(false)} />}
    </main>
  );
};

export default App;
