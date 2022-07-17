import * as React from "react";
import { createTheme } from "@mui/material/styles";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import {
  AppBar,
  Badge,
  Box,
  Button,
  Container,
  CssBaseline,
  Divider,
  Drawer,
  InputBase,
  Link,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  Switch,
  ThemeProvider,
  Toolbar,
  Typography,
  useMediaQuery,
  Grid,
  IconButton,
  ListItemButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import CancelIcon from "@mui/icons-material/Cancel";
import Head from "next/head";
import NextLink from "next/link";
import classes from "../utils/classes";
import { useContext, useEffect, useState } from "react";
import { Store } from "../utils/Store";
import jsCookie from "js-cookie";
import { useRouter } from "next/router";
import axios from "axios";
import { useSnackbar } from "notistack";
import { getError } from "../utils/error";

export default function Layout({ title, description, children }) {
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
        borderRadius: "5px",
      }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <AppBar position="static" sx={classes.appbar}>
        <Toolbar sx={classes.toolbar}>
          <Box display="flex" alignItems="center">
            <NextLink href="/" passHref>
              <Link>
                <Typography sx={classes.brand}>Nuddy Minds</Typography>
              </Link>
            </NextLink>
          </Box>

          <Box>
            <Grid container spacing={10}>
              <Grid item>
                <Typography>Shop</Typography>
              </Grid>
              <Grid item>
                <Typography>Coleciones</Typography>
              </Grid>
              <Grid item>
                <Typography>Nosotros</Typography>
              </Grid>
            </Grid>
          </Box>

          <Box>
            <Grid container spacing={1}>
              <Grid item>
                <NextLink href="/cart" passHref>
                  <Link>
                    <Typography component="span">
                      {cart.cartItems.length > 0 ? (
                        <Badge
                          color="secondary"
                          badgeContent={cart.cartItems.length}
                        >
                          <ShoppingCartIcon fontSize="small" />
                        </Badge>
                      ) : (
                        <ShoppingCartIcon />
                      )}
                    </Typography>
                  </Link>
                </NextLink>
              </Grid>
              <Grid item>
                {userInfo ? (
                  <>
                    <Button
                      aria-controls="simple-menu"
                      aria-haspopup="true"
                      sx={classes.navbarButton}
                      onClick={loginClickHandler}
                    >
                      {userInfo.name}
                    </Button>
                    <Menu
                      id="simple-menu"
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={loginMenuCloseHandler}
                    >
                      <MenuItem
                        onClick={(e) => loginMenuCloseHandler(e, "/profile")}
                      >
                        Profile
                      </MenuItem>
                      <MenuItem
                        onClick={(e) =>
                          loginMenuCloseHandler(e, "/order-history")
                        }
                      >
                        Order History
                      </MenuItem>
                      <MenuItem onClick={logoutClickHandler}>Logout</MenuItem>
                    </Menu>
                  </>
                ) : (
                  <NextLink href="/login" passHref>
                    <Link>
                      <PersonIcon />
                    </Link>
                  </NextLink>
                )}{" "}
              </Grid>
            </Grid>
          </Box>
        </Toolbar>
      </AppBar>
      <Divider
        sx={{
          backgroundColor: "white",
          width: "97%",
          margin: "auto",
          borderTop: " 1px solid #bbb",
          borderRadius: "5px",
        }}
      />

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
          <Box
            display="flex"
            paddingTop={4}
            sx={{
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column ",
            }}
          >
            <img
              src="https://www.pngmart.com/files/22/Long-Sleeve-Crew-Neck-T-Shirt-PNG-Pic.png"
              alt="imagen "
              layout="responsive"
              width={140}
              height={140}
              paddingTop="10px"
            />
            <List margin={0}>
              {["Hoodies"].map((category) => (
                <NextLink
                  key={category}
                  href={`/search?category=${category}`}
                  passHref
                >
                  <ListItem
                    fullWidth
                    button
                    component="a"
                    onClick={sidebarCloseHandler}
                  >
                    <ListItemText primary={category}></ListItemText>
                  </ListItem>
                </NextLink>
              ))}
            </List>
          </Box>
        </Grid>
        <Grid item md={2}>
          <Box
            display="flex"
            paddingTop={4}
            sx={{
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column ",
            }}
          >
            <img
              src="https://www.pngmart.com/files/22/Long-Sleeve-Crew-Neck-T-Shirt-PNG-Pic.png"
              alt="imagen "
              layout="responsive"
              width={140}
              height={140}
              paddingTop="10px"
            />
            <List margin={0}>
              {["T-shirt"].map((category) => (
                <NextLink
                  key={category}
                  href={`/search?category=${category}`}
                  passHref
                >
                  <ListItem
                    fullWidth
                    button
                    component="a"
                    onClick={sidebarCloseHandler}
                  >
                    <ListItemText primary={category}></ListItemText>
                  </ListItem>
                </NextLink>
              ))}
            </List>
          </Box>
        </Grid>
        <Grid item md={2.2}>
          <Box
            display="flex"
            margin={0}
            paddingTop={4}
            sx={{
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column ",
            }}
          >
            <img
              src="https://www.pngmart.com/files/22/Long-Sleeve-Crew-Neck-T-Shirt-PNG-Pic.png"
              alt="imagen "
              layout="responsive"
              width={140}
              height={140}
              paddingTop="10px"
            />
            <List margin={0}>
              {["Long-Sleeves"].map((category) => (
                <NextLink
                  key={category}
                  href={`/search?category=${category}`}
                  passHref
                >
                  <ListItem
                    fullWidth
                    button
                    component="a"
                    onClick={sidebarCloseHandler}
                  >
                    <ListItemText primary={category}></ListItemText>
                  </ListItem>
                </NextLink>
              ))}
            </List>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );

  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { darkMode, cart, userInfo } = state;
  const theme = createTheme({
    components: {
      MuiLink: {
        defaultProps: {
          underline: "hover",
        },
      },
    },
    typography: {
      h1: {
        fontSize: "1.6rem",
        fontWeight: 400,
        margin: "1rem 0",
      },
      h2: {
        fontSize: "1.4rem",
        fontWeight: 400,
        margin: "1rem 0",
      },
    },
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: "#000000",
      },
      secondary: {
        main: "#ffffff",
      },
    },
  });
  const darkModeChangeHandler = () => {
    dispatch({ type: darkMode ? "DARK_MODE_OFF" : "DARK_MODE_ON" });
    const newDarkMode = !darkMode;
    jsCookie.set("darkMode", newDarkMode ? "ON" : "OFF");
  };
  const [anchorEl, setAnchorEl] = useState(null);
  const loginMenuCloseHandler = (e, redirect) => {
    setAnchorEl(null);
    if (redirect) {
      router.push(redirect);
    }
  };
  const loginClickHandler = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const logoutClickHandler = () => {
    setAnchorEl(null);
    dispatch({ type: "USER_LOGOUT" });
    jsCookie.remove("userInfo");
    jsCookie.remove("cartItems");
    jsCookie.remove("shippingAddress");
    jsCookie.remove("paymentMethod");
    router.push("/");
  };

  const [sidbarVisible, setSidebarVisible] = useState(false);
  const sidebarOpenHandler = () => {
    setSidebarVisible(true);
  };
  const sidebarCloseHandler = () => {
    setSidebarVisible(false);
  };

  const { enqueueSnackbar } = useSnackbar();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`/api/products/categories`);
        setCategories(data);
      } catch (err) {
        enqueueSnackbar(getError(err), { variant: "error" });
      }
    };
    fetchCategories();
  }, [enqueueSnackbar, setCategories]);

  const isDesktop = useMediaQuery("(min-width:600px)");

  const [query, setQuery] = useState("");
  const queryChangeHandler = (e) => {
    setQuery(e.target.value);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    router.push(`/search?query=${query}`);
  };

  return (
    <>
      <Head>
        <title>{title ? `${title} - Nuddy Minds` : "Nuddy Minds"}</title>
        {description && <meta name="description" content={description}></meta>}
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="static" sx={classes.appbar}>
          <Toolbar sx={classes.toolbar}>
            <Box display="flex" alignItems="center">
              <NextLink href="/" passHref>
                <Link>
                  <Typography sx={classes.brand}>Nuddy Minds</Typography>
                </Link>
              </NextLink>
            </Box>

            <Box display="flex" alignItems="center">
              <Grid container spacing={5}>
                <Grid item md={4} xs={4}>
                  <Typography>
                    {["top"].map((anchor) => (
                      <React.Fragment key={anchor}>
                        <Button
                          sx={{ color: "white" }}
                          onClick={toggleDrawer(anchor, true)}
                        >
                          SHOP
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
                  </Typography>
                </Grid>
                <Grid item md={4} xs={4}>
                  <Typography>Coleciones</Typography>
                </Grid>
                <Grid item md={4} xs={4}>
                  <Typography>Nosotros</Typography>
                </Grid>
              </Grid>
            </Box>

            <Box>
              <Grid container spacing={1}>
                <Grid item>
                  <NextLink href="/cart" passHref>
                    <Link>
                      <Typography component="span">
                        {cart.cartItems.length > 0 ? (
                          <Badge
                            color="secondary"
                            badgeContent={cart.cartItems.length}
                          >
                            <ShoppingCartIcon fontSize="small" />
                          </Badge>
                        ) : (
                          <ShoppingCartIcon />
                        )}
                      </Typography>
                    </Link>
                  </NextLink>
                </Grid>
                <Grid item>
                  {userInfo ? (
                    <>
                      <Button
                        aria-controls="simple-menu"
                        aria-haspopup="true"
                        sx={classes.navbarButton}
                        onClick={loginClickHandler}
                      >
                        {userInfo.name}
                      </Button>
                      <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={loginMenuCloseHandler}
                      >
                        <MenuItem
                          onClick={(e) => loginMenuCloseHandler(e, "/profile")}
                        >
                          Profile
                        </MenuItem>
                        <MenuItem
                          onClick={(e) =>
                            loginMenuCloseHandler(e, "/order-history")
                          }
                        >
                          Order History
                        </MenuItem>
                        <MenuItem onClick={logoutClickHandler}>Logout</MenuItem>
                      </Menu>
                    </>
                  ) : (
                    <NextLink href="/login" passHref>
                      <Link>
                        <PersonIcon />
                      </Link>
                    </NextLink>
                  )}{" "}
                </Grid>
              </Grid>
            </Box>
          </Toolbar>
        </AppBar>
        <Container component="main" sx={classes.main}>
          {children}
        </Container>
        <Box component="footer" sx={classes.footer}>
          <Typography>All rights reserved. Nuddy Minds.</Typography>
        </Box>
      </ThemeProvider>
    </>
  );
}
