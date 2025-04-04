"use client";
import { useState } from "react";
import CustomTextField from "./CustomTextField";
import CryptoJS from "crypto-js";
import { toast } from "react-toastify"; // ✅ For better error/success handling

const Enquiry: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const ENCRYPTION_KEY = process.env.NEXT_PUBLIC_ENCRYPTION_KEY as string;

  // ✅ Encrypt form data before sending
  const encryptData = (data: object) => {
    const jsonData = JSON.stringify(data);
    const encrypted = CryptoJS.AES.encrypt(jsonData, ENCRYPTION_KEY).toString();
    return encrypted;
  };

  // Handle input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const encryptedData = encryptData(formData);
      const response = await fetch("/api/sendMail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ encryptedData }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Thank you! We’ll get back to you soon.");
        setFormData({ email: "", phone: "", message: "" });
      } else {
        toast.error("Failed to send enquiry. Please try again.");
      }
    } catch (error) {
      console.error("Error sending enquiry:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Enquiry Form */}
      <div
        className="w-full bg-white shadow-lg p-4 rounded-lg z-[999] transform transition-transform duration-500 bottom-10 right-5 md:top-1 md:left-1"
        style={{ boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)" }}
      >
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Quick Enquiry
        </h3>
        <form onSubmit={handleSubmit} className="space-y-3 w-full">
          <div className="grid grid-cols-2">
            <div className="row-span-2">
              <CustomTextField
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                label="Email"
                sx={{ width: "100%", margin: "0.2em" }}
              />
              <CustomTextField
                label="Phone"
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                sx={{ width: "100%", margin: "0.2em" }}
                inputProps={{
                  inputMode: "numeric",
                  pattern: "[0-9]*",
                  maxLength: 10,
                }}
              />
            </div>
            <textarea
              className="h-full border row-span-2 mx-2 rounded-lg bg-[#e0e0e0] resize-none p-5 outline-none focus:bg-[#dcebfd]"
              placeholder="Write your message"
              required
              name="message"
              draggable="false"
              value={formData.message}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white rounded-md p-2 text-sm font-medium hover:bg-blue-700 transition flex justify-center items-center"
            disabled={loading} // ✅ Disable button when loading
          >
            {loading ? (
              <span className="animate-spin border-t-2 border-white border-solid rounded-full w-5 h-5"></span>
            ) : (
              "Request a callback"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Enquiry;
