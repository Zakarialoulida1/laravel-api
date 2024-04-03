import { axiosClient } from "../../../api/axios"

const StudentApi ={
getcsrf:async()=>{
   return  await axiosClient.get('/sanctum/csrf-cookie ')
    
},
login:async(email,password)=>{
   
   return  await axiosClient.post('api/login', {email,password})
},

logout:async()=>{
    try {

        const token = localStorage.getItem('token');
        console.log(token);
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        };
     
        const response= await axiosClient.post('api/logout',{},{headers})
        console.log(response);
        return response;
    } catch(error){
        throw error;
    }
},


getUser: async () => {
   try {
       const token = localStorage.getItem('token');
       const headers = {
           'Authorization': `Bearer ${token}`,
           'Content-Type': 'application/json'
       };
       const response = await axiosClient.get('api/user', { headers });

       return response;
   } catch (error) {
       throw error;
   }
}


}

export default StudentApi