import React from 'react';
import http from './httpServices';

export  function getUserData(id){
  return http.get(`/user/${id}`)
}