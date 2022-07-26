import {
  CircularProgress,
  Typography,
  Alert,
  Grid,
  Container,
  Box,
} from "@mui/material";
import Layout from "../components/Layout";
import client from "../utils/client";
import { useState, useEffect, useContext } from "react";
import ProductItem from "../components/ProductItem";
import { Store } from "../utils/Store";
import axios from "axios";
import { urlForThumbnail } from "../utils/image";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import Carousel from "../components/Carousel";
import ProductosIndex from "../components/ProductosIndex";

export default function Home() {
  const router = useRouter();
  const {
    state: { cart },
    dispatch,
  } = useContext(Store);
  const { enqueueSnackbar } = useSnackbar();
  const [state, setState] = useState({
    products: [],
    error: "",
    loading: true,
  });
  const { loading, error, products } = state;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await client.fetch(`*[_type == 'product']`);
        setState({ products, loading: false });
      } catch (error) {
        setState({ loading: false, error: error.message });
      }
    };
    fetchData();
  }, []);
  const filteredT = products.filter(
    (product) => product.category === "T-Shirt"
  );
  const filteredH = products.filter(
    (product) => product.category === "Hoodies"
  );
  const filteredL = products.filter((product) => product.category === "Longs");
  return (
    <Layout>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <Grid container spacing={20}>
          <Grid item md={12} sm={12} sx={{}}>
            <Carousel products={products} />
            <ProductosIndex
              products={products}
              filteredH={filteredH}
              filteredT={filteredT}
              filteredL={filteredL}
            />
            <Box
              sx={{
                width: "100%",
                height: "100vh",
                backgroundColor: "#A7D1E7",
                borderStyle: "solid",
                borderColor: "black",
                borderWidth: "2px",
              }}
            >
              <Container>
                <Box
                  display="flex"
                  sx={{ justifyContent: "center", paddingTop: "30px" }}
                >
                  <Typography component="h4" variant="h4">
                    Coleciones
                  </Typography>
                </Box>
                <Box>
                  <Grid
                    container
                    spacing={2}
                    sx={{ paddingTop: "30px", justifyContent: "center" }}
                  >
                    <Grid item>
                      <Box
                        sx={{
                          width: "350px",
                          height: "550px",
                          backgroundColor: "white",
                        }}
                      ></Box>
                    </Grid>
                    <Grid item>
                      <Box
                        sx={{
                          width: "350px",
                          height: "550px",
                          backgroundColor: "white",
                        }}
                      ></Box>
                    </Grid>
                    <Grid item>
                      <Box
                        sx={{
                          width: "350px",
                          height: "550px",
                          backgroundColor: "white",
                        }}
                      ></Box>
                    </Grid>
                  </Grid>
                </Box>
              </Container>
            </Box>
          </Grid>
        </Grid>
      )}
    </Layout>
  );
}
