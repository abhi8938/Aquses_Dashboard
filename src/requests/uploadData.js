import axios from 'axios';

export const createEmployee = async (
        fullName,
        mobileNumber,
        password,
        emailAddress,
) => {
   var config = {
      headers: {'Content-Type': 'application/json',
                 },
      data:{}
  };

   return axios.post('https://aquses.herokuapp.com/api/employees',{
      fullName,
      mobileNumber,
      password,
      emailAddress,
    },config)
    .then( response =>{
    return response;
    })
    .catch( error => {
       return error.response;
    })
}

export const orderBilled = async (orderId,amount,weight) => {
   var config = {
      headers: {'Content-Type': 'application/json',
                 },
      data:{}
  };

   return axios.put('https://aquses.herokuapp.com/api/orders/amount',{
      orderId,
      amount,
      weight
    },config)
    .then( response =>{
    return response.data;
    })
    .catch( error => {
       return error.response.data;
    })
}

export const updateEmployee = async (name,job,orderId) => {
   var config = {
      headers: {'Content-Type': 'application/json',
                 },
      data:{}
  };
   return axios.put('https://aquses.herokuapp.com/api/orders/employee',{
      name,
      job,
      orderId
    },config)
    .then( response =>{
    return response;
    })
    .catch( error => {
       return error.response;
    })
}

export const createUserToken = async (
   emailAddress,
   password
) => {
   var config = {
      headers: {'Content-Type': 'application/json',
                 },
      data:{}
  };
  return axios.post('https://aquses.herokuapp.com/api/auth/user',{
        emailAddress: emailAddress,
        password: password
   },config)
   .then( response =>{
   return response;
   })
   .catch( error => {
      return error.response;
   } )
}