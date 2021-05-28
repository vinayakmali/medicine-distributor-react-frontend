import InputText from '../../components/UI/InputText/InputText';
import InputButton from '../../components/UI/InputButton/InputButton';
import Dropdown from '../../components/UI/Dropdown/Dropdown';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Topheader from '../../components/header';
import { Fragment, useState } from 'react';
import httpservice from '../../service/httpService';
import { useHistory } from "react-router-dom";

const AddEditAgents = () => {

	const [name, setUserName] = useState();
	const [nameError, SetNameError] = useState();
	const [EmailError, SetEmailError] = useState();
	const [PasswordError, SetPasswordError] = useState();
	const [RoleError, SetRoleError] = useState();
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const [role, setRole] = useState();
	const [error, ErrorMessage] = useState('');
	const [valid, Validation] = useState(false);

	const history = useHistory();
	const goToListing = () => history.push('/medicines');
	const handleSubmit = async(e) => {
		e.preventDefault();
		let user = {name,email,password,role};
		const nameE = (name == '' || name === undefined)?'Name Should Not Empty':'';
		const emailE = (email== '' || email === undefined)?'Email Should Not Empty':'';
		const passwordE = (password== '' || password === undefined)?'Password Should Not Empty':'';
		const roleE = (role== '' || role === undefined)?'Role Should Not Empty':'';
		console.log(passwordE)
		SetNameError(nameE);
		SetEmailError(emailE);
		SetPasswordError(passwordE);
		SetRoleError(roleE);
		if(nameE !== '' || emailE !=='' || passwordE !== '' || roleE !== ''){ Validation(false);}else{Validation(true);}

		if(valid){
		const serv = new httpservice();

		serv.registerUser(user).then((resp)=>{
			console.log()
			const status = resp.data.success;
			if(!status){
				ErrorMessage(resp.data.message)
			}else{
				history.push("/agents");
			}
        }).catch((error)=>{
			ErrorMessage(`Error Occured ${error}`)
        });
	}
	}


	const RoleName = [
		{
		  name: "Admin",
		  id: "admin",
		},
		{
		  name: "Agent",
		  id: "agent",
		}
	  ];
	const nameAttr = {"variant": "outlined", "margin": "normal", "required": true, "fullWidth": true, "id": "name", "label": "Agent Name", "name": "name", "autoComplete": "name", "autoFocus": true};
	const emailAttr = {"variant": "outlined", "margin": "normal", "required": true, "fullWidth": true, "id": "email", "label": "Email Address", "name": "email", "autoComplete": "email"};
	const passwordAttr = {"variant": "outlined", "margin": "normal", "required": true, "fullWidth": true, "name": "password", "label": "Password", "type": "password", "id": "password", "autoComplete": "current-password"};
	const RoleAttr = {"variant": "outlined", "margin": "normal", "required": true, "fullWidth": true, "name": "role", "label": "Role", "type": "role", "id": "role", "autoComplete": "role"};
	const buttonAttr = {"type": "submit", "fullWidth": true, "variant": "contained", "color": "primary"};
	const cancelBtnAttr = {"type": "button", "fullWidth": true, "variant": "contained", "color": "primary",  "onClick": goToListing};
	return (
		<Fragment>
		<Topheader/>
		<Container component="main" maxWidth="xs">
	      	<CssBaseline />
	      	<div>
	        	<Typography component="h1" variant="h5"> Add New Agent </Typography>
				{error}
		        <form onSubmit={handleSubmit} noValidate>

				<Grid container>
					<InputText attributes={nameAttr} onChange={setUserName}/>
					<span>{nameError}</span>
					<InputText attributes={emailAttr} onChange={setEmail}/>
					<span>{EmailError}</span>
					<InputText attributes={passwordAttr} onChange={setPassword}/>
					<span>{PasswordError}</span>

					<Dropdown label='Select Role' attributes={RoleAttr} items={RoleName} value={RoleName} onChange={setRole} />
					<span>{RoleError}</span>
				</Grid>
				<Grid container pt={4}>
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