import "./App.css";

import SignIn from "./Signin";
import Dashboard from "./Dashboard";
import Metamask from "./metamask";

import { useSelector } from "react-redux";

const App = () => {

  return (
    <div className="container">
      {/* <SignIn /> */}
      {/* <Metamask /> */}
      <Dashboard />
    </div>
  ); 
};

export default App;
