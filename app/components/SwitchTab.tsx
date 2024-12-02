"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Tab,
  Tabs,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DateTimePicker, MobileDateTimePicker } from "@mui/x-date-pickers";
import { MdArrowCircleRight } from "react-icons/md";
import CustomTextField from "./CustomTextField";
import { FaRegCreditCard, FaSearch } from "react-icons/fa";
import dayjs from "dayjs";
import { IoIosTimer, IoMdCheckmarkCircleOutline } from "react-icons/io";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

// Helper Component for Tab Content
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

const SwitchTab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number | null>(null);
  const [transferTab, setTransferTab] = useState<number>(0);
  const [fromInput, setFromInput] = useState<string>("");

  // https://opencagedata.com/dashboard#geocoding
  useEffect(() => {
    // Set initial active tab only after the component mounts on the client
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

  // Prevent rendering Tabs until the component has mounted
  if (activeTab === null) {
    return null;
  }

  return (
    <div>
      {" "}
      <Box>
        {/* Main Tabs */}
        <Tabs
          value={activeTab}
          onChange={handleChange}
          aria-label="Capsule Tabs"
          centered
          TabIndicatorProps={{
            style: { display: "none" },
          }}
          sx={{
            borderRadius: "999px",
            backgroundColor: "#E0E0E0",
            width: "20em",
            display: "flex",
            position: "absolute",
            top: "70%",
            left: "3.5em",
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

        {/* Tab Content */}
        <Box
          sx={{
            borderRadius: "8px",
            display: "flex",
            bgcolor: "#f9f5f5",
            alignItems: "flex-start",
            boxShadow: 20,
            "& .MuiBox-root": {
              padding: "5px 20px",
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
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                gap: 2,
                mt: 2,
              }}
            >
              <div className="relative flex items-center justify-center">
                {/* "From" TextField */}
                <CustomTextField
                  label="From"
                  sx={{
                    "& .MuiFilledInput-root": {
                      borderRadius: "8px 0 0 8px",
                      "&:before, &:after": {
                        display: "none",
                      },
                    },
                  }}
                />
                <MdArrowCircleRight
                  size={20}
                  color="#757575"
                  className="absolute top-1/2 left-1/2 -translate-y-1/2  -translate-x-1/2"
                />

                <CustomTextField
                  label="To"
                  sx={{
                    "& .MuiFilledInput-root": {
                      borderRadius: "0 8px 8px 0",
                      "&:before, &:after": {
                        display: "none",
                      },
                    },
                  }}
                />
              </div>
              {/* Date Pickers */}
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["MobileDateTimePicker"]}>
                  <MobileDateTimePicker
                    label="Departure"
                    disablePast
                    sx={{
                      flexGrow: 1,
                      "& .MuiInputBase-root": {
                        backgroundColor: "#e0e0e0",
                        marginBottom: "8px",
                        borderRadius: "8px",
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
                    <MobileDateTimePicker
                      label="Return"
                      disablePast
                      sx={{
                        flexGrow: 1,
                        "& .MuiInputBase-root": {
                          backgroundColor: "#e0e0e0",
                          borderRadius: "8px",
                          marginBottom: "8px",
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
                </DemoContainer>
              </LocalizationProvider>

              <CustomTextField label="Passengers" type="number" />
              <Button
                variant="contained"
                color="primary"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "50%",
                  padding: "20px 20px",
                }}
              >
                <FaSearch size={20} />
              </Button>
            </Box>
          </TabPanel>

          <TabPanel value={activeTab} index={1}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                gap: 2,
                mt: 2,
              }}
            >
              <CustomTextField
                label="From"
                sx={{
                  "& .MuiFilledInput-root": {
                    borderRadius: "8px",
                    "&:before, &:after": {
                      display: "none",
                    },
                  },
                }}
              />
              {/* Select Field for "From" */}
              <FormControl sx={{ width: "20%" }}>
                <InputLabel>Attraction</InputLabel>
                <Select
                  value={fromInput}
                  onChange={(e) => setFromInput(e.target.value)}
                  label="From"
                  variant="filled"
                  sx={{
                    "& .MuiFilledInput-root": {
                      backgroundColor: "#e0e0e0",
                      borderRadius: "8px",
                      "&:hover": {
                        backgroundColor: "#c9c9c9",
                      },
                      "&:before, &:after": {
                        display: "none",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: "#757575",
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#1976D2",
                    },
                  }}
                >
                  {/* Add your options dynamically here */}
                  <MenuItem value="Place 1">Place 1</MenuItem>
                  <MenuItem value="Place 2">Place 2</MenuItem>
                  <MenuItem value="Place 3">Place 3</MenuItem>
                </Select>
              </FormControl>
              {/* Date Pickers */}
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["MobileDateTimePicker"]}>
                  <MobileDateTimePicker
                    label="Departure"
                    disablePast
                    sx={{
                      flexGrow: 1,
                      "& .MuiInputBase-root": {
                        backgroundColor: "#e0e0e0",
                        marginBottom: "8px",
                        borderRadius: "8px",
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
              <CustomTextField label="Passengers" type="number" />
              <Button
                variant="contained"
                color="primary"
                sx={{
                  display: "flex",
                  borderRadius: "50%",
                  padding: 0,
                  width: 50,
                  height: 50,
                }}
              >
                <FaSearch size={20} />
              </Button>
            </Box>
          </TabPanel>
        </Box>
      </Box>
      <div className="flex justify-center items-center w-full mt-10 pb-20 border-b border-gray-300 ">
        <div className="flex justify-center items-center w-full">
          <IoMdCheckmarkCircleOutline className="mr-2" color="blue"  size={25}/>
          <p>Checked Only Vehicles</p>
        </div>{" "}
        <div className="flex justify-center items-center w-full">
          <IoIosTimer className="mr-2" color="blue"  size={25}/>
          <p>Real Time Confirmation</p>
        </div>{" "}
        <div className="flex justify-center items-center w-full">
          <FaRegCreditCard className="mr-2" color="blue" size={25} />
          <p>Safe payments</p>
        </div>
      </div>
    </div>
  );
};

export default SwitchTab;
