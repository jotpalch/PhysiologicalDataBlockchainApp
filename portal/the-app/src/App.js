import "./App.css";
import * as React from "react";
import SignIn from "./Signin";
import Dashboard from "./Dashboard";
import Metamask from "./metamask";

import { useDispatch, useSelector } from "react-redux";
import { setAccount, setProvider } from "./store";
import axios from "axios";

const App = () => {
  const dispatch = useDispatch() ;

  React.useEffect(() => {
    axios
      .get(
        `http://localhost:8877/api/provider`
      )
      .then((response) => {
        dispatch(setProvider(response.data));
      });
  }, []);

  return (
    <div className="container">
      {/* <SignIn /> */}
      {/* <Metamask /> */}
      <Dashboard />
    </div>
  );
};

export default App;
