import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import classes from "../utils/classes";
import { urlForThumbnail, urlFor } from "../utils/image";

const ProductosIndex = ({ products }) => {
  const [indexI, setindexI] = useState(0);
  const [indexC, setindexC] = useState(1);
  const [indexD, setindexD] = useState(2);
  const changeSweaterUpHanlder = () => {
    {
      console.log(products.length);
      console.log(indexD);
    }
    if (indexD === products.length) {
      setindexI(0);
      setindexC(1);
      setindexD(2);
    }
    if (indexD <= products.length - 2) {
      setindexI(indexI + 1);
      setindexC(indexC + 1);
      setindexD(indexD + 1);
    } else {
      if (indexD === products.length - 1) {
        setindexI(products.length - 2);
        setindexC(products.length - 1);
        setindexD(0);
      }
    }
  };
  const changeSweaterDownHanlder = () => {};
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
                src={urlFor(
                  products[indexI].image && products[indexI].image[0]
                )}
              ></img>
            </Grid>
            <Grid item sx={classes.imageP}>
              <img
                width="400"
                height="400"
                src={urlFor(
                  products[indexC].image && products[indexC].image[0]
                )}
              ></img>
            </Grid>{" "}
            <Grid item sx={classes.imageP}>
              <img
                width="200"
                height="200"
                src={urlFor(
                  products[indexD].image && products[indexD].image[0]
                )}
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
                onClick={changeSweaterUpHanlder}
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
                <Button
                  onClick={() => {
                    changeSweaterUpHanlder();
                  }}
                  style={{
                    width: "10px",
                    height: "40px",
                    backgroundColor: "white",
                    borderRadius: "50%",
                    fontSize: "16px",
                    backgroundColor: "black ",
                  }}
                ></Button>
              </Grid>
            </Grid>

            <Grid item>
              <button
                onClick={() => {
                  changeSweaterUpHanlder;
                }}
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
