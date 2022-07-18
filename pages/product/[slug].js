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
  const [size, setsize] = useState("");
  const [quantity, setquantity] = useState(0);

  const addQuantity = async () => {
    if (size !== "") {
      if (size === "S" && quantity < product.s) {
        setquantity(quantity + 1);
        console.log(quantity);
      } else if (size === "M" && quantity < product.m) {
        setquantity(quantity + 1);
        console.log(quantity);
      } else if ((size = "L" && quantity < product.l)) {
        setquantity(quantity + 1);
      } else {
        enqueueSnackbar("Maxima cantidad alcanzada", { variant: "error" });
      }
    } else {
      enqueueSnackbar("Selecione talla", { variant: "error" });
    }
  };
  const decQuantity = async () => {
    if (size !== "") {
      if (size === "S" && quantity > 0) {
        setquantity(quantity - 1);
        console.log(quantity);
      } else if (size === "M" && quantity > 0) {
        setquantity(quantity - 1);
        console.log(quantity);
      } else if ((size = "L" && quantity > 0)) {
        setquantity(quantity - 1);
      } else {
        enqueueSnackbar("La cantidad debe ser mayor a 0", { variant: "error" });
      }
    } else {
      enqueueSnackbar("Selecione talla", { variant: "error" });
    }
  };
  const buyNowHandler = async () => {
    const existItem = cart.cartItems.find((x) => x._id === product._id);

    const { data } = await axios.get(`/api/products/${product._id}`);
    console.log(data);
    if (quantity === 0) {
      enqueueSnackbar("Seleciona talla", { variant: "error" });

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
        size,
      },
    });
    enqueueSnackbar(`${product.name} added to the cart`, {
      variant: "success",
    });
    router.push("/cart");
  };
  const addToCartHandler = async () => {
    const { data } = await axios.get(`/api/products/${product._id}`);
    console.log(data);
    if (quantity === 0) {
      enqueueSnackbar("Seleciona talla", { variant: "error" });

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
        size,
      },
    });
    enqueueSnackbar(`${product.name} added to the cart`, {
      variant: "success",
    });
    router.push("/");
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
                src={urlFor(product.image && product.image[0])}
                key={product.image._key}
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
                      <Button
                        sx={classes.but}
                        size="small"
                        variant="contained"
                        onClick={() => {
                          setsize("S");
                          setquantity(1);
                          console.log(size);
                        }}
                      >
                        S
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button
                        sx={classes.but}
                        size="small"
                        variant="contained"
                        onClick={() => {
                          setsize("M");
                          setquantity(1);
                          console.log(size);
                        }}
                      >
                        M
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button
                        sx={classes.but}
                        size="small"
                        variant="contained"
                        onClick={() => {
                          setsize("L");
                          console.log(size);
                          setquantity(1);
                        }}
                      >
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
                  <Button
                    onClick={decQuantity}
                    color="primary"
                    sx={classes.buttonGroup}
                  >
                    -
                  </Button>
                  <Button sx={classes.buttonQ}>{quantity}</Button>
                  <Button sx={classes.buttonGroup} onClick={addQuantity}>
                    +
                  </Button>
                </ButtonGroup>
                <ListItem>
                  <Button
                    sx={classes.blackline}
                    onClick={addToCartHandler}
                    fullWidth
                    variant=""
                  >
                    Agregar al carrito
                  </Button>
                </ListItem>
                <ListItem>
                  <Button
                    onClick={buyNowHandler}
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
