import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { mainListItems, secondaryListItems } from "./listItems";
import { Button, FormControl } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import Chart from "./Chart";
import Deposits from "./Deposits";
import Orders from "./Orders";

import SignIn from "./Signin";
import { useDispatch, useSelector } from "react-redux";
import { setAccount, setPk } from "./store";
import { TextField } from "@mui/material";
import { createBox } from "@mui/system";
import { yellow } from "@mui/material/colors";
import axios from "axios";
import { Slider } from "@mui/material";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const BgImg = () => {
  return (
    <Box
      sx={{
        position: "absolute",
        height: "100vh",
        width: "100%",
        left: 0,
        top: 0,
        overflow: "hidden",
        zIndex: -99,
      }}
    >
      <Box
        sx={{
          position: "absolute",
          height: 80,
          color: "gray",
          top: 0,
          bottom: 0,
          my: "auto",
          ml: 45,
        }}
      >
        <Typography variant="h3">
          Physiological Data
          <br /> Authentication Blockchain App
        </Typography>
      </Box>
      <img
        style={{ width: "100%" }}
        src={require("./homepage_big.png")}
        alt="homepage"
      />
    </Box>
  );
};

const type = [
  { uri: "Heart_Beats", class: "Heart_Beats" },
  { uri: "Step_Counts", class: "Step_Counts" },
  { uri: "Blood_Oxygen", class: "Blood_Oxygen" },
  { uri: "Blood_Pressure", class: "Blood_Pressure" },
  { uri: "Body_Temperature", class: "Body_Temperature" },
];

const ShowChart = (props) => {

  return type.map((t) => (
    <Grid item xs={12}>
      <Paper
        sx={{
          p: 3,
          display: "flex",
          flexDirection: "column",
          borderRadius: 10,
          boxShadow: 5,
          height: 240,
        }}
      >
        <Chart span={props.span} {...t} pro={props.pro} />
      </Paper>
    </Grid>
  ));
};

const PKform = () => {
  const dispatch = useDispatch();
  const account = useSelector((state) => state.account);
  const pk = useSelector((state) => state.pk);
  const [pkState, setPkState] = React.useState("");

  React.useEffect(() => {
    axios
      .post(`http://localhost:8877/api/getpk`, {
        account: account,
      })
      .then((response) => {
        console.log(response);
        if (response.data !== "" && response.data.pk.length === 32) {
          dispatch(setPk(response.data.pk));
        }
      })
      .catch((error) => console.log(error));
  }, [account]);

  const bindPK = (event) => {
    if (pkState.length === 32) {
      console.log(account, pkState);
      axios
        .post(`http://localhost:8877/api/bind`, {
          account: account,
          pk: pkState,
        })
        .then((response) => console.log(response))
        .catch((error) => console.log(error));
      dispatch(setPk(pkState));
    }
  };

  return (
    <Box
      component="main"
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[100]
            : theme.palette.grey[900],
        flexGrow: 1,
        height: "100vh",
        overflow: "auto",
      }}
    >
      <Container
        sx={{
          mt: 20,
          p: 3,
          borderRadius: 5,
          boxShadow: 3,
        }}
      >
        <Typography variant="h4">Bind Your Public Key First!</Typography>
        <Typography variant="overline">
          You haven't bind your public key to the account.
        </Typography>

        <form onSubmit={bindPK}>
          <FormControl fullWidth>
            <InputLabel htmlFor="outlined-adornment-password">
              Input Your Public Key Here
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              label="Input Your Public Key Here"
              margin="normal"
              required
              autoFocus
              value={pkState}
              type="password"
              onChange={(e) => {
                setPkState(e.target.value);
                console.log(pkState);
              }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    edge="end"
                  >
                    <Button
                      variant="contained"
                      component="span"
                      type="submit"
                      onClick={bindPK}
                    >
                      Bind
                    </Button>
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </form>
      </Container>
    </Box>
  );
};

const DataVis = () => {
  const providers = useSelector((state) => state.providers);
  const [span, setSpan] = React.useState(1);
  const [pro, setPro] = React.useState(providers[0]);

  const mapList = () => {
    return providers.map((p) => (
      <MenuItem value={p}>{p}</MenuItem>
    ));
  };

  

  const handleChange = (e, v) => {
    setSpan(v);
  };

  const handleChangePro = (e) => {
    setPro(e.target.value);
  };

  return (
    <Box
      component="main"
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[100]
            : theme.palette.grey[900],
        flexGrow: 1,
        height: "100vh",
        overflow: "auto",
      }}
    >
      <Toolbar />

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={4}>
          <Container
            sx={{
              width: 900,
              mt: 5,
              display: "flex",
            }}
          >
            <FormControl sx={{ flex: 1, mr: 5 }}>
              <InputLabel id="demo-simple-select-label">Provider</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={pro}
                label="Provider"
                onChange={handleChangePro}
              >
                {mapList()}
              </Select>
            </FormControl>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h5">Time Span : {span} days</Typography>
              <Slider
                value={parseInt(span)}
                onChange={handleChange}
                defaultValue={1}
                step={1}
                min={1}
                max={16}
              />
            </Box>
          </Container>
          {ShowChart({ span, pro })}
        </Grid>
      </Container>
    </Box>
  );
};

const mdTheme = createTheme();

function DashboardContent() {
  const dispatch = useDispatch();
  const account = useSelector((state) => state.account);
  const pk = useSelector((state) => state.pk);

  const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const CheckAccount = () => {
    console.log("check");
    if (window.ethereum.selectedAddress != undefined) {
      dispatch(setAccount(window.ethereum.selectedAddress));
    }
  };

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Physiological Data Blockchain App
            </Typography>
            {/* <IconButton color="inherit">
              <Badge badgeContent={0} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton> */}
            {/* 登入 */}
            <SignIn onClick={CheckAccount} />
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open} sx={{ height: "100vh" }}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav" sx={{ height: "100%" }}>
            {mainListItems}
            <Divider sx={{ my: 1 }} />
            {secondaryListItems}
          </List>
        </Drawer>
        {account.length > 0 ? (
          pk.length > 0 ? (
            <DataVis />
          ) : (
            <PKform />
          )
        ) : (
          <BgImg />
        )}
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}
