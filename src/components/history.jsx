import React, { useState, useEffect } from "react";
import "../css/table.css";
import * as transService from "../services/transService";

const TransactionHistory = () => {
  const [txn, setTxn] = useState([]);
  useEffect(() => {
    transService.getAllTransactions().then(({ data }) => {
      setTxn(data.filter((t) => t));
      console.log('i m working')
    });
  }, []);
  let sno = 1;
  return (
    <table className="table2 form">
      <thead>
        <tr>
          <th scope="col" className="p-3">
            S.No
          </th>
          <th scope="col" className="p-3">
            Date
          </th>
          <th scope="col" className="p-3">
            Title
          </th>
          <th scope="col" className="p-3">
            Debit
          </th>
          <th scope="col" className="p-3">
            Credit
          </th>
          <th scope="col" className="p-3">
            Balance
          </th>
        </tr>
      </thead>
      <tbody>
        {txn.map((t) => (
          <tr key={t._id}>
            <th scope="row" className="p-2">
              {sno++}
            </th>
            <td className="p-2">{t.date}</td>
            <td className="p-2">{t.title}</td>
            <td className="p-2">{t.debit}</td>
            <td className="p-2">{t.credit}</td>
            <td className="p-2">{t.user.wallet}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TransactionHistory;
