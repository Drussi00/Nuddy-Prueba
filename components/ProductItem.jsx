import React from "react";
import NextLink from "next/link";
import {
  Card,
  CardActionArea,
  CardActions,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Rating,
  Box,
} from "@mui/material";
import { urlForThumbnail } from "../utils/image";
import { useRouter } from "next/router";
import classes from "../utils/classes";

const productItem = ({ product, addToCartHandler }) => {
  const router = useRouter();
  return (
    <Box raised={true} sx={classes.card}>
      <NextLink href={`/product/${product.slug.current}`} passHref>
        <CardActionArea>
          <CardMedia
            component="img"
            image={urlForThumbnail(product.image && product.image[0])}
            title={product.name}
            sx={{ backgroundColor: "#F3F3F3", borderRadius: "20px" }}
          ></CardMedia>
        </CardActionArea>
      </NextLink>{" "}
      <CardContent>
        <Typography component="h5" variant="h5" align="center">
          {product.name}
        </Typography>{" "}
        <Typography align="center">${product.price}</Typography>
      </CardContent>
      <CardActions></CardActions>
    </Box>
  );
};

export default productItem;
