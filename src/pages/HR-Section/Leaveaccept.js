import React, { useState, useEffect } from 'react';
import { List, Button } from 'antd';
import 'antd/dist/antd.css';

const LeaveRequest = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);

  useEffect(() => {
    fetchLeaveRequests();
  }, []);

  const fetchLeaveRequests = async () => {
    try {
      // Simulate fetching leave requests from the server
      const data = [
        { id: 1, employeeName: 'John Doe', startDate: '2024-05-15', endDate: '2024-05-20', status: 'pending' },
        { id: 2, employeeName: 'Jane Smith', startDate: '2024-05-17', endDate: '2024-05-22', status: 'pending' }
      ];
      setLeaveRequests(data);
    } catch (error) {
      console.error('Error fetching leave requests:', error);
    }
  };

  const handleAccept = async (id) => {
    try {
      // Update the status of the leave request to 'accepted'
      console.log(`Leave request with ID ${id} accepted.`);
      // You would typically send a request to your backend to update the status
    } catch (error) {
      console.error('Error accepting leave request:', error);
    }
  };

  const handleDecline = async (id) => {
    try {
      // Update the status of the leave request to 'declined'
      console.log(`Leave request with ID ${id} accepted.`);
      // You would typically send a request to your backend to update the status
    } catch (error) {
        console.log('Error accepting leave request:',error);
     
    }
  };

  return (
    <div style={{marginTop:'20px'}}>
      <h1>Leave Requests</h1>
      <List
        itemLayout="horizontal"
        dataSource={leaveRequests}
        renderItem={request => (
          <List.Item>
            <List.Item.Meta
              title={<p>{request.employeeName} - {request.startDate} to {request.endDate}</p>}
            />
            <div>
              {request.status === 'pending' && (
                <>
                  <Button type="primary" onClick={() => handleAccept(request.id)} style={{ backgroundColor: 'green',marginRight: '10px'}}>Accept</Button>
                  <Button danger onClick={() => handleDecline(request.id)} style={{ backgroundColor: 'red',color:'white' }}>Decline</Button>
                </>
              )}
              {request.status === 'accepted' && <p>Status: Accepted</p>}
              {request.status === 'declined' && <p>Status: Declined</p>}
            </div>
          </List.Item>
        )}
      />
    </div>
  );
};

export default LeaveRequest;