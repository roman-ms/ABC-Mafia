import { useState } from "react";
import Home from "./sections/Home.jsx";
import Form from "./sections/Form.jsx";

const App = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
    <main className="container px-4 lg:px-0 mx-auto">
      <Home onApplyClick={() => setShowForm(true)} />
      {showForm && <Form onClose={() => setShowForm(false)} />}
    </main>
    <footer>
      footer helo
    </footer>
    </>
  );
};

export default App;
