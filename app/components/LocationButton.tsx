import React, { useState, useEffect, useRef, useCallback } from "react";
import { List, ListItem, ListItemButton, Typography } from "@mui/material";
import CustomTextField from "./CustomTextField";
import { debounce } from "lodash";
import { useParams } from "next/navigation";

interface Location {
  display_name: string;
  lat: string;
  lon: string;
}
interface Place {
  formatted: string;
  geometry: {
    lat: string;
    lng: string;
  };
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
  const params = useParams();
  const city = Array.isArray(params?.city)
    ? params.city[0]
    : params?.city ?? "";

  const capitalizedCity = city
    ? city.charAt(0).toUpperCase() + city.slice(1)
    : "";

  const [query, setQuery] = useState<string>(
    label === "To" || label === "Attraction" ? capitalizedCity : ""
  );
  const [suggestions, setSuggestions] = useState<Location[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const fetchLocations = useCallback(
    async (input: string, autofill = false) => {
      if (input.length < 3) {
        setSuggestions([]);
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
          )}&key=${API_KEY}&countrycode=IN&limit=1&no_annotations=1&pretty=1`,
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

        const locations = data.results.map((place: Place) => ({
          display_name: place.formatted,
          lat: place.geometry.lat,
          lon: place.geometry.lng,
        }));

        setSuggestions(locations);

        if (
          autofill &&
          locations.length > 0 &&
          (label === "To" || label === "Attraction")
        ) {
          const firstLocation = locations[0];
          setQuery(firstLocation.display_name);
          onSelectLocation(firstLocation);
        }
      } catch (error: unknown) {
        if ((error as Error).name !== "AbortError") {
          setError("Failed to fetch location data.");
        }
      } finally {
        setIsLoading(false);
      }
    },
    [onSelectLocation, label]
  );

  useEffect(() => {
    if (capitalizedCity && (label === "To" || label === "Attraction")) {
      fetchLocations(capitalizedCity, true);
    }
  }, [capitalizedCity, label, fetchLocations]);

  const debouncedFetchLocations = useRef(
    debounce((input) => fetchLocations(input), 200)
  ).current;

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
    debouncedFetchLocations(e.target.value);
  };

  const handleSelectLocation = (location: Location) => {
    setQuery(location.display_name);
    setShowSuggestions(false);
    onSelectLocation(location);
  };

  const handleFocus = () => {
    setShowSuggestions(true);
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
        <Typography color="primary" className="absolute top-1/2 left-1/2">
          Searching...
        </Typography>
      )}
      {error && (
        <Typography color="error" className="absolute top-1/2 left-1/2">
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
