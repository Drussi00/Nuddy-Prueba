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
      sx={{
        width: "250",
        backgroundColor: "primary.main",
        color: "secondary.main",
      }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {["Shop All", "Hoodies", "T-shirt", "Long Sleeve"].map(
          (text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          )
        )}
      </List>
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
              Shop
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
