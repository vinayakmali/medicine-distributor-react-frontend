import InputText from '../../components/UI/InputText/InputText';
import InputButton from '../../components/UI/InputButton/InputButton';
import Dropdown from '../../components/UI/Dropdown/Dropdown';
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
import { Fragment, useState } from 'react';
import httpservice from '../../service/httpService';
import { useHistory } from "react-router-dom";
import classes from '../Store/MedicalStore.module.css';
import Medicines from './Medicines';

const AddEditMedicines = () => {

	const [name, setName] = useState();
	const [nameError, SetNameError] = useState();
	const [error, ErrorMessage] = useState('');
	const [valid, Validation] = useState(false);

	const history = useHistory();
	const goToListing = () => history.push('/medicines');

	const handleSubmit = async(e) => {
		e.preventDefault();
		let medicines = {name};
		const nameE = (name == '' || name === undefined)?'Name Should Not Empty':'';
		SetNameError(nameE);
		if(nameE != ''){ Validation(false);}else{Validation(true);}

		if(valid){
		const serv = new httpservice();
		serv.createMedicines(medicines).then((resp)=>{
			console.log()
			const status = resp.data.success;
			if(!status){
				ErrorMessage(resp.data.message)
			}else{
				history.push("/medicines");
			}
        }).catch((error)=>{
			ErrorMessage(`Error Occured ${error}`)
        });
	}
	}
	  const nameAttr = {"variant": "outlined", "margin": "normal", "required": true, "fullWidth": true, "id": "name", "label": "Medicine Name", "name": "name", "autoComplete": "name", "autoFocus": true};
	  const buttonAttr = {"type": "submit", "fullWidth": true, "variant": "contained", "color": "primary", "className": classes.submit};
	  const cancelBtnAttr = {"type": "button", "fullWidth": true, "variant": "contained", "color": "primary", "className": classes.submit, "onClick": goToListing};

	return (
		<Fragment>
		<Topheader/>
		<Container component="main" maxWidth="xs">
	      	<CssBaseline />
	      	<div>
	        	<Typography component="h1" variant="h5"> Add New Medicine </Typography>
				{error}
		        <form onSubmit={handleSubmit} noValidate>
					<InputText attributes={nameAttr} onChange={setName}/>
					<span>{nameError}</span>		
			
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

export default AddEditMedicines;