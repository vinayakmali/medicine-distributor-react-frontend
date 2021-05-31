import { useEffect } from "react";
import Topheader from "../components/header";
import Report from "./Report/report";

const Dashboard = (props) => {
  let type = props.type ?? "admin";
  if (typeof props.type == "undefined") {    
    type = sessionStorage.getItem("type");
  }
  // useEffect(() => {}, [type]);
  return (
    <div>
      <Topheader />
      {props.type === "admin" ? <Report /> : ""}
      {props.type === "agent" ? <h1>Welcome to Dashboard....</h1> : ""}
    </div>
  );
};
export default Dashboard;
