import { useState } from "react";
import Home from "./sections/Home.jsx";
import Form from "./sections/Form.jsx";

const App = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <main className="mx-auto relative w-full">
      <Home onApplyClick={() => setShowForm(true)} />
      {showForm && <Form onClose={() => setShowForm(false)} />}
    </main>
  );
};

export default App;
