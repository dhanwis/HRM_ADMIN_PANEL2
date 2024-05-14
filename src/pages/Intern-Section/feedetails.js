

import React from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { Container } from 'react-bootstrap';

// Define the installments array
const installments = [
  { installment: '1st Installment', status: 'Paid' },
  { installment: '2nd Installment', status: 'Pending' },
  { installment: '3rd Installment', status: 'Pending' },
];

const FeedDetail = () => {
  return (
    <div className="container mt-5">
    <div className='installments'>
      <h3 className="text-left mt-4 mb-4">Fee Details</h3>
      <Table striped bordered hover>
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
  );
}

export default FeedDetail;