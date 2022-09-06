import {
  Box,
  Button,
  List,
  ListItem,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import Checkbox from "@mui/material/Checkbox";

const Newsletter = () => {
  const isDesktop = useMediaQuery("(min-width:600px)");
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  return (
    <Box
      display="flex"
      justifyContent={"center"}
      sx={{ backgroundColor: "#f1f1f1", paddingBottom: "20px" }}
    >
      <List>
        <ListItem sx={{ justifyContent: "center" }}>
          <Typography component="h1" variant="h1" sx={{ fontWeight: "bold" }}>
            {" "}
            Newsletter
          </Typography>
        </ListItem>
        <ListItem sx={{ justifyContent: "center" }}>
          <Typography component="" variant="text">
            Mantente actualizado sobre lanzamientos limitados, noticias, eventos{" "}
          </Typography>
        </ListItem>
        <ListItem sx={{ justifyContent: "center" }}>
          <div
            className="input-group"
            style={{ width: isDesktop ? "40%" : "100%" }}
          >
            <input
              type="text"
              className="form-control"
              placeholder="Agrega tu correo electronico "
            ></input>
            <span className="input-group-btn">
              <Button
                className="btn "
                sx={{ backgroundColor: "black", color: "white" }}
                type="button"
              >
                Suscribete
              </Button>
            </span>
          </div>
        </ListItem>
        <ListItem
          sx={{
            justifyContent: "center",
            width: isDesktop ? "50%" : "100%",
            margin: "auto",
          }}
        >
          <Checkbox
            {...label}
            defaultChecked
            sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
          />
          <div style={{ height: "40px" }}>
            <Typography sx={{ fontSize: isDesktop ? "0.8rem " : "0.6rem " }}>
              Si me gustaria recibir la newsletter de Nuddy Minds. al
              registrarme en el boletin, acepto la informacion de proteccion de
              datos de Nuddy Minds y doy mi consentimiento para la recopilacion,
              el almacenamiento y el procesamiento de mis datos alli descritos{" "}
            </Typography>
          </div>
        </ListItem>
      </List>
    </Box>
  );
};

export default Newsletter;
