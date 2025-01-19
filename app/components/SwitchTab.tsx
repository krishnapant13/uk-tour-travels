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
  const [fromInput, setFromInput] = useState<string>("");

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
          margin: { md: "auto", xs: "1em 0 0 0" },
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
              <CustomTextField
                label="From"
                sx={{
                  "& .MuiFilledInput-root": {
                    borderRadius: { xs: "8px 8px 0 0", md: "8px 0 0 8px" },
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
                    borderRadius: { xs: "0 0 8px 8px", md: "8px 0 0 8px" },
                    "&:before, &:after": {
                      display: "none",
                    },
                  },
                }}
              />
            </div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["MobileDateTimePicker"]}>
                <div className="relative flex md:flex-row flex-col items-center justify-center w-full md:w-fit">
                  <MobileDateTimePicker
                    label="Departure"
                    disablePast
                    sx={{
                      flexGrow: 1,
                      "& .MuiInputBase-root": {
                        backgroundColor: "#e0e0e0",
                        marginBottom: "8px",
                        borderRadius:
                          transferTab === 1 ? "8px 8px 0 0" : "8px 0 0 8px",
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
                      className="absolute top-1/2 left-1/2 -translate-y-1/2  -translate-x-1/2"
                    />
                  )}
                  {transferTab === 1 && (
                    <MobileDateTimePicker
                      label="Return"
                      disablePast
                      sx={{
                        flexGrow: 1,
                        "& .MuiInputBase-root": {
                          backgroundColor: "#e0e0e0",
                          borderRadius: mobileView
                            ? "0 0 8px 8px"
                            : "0 8px 8px 0",
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

            <CustomTextField label="Passengers" type="number" />
            <Button
              variant="contained"
              color="primary"
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
            <FormControl sx={{ width: { xs: "100%", sm: "100%", md: "20%" } }}>
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
                <MenuItem value="Place 1">Place 1</MenuItem>
                <MenuItem value="Place 2">Place 2</MenuItem>
                <MenuItem value="Place 3">Place 3</MenuItem>
              </Select>
            </FormControl>
            <CustomTextField label="days" type="number" />
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
