const classes = {
  section: {
    marginTop: 1,
    marginBottom: 1,
    justifyContent: "center",
  },
  smallText: {
    fontSize: "13px",
  },
  main: {
    marginTop: 0,
  },
  footer: {
    paddingRight: "50px",
    marginLeft: "50px",
    marginTop: 5,
    marginBottom: 5,
    textAlign: "center",
  },
  appbar: {
    backgroundColor: "#ffffff",
    "& a": {
      color: "#000000",
      marginLeft: 1,
    },
  },
  toolbar: {
    justifyContent: "space-between",
  },
  brand: {
    fontWeight: "bold",
    fontSize: "1.5rem",
  },
  navbarButton: {
    color: "#000000",
  },
  fullWidth: {
    width: "100%",
  },
  sort: {
    marginRight: 1,
  },
  visible: {
    display: "initial",
  },
  hidden: {
    display: "none",
  },
  // search

  searchForm: {
    border: "1px solid #ffffff",
    backgroundColor: "#ffffff",
    borderRadius: 1,
  },
  imagec: {
    minWidth: "670px",
    height: "670px",
  },
  searchInput: {
    paddingLeft: 1,
    color: "#000000",
    "& ::placeholder": {
      color: "#606060",
    },
  },
  n: {},
  searchButton: {
    padding: 1,
    borderRadius: "0 0px 0px 0",
    "& span": {
      color: "black",
    },
  },
  title: {
    fontWeight: "bold",
    fontSize: "3rem",
    fontFamily: " coolvetica, sans-serif",
  },
  titleMobile: {
    fontWeight: "bold",
    fontSize: "3rem",
    fontFamily: " coolvetica, sans-serif",
    textAlign: "center",
  },
  bold: { fontWeight: "bold", fontSize: "2.2rem" },
  line: { border: "1px solid black", height: "2px", opacity: "1" },
  but: {
    fontWeight: "bold",
    fontFamily: " coolvetica, sans-serif",
    transform: "scale(1.1, 1.1)",
    fontSize: "12px",
    border: "1.5px solid black ",
    borderWidth: ".1",
    backgroundColor: "#A7D1E7",
    "&:hover": {
      backgroundColor: "#A7D1E7",
      transform: "scale(1.1, 1.1)",
    },
  },
  blackline: {
    borderBottomStyle: "solid",
    fontWeight: "bold",
    textDecoration: "underline ",
    borderWidth: "1",
    textDecorationThickness: "1.5px",
    fontWeight: "bold",
    fontFamily: " coolvetica, sans-serif",

    "&:hover": {
      transform: "scale(1.1, 1.1)",
      backgroundColor: "transparent",
      textDecoration: "underline ",
      borderWidth: "1",
      textDecorationThickness: "1.5px",
    },
  },
  radius: { borderRadius: "100px" },
  buttonQ: { width: "80px", borderWidth: "1px", borderColor: "black" },
  buttonGroup: {
    fontWeight: "bold",
    fontFamily: " coolvetica, sans-serif",

    borderWidth: "1px",
    borderColor: "black",
  },
  productosIndex: {
    width: "100%vw",
    background: "#f1f1f1",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "20px",
  },
  imageP: {
    filter: " drop-shadow(-2px 26px 18px rgba(0, 0, 0, 0.6));",
    zIndex: "0",
  },
  card: {
    cursor: "pointer",
    transform: "scale(1, 1)",
    transition: "transform 0.5s ease",
    color: "black",
    "&:hover": {
      transform: "scale(1.1, 1.1)",
    },
  },
  catBut: {
    "&:hover": {
      transform: "scale(1.1, 1.1)",
      backgroundColor: "transparent",
      textDecoration: "underline ",
      borderWidth: "2",
      textDecorationThickness: "1.5px",
    },
  },
  visibleI: {
    display: "initial",
    filter: " drop-shadow(-2px 26px 18px rgba(0, 0, 0, 0.6));",
  },
  buyNow: {
    backgroundColor: "#A7D1E7",
    color: "black",
    border: "1.5px solid black",

    fontWeight: "bold",
    fontFamily: " coolvetica, sans-serif",

    "&:hover": {
      backgroundColor: "#A7D1E7",
      transform: "scale(1.1, 1.1)",
    },
  },
  selected: {
    border: "1.5px solid black",
    fontWeight: "bold",
    fontFamily: " coolvetica, sans-serif",

    fontSize: "12px",
    border: "1.5px solid black ",
    borderWidth: ".1",

    "&:hover": {
      transform: "scale(1.1, 1.1)",
    },
  },
  productsIndexBox: {
    justifyContent: "center",
    paddingTop: "0px",
    alignItems: "center",
    paddingBottom: "50px",
  },
  typo: {
    fontWeight: "500",
    fontFamily: " coolvetica, sans-serif",
    color: "white",
  },
  productIndex: {
    fontWeight: "bold",
    fontFamily: " coolvetica, sans-serif",
    textTransform: "none",
    fontSize: "1.5rem",
  },
};

export default classes;
