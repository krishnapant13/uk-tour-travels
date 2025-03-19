"use client";
import { Box, Button, Tab, Tabs } from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomTextField from "./CustomTextField";
import { MdArrowCircleRight } from "react-icons/md";
import {
  LocalizationProvider,
  MobileDateTimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { FaSearch } from "react-icons/fa";
import { IoSwapHorizontal } from "react-icons/io5";
import LocationButton from "./LocationButton";
import { useRouter } from "next/navigation";
import dayjs, { Dayjs } from "dayjs";
import { toast } from "react-toastify";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface SwitchTabProps {
  showCapsuleTabs?: boolean;
  mobileView?: boolean;
  absolutePosition?: React.CSSProperties;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
      style={{ width: "100%" }}
    >
      {value === index && <Box sx={{ p: 3, width: "100%" }}>{children}</Box>}
    </div>
  );
}
const SwitchTab: React.FC<SwitchTabProps> = ({
  showCapsuleTabs = true,
  mobileView = false,
  absolutePosition,
}) => {
  const [activeTab, setActiveTab] = useState<number | null>(null);
  const [transferTab, setTransferTab] = useState<number>(0);
  const [fromData, setFromData] = useState<string | null>(null);
  const [fromLatData, setFromLatData] = useState<string | null>(null);
  const [fromLonData, setFromLonData] = useState<string | null>(null);
  const [toLatData, setToLatData] = useState<string | null>(null);
  const [toLonData, setToLonData] = useState<string | null>(null);
  const [toData, setToData] = useState<string | null>(null);
  const [attractionLatData, setAttractionLatData] = useState<string | null>(
    null
  );
  const [attractionLonData, setAttractionLonData] = useState<string | null>(
    null
  );
  const [attractionData, setAttractionData] = useState<string | null>(null);
  const [departureTime, setDepartureTime] = useState<Dayjs | null>(null);
  const [returnTime, setReturnTime] = useState<Dayjs | null>(null);
  const [passengers, setPassengers] = useState<number | null>(null);
  const [days, setDays] = useState<number | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleLocationSelect = (
    type: "from" | "to" | "attraction",
    location: { display_name: string; lat: string; lon: string }
  ) => {
    if (type === "from") {
      setFromData(location.display_name);
      setFromLatData(location.lat);
      setFromLonData(location.lon);
    } else if (type === "attraction") {
      setAttractionData(location.display_name);
      setAttractionLatData(location.lat);
      setAttractionLonData(location.lon);
    } else {
      setToData(location.display_name);
      setToLatData(location.lat);
      setToLonData(location.lon);
    }
  };

  const validateInputs = () => {
    const newErrors: Record<string, string> = {};

    if (!fromData) newErrors.fromData = "From location is required";

    if (activeTab === 0) {
      // Transfers Tab
      if (!toData) newErrors.toData = "To location is required";
      if (!departureTime)
        newErrors.departureTime = "Departure time is required";

      if (transferTab === 1 && !returnTime) {
        newErrors.returnTime = "Return time is required for roundtrip";
      }

      if (!passengers || passengers < 1) {
        newErrors.passengers = "At least 1 passenger is required";
      }
    } else {
      // Tours Tab
      if (!attractionData) newErrors.attractionData = "Attraction is required";
      if (!departureTime)
        newErrors.departureTime = "Departure time is required";

      if (!days || days < 1) {
        newErrors.days = "Days must be at least 1";
      }

      if (!passengers || passengers < 1) {
        newErrors.passengers = "At least 1 passenger is required";
      }
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const router = useRouter();
  const handleSearch = () => {
    if (!validateInputs()) {
      const firstErrorKey = Object.keys(errors)[0];
      if (firstErrorKey) {
        toast.error(errors[firstErrorKey]);
      }
      return;
    }
    const queryParams = new URLSearchParams({
      transport:
        activeTab === 0
          ? ` ${transferTab === 0 ? "oneway" : "roundtrip"}`
          : "tour",
      fromData: fromData || "",
      fromLatData: fromLatData || "",
      fromLonData: fromLonData || "",
      toData: toData || "",
      toLatData: toLatData || "",
      toLonData: toLonData || "",
      attractionData: attractionData || "",
      attractionLatData: attractionLatData || "",
      attractionLonData: attractionLonData || "",
      departureTime: departureTime?.toString() || "",
      returnTime: returnTime?.toString() || "",
      passengers: passengers?.toString() || "",
      days: days?.toString() || "",
    }).toString();
    const searchData = {
      transport:
        activeTab === 0
          ? ` ${transferTab === 0 ? "oneway" : "roundtrip"}`
          : "tour",
      fromData,
      fromLatData,
      fromLonData,
      toData,
      toLatData,
      toLonData,
      attractionData,
      attractionLatData,
      attractionLonData,
      departureTime: departureTime?.toString(),
      returnTime: returnTime?.toString(),
      passengers,
      days,
    };
    localStorage.setItem("searchData", JSON.stringify(searchData));

    router.push(`/result?${queryParams}`);
  };
  useEffect(() => {
    setActiveTab(0);
  }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleTransferTabChange = (
    event: React.SyntheticEvent,
    newValue: number
  ) => {
    setTransferTab(newValue);
  };

  if (activeTab === null) {
    return null;
  }
  return (
    <div>
      {showCapsuleTabs && (
        <Tabs
          value={activeTab}
          onChange={handleChange}
          aria-label="Capsule Tabs"
          centered
          TabIndicatorProps={{
            style: { display: "none" },
          }}
          sx={{
            position: absolutePosition ? "absolute" : "static",
            ...absolutePosition,
            borderRadius: "999px",
            backgroundColor: "#E0E0E0",
            width: "20em",
            boxShadow: { xs: 5, md: 20 },
            margin: { xs: "auto", md: "" },
            display: { xs: mobileView ? "flex" : "none", md: "flex" },
            "& .MuiTab-root": {
              flex: 1,
              textTransform: "none",
              minHeight: "50px",
              fontWeight: "bold",
              fontSize: "0.8em",
              transition: "all 0.3s ease",
              color: "#757575",
              "&.Mui-selected": {
                backgroundColor: "#1976D2",
                color: "#FFF",
              },
            },
          }}
        >
          <Tab label="TRANSFERS" />
          <Tab label="TOURS" />
        </Tabs>
      )}
      <Box
        sx={{
          borderRadius: "8px",
          display: { xs: mobileView ? "flex" : "none", md: "flex" },
          bgcolor: "#f9f5f5",
          alignItems: "flex-start",
          margin: { md: "0.2em 0 0 0", xs: "1em 0 0 0" },
          width: "100%",
          boxShadow: { xs: 5, md: 20 },
          "& .MuiBox-root": {
            padding: { xs: " 5px 5px", md: "5px 20px" },
          },
        }}
      >
        <TabPanel value={activeTab} index={0}>
          <Tabs
            value={transferTab}
            onChange={handleTransferTabChange}
            aria-label="Transfer Tabs"
            sx={{
              "& .MuiTab-root": {
                fontWeight: "bold",
                fontSize: "0.8em",
              },
            }}
          >
            <Tab label="Oneway" />
            <Tab label="Roundtrip" />
          </Tabs>

          {/* Transfer Tab Content */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              gap: 2,
              mt: 2,
            }}
          >
            <div className="relative flex md:flex-row flex-col items-center justify-center w-full md:w-fit">
              <LocationButton
                label="From"
                onSelectLocation={(location) =>
                  handleLocationSelect("from", location)
                }
              />
              <MdArrowCircleRight
                size={20}
                color="#757575"
                className="absolute top-1/2 left-1/2 -translate-y-1/2  -translate-x-1/2 z-10"
              />{" "}
              <LocationButton
                label="To"
                onSelectLocation={(location) =>
                  handleLocationSelect("to", location)
                }
              />
            </div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer
                components={["MobileDateTimePicker"]}
                sx={{
                  width: { xs: "100%", md: "25%" },
                }}
              >
                <div className="relative flex md:flex-row flex-col items-center justify-center w-full">
                  <MobileDateTimePicker
                    label="Departure"
                    disablePast
                    onChange={(newValue) => {
                      setDepartureTime(newValue);
                    }}
                    sx={{
                      flexGrow: 1,
                      width: "100%",
                      "& .MuiInputBase-root": {
                        backgroundColor: "#e0e0e0",
                        marginBottom: "8px",
                        // minWidth: "10em",
                        width: "full",
                        borderRadius: transferTab === 1 ? "8px 0 0 8px" : "8px",
                        padding: "0",
                        "&:hover": {
                          backgroundColor: "#c9c9c9",
                        },
                        "&:before, &:after": {
                          display: "none",
                        },
                      },
                      "& .MuiOutlinedInput-notchedOutline": {
                        border: "none",
                      },
                      "& .MuiInputLabel-root": {
                        color: "#757575",
                      },
                      "& .MuiInputLabel-root.Mui-focused": {
                        color: "#1976D2",
                      },
                    }}
                  />
                  {transferTab === 1 && (
                    <IoSwapHorizontal
                      size={30}
                      color="#757575"
                      className="absolute top-1/2 left-1/2 -translate-y-1/2  -translate-x-1/2  z-10"
                    />
                  )}
                  {transferTab === 1 && (
                    <MobileDateTimePicker
                      label="Return"
                      disablePast
                      minDateTime={departureTime || dayjs()}
                      onChange={(newValue) => {
                        setReturnTime(newValue);
                      }}
                      sx={{
                        flexGrow: 1,
                        width: "100%",
                        "& .MuiInputBase-root": {
                          backgroundColor: "#e0e0e0",
                          borderRadius: mobileView ? "8px" : "0 8px 8px 0",
                          marginBottom: "8px",
                          padding: 0,
                          "&:hover": {
                            backgroundColor: "#c9c9c9",
                          },
                          "&:before, &:after": {
                            display: "none",
                          },
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                          border: "none",
                        },
                        "& .MuiInputLabel-root": {
                          color: "#757575",
                        },
                        "& .MuiInputLabel-root.Mui-focused": {
                          color: "#1976D2",
                        },
                      }}
                    />
                  )}
                </div>
              </DemoContainer>
            </LocalizationProvider>

            <CustomTextField
              label="Passengers"
              type="number"
              onChange={(e) => setPassengers(Number(e.target.value))}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSearch}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: { md: "50%", xs: "" },
                width: { md: "", xs: "100%" },
                padding: { md: "20px 20px", xs: "" },
              }}
            >
              <FaSearch size={20} className="md:block hidden" />
              <p className="block md:hidden">Search</p>
            </Button>
          </Box>
        </TabPanel>

        <TabPanel value={activeTab} index={1}>
          <Box
            sx={{
              display: { xs: mobileView ? "flex" : "none", md: "flex" },
              flexDirection: { xs: "column", md: "row" },
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              gap: 2,
              mt: 2,
            }}
          >
            <LocationButton
              label="From"
              onSelectLocation={(location) =>
                handleLocationSelect("from", location)
              }
            />
            <LocationButton
              label="Attraction"
              onSelectLocation={(location) =>
                handleLocationSelect("attraction", location)
              }
            />
            <CustomTextField
              label="days"
              type="number"
              onChange={(e) => setDays(Number(e.target.value))}
            />
            {/* Date Pickers */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer
                components={["MobileDateTimePicker"]}
                sx={{ width: "40%" }}
              >
                <MobileDateTimePicker
                  label="Departure"
                  disablePast
                  onChange={(newValue) => {
                    setDepartureTime(newValue);
                  }}
                  sx={{
                    flexGrow: 1,
                    width: "100%",
                    "& .MuiInputBase-root": {
                      backgroundColor: "#e0e0e0",
                      marginBottom: "8px",
                      // minWidth: "10em",
                      width: "full",
                      borderRadius: transferTab === 1 ? "8px 0 0 8px" : "8px",
                      padding: "0",
                      "&:hover": {
                        backgroundColor: "#c9c9c9",
                      },
                      "&:before, &:after": {
                        display: "none",
                      },
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "none",
                    },
                    "& .MuiInputLabel-root": {
                      color: "#757575",
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#1976D2",
                    },
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
            <CustomTextField
              label="Passengers"
              type="number"
              onChange={(e) => setPassengers(Number(e.target.value))}
            />

            <Button
              variant="contained"
              color="primary"
              onClick={handleSearch}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: { md: "50%", xs: "" },
                width: { md: "", xs: "100%" },
                padding: { md: "20px 20px", xs: "" },
              }}
            >
              <FaSearch size={20} className="md:block hidden" />
              <p className="block md:hidden">Search</p>
            </Button>
          </Box>
        </TabPanel>
      </Box>
    </div>
  );
};

export default SwitchTab;
