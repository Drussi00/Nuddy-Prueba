import {
  Box,
  Button,
  Grid,
  Typography,
  Link,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import classes from "../utils/classes";
import { urlFor } from "../utils/image";
import NextLink from "next/link";
const ProductosIndex = ({ filteredH, filteredS, filteredT, filterdC }) => {
  const [indexI, setindexI] = useState(0);
  const [indexC, setindexC] = useState(1);
  const [indexD, setindexD] = useState(2);

  const [category, setCategory] = useState(filteredH);
  ////////////////////////////////////////////////////////////////

  const rightHanlder = () => {
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
  const isDesktop = useMediaQuery("(min-width:600px)");
  return (
    <Box
      sx={{ backgroundColor: "#f1f1f1", zIndex: "-4", paddingBottom: "70px" }}
    >
      <Box display="flex" sx={{ justifyContent: "center", paddingTop: "20px" }}>
        <Typography
          sx={classes.productIndex}
          component="h1"
          variant="h1"
          className="title"
        >
          Choose Your style
        </Typography>
      </Box>
      <Box display="flex">
        <Grid
          container
          spacing={isDesktop ? 8 : 4}
          sx={{
            zIndex: "100",
            justifyContent: "center",
            paddingTop: "20px",
            alignItems: "center",
          }}
        >
          <Grid item>
            <Button
              sx={{ ...classes.catBut }}
              onClick={() => {
                setCategory(filteredT);
              }}
            >
              <Typography sx={classes.productIndex} component="h6" variant="h6">
                T-Shirts
              </Typography>
            </Button>
          </Grid>
          <Grid item>
            <Button
              onClick={() => {
                setCategory(filteredH);
              }}
              sx={classes.catBut}
            >
              <Typography sx={classes.productIndex} component="h6" variant="h6">
                Hoodies
              </Typography>
            </Button>
          </Grid>
          <Grid item>
            <Button
              sx={{ ...classes.catBut }}
              onClick={() => {
                setCategory(filterdC);
              }}
            >
              <Typography sx={classes.productIndex} component="h6" variant="h6">
                Cargo
              </Typography>
            </Button>
          </Grid>
          <Grid item>
            <Button
              onClick={() => {
                setCategory(filteredS);
              }}
              sx={classes.catBut}
            >
              <Typography sx={classes.productIndex} component="h6" variant="h6">
                Shorts
              </Typography>
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Box display="flex">
        <Grid
          container
          spacing={8}
          sx={{
            justifyContent: "center",
            paddingTop: "20px",
            alignItems: "center",
          }}
        >
          <Grid item md={1} sm={0} className="butleft">
            <div>
              <Button onClick={leftHanlder}>
                <span
                  className="left"
                  style={{
                    zIndex: "1",
                    "&:after": { borderTop: "0.5em solid blue" },
                  }}
                ></span>
              </Button>
            </div>
          </Grid>
          <Grid item sx={isDesktop ? classes.visibleI : classes.hidden}>
            <img
              width="200"
              height="200"
              src={urlFor(category[indexI].image && category[indexI].image[0])}
            ></img>
          </Grid>
          <Grid item className="imageC" sx={{ ...classes.imageP }}>
            <img
              className="imageP"
              width={isDesktop ? "400px" : "300px"}
              height={isDesktop ? "400px" : "300px"}
              src={urlFor(category[indexC].image && category[indexC].image[0])}
            ></img>
          </Grid>{" "}
          <Grid item sx={isDesktop ? classes.visibleI : classes.hidden}>
            <img
              width="200"
              height="200"
              src={urlFor(category[indexD].image && category[indexD].image[0])}
            ></img>
          </Grid>
          <Grid
            sx={{ position: "relative", right: "50px" }}
            item
            md={1}
            className="butright"
          >
            <div>
              <Button onClick={rightHanlder}>
                <span className="right"></span>
              </Button>
            </div>
          </Grid>
        </Grid>
      </Box>

      <Box
        className="butname"
        display="flex"
        sx={{
          justifyContent: "center",
          paddingTop: "0px",
          alignItems: "center",
          paddingBottom: "",
        }}
      >
        <NextLink href={`/product/${category[indexC].slug.current}`} passHref>
          <Link sx={{ textDecoration: "none" }}>
            <Button
              size="large"
              sx={{
                color: "white",
                backgroundColor: "black",
                border: " 2px solid black",
                width: "200px",
                fontWeight: "bold",
                fontFamily: " coolvetica, sans-serif",
                "&:hover": { color: "black" },
              }}
            >
              {category[indexC].name}
            </Button>
          </Link>
        </NextLink>
      </Box>
    </Box>
  );
};

export default ProductosIndex;
