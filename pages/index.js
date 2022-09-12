import { CircularProgress, Alert, Box } from "@mui/material";
import Layout from "../components/Layout";
import client from "../utils/client";
import { useState, useEffect } from "react";
import Favoritos from "../components/Favoritos";
import ProductosIndex from "../components/ProductosIndex";

import Categories from "../components/Categories";
import Influencer from "../components/Influencer";
import Newsletter from "../components/Newsletter";

export default function Home() {
  const [state, setState] = useState({
    products: [],
    error: "",
    loading: true,
  });
  // const [, setimages] = useState({ images: [] });
  const { loading, error, products } = state;
  const favorito = products.filter((product) => product.favorito === "si");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await client.fetch(`*[_type == 'product']`);
        // const images = await client.fetch(`*[_type == 'images']`);
        // setimages(images);
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
  const filteredC = products.filter((product) => product.category === "Cargo");
  const filteredS = products.filter((product) => product.category === "Shorts");

  return (
    <Layout>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <div>
          <Box sx={{ justifyContent: "center" }}>
            <Box sx={{ position: "relative" }}>
              <Categories />
            </Box>
            <Box paddingTop={10} sx={{ position: "relative" }}>
              <Favoritos favorito={favorito} />
            </Box>
            <Box
              paddingTop={5}
              paddingBottom={3}
              sx={{ backgroundColor: "grey" }}
            >
              <ProductosIndex
                filteredH={filteredH}
                filteredT={filteredT}
                filteredC={filteredC}
                filteredS={filteredS}
              />
            </Box>
          </Box>
          <Box paddingTop={5} paddingBottom={5}>
            <Influencer />
          </Box>
          <Box paddingBottom={5}>
            {" "}
            <Newsletter />
          </Box>
        </div>
      )}
    </Layout>
  );
}
