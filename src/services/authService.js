import http from "./httpServices";
import jwtDecode from "jwt-decode";
var tokenKey = 'token2';

export async function getCurrentUser(){
  try{
    const token = localStorage.getItem(tokenKey)
    const user = await jwtDecode(token);
    return user
  }catch(ex){
    return {_id:'',name:'',wallet:0};
  }
}



export async function login(email,password){
  try {
    console.log('loggin in in process')
    const {data} = await http.post(
      `http://localhost:5000/login`,
      {
        email,
        password
      }
    )
    console.log('logged')
    localStorage.setItem(tokenKey, data.token);
    console.log('stored')
    console.log(localStorage.getItem(tokenKey))
  
  } catch (ex) {
    console.log(ex)
  }
}

export function loginWithJWT(token){
  localStorage.setItem(tokenKey,token)
}
export function getJWT(){
  return localStorage.getItem('token2');
}


export async function logout(){
  localStorage.removeItem(tokenKey);
}