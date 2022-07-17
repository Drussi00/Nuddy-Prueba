import Layout from "../components/Layout";
import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Grid } from "@mui/material";
import { Image } from "@mui/icons-material";
import NextLink from "next/link";

export default function TemporaryDrawer() {
  const [stateDrawer, setstateDrawer] = React.useState({
    top: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setstateDrawer({ ...stateDrawer, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      display="flex"
      justifyContent="spaceetween"
      sx={{
        backgroundColor: "primary.main",
        color: "secondary.main",
      }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Grid container spacing={20}>
        <Grid item md={4}>
          <Box display="flex" sx={{ justifyContent: "center" }}>
            <List>
              {categories.map((category) => (
                <NextLink
                  key={category}
                  href={`/search?category=${category}`}
                  passHref
                >
                  <ListItem button component="a" onClick={sidebarCloseHandler}>
                    <ListItemText primary={category}></ListItemText>
                  </ListItem>
                </NextLink>
              ))}
            </List>
          </Box>
        </Grid>
        <Grid item md={2}>
          <Box sx={{ justifyContent: "center", alignItems: "center" }}>
            <img
              src=""
              alt="imagen "
              layout="responsive"
              width={140}
              height={140}
              paddingTop="10px"
            />
            <List>
              {["Hoodies"].map((text, index) => (
                <ListItem key={text} disablePadding>
                  <ListItemButton>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </Grid>
        <Grid item md={2}>
          <Box>
            <img
              src="https://w7.pngwing.com/pngs/283/43/png-transparent-long-sleeved-t-shirt-hoodie-clothing-polo-tshirt-hoodie-black.png"
              alt="imagen "
              layout="responsive"
              width={140}
              height={140}
            />
            <List>
              {["T-shirt"].map((text, index) => (
                <ListItem key={text} disablePadding>
                  <ListItemButton>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </Grid>
        <Grid item md={3}>
          <Box>
            <img
              src="https://w7.pngwing.com/pngs/283/43/png-transparent-long-sleeved-t-shirt-hoodie-clothing-polo-tshirt-hoodie-black.png"
              alt="imagen "
              layout="responsive"
              width={140}
              height={140}
            />
            <List>
              {["Long-Sleeve"].map((text, index) => (
                <ListItem key={text} disablePadding>
                  <ListItemButton>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );

  return (
    <div>
      <Layout>
        {["top"].map((anchor) => (
          <React.Fragment key={anchor}>
            <Button
              sx={{ color: "black" }}
              onClick={toggleDrawer(anchor, true)}
            >
              Coleciones
            </Button>
            <Drawer
              anchor={anchor}
              open={stateDrawer[anchor]}
              onClose={toggleDrawer(anchor, false)}
            >
              {list(anchor)}
            </Drawer>
          </React.Fragment>
        ))}
      </Layout>
    </div>
  );
}
