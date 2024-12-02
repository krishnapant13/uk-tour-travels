"use client";

import { useState } from "react";

const Enquiry: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [formData, setFormData] = useState({ email: "", phone: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted: ", formData);
    alert("Thank you! We'll get back to you soon.");
    setFormData({ email: "", phone: "" }); // Reset the form
  };

  return (
    <div>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed top-20 left-0 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center z-[1000] transition-transform ${
          isOpen ? "rotate-45" : "rotate-0"
        }`}
        style={{ boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)" }}
        aria-label="Enquiry Form Toggle"
      >
        +
      </button>

      {/* Enquiry Form */}
      <div
        className={`fixed top-20 left-5 w-[300px] bg-white shadow-lg p-4 rounded-lg z-[999] transform transition-transform duration-500 ${
          isOpen
            ? "translate-x-10 translate-y-10 opacity-100"
            : "translate-x-0 opacity-0 pointer-events-none"
        }`}
        style={{
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
          transformOrigin: "bottom right",
        }}
      >
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Quick Enquiry
        </h3>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md p-2 mt-1 text-sm"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md p-2 mt-1 text-sm"
              placeholder="Enter your phone number"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white rounded-md p-2 text-sm font-medium hover:bg-blue-700 transition"
          >
            Request a callback
          </button>
        </form>
      </div>
    </div>
  );
};

export default Enquiry;