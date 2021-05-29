import { Route, Switch, useHistory } from "react-router-dom";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard";
import Agents from "./pages/Users/Agents";
import AddEditAgents from "./pages/Users/AddEditAgents";
import MedicalStore from "./pages/Store/MedicalStore";
import AddEditMedicalStore from "./pages/Store/AddEditMedicalStore";
import AssignDelivery from "./pages/AssignDelivery/AssignDelivery";
import AllDelivery from "./pages/AssignDelivery/AllDelivery";
import Medicines from "./pages/Medicine/Medicines";
import AddEditMedicines from "./pages/Medicine/AddEditMedicines";
import { withCookies, Cookies } from "react-cookie";
const cookies = new Cookies();
function App() {
  const tokenString = cookies.get("token");
  const type = sessionStorage.getItem("type");
  const history = useHistory();
  if (tokenString === null) {
    history.push("/login");
  }
  return (
    <div>
      <Switch>
        <Route path="/dashboard">
          <Dashboard type={type} />
        </Route>
        {type === "admin" ? (
          <Route path="/agents">
            <Agents />
          </Route>
        ) : (
          ""
        )}
        :''{"}"}
        {type === "admin" ? (
          <Route path="/addAgents">
            <AddEditAgents />
          </Route>
        ) : (
          ""
        )}
        {type === "admin" ? (
          <Route path="/medicalStore">
            <MedicalStore />
          </Route>
        ) : (
          ""
        )}
        {type === "admin" ? (
          <Route path="/addStore">
            <AddEditMedicalStore />
          </Route>
        ) : (
          ""
        )}
        {type === "admin" ? (
          <Route path="/editStore/:storeId">
            <AddEditMedicalStore />
          </Route>
        ) : (
          ""
        )}
        {type === "admin" ? (
          <Route path="/medicines">
            <Medicines />
          </Route>
        ) : (
          ""
        )}
        {type === "admin" ? (
          <Route path="/addMedicine">
            <AddEditMedicines />
          </Route>
        ) : (
          ""
        )}
        {type === "admin" ? (
          <Route path="/editMedicine/:medicineId">
            <AddEditMedicines />
          </Route>
        ) : (
          ""
        )}
        {type === "admin" ? (
          <Route path="/assignDelivery">
            <AssignDelivery />
          </Route>
        ) : (
          ""
        )}
        <Route path="/alldelivery">
          <AllDelivery type={type} />
        </Route>
        <Route path="/">
          <Login />
        </Route>
      </Switch>
    </div>
  );
}
export default App;
