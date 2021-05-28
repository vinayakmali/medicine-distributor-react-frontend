import InputText from '../../components/UI/InputText/InputText';
import InputButton from '../../components/UI/InputButton/InputButton';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Topheader from '../../components/header';
import { Fragment, useEffect, useState } from 'react';
import httpservice from '../../service/httpService';
import { useHistory } from "react-router-dom";
import classes from '../Store/MedicalStore.module.css';
import medicalStore from '../Store/MedicalStore';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Dropdown from '../../components/UI/Dropdown/Dropdown';

const AddEditAgents = () => {

    const [deliver_count, setDeliveryCount] = useState('');
	const [user, setUser] = useState();
    const [AgentsList,setAgentsList] = useState([]);
    const [StoreList,setStoreList] = useState([]);
    const [MedicineList,setMedicineList] = useState([]);
    const [Medicine,setMedicine] = useState([]);
    const [Store,setStore] = useState([]);
	const [DeliveryCountError, SetDeliveryCountError] = useState();
	const [error, ErrorMessage] = useState('');
	const [valid, Validation] = useState(false);
    const serv = new httpservice();

    useEffect(()=>{
        serv.getAllUsers('ddd').then((resp)=>{
          const status = resp.data.success;

          setAgentsList(resp.data.body)
            }).catch((error)=>{
            });
      },[])

      useEffect(()=>{
        serv.getAllStores('ddd').then((resp)=>{
            const status = resp.data.success;
            console.log(resp.data.body)
            setStoreList(resp.data.body);
              }).catch((error)=>{
              });
        },[])

        useEffect(()=>{
            serv.getAllMedicines('ddd').then((resp)=>{
                const status = resp.data.success;
                console.log(resp.data.body)
                setMedicineList(resp.data.body);
                  }).catch((error)=>{
                  });
            },[]) 

	const history = useHistory();
	const goToListing = () => history.push('/alldelivery');

	const handleSubmit = async(e) => {
		e.preventDefault();
		let delivery = {deliver_count,user,Store,Medicine};
        console.log(delivery)
		const deliver_countE = (deliver_count== '' || deliver_count === undefined)?'deliver_count Should Not Empty':'';
		SetDeliveryCountError(deliver_countE);
		if(deliver_countE !='' ){ Validation(false);}else{Validation(true);}

		if(valid){
		serv.createdelivery(delivery).then((resp)=>{
			console.log()
			const status = resp.data.success;
			if(!status){
				ErrorMessage(resp.data.message)
			}else{
				history.push("/alldelivery");
			}
        }).catch((error)=>{
			ErrorMessage(`Error Occured ${error}`)
        });
	}
	}

	  const deliveryCountAttr = {"variant": "outlined", "margin": "normal", "required": true, "fullWidth": true, "id": "location", "label": "Count To Be delivered", "name": "deliver_count", "autoComplete": "location"};
	  const buttonAttr = {"type": "submit", "fullWidth": true, "variant": "contained", "color": "primary", "className": classes.submit};
	  const cancelBtnAttr = {"type": "button", "fullWidth": true, "variant": "contained", "color": "primary", "className": classes.submit, "onClick": goToListing};
        const UserAttr = { "labelId":"demo-simple-select-label",name:'user', "id":"demo-simple-select"}
        const StoreAttr = { "labelId":"demo-simple-select-label",name:'Store', "id":"demo-simple-select"}
        const MedicineAttr = { "labelId":"demo-simple-select-label",name:'Medicine', "id":"demo-simple-select"}

        return (
		<Fragment>
		<Topheader/>
		<Container component="main" maxWidth="xs">
	      	<CssBaseline />
	      	<div>
	        	<Typography component="h1" variant="h5"> Assign Delivery </Typography>
				{error}
		        <form onSubmit={handleSubmit} noValidate>

					<InputText className="mw-120" attributes={deliveryCountAttr} onChange={setDeliveryCount}/>
					<span>{DeliveryCountError}</span>

                    <Dropdown label="Select Agent" attributes={UserAttr} items={AgentsList} onChange={setUser}/>
				
                    <Dropdown label="Select Store" attributes={StoreAttr} items={StoreList} onChange={setStore}/>
                    <Dropdown label="Select Medicines" attributes={MedicineAttr} items={MedicineList} onChange={setMedicine}/>

					<Grid container spacing={3}>
		            	<Grid item xs>
		              		<InputButton attributes={cancelBtnAttr}>Cancel</InputButton>
		            	</Grid>

		            	<Grid item xs>
		              		<InputButton attributes={buttonAttr}>Submit</InputButton>
		            	</Grid>
		          	</Grid>
			    </form>
	      	</div>
	    </Container>
		</Fragment>
	);
	
}

export default AddEditAgents;