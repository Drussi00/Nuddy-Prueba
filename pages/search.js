import "bootstrap/dist/css/bootstrap.min.css";
import {
  Alert,
  Button,
  ButtonGroup,
  CircularProgress,
  Container,
  FormControl,
  Grid,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Rating,
  Select,
  Typography,
} from "@mui/material";
import NextLink from "next/link";
import { Box } from "@mui/system";
import axios from "axios";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import React, { useContext, useEffect, useState } from "react";
import Layout from "../components/Layout";
import ProductItem from "../components/ProductItem";
import classes from "../utils/classes";
import client from "../utils/client";
import { urlForThumbnail } from "../utils/image";
import { Store } from "../utils/Store";

export default function SearchScreen() {
  const router = useRouter();
  const {
    category = " Shop All",
    query = "Shop All",
    price = "Shop All",
    rating = "Shop All",
    sort = "default",
  } = router.query;
  const [state, setState] = useState({
    categories: [],
    products: [],
    error: "",
    loading: true,
  });

  const { loading, products, error } = state;
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`/api/products/categories`);
        setCategories(data);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchCategories();

    const fetchData = async () => {
      try {
        let gQuery = '*[_type == "product"';
        if (category !== "Shop All") {
          gQuery += ` && category match "${category}" `;
        }
        if (query !== "Shop All") {
          gQuery += ` && name match "${query}" `;
        }
        if (price !== "Shop All") {
          const minPrice = Number(price.split("-")[0]);
          const maxPrice = Number(price.split("-")[1]);
          gQuery += ` && price >= ${minPrice} && price <= ${maxPrice}`;
        }
        if (rating !== "Shop All") {
          gQuery += ` && rating >= ${Number(rating)} `;
        }
        let order = "";
        if (sort !== "default") {
          if (sort === "lowest") order = "| order(price asc)";
          if (sort === "highest") order = "| order(price desc)";
          if (sort === "toprated") order = "| order(rating desc)";
        }

        gQuery += `] ${order}`;
        setState({ loading: true });

        const products = await client.fetch(gQuery);
        setState({ products, loading: false });
      } catch (err) {
        setState({ error: err.message, loading: false });
      }
    };
    fetchData();
  }, [category, price, query, rating, sort]);

  const filterSearch = ({ category, sort, searchQuery, price, rating }) => {
    const path = router.pathname;
    const { query } = router;
    if (searchQuery) query.searchQuery = searchQuery;
    if (category) query.category = category;
    if (sort) query.sort = sort;
    if (price) query.price = price;
    if (rating) query.rating = rating;

    router.push({
      pathname: path,
      query: query,
    });
  };
  const categoryHandler = (e) => {
    filterSearch({ category: e.target.value });
  };
  const sortHandler = (e) => {
    filterSearch({ sort: e.target.value });
  };

  const {
    state: { cart },
    dispatch,
  } = useContext(Store);

  const { enqueueSnackbar } = useSnackbar();
  const addToCartHandler = async (product) => {
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

  const [cat, setcat] = useState("Shop All");
  return (
    <Layout title="search">
      <Box display="flex" sx={classes.productosIndex}>
        <Typography>
          Envio gratis a todo el pais por compras superiores a $200.000
        </Typography>
      </Box>
      <Container>
        <Grid sx={classes.section} container spacing={0}>
          {" "}
          <Grid item md={9}>
            <Grid
              container
              justifyContent="space-between"
              alignItems="center"
              sx={{ justifyContent: "center" }}
            >
              <ButtonGroup
                variant="outlined"
                aria-label="outlined button group"
                sx={{
                  border: "1.5px solid black",
                  borderRadius: "8px ",
                }}
              >
                <Select
                  label={category}
                  fullWidth
                  value={category}
                  onChange={categoryHandler}
                  sx={{
                    width: "120px",
                    height: "45px",
                    borderRight: "1px solid black",
                    borderColor: "none",
                    borderRadius: "0 ",
                  }}
                  inputProps={{ "aria-label": "Without label" }}
                >
                  {categories.map((category) => (
                    <MenuItem value={category}>
                      <NextLink
                        key={category}
                        href={`/search?category=${category}`}
                        passHref
                      >
                        <ListItem
                          button
                          component="a"
                          onClick={() => {
                            setcat(category);
                          }}
                        >
                          <ListItemText primary={category}></ListItemText>
                        </ListItem>
                      </NextLink>
                    </MenuItem>
                  ))}
                </Select>
                <Button sx={{ width: "800px", border: "none" }}>{cat}</Button>

                <Select
                  value={sort}
                  onChange={sortHandler}
                  sx={{
                    width: "100",
                    height: "45px",
                    border: "none",
                    borderLeft: "1px solid black",
                    border: "none",
                    borderRadius: "0 ",
                  }}
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem value="default">Ordenar</MenuItem>
                  <MenuItem value="lowest">Precio: Menor a Mayor</MenuItem>
                  <MenuItem value="highest">Precio: Mayor a Menor</MenuItem>
                </Select>
              </ButtonGroup>
            </Grid>

            <Grid sx={classes.section} container spacing={3}>
              {loading ? (
                <CircularProgress />
              ) : error ? (
                <Alert>{error}</Alert>
              ) : (
                <Grid container spacing={3}>
                  {products.map((product) => (
                    <Grid item md={4} key={product.name}>
                      <ProductItem
                        product={product}
                        addToCartHandler={addToCartHandler}
                      />
                    </Grid>
                  ))}
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
}
