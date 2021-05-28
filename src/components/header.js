import React, { useEffect,useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {NavLink, useHistory} from 'react-router-dom';
import { useCookies,withCookies, Cookies } from 'react-cookie';
import classes from './header.module.css';


const Topheader = () => {
	const cookies1 = new Cookies();
	const tokenString = cookies1.get('token');
	const history = useHistory();
	const[user_type,SetUserType] = useState();
	const type = sessionStorage.getItem('type');
	const [cookies, setCookie, removeCookie] = useCookies(["user"]);

	useEffect(() => {
		SetUserType(type);
	},[])
	const logoutHandler = () =>{
		sessionStorage.clear();
		removeCookie('token');

		history.push('/login')
	}
	return (
		<div className={classes.root}>
			<AppBar position="static">
				<Toolbar>
					{/*<IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
						<MenuIcon />
					</IconButton>*/}
					<Typography variant="h6" className={classes.title}>
					MSIT Distributers
					</Typography>

					<NavLink activeClassName={classes.active} to="/dashboard" color="inherit">Dashboard</NavLink>
				
					{(tokenString && type === 'admin')?<NavLink activeClassName={classes.active} to="/medicalStore" color="inherit">Medical Store</NavLink>:''}
					{(tokenString)?<NavLink activeClassName={classes.active} to="/alldelivery" color="inherit">All Deliveries</NavLink>:''}
					{(tokenString && type === 'admin')?<NavLink activeClassName={classes.active} to="/medicines" color="inherit">Medicines</NavLink>:''}	
					{(tokenString && type === 'admin')?<NavLink activeClassName={classes.active} to="/agents" color="inherit">Agents</NavLink>:''}
					{(!tokenString && type === 'admin')?<NavLink activeClassName={classes.active} to="/login" color="inherit">Login</NavLink>:<a href='#' className={classes.active} onClick={logoutHandler} color="inherit">Logout ({sessionStorage.getItem('name')})</a>}

				</Toolbar>
			</AppBar>
		</div>
	);
}

export default Topheader;
