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
import ColecionesIndex from "../components/ColecionesIndex";

export default function Home() {
  const [Width, setWidth] = useState(window.innerWidth); 
  const cambiarTamaño = ()=>{
    setWidth(window.innerWidth);
  }
  useEffect(()=>{
    window.addEventListener('resize',cambiarTamaño);
    return ()=>{
      window.removeEventListener('resize', cambiarTamaño)
   }
 })
  

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
  const [images, setimages] = useState({ images: [] });
  const { loading, error, products } = state;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await client.fetch(`*[_type == 'product']`);
        const images = await client.fetch(`*[_type == 'images']`);
        setimages(images);
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

  console.log(Width)
  return (
    <Layout>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <Grid container spacing={0}>
          <Grid item md={12} sm={12} sx={{}}>
            <Carousel images={images} />
            <ProductosIndex
              products={products}
              filteredH={filteredH}
              filteredT={filteredT}
              filteredL={filteredL}
            />
            <ColecionesIndex />
          </Grid>
        </Grid>
      )}
    </Layout>
  );
}
