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
      <footer className="mt-8 bg-blue-600 text-white px-4 py-8 lg:p-8">
        <div className='container mx-auto max-w-4xl'>
        <h2 className="text-sunshine font-display text-center text-4xl font-bold mb-2">
          What is this?
        </h2>
        <p>
          Laboris est velit consequat nisi amet occaecat ullamco ut pariatur est
          adipisicing. Excepteur eiusmod esse incididunt dolore id minim et
          proident sint mollit duis incididunt dolor elit aute. Excepteur quis
          cillum et. Irure sunt exercitation cupidatat consequat anim.
        </p>
        <p>
          Cupidatat eiusmod eu ea enim ad sit ut mollit duis pariatur labore
          quis Lorem. Dolore veniam dolor est ipsum ea qui quis officia labore
          excepteur qui nostrud. Eiusmod et eu mollit ullamco minim nulla sint
          incididunt eiusmod dolore consectetur sunt ex sint. Cillum pariatur
          minim duis mollit. Laborum enim fugiat reprehenderit ad excepteur.
          Nulla irure consequat non laborum ipsum nisi aliqua commodo. Anim
          commodo nostrud ullamco dolore tempor. Officia ullamco aliquip Lorem
          nostrud anim laboris officia commodo nisi enim non ad.
        </p> 
        </div>
      </footer>
    </>
  );
};

export default App;
