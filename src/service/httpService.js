import axios from 'axios';
import config from '../config'

class SecurityService {

    registerUser(user){
        let response = axios.post(`${config.baseUrl}user_create.php`, user,{
            headers: {
                "Content-Type":"application/json"
            }
        });
        return response;
    }

    updateUser(user){
        let response = axios.post(`${config.baseUrl}user_update.php`, user,{
            headers: {
                "Content-Type":"application/json"
            }
        });
        return response;
    }

    authUser(user){
        let response = axios.post(`${config.baseUrl}/login.php`, user,{
            headers: {
                "Content-Type":"application/json"
            }
        });
        return response;
    }

    getAllUsers(token){
        let response = axios.get(`${config.baseUrl}all_users.php`,{
            headers: {
                "AUTHORIZATION": `Bearer ${token}`
            }
        });
        return response;
    }

    logOut(){
        console.log("nbii")
        window.sessionStorage.clear();
    }

    //store

    createStore(store){
        let response = axios.post(`${config.baseUrl}store_create.php`, store,{
            headers: {
                "Content-Type":"application/json"
            }
        });
        return response;
    }

    updateStore(store){
        let response = axios.post(`${config.baseUrl}store_update.php`, store,{
            headers: {
                "Content-Type":"application/json"
            }
        });
        return response;
    }

    getAllStores(token){
        let response = axios.get(`${config.baseUrl}all_store.php`,{
            headers: {
                "AUTHORIZATION": `Bearer ${token}`
            }
        });
        return response;
    }

    //medicines

    createMedicines(medicines){
        let response = axios.post(`${config.baseUrl}med_create.php`, medicines,{
            headers: {
                "Content-Type":"application/json"
            }
        });
        return response;
    }

    updateMedicines(medicines){
        let response = axios.post(`${config.baseUrl}med_update.php`, medicines,{
            headers: {
                "Content-Type":"application/json"
            }
        });
        return response;
    }

    getAllMedicines(token){
        let response = axios.get(`${config.baseUrl}all_medicines.php`,{
            headers: {
                "AUTHORIZATION": `Bearer ${token}`
            }
        });
        return response;        
    }


        //delivery

        createdelivery(delivery){
            let response = axios.post(`${config.baseUrl}delivery_create.php`, delivery,{
                headers: {
                    "Content-Type":"application/json"
                }
            });
            return response;
        }

        async getAllDelivery(token,user){
            let response = await axios.post(`${config.baseUrl}all_delivery.php`,user,{
                headers: {
                    "AUTHORIZATION": `Bearer ${token}`
                }
            });
            return response;        
        }

        updateDelivery(delivery){
            let response = axios.post(`${config.baseUrl}delivery_update.php`, delivery,{
                headers: {
                    "Content-Type":"application/json"
                }
            });
            return response;
        }

        getReports(delivery){
            let response = axios.post(`${config.baseUrl}get_reports.php`, delivery,{
                headers: {
                    "Content-Type":"application/json"
                }
            });
            return response;
        }
}

export default SecurityService;