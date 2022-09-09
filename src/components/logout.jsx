import React from 'react';
import * as authService from '../services/authService';

const Logout = (props) => {
  authService.logout().then(result=>{
    window.location.href = '/login'
  })
  return ( null );
}
 
export default Logout;