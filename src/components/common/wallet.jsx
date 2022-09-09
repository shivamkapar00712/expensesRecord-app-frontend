import React,{ useState, useEffect } from 'react';
import * as userService from "../../services/userService";
import purse from "../../img/purse.png";


const Wallet = ({user}) => {
  // const [person, setPerson] = useState({});
  // useEffect(() => {
  //   userService.getUserData(props.user.id).then(({ data }) => setPerson(data));
  //   console.log(person);
  // }, []);
  return (
    <React.Fragment>
      <div className="row form">
        <div className="col-5">
          <img src={purse} width={50} />
        </div>
        <div className="col">
          <h3 className="wallet-text text-right">{user.wallet}</h3>
        </div>
      </div>
      <div className="badge bg-wallet">Wallet</div>
    </React.Fragment>
  );
};

export default Wallet;