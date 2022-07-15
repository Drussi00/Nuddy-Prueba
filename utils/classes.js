import { height } from "@mui/system";

const classes = {
  section: {
    marginTop: 1,
    marginBottom: 1,
  },
  smallText: {
    fontSize: "13px",
  },
  main: {
    marginTop: 2,
    minHeight: "80vh",
  },
  footer: {
    marginTop: 1,
    textAlign: "center",
  },
  appbar: {
    backgroundColor: "#000000",
    "& a": {
      color: "#ffffff",
      marginLeft: 1,
    },
    borderRadius: "0 0 15px 15px",
  },
  toolbar: {
    justifyContent: "space-between",
  },
  brand: {
    fontWeight: "bold",
    fontSize: "1.5rem",
  },
  navbarButton: {
    color: "#ffffff",
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
  searchInput: {
    paddingLeft: 1,
    color: "#000000",
    "& ::placeholder": {
      color: "#606060",
    },
  },
  searchButton: {
    backgroundColor: "#f8c040",
    padding: 1,
    borderRadius: "0 5px 5px 0",
    "& span": {
      color: "#000000",
    },
  },
  title: { fontWeight: "bold", fontSize: "3rem" },
  bold: { fontWeight: "bold", fontSize: "2.2rem" },
  line: { background: "black", height: "2px" },
  but: { fontSize: "12px", border: "1px solid black ", borderWidth: ".1" },
  blackline: {
    borderBottomStyle: "solid",
    fontWeight: "bold",
    textDecoration: "underline ",
    borderWidth: "1",
    textDecorationThickness: "1.5px",
  },
  radius: { borderRadius: "100px" },
  buttonQ: { width: "80px", borderWidth: "1px", borderColor: "black" },
  buttonGroup: { borderWidth: "1px", borderColor: "black" },
};

export default classes;
