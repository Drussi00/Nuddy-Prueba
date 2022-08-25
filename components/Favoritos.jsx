import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";

export default function Favoritos({ products }) {
  useEffect(() => {
    console.log(products);
  });
  return (
    <Box sx={{ height: "450px" }}>
      <Typography
        sx={{ fontSize: "2rem", fontWeight: "bold", textAlign: "center" }}
      >
        Our Favorites
      </Typography>
      <Box display="flex" justifyContent={"center"}>
        hola
      </Box>
    </Box>
  );
}
