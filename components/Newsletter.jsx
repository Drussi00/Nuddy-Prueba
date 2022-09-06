import { Box, Button, List, ListItem, Typography } from "@mui/material";
import React from "react";
import Checkbox from "@mui/material/Checkbox";

const Newsletter = () => {
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  return (
    <Box
      display="flex"
      justifyContent={"center"}
      sx={{ backgroundColor: "#f1f1f1" }}
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
          <div className="input-group">
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
        <ListItem sx={{ justifyContent: "center", width: "50%" }}>
          <Checkbox
            {...label}
            defaultChecked
            sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
          />
          <div style={{ height: "30px", width: "50%" }}>
            <Typography sx={{ fontSize: "0.8rem " }}>
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
