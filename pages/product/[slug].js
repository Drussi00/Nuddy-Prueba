import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Grid,
  List,
  ListItem,
  Typography,
  Divider,
  ButtonGroup,
  Container,
  useMediaQuery,
} from "@mui/material";
import Image from "next/image";

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
  const { dispatch } = useContext(Store);
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
  }, [slug, state]);
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
      } else if (size === "L" && quantity < product.l) {
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
      } else if (size === "L" && quantity > 0) {
        setquantity(quantity - 1);
      } else {
        enqueueSnackbar("La cantidad debe ser mayor a 0", { variant: "error" });
      }
    } else {
      enqueueSnackbar("Selecione talla", { variant: "error" });
    }
  };
  const buyNowHandler = async () => {
    // const { data } = await axios.get(`/api/products/${product._id}`);

    if (quantity === 0) {
      enqueueSnackbar("Seleciona talla", { variant: "error" });

      return;
    }

    dispatch({
      type: "CART_ADD_ITEM",
      payload: {
        _key: product._id,
        name: product.name,
        countInStockS: product.s,
        countInStockM: product.m,
        countInStockL: product.l,
        slug: product.slug.current,
        price: product.price,
        image: urlForThumbnail(product.image && product.image[0]),
        quantity,
        size,
      },
    });
    enqueueSnackbar(`${product.name} Agregada al Carrito`, {
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
        countInStockS: product.s,
        countInStockM: product.m,
        countInStockL: product.l,
        slug: product.slug.current,
        price: product.price,
        image: urlForThumbnail(product.image && product.image[0]),
        quantity,
        size,
      },
    });
    enqueueSnackbar(`${product.name} added to the cart`, {
      variant: "success",
    });
    router.push("/");
  };
  const [index, setIndex] = useState(0);
  const isDesktop = useMediaQuery("(min-width:600px)");
  const [selectedS, setselectedS] = useState(false);
  const [selectedM, setselectedM] = useState(false);
  const [selectedL, setselectedL] = useState(false);
  return (
    <Layout title={product?.title}>
      <Box display="flex" sx={classes.productosIndex}>
        <Typography
          sx={{ fontWeight: "bold", fontFamily: " coolvetica, sans-serif" }}
        >
          Envio gratis a todo el pais por compras superiores a $200.000
        </Typography>
      </Box>
      <Container>
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Alert variant="error">{error}</Alert>
        ) : (
          <Box>
            <Grid container spacing={6}>
              <Grid item md={6} xs={12}>
                <Typography
                  sx={isDesktop ? classes.hidden : classes.titleMobile}
                >
                  {product.name}
                </Typography>
                <Box display={"flex"} sx={{ justifyContent: "center" }}>
                  <Image
                    className="big-image"
                    src={urlFor(product.image && product.image[index])}
                    key={product.image._key}
                    alt={product.name}
                    width={400}
                    height={400}
                  />
                </Box>
                <Box sx={{ zIndex: "1" }}>
                  <div className="small-images-container">
                    {product.image?.map((item, i) => (
                      <Image
                        key={item.key}
                        width={70}
                        height={70}
                        alt={item.name}
                        src={urlFor(item)}
                        className={
                          i === index
                            ? "small-image selected-image"
                            : "small-image"
                        }
                        onMouseEnter={() => setIndex(i)}
                      />
                    ))}
                  </div>
                </Box>
              </Grid>
              <Grid item md={6} xs={12}>
                <List>
                  <ListItem>
                    <Typography sx={classes.title}>{product.name}</Typography>
                  </ListItem>
                  <ListItem>
                    <Typography sx={classes.bold}>
                      {" "}
                      ${new Intl.NumberFormat().format(parseInt(product.price))}
                    </Typography>
                  </ListItem>
                  <Divider sx={classes.line} />
                  <ListItem>
                    <Typography
                      sx={{
                        fontWeight: "bold",
                        fontFamily: " coolvetica, sans-serif",
                      }}
                    >
                      Tallas:
                    </Typography>
                  </ListItem>
                  <listItem>
                    <Grid container spacing={2}>
                      <Grid item>
                        <Button
                          size="small"
                          variant=""
                          onClick={() => {
                            setsize("S");
                            setquantity(1);
                            setselectedS(true);
                            setselectedM(false);
                            setselectedL(false);
                          }}
                          sx={selectedS ? classes.but : classes.selected}
                        >
                          S
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button
                          size="small"
                          variant=""
                          onClick={() => {
                            setsize("M");
                            setquantity(1);
                            setselectedS(false);
                            setselectedM(true);
                            setselectedL(false);
                          }}
                          sx={selectedM ? classes.but : classes.selected}
                        >
                          M
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button
                          size="small"
                          variant=""
                          onClick={() => {
                            setsize("L");
                            setselectedS(false);
                            setselectedM(false);
                            setselectedL(true);
                            setquantity(1);
                          }}
                          sx={selectedL ? classes.but : classes.selected}
                        >
                          L
                        </Button>
                      </Grid>
                    </Grid>
                  </listItem>
                  <ListItem>
                    <Typography
                      sx={{
                        fontWeight: "bold",
                        fontFamily: " coolvetica, sans-serif",
                      }}
                    >
                      Cantidad:
                    </Typography>
                  </ListItem>
                  <ButtonGroup
                    sx={classes.buttonGroup}
                    variant="outlined"
                    aria-label="outlined button group"
                  >
                    <Button onClick={decQuantity} sx={classes.buttonGroup}>
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
                      sx={classes.buyNow}
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
                        <Typography fontSize="0.6rem">
                          {product.envio}
                        </Typography>
                      </Grid>
                      <ListItem></ListItem>
                    </Grid>
                  </ListItem>
                </List>
              </Grid>
            </Grid>
          </Box>
        )}
      </Container>
    </Layout>
  );
}

export function getServerSideProps(context) {
  return {
    props: { slug: context.params.slug },
  };
}
