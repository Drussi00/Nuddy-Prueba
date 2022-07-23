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
            <ProductosIndex products={products} />
          </Grid>
        </Grid>
      )}
    </Layout>
  );
}
