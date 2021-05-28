import axios from "axios";
export class ProductHttpService {
    constructor(){
        this.cityreport = "http://localhost/msit/api/all_medicines.php";
    }

    getProducts(){
        // Promise<AxiosResponse>
        // AxiosResponse, data is the data to be returned from the
        // rest api
        let response = axios.get(this.url);
        return response;
    }

    getProductById(id){
        // Promise<AxiosResponse>
        // AxiosResponse, data is the data to be returned from the
        // rest api
        let response = axios.get(`${this.url}/${id}`);
        return response;
    }

    getDataFromUrl(url){
         
        let response = axios.get(url);
        return response;
    }



    postProducts(prd){
        let response = axios.post(this.url, prd,{
            headers:{
                "Content-Type":"application/json"
            }
        });
        return response;
    }
}