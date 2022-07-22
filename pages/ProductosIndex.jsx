import { Box, Container, Divider, Grid, Typography } from "@mui/material";
import React from "react";
import classes from "../utils/classes";

const ProductosIndex = ({ products }) => {
  return (
    <Box>
      <Divider sx={{ borderWidth: "1px", borderColor: "black" }} />
      <Box display="flex" sx={classes.productosIndex}>
        <Typography>
          Envio gratis a todo el pais por compras superiores a $200.000
        </Typography>
      </Box>
      <Divider sx={{ borderWidth: "1px", borderColor: "black" }} />
      <Container>
        <Box
          display="flex"
          sx={{ justifyContent: "center", paddingTop: "20px" }}
        >
          <Typography component="h4" variant="h4">
            Productos
          </Typography>
        </Box>
        <Box display="flex">
          <Grid
            container
            spacing={10}
            sx={{
              justifyContent: "center",
              paddingTop: "20px",
              alignItems: "center",
            }}
          >
            <Grid item>
              <Typography component="h6" variant="h6">
                T-Shirt
              </Typography>
            </Grid>
            <Grid item>
              <Typography component="h6" variant="h6">
                Hoodies
              </Typography>
            </Grid>
            <Grid item>
              <Typography component="h6" variant="h6">
                Longs
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <Box display="flex">
          <Grid container>
            <Grid item></Grid>
            <Grid item></Grid>
            <Grid item></Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default ProductosIndex;
