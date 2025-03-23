"use client";
import React, { useEffect, useState } from "react";
import CustomButton from "../components/CustomButton";
import CustomTextField from "../components/CustomTextField";
import CryptoJS from "crypto-js";
import { toast } from "react-toastify";

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
  const secretKey = process.env.NEXT_PUBLIC_ENCRYPTION_KEY as string;
  const encryptData = (data: object) => {
    const jsonData = JSON.stringify(data);
    const encrypted = CryptoJS.AES.encrypt(jsonData, secretKey).toString();
    return encrypted;
  };

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

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();

    const bookingData = {
      ...formData,
      bookingDetails: JSON.parse(localStorage.getItem("searchData") || "{}"),
    };

    const encryptedData = encryptData(bookingData);

    try {
      const response = await fetch("/api/sendBookingEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ encryptedData }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        toast.success(
          "Travel request received successfully! You'll get a call back soon"
        );
        setFormData({
          fullName: "",
          email: "",
          mobileNumber: "",
          notes: "",
          countryCode: "+91",
        });
      } else {
        toast.error(`❌ Failed: ${result.message || "Unknown error occurred"}`);
      }
    } catch (error) {
      console.error("Error sending booking email:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";

      toast.error(`❌ Something went wrong! ${errorMessage}`);
    }
  };

  return (
    <form className="mt-4 space-y-4" onSubmit={handleBooking}>
      <CustomTextField
        label="Full name"
        type="text"
        name="fullName"
        value={formData.fullName}
        onChange={handleChange}
        sx={{ width: "100%" }}
        required
      />
      <CustomTextField
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        sx={{ width: "100%" }}
        required
      />

      <div className="flex space-x-2">
        <select
          name="countryCode"
          className="p-2 border rounded-md w-[30%]"
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
        <CustomTextField
          label="Mobile Number"
          type="tel"
          name="mobileNumber"
          value={formData.mobileNumber}
          onChange={handleChange}
          sx={{ width: "100%" }}
          required
        />
      </div>

      <textarea
        name="notes"
        placeholder="Notes/Requests for the driver (Optional)"
        className="w-full p-2 border rounded-md bg-gray-200 outline-none"
        value={formData.notes}
        onChange={handleChange}
      ></textarea>

      <CustomButton
        title="Submit Travel Request"
        type="submit"
        sx={{ backgroundColor: "#90f911", width: "50%" }}
      />
    </form>
  );
};

export default FormSection;
