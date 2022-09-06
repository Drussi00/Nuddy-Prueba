import { Box, Grid, Typography } from "@mui/material";
import React from "react";

import FavoritosCard from "./FavoritosCard";
export default function Favoritos({ favorito }) {
  return (
    <Box>
      <Typography
        sx={{ fontSize: "2rem", fontWeight: "bold", textAlign: "center" }}
      >
        Our Favorites
      </Typography>
      <Grid
        width="65%"
        paddingTop={5}
        container
        spacing={1}
        alignItems="center"
        justifyconten="center"
        margin="auto"
      >
        {favorito.map((fav) => {
          return (
            <Grid item md={3} xm={6} sm={6} key={fav.key}>
              <FavoritosCard product={fav} />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
