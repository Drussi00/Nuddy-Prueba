import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import classes from "../utils/classes";
import { urlForThumbnail, urlFor } from "../utils/image";

const ProductosIndex = ({ products }) => {
  {
    console.log(products[0].image[0]);
  }
  return (
    <Box>
      <Box display="flex" sx={classes.productosIndex}>
        <Typography>
          Envio gratis a todo el pais por compras superiores a $200.000
        </Typography>
      </Box>

      <Container sx={{}}>
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
        <Box
          display="flex"
          sx={{
            justifyContent: "center",
            paddingTop: "20px",
            alignItems: "center",
            paddingBottom: "50px",
          }}
        >
          <Grid
            container
            spacing={10}
            sx={{
              justifyContent: "center",
              paddingTop: "20px",
              alignItems: "center",
            }}
          >
            <Grid item sx={classes.imageP}>
              <img
                width="200"
                height="200"
                src={urlFor(products[0].image && products[0].image[0])}
              ></img>
            </Grid>
            <Grid item sx={classes.imageP}>
              <img
                width="400"
                height="400"
                src={urlFor(products[1].image && products[1].image[1])}
              ></img>
            </Grid>{" "}
            <Grid item sx={classes.imageP}>
              <img
                width="200"
                height="200"
                src={urlFor(products[2].image && products[2].image[0])}
              ></img>
            </Grid>
          </Grid>
        </Box>
        <Box
          display="flex"
          sx={{
            width: "80%",
            height: "4px",
            backgroundColor: "black",
            margin: "auto",
          }}
        ></Box>
        <Box
          display="flex"
          sx={{
            justifyContent: "center",
            paddingTop: "20px",
            alignItems: "center",
          }}
        >
          <Grid container spacing={50} sx={{ justifyContent: "center" }}>
            <Grid item>
              <button
                style={{
                  width: "30px",
                  height: "30px",
                  backgroundColor: "white",
                  borderRadius: "50%",
                  fontSize: "16px",
                }}
              ></button>
            </Grid>

            <Grid item>
              <Grid>
                <button
                  style={{
                    width: "30px",
                    height: "30px",
                    backgroundColor: "white",
                    borderRadius: "50%",
                    fontSize: "16px",
                    backgroundColor: "black ",
                  }}
                ></button>
              </Grid>
            </Grid>

            <Grid item>
              <button
                style={{
                  width: "30px",
                  height: "30px",
                  backgroundColor: "white",
                  borderRadius: "50%",
                  fontSize: "16px",
                }}
              ></button>
            </Grid>
          </Grid>
        </Box>
        <Box
          display="flex"
          sx={{
            justifyContent: "center",
            paddingTop: "20px",
            alignItems: "center",
            paddingBottom: "60px",
          }}
        >
          <Button
            size="large"
            sx={{
              backgroundColor: "white",
              borderRadius: "10px",
              color: "black",
              border: " 2px solid black",
              width: "12%",
            }}
          >
            The Basic
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default ProductosIndex;
