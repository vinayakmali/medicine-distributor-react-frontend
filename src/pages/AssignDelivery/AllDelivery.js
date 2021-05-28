import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { DataGrid, GridRowsProp, GridColDef } from '@material-ui/data-grid';
import httpservice from '../../service/httpService';
import Topheader from '../../components/header';
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Map from '../Map'

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();
  return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles(theme => ({
  modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
  },
  paper: {
      position: 'absolute',
      width: 450,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
  },
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
  pageHeading: {
  	padding: '20px',
  },
}));

const button = {"type": "button", "fullWidth": true, "variant": "contained", "color": "primary"};

const linkStyle = {
textDecoration: 'none',
color: '#fff',
background: '#3f51b5',
padding: '10px 30px',
borderRadius: '5px',
textTransform: 'uppercase',
};

const MedicalStore = (props) => {
  const classes = useStyles();
  const serv = new httpservice();
  const [editRowsModel, setEditRowsModel] = React.useState({});
  const [open, setOpen] = useState(false);
  const [rowsPerPage, setDeliveryPerPage] = React.useState(10);
  const [rows,setDelivery] = useState([]);
  const [modalStyle] = React.useState(getModalStyle);

  const renderDetailsButton = (params) => {
    return (
        <strong>
            <Button
                variant="contained"
                color="primary"
                size="small"
                style={{ marginLeft: 16 }}
                onClick={() => {
                  if(params.row.lon !== null && params.row.lat !== null){
                    localStorage.setItem('lona', params.row.lon);
                    localStorage.setItem('lata', params.row.lat);
                    setOpen(true);
                  }else{
                    alert('Location is not set by Agent')
                  }
                }}
            >
                Track Delivery Agent
            </Button>
        </strong>
    )
  }

  const handleClose = () => {
    setOpen(false); 
  };

  const columns1 = [
    { field: 'user_name', headerName: 'Agent Name', width: 150 },
    { field: 'med_name', headerName: 'MedicineName', width: 200 },
    { field: 'store_name', headerName: 'Store Name', width: 200 },
    { field: 'quantity', headerName: 'Quatity',width: 100 },
    { field: 'delivery_date',type: 'date', headerName: 'delivery Date', width: 200 },
    { field: 'return_count', headerName: 'Update Return Count', editable: true, width: 180 },
    {
      field: 'col7',
      headerName: 'Action',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 200,
      renderCell: renderDetailsButton,
    },
  ];

  useEffect(()=>{
    const type = sessionStorage.getItem('type');
    const user_id = sessionStorage.getItem('user_id');

    serv.getAllDelivery('ww',{type,user_id}).then((resp)=>{
    const status = resp.data.success;
    setDelivery(resp.data.body);
      }).catch((error)=>{
      });
    },[])
  
    const handleEditCellChange = React.useCallback(
    ({ id, field, props }) => {    
      let store = {};
      if (field == 'return_count') { store = {id: id,return_count:props.value}; }
        serv.updateDelivery(store).then((resp)=>{
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
	          		<Typography component="h1" variant="h5"> {(props.type === 'admin')?'Delivery Details':'Update Return Status'} </Typography>
	        	</Grid>
	          {(props.type === 'admin')?<Grid item><Link to="/assignDelivery" color="inherit" style={linkStyle}>Assign Delivery</Link></Grid>:''}
	      </Grid>
	    </div>
    	<div className={classes.pageHeading}>
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid rows={rows} onEditCellChange={handleEditCellChange} editRowsModel={editRowsModel} columns={columns1} />
        </div>
	    </div>

      <Modal aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description" open={open} onClose={handleClose}>
        <div style={modalStyle} className={classes.paper}>
          <Map/>
        </div>
      </Modal>
    </Paper>
  );
}

export default MedicalStore;