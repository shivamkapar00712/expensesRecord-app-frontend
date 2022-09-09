import React,{useEffect,useState} from 'react';
import * as userService from '../services/userService';
import * as authService from '../services/authService';
import * as transService from '../services/transService';
import InputGroup from './common/InputGroup';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const handleSubmit = (e,txn)=>{
  e.preventDefault();
    transService.debit(txn.title,txn.debit,txn.date).then(
      result=>{
        toast.success('SuccessFully Payed')
        navigator('/dashboard',false);
      }
    ).catch(err=> toast.error(err.response.data))
  }



const handleChange = (e,txn,setTxn) =>{
  const {currentTarget: input} = e;
  const trans = {...txn}
  trans[input.name] = input.value
  setTxn(trans);
}

const NewTransaction = (props) => {
  const navigator = useNavigate();
  const [user, setUser] = useState({});
  useEffect(() => {
    authService.getCurrentUser().then(result => {
      userService.getUserData(result.id).then(currentUser =>{
        const {data} = currentUser
        setUser(data);
      })
    } )
  }, []);


  console.log('before async ',user)
  const [txn, setTxn] = useState({title:'',debit:0,credit:0,date:'',user:{_id:'',name:'',wallet:0}})
  const [errors,setErrors] = useState({});
  useEffect(()=>{
    const trans = {...txn};
    trans.user = {
      _id:user.id,
      name:user.name,
      wallet:user.wallet
    }
    console.log(trans)
    setTxn(trans);
  },[]);
  return ( 
    <form className='form p-4' onSubmit={(e)=>handleSubmit(e, txn,navigator)}>
      <div className="container text-center">
        <h3>New Payment</h3>
      </div>
      <InputGroup
        label="Date"
        name="date"
        type="date"
        value={txn.date}
        onChange={e=>handleChange(e,txn,setTxn)}
        errors={errors.date}
        placeholder="Enter your Date here"
      />
      <InputGroup
        label="Title"
        name="title"
        type="text"
        value={txn.title}
        onChange={e=>handleChange(e,txn,setTxn)}
        errors={errors.title}
        placeholder="Enter your title here"
      />
        <InputGroup
        label="Amount"
        name="debit"
        type="number"
        value={txn.debit}
        onChange={(e)=>handleChange(e,txn,setTxn)}
        errors={errors.debit}
        placeholder="Enter your Amout to pay"
      />
      <button className="btn btn-outline-danger customBtn">Click to Pay</button>
    </form>
   );
}
 
export default NewTransaction;