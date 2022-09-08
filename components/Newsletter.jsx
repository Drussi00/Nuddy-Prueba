import {
  Box,
  Button,
  List,
  ListItem,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import axios from "axios";

const Newsletter = () => {
  const isDesktop = useMediaQuery("(min-width:600px)");
  const [email, setEmail] = useState("");
  const [checked, setchecked] = useState(true);

  useEffect(() => {
    const emailInput = document.getElementById("newsletter");

    emailInput.disabled = checked;
    return () => {};
  }, [checked]);

  const subscribe = async () => {
    try {
      const response = await axios.post("/api/newsletter", { email });
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Box
      display="flex"
      justifyContent={"center"}
      sx={{ backgroundColor: "#f1f1f1", paddingBottom: "20px" }}
    >
      <List>
        <ListItem sx={{ justifyContent: "center" }}>
          <Typography
            component="h1"
            variant="h1"
            sx={{ fontWeight: "bold", fontSize: "2rem" }}
          >
            Newsletter
          </Typography>
        </ListItem>
        <ListItem sx={{ justifyContent: "center" }}>
          <Typography component="" variant="text">
            Mantente actualizado sobre lanzamientos limitados, noticias,
            eventos!
          </Typography>
        </ListItem>
        <ListItem sx={{ justifyContent: "center" }}>
          <div
            className="input-group"
            style={{ width: isDesktop ? "40%" : "100%" }}
          >
            <input
              id="newsletter"
              type="text"
              className="form-control"
              placeholder="Agrega tu correo electronico "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
            <span className="input-group-btn">
              <Button
                className="btn "
                sx={{
                  backgroundColor: "black",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "black",
                    color: "white",
                    transform: "scale(1.1, 1.1)",
                  },
                }}
                type="button"
                onClick={subscribe}
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
            onClick={() => {
              setchecked(!checked);
            }}
            sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
          />
          <div style={{ height: "40px" }}>
            <Typography
              sx={{
                fontSize: isDesktop ? "0.8rem " : "0.6rem ",
                textalign: "right",
              }}
            >
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
