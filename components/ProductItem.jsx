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
} from "@mui/material";
import { urlForThumbnail } from "../utils/image";
import { useRouter } from "next/router";
const productItem = ({ product, addToCartHandler }) => {
  const router = useRouter();
  return (
    <Card>
      <NextLink href={`/product/${product.slug.current}`} passHref>
        <CardActionArea>
          <CardMedia
            component="img"
            image={urlForThumbnail(product.image)}
            title={product.name}
          ></CardMedia>
          <CardContent>
            <Typography>{product.name}</Typography>
            <Rating value={product.rating} readonly></Rating>
          </CardContent>
        </CardActionArea>
      </NextLink>
      <CardActions>
        <Typography>${product.price}</Typography>
      </CardActions>

      <Button size="small" color="primary">
        <NextLink href={`/product/${product.slug.current}`} passHref>
          add to cart
        </NextLink>
      </Button>
    </Card>
  );
};

export default productItem;
