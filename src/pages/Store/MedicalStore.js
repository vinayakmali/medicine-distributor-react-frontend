import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { DataGrid, GridRowsProp, GridColDef } from "@material-ui/data-grid";
import httpservice from "../../service/httpService";
import Topheader from "../../components/header";
import { Link } from "react-router-dom";
import classes from "../Users/Agent.module.css";
const columns1 = [
  { field: "name", headerName: "Name", editable: true, width: 350 },
  { field: "location", headerName: "location", editable: true, width: 250 },
  {
    field: "created_at",
    type: "date",
    editable: true,
    headerName: "Created On",
    width: 350,
  },
];
const button = {
  type: "button",
  fullWidth: true,
  variant: "contained",
  color: "primary",
};
const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
  pageHeading: {
    padding: "20px",
  },
});
const linkStyle = {
  textDecoration: "none",
  color: "#fff",
  background: "#3f51b5",
  padding: "10px 30px",
  borderRadius: "5px",
  textTransform: "uppercase",
};
const MedicalStore = () => {
  const classes = useStyles();
  const serv = new httpservice();
  const [editRowsModel, setEditRowsModel] = React.useState({});
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = useState([]);
  useEffect(() => {
    serv
      .getAllStores("ddd")
      .then((resp) => {
        const status = resp.data.success;
        console.log(resp.data.body);
        setRows(resp.data.body);
      })
      .catch((error) => {});
  });
  const handleEditCellChange = React.useCallback(
    ({ id, field, props }) => {
      let store = {};
      if (field == "name") {
        store = { id: id, name: props.value };
      }
      if (field == "location") {
        store = { id: id, location: props.value };
      }
      console.log(store);
      serv
        .updateStore(store)
        .then((resp) => {
          const status = resp.data.success;
        })
        .catch((error) => {});
    },
    [editRowsModel]
  );
  return (
    <Paper className={classes.root}>
      <Topheader />
      <div className={classes.pageHeading}>
        <Grid container>
          <Grid item xs>
            <Typography component="h1" variant="h5">
              {" "}
              Agents List{" "}
            </Typography>
          </Grid>
          <Grid item>
            <Link to="/addStore" color="inherit" style={linkStyle}>
              Add Store
            </Link>
          </Grid>
        </Grid>
      </div>
      <div className={classes.pageHeading}>
        <h1>Medical Store</h1>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={rows}
            onEditCellChange={handleEditCellChange}
            editRowsModel={editRowsModel}
            columns={columns1}
          />
        </div>
      </div>
    </Paper>
  );
};
export default MedicalStore;
