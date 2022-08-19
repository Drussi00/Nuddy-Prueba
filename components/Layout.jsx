import { createTheme } from "@mui/material/styles";
import "bootstrap/dist/css/bootstrap.min.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import Dropdown from "react-bootstrap/Dropdown";
import CloseIcon from "@mui/icons-material/Close";
import {
  AppBar,
  Badge,
  Box,
  Button,
  Container,
  CssBaseline,
  Divider,
  Drawer,
  Grid,
  IconButton,
  InputBase,
  Link,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  ThemeProvider,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";

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
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import InstagramIcon from "@mui/icons-material/Instagram";
import EmailIcon from "@mui/icons-material/Email";

////////////////////////////////////////////////////////////////
export default function Layout({ title, description, children }) {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { cart, userInfo } = state;

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
      primary: {
        main: "#000000",
      },
      secondary: {
        main: "#ffffff",
      },
    },
  });

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
  const [coleciones, setcoleciones] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`/api/products/categories`);
        setCategories(data);
        console.log(categories);
      } catch (err) {
        enqueueSnackbar(getError(err), { variant: "error" });
      }
    };
    fetchCategories();
    const fetchColeciones = async () => {
      try {
        const { data } = await axios.get(`/api/products/coleciones`);
        setcoleciones(data);
        console.log(categories);
      } catch (err) {
        enqueueSnackbar(getError(err), { variant: "error" });
      }
    };
    fetchColeciones();
  }, [enqueueSnackbar, setCategories, setcoleciones]);

  const isDesktop = useMediaQuery("(min-width:600px)");

  const [query, setQuery] = useState("");
  const queryChangeHandler = (e) => {
    setQuery(e.target.value);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    router.push(`/search?query=${query}&category=Shop%20All`);
  };

  return (
    <>
      <Head>
        <title>{title ? `${title} - Nuddy minds` : "Nuddy minds"}</title>
        {description && <meta name="description" content={description}></meta>}
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="static" sx={classes.appbar}>
          <Toolbar sx={classes.toolbar}>
            <Box display="flex" alignItems="center">
              <IconButton
                edge="start"
                aria-label="open drawer"
                onClick={sidebarOpenHandler}
                sx={classes.menuButton}
              >
                <MenuIcon sx={classes.navbarButton} />
              </IconButton>
              <Box sx={isDesktop ? classes.visible : classes.hidden}>
                <form onSubmit={submitHandler}>
                  <Box sx={classes.searchForm}>
                    {" "}
                    <IconButton
                      type="submit"
                      sx={classes.searchButton}
                      aria-label="search"
                    >
                      <SearchIcon sx={classes.navbarButton} />
                    </IconButton>
                    <InputBase
                      name="query"
                      sx={classes.searchInput}
                      placeholder="Busca Productos"
                      onChange={queryChangeHandler}
                    />
                  </Box>
                </form>
              </Box>
            </Box>
            <Drawer
              sx={{ width: "250px" }}
              anchor="left"
              open={sidbarVisible}
              onClose={sidebarCloseHandler}
            >
              <Box>
                <Box>
                  <List>
                    <ListItem sx={{ paddingTop: "0" }}>
                      <Box
                        sx={{ width: "220px" }}
                        display="flex"
                        alignItems="center"
                        justifyContent="end"
                      >
                        <Box display="flex">
                          <IconButton
                            aria-label="close"
                            onClick={sidebarCloseHandler}
                          >
                            <CloseIcon sx={{ color: "black" }} />
                          </IconButton>
                        </Box>
                      </Box>
                    </ListItem>
                    <Divider light />
                    <Dropdown
                      style={{
                        zIndex: "100%",
                        "&:hover": { border: "none" },
                      }}
                    >
                      <Dropdown.Toggle
                        sx={{ fontWeight: "bold" }}
                        variant=""
                        id="dropdown-basic"
                      >
                        Shop
                      </Dropdown.Toggle>

                      <Dropdown.Menu
                        style={{ backgroundColor: "white", border: "none" }}
                      >
                        {categories.map((category) => (
                          <NextLink
                            key={category}
                            href={`/search?category=${category}`}
                            passHref
                            sx={{}}
                          >
                            <ListItem
                              button
                              component="a"
                              onClick={sidebarCloseHandler}
                              sx={{
                                fontWeight: "normal",
                                "&:hover": { color: "black" },
                              }}
                            >
                              <ListItemText primary={category}></ListItemText>
                            </ListItem>
                          </NextLink>
                        ))}
                        <Dropdown
                          className="coleciones1"
                          style={{
                            border: "none",
                            backgroundColor: "white",
                            zIndex: "100%",
                          }}
                        >
                          <Dropdown.Toggle variant="" id="dropdown-basic">
                            Coleciones
                          </Dropdown.Toggle>

                          <Dropdown.Menu
                            style={{
                              backgroundColor: "white",
                              border: "none",
                            }}
                          >
                            {coleciones.map((colecion) => (
                              <NextLink
                                key={colecion}
                                href={`/search?colecion=${colecion}&category=Shop+All`}
                                passHref
                              >
                                <ListItem
                                  button
                                  component="a"
                                  onClick={sidebarCloseHandler}
                                >
                                  <ListItemText
                                    primary={colecion}
                                  ></ListItemText>
                                </ListItem>
                              </NextLink>
                            ))}
                            <NextLink href={`/nosotros}`} passHref>
                              <ListItem
                                button
                                component="a"
                                onClick={sidebarCloseHandler}
                              >
                                <ListItemText>Nosotros</ListItemText>
                              </ListItem>
                            </NextLink>
                          </Dropdown.Menu>
                        </Dropdown>
                        <NextLink href={`/nosotros}`} passHref>
                          <ListItem
                            button
                            component="a"
                            onClick={sidebarCloseHandler}
                          >
                            <ListItemText>Nosotros</ListItemText>
                          </ListItem>
                        </NextLink>
                      </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown className="coleciones2">
                      <Dropdown.Toggle variant="" id="dropdown-basic">
                        Coleciones
                      </Dropdown.Toggle>

                      <Dropdown.Menu
                        style={{ backgroundColor: "white", border: "none" }}
                      >
                        {coleciones.map((colecion) => (
                          <NextLink
                            key={colecion}
                            href={`/search?colecion=${colecion}&category=Shop+All`}
                            passHref
                          >
                            <ListItem
                              button
                              component="a"
                              onClick={sidebarCloseHandler}
                            >
                              <ListItemText primary={colecion}></ListItemText>
                            </ListItem>
                          </NextLink>
                        ))}
                        <NextLink href={`/nosotros}`} passHref>
                          <ListItem
                            button
                            component="a"
                            onClick={sidebarCloseHandler}
                          >
                            <ListItemText>Nosotros</ListItemText>
                          </ListItem>
                        </NextLink>
                      </Dropdown.Menu>
                    </Dropdown>
                    <NextLink href={`/nosotros}`} passHref>
                      <ListItem
                        button
                        component="a"
                        onClick={sidebarCloseHandler}
                      >
                        <ListItemText>Nosotros</ListItemText>
                      </ListItem>
                    </NextLink>
                  </List>
                </Box>
                <Box
                  display="flex"
                  sx={{
                    justifyContent: "space-around",
                    paddingTop: isDesktop ? "450px" : "410px",
                  }}
                >
                  <WhatsAppIcon fontSize="large" />
                  <InstagramIcon fontSize="large" />
                  <EmailIcon fontSize="large" />
                </Box>{" "}
              </Box>
            </Drawer>

            <Box
              display="flex"
              sx={{ paddingRight: isDesktop ? "200px" : "0px" }}
            >
              <NextLink href="/" passHref>
                <Link>
                  <Typography sx={classes.brand}>Nuddy Minds </Typography>
                </Link>
              </NextLink>
            </Box>

            <Box display="flex">
              <NextLink href="/cart" passHref>
                <Link>
                  <Typography component="span">
                    {cart.cartItems.length > 0 ? (
                      <Badge
                        color="primary"
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
              {userInfo ? (
                <>
                  <Button
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    sx={classes.navbarButton}
                    onClick={loginClickHandler}
                  >
                    {isDesktop ? userInfo.name : <PersonIcon />}
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
                      Perfil
                    </MenuItem>

                    <MenuItem onClick={logoutClickHandler}>
                      Cerrar sesion
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <NextLink href="/login" passHref>
                  <Link>
                    <PersonIcon />
                  </Link>
                </NextLink>
              )}
            </Box>
          </Toolbar>
        </AppBar>
        <Container
          component="main"
          disableGutters="true"
          maxWidth="false"
          sx={classes.main}
        >
          {children}
        </Container>
        <Divider sx={{ color: "black", opacity: "1" }} />
        <Box display="flex" component="footer" sx={classes.footer}>
          <Grid sx={{ zIndex: "-5" }} container spacing={isDesktop ? 130 : 6}>
            <Grid
              item
              sx={{
                paddingLeft: "10px",
                marginLeft: isDesktop ? "40px" : "15px",
              }}
            >
              <Box>
                <Typography align="justify">All rights reserved. </Typography>
              </Box>
              <Box>
                <Typography align="justify"> Nuddy minds.</Typography>
              </Box>
            </Grid>
            <Grid item>
              <Box>
                <Box display="flex" sx={{ justifyContent: "space-around" }}>
                  <WhatsAppIcon fontSize="large" sx={{ marginLeft: "20px" }} />
                  <InstagramIcon fontSize="large" sx={{ marginLeft: "20px" }} />
                  <EmailIcon fontSize="large" sx={{ marginLeft: "20px" }} />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </ThemeProvider>
    </>
  );
}
