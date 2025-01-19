import React from "react";
import CustomTextField from "./CustomTextField";
import CustomButton from "./CustomButton";

const SelectVehicleForm: React.FC = () => {
  return (
    <form className="sticky top-[35%] transform -translate-y-1/2 right-0  h-[23em] p-6 bg-white rounded-lg  shadow-2xl shadow-gray-400">
      <CustomTextField
        label="From"
        sx={{ width: "100%", margin: "0.5em 0 0.5em 0" }}
      />
      <CustomTextField
        label="To"
        sx={{ width: "100%", margin: "0.5em 0 0.5em 0" }}
      />
      <CustomTextField
        label="Passengers"
        sx={{ width: "100%", margin: "0.5em 0 0.5em 0" }}
      />
      <div className="flex justify-between items-center my-5">
        <p className="text-blue-600 font-bold">Total</p>
        <p className="text-blue-600 font-bold">000 ₹</p>
      </div>
      <a href="#vehicle-section">
        <CustomButton
          title="Selet Vehicle"
          sx={{
            marginTop: "0.5em",
            backgroundColor: "#0055ff",
            padding: "1em 0 1em 0",
            borderRadius: "0.3em",
            fontWeight: "bold",
          }}
        />
      </a>
    </form>
  );
};

export default SelectVehicleForm;
