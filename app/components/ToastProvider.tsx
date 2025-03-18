"use client";
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastProvider: React.FC = () => {
  return <ToastContainer position="top-center" autoClose={3000} />;
};

export default ToastProvider;
