import React, { useState } from "react";

const Form = ({ onClose }) => {
  const [formData, setFormData] = useState({
    country: "",
    state: "",
    city: "",
    zip: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 bg-blue-400 flex items-center justify-center z-50">
      <div className="bg-white text-black shadow-xl rounded-2xl p-8 w-full max-w-md border border-gray-200 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl"
        >
          ×
        </button>

        <h2 className="text-2xl font-semibold mb-6 text-center">
          Location Information
        </h2>

        {submitted ? (
          <div className="text-green-600 font-medium text-center">
            Thank you! Your location was submitted.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {["country", "state", "city", "zip"].map((field) => (
              <div key={field}>
                <label className="block text-sm font-medium mb-1 capitalize">
                  {field === "zip" ? "Zip Code" : field}
                </label>
                <input
                  type="text"
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            ))}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition"
            >
              Submit
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Form;
