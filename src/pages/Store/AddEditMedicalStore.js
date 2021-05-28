import InputText from '../../components/UI/InputText/InputText';
import InputButton from '../../components/UI/InputButton/InputButton';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Topheader from '../../components/header';
import { Fragment, useState } from 'react';
import httpservice from '../../service/httpService';
import { useHistory } from "react-router-dom";
import classes from './MedicalStore.module.css';
import medicalStore from '../Store/MedicalStore';

const AddEditAgents = () => {

	const [name, setName] = useState();
	const [location, setLocation] = useState();

	const [nameError, SetNameError] = useState();
	const [LocationError, SetLocationError] = useState();
	const [error, ErrorMessage] = useState('');
	const [valid, Validation] = useState(false);

	const history = useHistory();
	const goToListing = () => history.push('/medicalStore');

	const handleSubmit = async(e) => {
		e.preventDefault();
		let user = {name,location};
		const nameE = (name == '' || name === undefined)?'Name Should Not Empty':'';
		const locationE = (location== '' || location === undefined)?'Location Should Not Empty':'';
		SetNameError(nameE);
		SetLocationError(locationE);
		if(nameE != '' || locationE !='' ){ Validation(false);}else{Validation(true);}

		if(valid){
		const serv = new httpservice();
console.log(user)
		serv.createStore(user).then((resp)=>{
			console.log()
			const status = resp.data.success;
			if(!status){
				ErrorMessage(resp.data.message)
			}else{
				history.push("/medicalStore");
			}
        }).catch((error)=>{
			ErrorMessage(`Error Occured ${error}`)
        });
	}
	}
	  const nameAttr = {"variant": "outlined", "margin": "normal", "required": true, "fullWidth": true, "id": "name", "label": "Store Name", "name": "name", "autoComplete": "name", "autoFocus": true};
	  const locationAttr = {"variant": "outlined", "margin": "normal", "required": true, "fullWidth": true, "id": "location", "label": "Store Location", "name": "location", "autoComplete": "location"};
	  const buttonAttr = {"type": "submit", "fullWidth": true, "variant": "contained", "color": "primary", "className": classes.submit};
	  const cancelBtnAttr = {"type": "button", "fullWidth": true, "variant": "contained", "color": "primary", "className": classes.submit, "onClick": goToListing};

	return (
		<Fragment>
		<Topheader/>
		<Container component="main" maxWidth="xs">
	      	<CssBaseline />
	      	<div>
	        	<Typography component="h1" variant="h5"> Add New Agent </Typography>
				{error}
		        <form onSubmit={handleSubmit} noValidate>
					<InputText attributes={nameAttr} onChange={setName}/>
					<span>{nameError}</span>

					<InputText attributes={locationAttr} onChange={setLocation}/>
					<span>{LocationError}</span>

					
			
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