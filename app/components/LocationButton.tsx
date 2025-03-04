import React, { useState, useEffect, useRef, useCallback } from "react";
import { List, ListItem, ListItemButton, Typography } from "@mui/material";
import CustomTextField from "./CustomTextField";
import { debounce } from "lodash";

interface Location {
  display_name: string;
  lat: string;
  lon: string;
}

interface LocationSearchProps {
  label: string;
  onSelectLocation: (location: Location) => void;
}

const API_KEY = process.env.NEXT_PUBLIC_MAP_KEY;
const API_URL = "https://api.opencagedata.com/geocode/v1/json";

const LocationSearch: React.FC<LocationSearchProps> = ({
  label,
  onSelectLocation,
}) => {
  const [query, setQuery] = useState<string>("");
  const [suggestions, setSuggestions] = useState<Location[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false); // Control visibility
  const containerRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchLocations = useCallback(
    debounce(async (input: string) => {
      if (input.length < 3) {
        setSuggestions(label === "From" ? [] : []);
        return;
      }

      setIsLoading(true);
      setError(null);

      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      abortControllerRef.current = new AbortController();

      try {
        const response = await fetch(
          `${API_URL}?q=${encodeURIComponent(
            input
          )}&key=${API_KEY}&countrycode=IN&limit=5`,
          { signal: abortControllerRef.current.signal }
        );

        const data = await response.json();

        if (data.status.code !== 200) {
          setError("API Error: " + data.status.message);
          setSuggestions([]);
          setIsLoading(false);
          return;
        }

        if (!data.results || data.results.length === 0) {
          setError("No results found.");
          setSuggestions([]);
          setIsLoading(false);
          return;
        }

        const locations = data.results.map((place: any) => ({
          display_name: place.formatted,
          lat: place.geometry.lat,
          lon: place.geometry.lng,
        }));

        if (label === "From") {
          setSuggestions([
            { display_name: "📍 Use Current Location", lat: "", lon: "" }, // Add "Use Current Location" at the top
            ...locations,
          ]);
        } else {
          setSuggestions(locations);
        }
      } catch (error: any) {
        if (error.name !== "AbortError") {
          setError("Failed to fetch location data.");
        }
      } finally {
        setIsLoading(false);
      }
    }, 200),
    [label]
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setShowSuggestions(true);
    fetchLocations(e.target.value);
  };

  const handleSelectLocation = (location: Location) => {
    if (location.display_name === "📍 Use Current Location") {
      handleUseCurrentLocation();
      return;
    }

    setQuery(location.display_name);
    setShowSuggestions(false);
    onSelectLocation(location);
  };

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser.");
      return;
    }

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const response = await fetch(
            `${API_URL}?q=${latitude}+${longitude}&key=${API_KEY}`
          );
          const data = await response.json();

          if (data.status.code === 200 && data.results.length > 0) {
            const location = {
              display_name: "Current Location",
              lat: latitude.toString(),
              lon: longitude.toString(),
            };
            handleSelectLocation(location);
          } else {
            setError("Failed to fetch address for your location.");
          }
        } catch {
          setError("Failed to fetch location data.");
        } finally {
          setIsLoading(false);
        }
      },
      () => {
        setError("Failed to get your location.");
        setIsLoading(false);
      }
    );
  };

  const handleFocus = () => {
    setShowSuggestions(true);

    if (label === "From") {
      setSuggestions([
        { display_name: "📍 Use Current Location", lat: "", lon: "" },
      ]);
    }
  };

  return (
    <div ref={containerRef} className="relative">
      <CustomTextField
        fullWidth
        label={label}
        value={query}
        onChange={handleInputChange}
        onFocus={handleFocus}
      />
      {isLoading && (
        <Typography
          color="primary"
          className="absolute top-1/2 left-1/2 -translate-y-1/2 translate-x-0"
        >
          Searching...
        </Typography>
      )}
      {error && (
        <Typography
          color="error"
          className="absolute top-1/2 left-1/2 -translate-y-1/2 translate-x-0"
        >
          {error}
        </Typography>
      )}
      {showSuggestions && suggestions.length > 0 && (
        <List
          sx={{
            position: "absolute",
            zIndex: 999,
            backgroundColor: "white",
            width: "100%",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            borderRadius: "0 0 8px 8px",
            maxHeight: 200,
            overflowY: "auto",
          }}
        >
          {suggestions.map((location, index) => (
            <ListItem key={index}>
              <ListItemButton onClick={() => handleSelectLocation(location)}>
                {location.display_name}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
};

export default LocationSearch;
