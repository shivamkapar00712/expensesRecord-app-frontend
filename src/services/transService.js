
import http from './httpServices';

export function debit(title,amount,date){
  return http.post(
    `/transactions`,
    {
      title,
      debit:amount,
      credit:0,
      date
    }
  )
}


export function credit(title,amount,date){
  return http.post(
    `/transactions`,
    {
      title,
      debit:0,
      credit:amount,
      date
    }
  )
}

export function getAllTransactions(){
  return http.get(`/transactions`)
}