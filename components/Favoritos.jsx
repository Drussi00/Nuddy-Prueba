import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";

import FavoritosCard from "./FavoritosCard";
export default function Favoritos({ favorito }) {
  useEffect(() => {
    console.log(favorito);
  });
  return (
    <Box sx={{ height: "370px" }}>
      <Typography
        sx={{ fontSize: "2rem", fontWeight: "bold", textAlign: "center" }}
      >
        Our Favorites
      </Typography>
      <Grid
        paddingTop={5}
        position="relative"
        left="80px"
        container
        spacing={1}
        alignItems="center"
        justifyconten="center"
        margin="auto"
      >
        {favorito.map((fav) => {
          return (
            <Grid item md={2.6} sm={12} key={fav.key}>
              <FavoritosCard product={fav} />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
