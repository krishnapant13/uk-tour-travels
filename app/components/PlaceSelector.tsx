// "use client";

// import React, { useState, useEffect } from "react";
// import { useSearchParams } from "next/navigation";
// import { Autocomplete, CircularProgress, TextField } from "@mui/material";

// interface LocationSelectProps {
//   value: string;
//   onChange: (value: string) => void;
// }
// interface Place {
//   components: {
//     city?: string;
//     town?: string;
//     village?: string;
//   };
//   formatted: string;
// }

// const LocationSelect: React.FC<LocationSelectProps> = ({ value, onChange }) => {
//   const searchParams = useSearchParams();
//   const cityFromUrl = searchParams.get("city") || "";

//   const [query, setQuery] = useState<string>(cityFromUrl);
//   const [suggestions, setSuggestions] = useState<string[]>([]);
//   const [loading, setLoading] = useState<boolean>(false);

//   const fetchSuggestions = async (query: string) => {
//     if (!query) return;
//     setLoading(true);
//     try {
//       const response = await fetch(
//         `https://api.opencagedata.com/geocode/v1/json?q=${query},India&key=${process.env.NEXT_PUBLIC_MAP_KEY}&limit=5`
//       );
//       const data = await response.json();

//       if (data.results) {
//         const uniqueCities = Array.from(
//           new Set(
//             data.results.map(
//               (place: Place) =>
//                 place.components.city ||
//                 place.components.town ||
//                 place.components.village ||
//                 place.formatted
//             )
//           )
//         ) as string[];

//         setSuggestions(uniqueCities);
//       }
//     } catch (error) {
//       console.error("Error fetching locations:", error);
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     if (!query) return;
//     const timer = setTimeout(() => fetchSuggestions(query), 500);
//     return () => clearTimeout(timer);
//   }, [query]);

//   return (
//     <Autocomplete
//       freeSolo
//       value={value || query}
//       onInputChange={(_, newInputValue) => setQuery(newInputValue)}
//       onChange={(_, newValue) => onChange(newValue || "")}
//       options={suggestions}
//       loading={loading}
//       renderInput={(params) => (
//         <TextField
//           {...params}
//           label="Attraction"
//           variant="filled"
//           InputProps={{
//             ...params.InputProps,
//             disableUnderline: true,
//             endAdornment: (
//               <>
//                 {loading ? (
//                   <CircularProgress color="inherit" size={20} />
//                 ) : null}
//                 {params.InputProps.endAdornment}
//               </>
//             ),
//           }}
//         />
//       )}
//       sx={{ width: { xs: "100%", sm: "100%", md: "20%" } }}
//     />
//   );
// };

// export default LocationSelect;
