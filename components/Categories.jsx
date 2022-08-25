import { Box, Container, Grid, Typography, useMediaQuery } from "@mui/material";
import Image from "next/image";
import React from "react";
import classes from "../utils/classes";

export default function Categories() {
  const isDesktop = useMediaQuery("(min-width:600px)");
  return (
    <div>
      <Box display="flex" sx={classes.productosIndex}>
        <Typography
          sx={{ fontWeight: "bold", fontFamily: " coolvetica, sans-serif" }}
        >
          Envio gratis a todo el pais por compras superiores a $200.000
        </Typography>
      </Box>
      <Container justify="center" alignItems="center">
        <Box
          display="flex"
          justifyContent="center"
          textAlign="center"
          sx={{
            flexWrap: "no-wrap",

            width: "100%",
            height: "130px",
          }}
        >
          <Typography
            variant="h1"
            component="h1"
            sx={{
              opacity: ".1",
              zIndex: "-5",
              position: "absolute",
              top: isDesktop ? "30px" : "70px",
              fontSize: isDesktop ? "8rem" : "5rem",
            }}
          >
            Essentials
          </Typography>
          <Typography
            sx={{
              position: "relative",
              top: isDesktop ? "50px" : "30px",
              fontSize: "2rem",
              fontWeight: "bold",
            }}
          >
            Nuddy Minds
          </Typography>
        </Box>
        <Box>
          <Grid
            container
            spacing={10}
            sx={{ position: isDesktop ? "relative" : null, left: "180px" }}
          >
            <Grid
              item
              sx={{
                width: isDesktop ? "22%" : "100%",
                justifyContent: "center",
              }}
            >
              <img
                src="https://i.etsystatic.com/30139968/c/1981/1581/0/102/il/8d9b27/3121799274/il_340x270.3121799274_8kd9.jpg"
                style={{
                  display: "flex",

                  backgroundColor: "black",
                  width: isDesktop ? "250px" : "100%",
                  height: "518px",
                }}
              />
            </Grid>
            <Grid item sx={{ width: "75%" }}>
              <Grid container spacing={2}>
                <Grid item sx={12}>
                  <img
                    src="https://i.etsystatic.com/30139968/c/1981/1581/0/102/il/8d9b27/3121799274/il_340x270.3121799274_8kd9.jpg"
                    style={{
                      width: isDesktop ? "250px" : "340px",
                      height: "250px",
                    }}
                  />
                </Grid>
                <Grid item md={8}>
                  <img
                    src="https://i.etsystatic.com/30139968/c/1981/1581/0/102/il/8d9b27/3121799274/il_340x270.3121799274_8kd9.jpg"
                    style={{
                      width: isDesktop ? "250px" : "340px",
                      height: "250px",
                    }}
                  />
                </Grid>
                <Grid item>
                  <img
                    src="https://i.etsystatic.com/30139968/c/1981/1581/0/102/il/8d9b27/3121799274/il_340x270.3121799274_8kd9.jpg"
                    style={{
                      width: isDesktop ? "250px" : "340px",
                      height: "250px",
                    }}
                  />
                </Grid>
                <Grid item md={6}>
                  <img
                    src="https://i.etsystatic.com/30139968/c/1981/1581/0/102/il/8d9b27/3121799274/il_340x270.3121799274_8kd9.jpg"
                    style={{
                      width: isDesktop ? "250px" : "340px",
                      height: "250px",
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
}
