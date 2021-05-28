import Topheader from '../components/header';
import Report from './Report/report'
import { withCookies, Cookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';

const type = sessionStorage.getItem('type');
const cookies = new Cookies();


const Dashboard = (props) => {
//	const dispatch = useDispatch();

//	dispatch({type:'citywise',data:''})

const test = useSelector(state => state.citywisereport);
console.log(test)
return (
		<div>
			<Topheader/>	
			
			{(type === "admin") ?<Report/>:''}
			{ (type === 'agent') ? <h1>Welcome to Dashboard....</h1>:''}
			</div>
	);
}

export default Dashboard;