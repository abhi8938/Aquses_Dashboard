import axios from 'axios';

export const getOrders = async () => {
   const token = localStorage.getItem('Token');
   var config = {
      headers: {
         'Content-Type': 'application/json',
         'x-auth-token': token,
      },
      data: {}
   };
   return axios.get('https://aquses.herokuapp.com/api/orders', config)
      .then(response => {
         return response.data;
      })
      .catch(error => {
         console.log(`data`, error);
         return error.response.data;
      })
}