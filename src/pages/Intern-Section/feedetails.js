

import React from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { Container } from 'react-bootstrap';

import vector from "../../assets/images/vector_image.png"


// Define the installments array
const installments = [
  { installment: '1st Installment', status: 'Paid' },
  { installment: '2nd Installment', status: 'Pending' },
  { installment: '3rd Installment', status: 'Pending' },
];

const FeedDetail = () => {
  return (
    <div style={{backgroundImage:`url(${vector})`,height:"650px"}}>
    <div className="container mt-5" >
    <div className='installments' >
      <h3 className="text-left mt-4 mb-4">Fee Details</h3>
      <Table striped bordered hover >
        <thead>
          <tr>
            <th>Installment</th>
            <th>Receipt</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {installments.map((installment, index) => (
            <tr key={index}>
              <td>{installment.installment}</td>
              <td>
                {installment.status === 'Paid' && (
                  <Button variant="primary">Download</Button>
                )}
              </td>
              <td>{installment.status}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      
    </div>
    </div>
    </div>
  );
}

export default FeedDetail;









// import React, { useState } from 'react';

// const FeeDetails = () => {
//   const [paymentOption] = useState('installment');
//   const [installments] = useState(3);
//   const [installmentAmount] = useState(333.33);
//   const [totalAmount] = useState(1000); // Example total amount
//   const [dueDate] = useState('2024-06-30');
//   const [payments] = useState([
//     { installment: 1, paid: true, amount: 333.33 },
//     { installment: 2, paid: false, amount: 333.33 },
//     { installment: 3, paid: true, amount: 333.33 },
//   ]);

//   return (
//     <div>
//       <h2>Fee Details</h2>
      
//       <div>
//         <p>Payment Option: {paymentOption === 'full' ? 'Full Payment' : 'Installments'}</p>
//       </div>

//       {paymentOption === 'full' && (
//         <div>
//           <p>Total Amount: ${totalAmount}</p>
//         </div>
//       )}

//       {paymentOption === 'installment' && (
//         <div>
//           <p>Number of Installments: {installments}</p>
//           <p>Amount per Installment: ${installmentAmount.toFixed(2)}</p>
//           <ul>
//             {payments.map(payment => (
//               <li key={payment.installment}>
//                 Installment {payment.installment}: {payment.paid ? `Paid $${payment.amount}` : 'Not Paid'}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}

//       <div>
//         <p>Last Date for Fee Payment: {dueDate}</p>
//       </div>
//     </div>
//   );
// };

// export default FeeDetails;
