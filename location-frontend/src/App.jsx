import { useState } from "react";
import Home from "./sections/Home.jsx";
import Form from "./sections/Form.jsx";

const App = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <main className="mx-auto max-w-5xl px-4 lg:px-0">
        <Home onApplyClick={() => setShowForm(true)} />
        {showForm && <Form onClose={() => setShowForm(false)} />}
      </main>
    </>
  );
};

export default App;
