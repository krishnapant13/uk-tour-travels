"use client";

import React, { useEffect, useState } from "react";
import CustomButton from "../components/CustomButton";

interface Country {
  name: { common: string };
  idd: { root: string; suffixes?: string[] };
}

interface ProcessedCountry {
  name: string;
  code: string;
}

const FormSection = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobileNumber: "",
    notes: "",
    countryCode: "+91",
  });

  const [countryList, setCountryList] = useState<ProcessedCountry[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch country codes dynamically
  useEffect(() => {
    const fetchCountryCodes = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data: Country[] = await response.json();

        setCountryList(
          data
            .map((country) => ({
              name: country.name.common,
              code: country.idd.root + (country.idd.suffixes?.[0] || ""),
            }))
            .filter((country) => country.code)
        );
      } catch (error) {
        console.error("Error fetching country codes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCountryCodes();
  }, []);

  // Generic input handler
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Form submission handler
  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    alert("Booking Confirmed! ✅");
  };

  return (
    <form className="mt-4 space-y-4" onSubmit={handleBooking}>
      {/* Full Name */}
      <input
        type="text"
        name="fullName"
        placeholder="Full Name"
        className="w-full p-2 border rounded-md"
        value={formData.fullName}
        onChange={handleChange}
        required
      />

      {/* Email */}
      <input
        type="email"
        name="email"
        placeholder="Email"
        className="w-full p-2 border rounded-md"
        value={formData.email}
        onChange={handleChange}
        required
      />

      {/* Mobile Number with Country Code */}
      <div className="flex space-x-2">
        <select
          name="countryCode"
          className="p-2 border rounded-md w-[20%]"
          value={formData.countryCode}
          onChange={handleChange}
          disabled={loading}
        >
          {loading ? (
            <option>Loading...</option>
          ) : (
            countryList.map((country, index) => (
              <option key={index} value={country.code}>
                {country.code} ({country.name})
              </option>
            ))
          )}
        </select>
        <input
          type="tel"
          name="mobileNumber"
          placeholder="Mobile Number"
          className="flex-1 p-2 border rounded-md"
          value={formData.mobileNumber}
          onChange={handleChange}
          required
        />
      </div>

      {/* Notes/Requests for Driver */}
      <textarea
        name="notes"
        placeholder="Notes/Requests for the driver (Optional)"
        className="w-full p-2 border rounded-md"
        value={formData.notes}
        onChange={handleChange}
      ></textarea>

      {/* Pay & Book Button */}
      <CustomButton
        title="Pay & Book"
        type="submit"
        sx={{ backgroundColor: "#ff40ff", width: "30%" }}
      />
    </form>
  );
};

export default FormSection;
