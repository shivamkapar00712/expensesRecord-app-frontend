import React,{useEffect,useState} from "react";
import Card from "./common/card";
import Wallet from './common/wallet'
import * as authService from "../services/authService";
import * as userService from '../services/userService'
import HiddenCard from "./common/hiddenCards";
import '../css/badge.css'
// let user = authService.getCurrentUser();



const Dashboard = (props) => {
  const [user, setUser] = useState({});
  useEffect(() => {
    authService.getCurrentUser().then(result => {
      userService.getUserData(result.id).then(currentUser =>{
        console.log(currentUser);
        console.log(result)
        const {data} = currentUser
        setUser(data);
      })
    } )
  }, []);
  console.log(props)
  return (
    <React.Fragment>
      <div className="row">
        <div className="col-10">
          <h3 className="text-capitalize">{`Welcome ${user.name}`}</h3>
        </div>
        <div className="col">
          <Wallet user={user} />
        </div>
      </div>
      <div className="container">
      <div className="row">
        <Card label="Transaction Histroy" route="/wallethistory" />
        <Card label="New Payment" route="/transaction" />
        <Card label="Fund Request" route="/fundrequest" />
        <Card label={`Fund Transfer \n Coming soon`} route="/dashboard" />
      </div>
      <div className="row">

      
      <HiddenCard lable='' route='' />
      <HiddenCard lable='' route='' />
      </div>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
