import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Typography,
  Link,
} from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import classes from "../utils/classes";
import { urlForThumbnail, urlFor } from "../utils/image";
import NextLink from "next/link";
const ProductosIndex = ({ products, filteredH, filteredL, filteredT }) => {
  const [indexI, setindexI] = useState(0);
  const [indexC, setindexC] = useState(1);
  const [indexD, setindexD] = useState(2);

  const [category, setCategory] = useState(filteredH);
  ////////////////////////////////////////////////////////////////

  const RightHanlder = () => {
    if (
      indexI < category.length - 1 &&
      indexC < category.length - 1 &&
      indexD < category.length - 1
    ) {
      setindexI(indexI + 1);
      setindexC(indexC + 1);
      setindexD(indexD + 1);
    } else {
      if (indexD === category.length - 1) {
        setindexI(indexI + 1);
        setindexC(indexC + 1);
        setindexD(0);
      } else {
        if (indexC === category.length - 1) {
          setindexI(indexI + 1);
          setindexC(0);
          setindexD(indexD + 1);
        } else {
          if (indexI === category.length - 1) {
            setindexI(0);
            setindexC(indexC + 1);
            setindexD(indexD + 1);
          }
        }
      }
    }
  };

  const leftHanlder = () => {
    if (indexI === 0 && indexC === 1 && indexD === 2) {
      setindexI(category.length - 1);
      setindexC(0);
      setindexD(1);
    } else {
      if (indexI === category.length - 1) {
        setindexI(indexI - 1);
        setindexC(category.length - 1);
        setindexD(0);
      } else {
        if (indexC === category.length - 1) {
          setindexI(indexI - 1);
          setindexC(indexC - 1);
          setindexD(category.length - 1);
        } else {
          setindexI(indexI - 1);
          setindexC(indexC - 1);
          setindexD(indexD - 1);
        }
      }
    }
  };

  return (
    <Box>
      <Box display="flex" sx={classes.productosIndex}>
        <Typography>
          Envio gratis a todo el pais por compras superiores a $200.000
        </Typography>
      </Box>

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
              <Button
                onClick={() => {
                  setCategory(filteredT);
                }}
              >
                <Typography component="h6" variant="h6">
                  T-Shirt
                </Typography>
              </Button>
            </Grid>
            <Grid item>
              <Button
                onClick={() => {
                  setCategory(filteredH);
                }}
              >
                <Typography component="h6" variant="h6">
                  Hoodies
                </Typography>
              </Button>
            </Grid>
            <Grid item>
              <Button
                onClick={() => {
                  setCategory(filteredL);
                }}
              >
                <Typography component="h6" variant="h6">
                  Longs
                </Typography>
              </Button>
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
                  category[indexI].image && category[indexI].image[0]
                )}
              ></img>
            </Grid>
            <Grid item sx={classes.imageP}>
              <img
                width="400"
                height="400"
                src={urlFor(
                  category[indexC].image && category[indexC].image[0]
                )}
              ></img>
            </Grid>{" "}
            <Grid item sx={classes.imageP}>
              <img
                width="200"
                height="200"
                src={urlFor(
                  category[indexD].image && category[indexD].image[0]
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
                onClick={leftHanlder}
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
                    leftHanlder();
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
                <Button
                  onClick={() => {
                    RightHanlder();
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
            <NextLink
              href={`/product/${category[indexC].slug.current}`}
              passHref
            >
              <Link sx={{ textDecoration: "none" }}>
                {category[indexC].name}
              </Link>
            </NextLink>
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default ProductosIndex;
