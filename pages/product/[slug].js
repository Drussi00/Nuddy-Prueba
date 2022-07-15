import {
  Alert,
  Box,
  Button,
  Card,
  CircularProgress,
  Grid,
  Link,
  List,
  ListItem,
  Rating,
  Typography,
  Divider,
  ButtonGroup,
} from "@mui/material";
import Image from "next/image";
import NextLink from "next/link";
import { useContext, useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import Layout from "../../components/Layout";
import classes from "../../utils/classes";
import client from "../../utils/client";
import { urlFor, urlForThumbnail } from "../../utils/image";
import { Store } from "../../utils/Store";
import axios from "axios";
import { useRouter } from "next/router";

export default function ProductScreen(props) {
  const router = useRouter();
  const { slug } = props;
  const {
    state: { cart },
    dispatch,
  } = useContext(Store);
  const { enqueueSnackbar } = useSnackbar();
  const [state, setState] = useState({
    product: null,
    loading: true,
    error: "",
  });
  const { product, loading, error } = state;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const product = await client.fetch(
          `
            *[_type == "product" && slug.current == $slug][0]`,
          { slug }
        );
        setState({ ...state, product, loading: false });
      } catch (err) {
        setState({ ...state, error: err.message, loading: false });
      }
    };
    fetchData();
  }, []);

  const addToCartHandler = async () => {
    const existItem = cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < quantity) {
      enqueueSnackbar("Sorry. Product is out of stock", { variant: "error" });
      return;
    }

    dispatch({
      type: "CART_ADD_ITEM",
      payload: {
        _key: product._id,
        name: product.name,
        countInStock: product.countInStock,
        slug: product.slug.current,
        price: product.price,
        image: urlForThumbnail(product.image),
        quantity,
      },
    });
    enqueueSnackbar(`${product.name} added to the cart`, {
      variant: "success",
    });
    router.push("/cart");
  };
  return (
    <Layout title={product?.title}>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert variant="error">{error}</Alert>
      ) : (
        <Box>
          <Grid container spacing={6}>
            <Grid item md={6} xs={12}>
              <Image
                src={urlFor(product.image)}
                alt={product.name}
                layout="responsive"
                width={640}
                height={640}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <List>
                <ListItem>
                  <Typography sx={classes.title}>{product.name}</Typography>
                </ListItem>
                <ListItem>
                  <Typography sx={classes.bold}>${product.price}</Typography>
                </ListItem>
                <Divider sx={classes.line} />
                <ListItem>
                  <Typography>Tallas</Typography>
                </ListItem>
                <listItem>
                  <Grid container spacing={2}>
                    <Grid item>
                      <Button sx={classes.but} size="small" variant="contained">
                        S
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button sx={classes.but} size="small" variant="contained">
                        M
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button sx={classes.but} size="small" variant="contained">
                        L
                      </Button>
                    </Grid>
                  </Grid>
                </listItem>
                <ListItem>
                  <Typography>Cantidad</Typography>
                </ListItem>
                <ButtonGroup
                  sx={classes.buttonGroup}
                  variant="outlined"
                  aria-label="outlined button group"
                >
                  <Button color="primary" sx={classes.buttonGroup}>
                    -
                  </Button>
                  <Button sx={classes.buttonQ}>0</Button>
                  <Button sx={classes.buttonGroup}>+</Button>
                </ButtonGroup>
                <ListItem>
                  <Button
                    sx={classes.blackline}
                    onClick={() => router.push("/")}
                    fullWidth
                    variant=""
                  >
                    Agregar al carrito
                  </Button>
                </ListItem>
                <ListItem>
                  <Button
                    onClick={addToCartHandler}
                    fullWidth
                    variant="contained"
                    sx={classes.radius}
                  >
                    Comprar ahora
                  </Button>
                </ListItem>
                <ListItem>
                  <Grid container spacing={0}>
                    <Grid item md={6}>
                      <Typography fontSize="0.6rem">
                        {product.description}
                      </Typography>
                      <Typography fontSize="0.6rem">
                        {product.materiales}
                      </Typography>
                      <Typography fontSize="0.6rem">
                        {product.cantidadmateriales}
                      </Typography>
                      <Typography fontSize="0.6rem">{product.envio}</Typography>
                    </Grid>
                    <ListItem></ListItem>
                  </Grid>
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </Box>
      )}
    </Layout>
  );
}

export function getServerSideProps(context) {
  return {
    props: { slug: context.params.slug },
  };
}
