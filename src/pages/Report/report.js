import React, { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import httpservice from "../../service/httpService";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const random = () => Math.floor(Math.random() * 255);

const useStyles = makeStyles((theme) => ({
  button: {
    display: "block",
    marginTop: theme.spacing(2),
  },
  select: {
    width: 300,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 500,
    textAlign: "center",
  },
}));
const BarchartComponent = () => {
  const classes = useStyles();
  const serv = new httpservice();

  const [report_type, SetReportType] = useState("");

  const [return_count_three, SetReturnCount] = useState([]);
  const [store_name_three, SetMedicalNameThree] = useState([]);

  const [dataSetOne, SetDataSetOne] = useState([]);
  const [labelOne, SetLabelOne] = useState([]);
  const [dataSetTwo, SetDataSetTwo] = useState([]);
  const [labelTwo, SetLabelTwo] = useState([]);

  const [dataSetFour, SetDataSetFour] = useState([]);
  const [labelFour, SetLabelFour] = useState([]);

  useEffect(() => {
    //Report 1
    serv
      .getReports({ type: "citywise" })
      .then((resp) => {
        const newArr = [];
        var res = Object.keys(resp.data.data).forEach(function (key) {
          var obj = {};
          Object.keys(resp.data.data[key]).forEach(function (keyArr) {
            obj["data"] = Object.values(resp.data.data[key][keyArr]);
          });
          obj["label"] = key;
          obj["borderColor"] = `rgb(${random()}, ${random()}, ${random()})`;
          newArr.push(obj);
          SetDataSetOne(newArr);
        });
        const status = resp.data.success;
        SetLabelOne(resp.data.label);
      })
      .catch((error) => {});
  }, []);

  const handleChange = (event) => {
    if (event.target.value == "agent_wise") {
      //Report 2
      serv
        .getReports({ type: "agentwise" })
        .then((resp) => {
          const newArr = [];
          var res = Object.keys(resp.data.data).forEach(function (key) {
            var obj = {};
            Object.keys(resp.data.data[key]).forEach(function (keyArr) {
              obj["data"] = Object.values(resp.data.data[key][keyArr]);
            });
            obj["label"] = key;
            obj["borderColor"] = `rgb(${random()}, ${random()}, ${random()})`;
            newArr.push(obj);
            SetDataSetTwo(newArr);
          });
          const status = resp.data.success;
          SetLabelTwo(resp.data.label);
        })
        .catch((error) => {});
    }

    if (event.target.value == "return_medicine") {
      //Report 3
      serv
        .getReports({ type: "returnMedicineReport" })
        .then((resp) => {
          SetReturnCount(resp.data.return_count);
          const status = resp.data.success;
          SetMedicalNameThree(resp.data.name);
        })
        .catch((error) => {});
    }

    if (event.target.value == "delivered_medicines") {
      //Report 4
      serv
        .getReports({ type: "deliveredMedicineReport" })
        .then((resp) => {
          const newArr = [];
          var res = Object.keys(resp.data.data).forEach(function (key) {
            var obj = {};
            Object.keys(resp.data.data[key]).forEach(function (keyArr) {
              obj["data"] = Object.values(resp.data.data[key][keyArr]);
            });
            obj["label"] = key;
            obj["borderColor"] = `rgb(${random()}, ${random()}, ${random()})`;
            newArr.push(obj);
            SetDataSetFour(newArr);
          });
          const status = resp.data.success;
          SetLabelFour(resp.data.label);
        })
        .catch((error) => {});
    }
    SetReportType(event.target.value);
  };

  const data_one = {
    labels: labelOne,
    datasets: dataSetOne,
  };

  const data_two = {
    labels: labelTwo,
    datasets: dataSetTwo,
  };

  const data_four = {
    labels: labelFour,
    datasets: dataSetFour,
  };

  const data_three = {
    labels: store_name_three,
    datasets: [
      {
        label: "Developers",
        backgroundColor: "rgba(80,0,100,1)",
        borderColor: "rgba(0,1,0,1)",
        borderWidth: 4,
        data: return_count_three,
      },
    ],
  };

  return (
    <div className="container" data-testid="report">
      <Container component="main" maxWidth="xs">
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-controlled-open-select-label">
            Select Report Type
          </InputLabel>
			<Select
			defaultValue=""
            data-testid="report-select-field"
            className={classes.select}
            labelId="demo-controlled-open-select-label"
            id="demo-controlled-open-select"
            onChange={handleChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="per_day">Per Day Delivery/ Per City</MenuItem>
            <MenuItem value="agent_wise">
              Agentwise Delivery / Per Day)
            </MenuItem>
            <MenuItem value="return_medicine">Return Medicine</MenuItem>
            <MenuItem value="delivered_medicines">Delivered Medicine</MenuItem>
          </Select>
        </FormControl>
      </Container>
      <table className="table table-bordered table-striped">
        <tbody>
          <tr>
            {report_type === "per_day" || report_type === "" ? (
              <td>
                <h2>Per Day Deliveries(no) per area of the city</h2>
                <Line data={data_one} />
              </td>
            ) : report_type === "agent_wise" ? (
              <td>
                <h2>Agent wise deliveries for a month (each day)</h2>
                <Line data={data_two} />
              </td>
            ) : report_type === "return_medicine" ? (
              <td>
                <h2>Amount of medicines returned by Medical store</h2>
                <Bar data={data_three} />
              </td>
            ) : report_type === "delivered_medicines" ? (
              <td>
                <h2>Medical Store wise delivery per month</h2>
                <Line data={data_four} />
              </td>
            ) : (
              ""
            )}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default BarchartComponent;
