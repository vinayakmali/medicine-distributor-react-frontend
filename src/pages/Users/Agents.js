import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { DataGrid } from '@material-ui/data-grid';
import httpservice from '../../service/httpService';
import Topheader from '../../components/header';
import {Link} from 'react-router-dom';
import { useSelector } from 'react-redux';

const columns1 = [
  { field: 'email', headerName: 'Email', editable: true, width: 350 },
  { field: 'role', headerName: 'Role', editable: true, width: 250 },
  { field: 'created_at',type: 'date', editable: true, headerName: 'Created On', width: 350 },
];
const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
  pageHeading: {
  	padding: '20px',
  },
});

const linkStyle = {
  textDecoration: 'none',
  color: '#fff',
background: '#3f51b5',
padding: '10px 30px',
borderRadius: '5px',
textTransform: 'uppercase',
};

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
const Agents = () => {
  const classes = useStyles();
  const serv = new httpservice();
  const [editRowsModel, setEditRowsModel] = React.useState({});

const [rows,setRows] = useState([]);

const useDetails = useSelector(state=>state.userDetails);
console.log(useDetails)
useEffect(()=>{
  serv.getAllUsers('ddd').then((resp)=>{
    setRows(resp.data.body);
      
      }).catch((error)=>{
      });
},[])
  const handleEditCellChange = React.useCallback(
    ({ id, field, props }) => {
      console.log("hi")
      console.log(props)
      if (field === 'email') {
        const data = props; // Fix eslint value is missing in prop-types for JS files
        const isValid = validateEmail(data.value);
        const newState = {};
        newState[id] = {
          ...editRowsModel[id],
          email: { ...props, error: !isValid },
        };
        setEditRowsModel((state) => ({ ...state, ...newState }));
      }

      let user = {};
      if (field === 'email') { user = {id: id,email:props.value}; }
      if (field === 'name') { user = {id: id,name:props.value}; }
      if (field === 'role') { user = {id: id,role:props.value}; }

      serv.updateUser(user).then((resp)=>{
        const status = resp.data.success;

          }).catch((error)=>{
          });
    },
    [editRowsModel],
  );
  return (

    <Paper className={classes.root}>
      <Topheader/>
      <div className={classes.pageHeading}>
	    	<Grid container>
	        	<Grid item xs>
	          		<Typography component="h1" variant="h5"> Agents List </Typography>
	        	</Grid>
	        	<Grid item>
	        		<Link to="/addAgents" color="inherit" style={linkStyle}>Add New Agent</Link>
	        	</Grid>
	      	</Grid>
	    </div>
    	<div className={classes.pageHeading}>
        <h1>All Users List</h1>
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid rows={rows} onEditCellChange={handleEditCellChange} editRowsModel={editRowsModel} columns={columns1} />
        </div>
	    </div>
    </Paper>
  );
}

export default Agents;