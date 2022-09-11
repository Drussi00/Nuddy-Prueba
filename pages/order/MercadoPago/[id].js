import {
  Box,
  Card,
  Container,
  Grid,
  List,
  ListItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import dynamic from "next/dynamic";

import React,  from "react";
import Layout from "../../../components/Layout";
import classes from "../../../utils/classes";
import Product from "../../../components/MercadoPago";

function OrderScreen({ params }) {
  const { id: orderId } = params;

  return (
    <Layout title={`Order ${orderId}`}>
      <Container>
        <Typography component="h1" variant="h1">
          Order {orderId}
        </Typography>

        <Grid container spacing={1}>
          <Grid item md={9} xs={12}>
            <Card sx={classes.section}>
              <List>
                <ListItem>
                  <Typography component="h1" variant="h1">
                    Direccion de envio
                  </Typography>
                </ListItem>
                <ListItem></ListItem>
                <ListItem>Status:</ListItem>
              </List>
            </Card>

            <Card sx={classes.section}>
              <List>
                <ListItem>
                  <Typography component="h1" variant="h1">
                    Metodo de pago
                  </Typography>
                </ListItem>
                <ListItem>Status:</ListItem>
              </List>
            </Card>

            <Card sx={classes.section}>
              <List>
                <ListItem>
                  <Typography component="h1" variant="h1">
                    Productos
                  </Typography>
                </ListItem>
                <ListItem>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Imagen</TableCell>
                          <TableCell>Nombre</TableCell>
                          <TableCell align="right">Talla</TableCell>
                          <TableCell align="right">Cantidad</TableCell>
                          <TableCell align="right">Precio</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody></TableBody>
                    </Table>
                  </TableContainer>
                </ListItem>
              </List>
            </Card>
          </Grid>
          <Grid item md={3} xs={12}>
            <Card sx={classes.section}>
              <List>
                <ListItem>
                  <Typography variant="h1">Resumen de Orden</Typography>
                </ListItem>
                <ListItem>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography>Productos:</Typography>
                    </Grid>
                    <Grid item xs={6}></Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Grid container>
                    <Grid item xs={6}></Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography>Costo de envio:</Typography>
                    </Grid>
                    <Grid item xs={6}></Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography>
                        <strong>Total:</strong>
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography align="right"></Typography>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Box sx={classes.fullWidth}>
                    <Product id={orderId} />
                  </Box>
                </ListItem>
              </List>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
}
export function getServerSideProps({ params }) {
  return { props: { params } };
}

export default dynamic(() => Promise.resolve(OrderScreen), { ssr: false });
