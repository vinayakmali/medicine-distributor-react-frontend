import {createStore} from 'redux';

let isLoggedIn = false;
let userD = [];
if ( sessionStorage.getItem("isLoggedIn") ) 
	isLoggedIn = true;

if ( sessionStorage.getItem("userDetails") )
	userD = JSON.parse(sessionStorage.getItem("userDetails"));

const initialState = {isLoggedIn: isLoggedIn,userDetails: userD,datasets:{},labels:{}};
const stateReducer = (state=initialState, action) => {

if ( action.type === "loginSuccess" ) {
    sessionStorage.setItem("isLoggedIn", true);
    sessionStorage.setItem("userDetails", JSON.stringify(action.userDet));
    return {
        isLoggedIn: true,
        userDetails: {...action.userDet}
    }
}

if ( action.type === "citywise" ) {
    return {
        isLoggedIn: state.isLoggedIn,
        userDetails: state.userDetails,
        datasets: action.data.datasets,
        labels: action.data.labels        
    }
}

if ( action.type === "agent_wise" ) {
   
    return {
        isLoggedIn: state.isLoggedIn,
        userDetails: state.userDetails,
        report: action
        
    }
}

	return state;
};

const store = createStore(stateReducer);

export default store;