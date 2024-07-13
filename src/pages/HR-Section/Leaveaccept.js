// // import React, { useState, useEffect } from 'react';
// // import { List, Button } from 'antd';
// // import 'antd/dist/antd.css';

// // const LeaveRequest = () => {
// //   const [leaveRequests, setLeaveRequests] = useState([]);

// //   useEffect(() => {
// //     fetchLeaveRequests();
// //   }, []);

// //   const fetchLeaveRequests = async () => {
// //     try {
// //       // Simulate fetching leave requests from the server
// //       const data = [
// //         { id: 1, employeeName: 'John Doe', startDate: '2024-05-15', endDate: '2024-05-20', status: 'pending' },
// //         { id: 2, employeeName: 'Jane Smith', startDate: '2024-05-17', endDate: '2024-05-22', status: 'pending' }
// //       ];
// //       setLeaveRequests(data);
// //     } catch (error) {
// //       console.error('Error fetching leave requests:', error);
// //     }
// //   };

// //   const handleAccept = async (id) => {
// //     try {
// //       // Update the status of the leave request to 'accepted'
// //       console.log(`Leave request with ID ${id} accepted.`);
// //       // You would typically send a request to your backend to update the status
// //     } catch (error) {
// //       console.error('Error accepting leave request:', error);
// //     }
// //   };

// //   const handleDecline = async (id) => {
// //     try {
// //       // Update the status of the leave request to 'declined'
// //       console.log(`Leave request with ID ${id} accepted.`);
// //       // You would typically send a request to your backend to update the status
// //     } catch (error) {
// //         console.log('Error accepting leave request:',error);
     
// //     }
// //   };

// //   return (
// //     <div style={{marginTop:'20px'}}>
// //       <h1>Leave Requests</h1>
// //       <List
// //         itemLayout="horizontal"
// //         dataSource={leaveRequests}
// //         renderItem={request => (
// //           <List.Item>
// //             <List.Item.Meta
// //               title={<p>{request.employeeName} - {request.startDate} to {request.endDate}</p>}
// //             />
// //             <div>
// //               {request.status === 'pending' && (
// //                 <>
// //                   <Button type="primary" onClick={() => handleAccept(request.id)} style={{ backgroundColor: 'green',marginRight: '10px'}}>Accept</Button>
// //                   <Button danger onClick={() => handleDecline(request.id)} style={{ backgroundColor: 'red',color:'white' }}>Decline</Button>
// //                 </>
// //               )}
// //               {request.status === 'accepted' && <p>Status: Accepted</p>}
// //               {request.status === 'declined' && <p>Status: Declined</p>}
// //             </div>
// //           </List.Item>
// //         )}
// //       />
// //     </div>
// //   );
// // };

// // export default LeaveRequest;

// import React, { useState, useEffect } from 'react';
// import { List, Button } from 'antd';
// import 'antd/dist/antd.css';

// const LeaveRequest = () => {
//   const [leaveRequests, setLeaveRequests] = useState([]);

//   useEffect(() => {
//     fetchLeaveRequests();
//   }, []);

//   const fetchLeaveRequests = async () => {
//     try {
//       // Simulate fetching leave requests from the server
//       const data = [
//         { id: 1, employeeName: 'John Doe', startDate: '2024-05-15', endDate: '2024-05-20', reason: 'Vacation', status: 'pending' },
//         { id: 2, employeeName: 'Jane Smith', startDate: '2024-05-17', endDate: '2024-05-22', reason: 'Medical', status: 'pending' }
//       ];
//       setLeaveRequests(data);
//     } catch (error) {
//       console.error('Error fetching leave requests:', error);
//     }
//   };

//   const handleAccept = async (id) => {
//     try {
//       // Update the status of the leave request to 'accepted'
//       console.log(`Leave request with ID ${id} accepted.`);
//       setLeaveRequests(prevRequests =>
//         prevRequests.map(request =>
//           request.id === id ? { ...request, status: 'accepted' } : request
//         )
//       );
//       // You would typically send a request to your backend to update the status
//     } catch (error) {
//       console.error('Error accepting leave request:', error);
//     }
//   };

//   const handleDecline = async (id) => {
//     try {
//       // Update the status of the leave request to 'declined'
//       console.log(`Leave request with ID ${id} declined.`);
//       setLeaveRequests(prevRequests =>
//         prevRequests.map(request =>
//           request.id === id ? { ...request, status: 'declined' } : request
//         )
//       );
//       // You would typically send a request to your backend to update the status
//     } catch (error) {
//       console.error('Error declining leave request:', error);
//     }
//   };

//   return (
//     <div style={{ marginTop: '20px' }}>
//       <h1>Leave Requests</h1>
//       <List
//         itemLayout="horizontal"
//         dataSource={leaveRequests}
//         renderItem={request => (
//           <List.Item>
//             <List.Item.Meta
//               title={<p>{request.employeeName}</p>}
//               description={
//                 <div>
//                   <p>Start Date: {request.startDate}</p>
//                   <p>End Date: {request.endDate}</p>
//                   <p>Reason: {request.reason}</p>
                  
//                 </div>
//               }
//             />
//             <div>
//               {request.status === 'pending' && (
//                 <>
//                   <Button
//                     type="primary"
//                     onClick={() => handleAccept(request.id)}
//                     style={{ backgroundColor: 'green', marginRight: '10px' }}
//                   >
//                     Accept
//                   </Button>
//                   <Button
//                     danger
//                     onClick={() => handleDecline(request.id)}
//                     style={{ backgroundColor: 'red', color: 'white' }}
//                   >
//                     Decline
//                   </Button>
//                 </>
//               )}
//               {request.status === 'accepted' && <p>Status: Accepted</p>}
//               {request.status === 'declined' && <p>Status: Declined</p>}
//             </div>
//           </List.Item>
//         )}
//       />
//     </div>
//   );
// };

// export default LeaveRequest;


import React, { useState, useEffect } from 'react';
import { Table, Button, Input, Avatar, Modal } from 'antd';
import 'antd/dist/antd.css';
import vector from '../../assets/images/vectorhr.png';

const { Search } = Input;

const LeaveRequest = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  useEffect(() => {
    fetchLeaveRequests();
  }, []);

  const fetchLeaveRequests = async () => {
    try {
      // Simulate fetching leave requests from the server
      const data = [
        { id: 1, employeeName: 'Samantha William', email: 'wills@mail.com', position: 'UI Designer', team: 'Product Design Team', leaveType: 'Personal Leave', startDate: 'January 1', endDate: 'January 7, 2022', status: 'pending', description: 'Family matters', avatar: 'https://via.placeholder.com/150', reasonForLeave: 'Family matters', workAssignedTo: 'John Doe' },
        { id: 2, employeeName: 'Jordan Nico', email: 'nico@mail.com', position: 'UI Designer', team: 'Product Design Team', leaveType: 'Personal Leave', startDate: 'January 1', endDate: 'January 7, 2022', status: 'pending', description: 'Vacation', avatar: 'https://via.placeholder.com/150', reasonForLeave: 'Vacation', workAssignedTo: 'Jane Doe' },
        { id: 3, employeeName: 'Nadila Adja', email: 'adja@mail.com', position: 'UI Designer', team: 'Product Design Team', leaveType: 'Personal Leave', startDate: 'January 1', endDate: 'January 7, 2022', status: 'pending', description: 'Health reasons', avatar: 'https://via.placeholder.com/150', reasonForLeave: 'Health reasons', workAssignedTo: '' },
      ];
      setLeaveRequests(data);
      setFilteredRequests(data);
    } catch (error) {
      console.error('Error fetching leave requests:', error);
    }
  };

  const handleSearch = (value) => {
    const filtered = leaveRequests.filter(request =>
      request.employeeName.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredRequests(filtered);
  };

  const handleAction = (id, action) => {
    console.log(`Leave request with ID ${id} ${action}.`);
    setLeaveRequests(prevRequests =>
      prevRequests.map(request =>
        request.id === id ? { ...request, status: action } : request
      )
    );
    setFilteredRequests(prevRequests =>
      prevRequests.map(request =>
        request.id === id ? { ...request, status: action } : request
      )
    );
  };

  const showModal = (record) => {
    setSelectedRequest(record);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: <span style={{ fontSize: '20px' }}>S.No</span>,
      dataIndex: 'id',
      key: 'id',
      render: (text, record, index) => <div style={{ fontSize: '16px' }}>{index + 1}</div>
    },
    {
      title: <span style={{ fontSize: '20px' }}>Candidate</span>,
      dataIndex: 'employeeName',
      key: 'employeeName',
      render: (text, record) => (
        <div style={{ display: 'flex', alignItems: 'center', fontSize: '16px' }}>
          <Avatar src={record.avatar} style={{ marginRight: 8 }} />
          <div>
            <div style={{ cursor: 'pointer', color: 'blue' }} onClick={() => showModal(record)}>
              {text}
            </div>
            <div style={{ color: 'gray' }}>{record.email}</div>
          </div>
        </div>
      )
    },
    {
      title: <span style={{ fontSize: '20px' }}>Position</span>,
      dataIndex: 'position',
      key: 'position',
      render: (text, record) => (
        <div style={{ fontSize: '16px' }}>
          <div>{text}</div>
          <div style={{ color: 'gray' }}>{record.team}</div>
        </div>
      )
    },
    {
      title: <span style={{ fontSize: '20px' }}>Leave Type</span>,
      dataIndex: 'leaveType',
      key: 'leaveType',
      render: text => <div style={{ fontSize: '16px' }}>{text}</div>
    },
    {
      title: <span style={{ fontSize: '20px' }}>Duration</span>,
      key: 'duration',
      render: (text, record) => (
        <div style={{ fontSize: '16px' }}>{record.startDate} - {record.endDate}</div>
      )
    },
    {
      title: <span style={{ fontSize: '20px' }}>Status</span>,
      key: 'status',
      render: (text, record) => (
        <div style={{ fontSize: '16px' }}>
          {record.status === 'pending' ? (
            <div>
              <Button
                type="primary"
                onClick={() => handleAction(record.id, 'approved')}
                style={{ backgroundColor: 'green', marginRight: '10px', fontSize: '16px' }}
              >
                Approve
              </Button>
              <Button
                danger
                onClick={() => handleAction(record.id, 'disapproved')}
                style={{ backgroundColor: 'red', color: 'white', fontSize: '16px' }}
              >
                Disapprove
              </Button>
            </div>
          ) : (
            <span>{record.status.charAt(0).toUpperCase() + record.status.slice(1)}</span>
          )}
        </div>
      )
    }
  ];

  return (
    <div style={{ padding: '50px',backgroundImage:`url(${vector})`,height:'800px' }}>
      <h1 style={{ fontSize: '30px', paddingBottom: '50px' }}>Request Leave</h1>
      <Search
        placeholder="Search by candidate name"
        onSearch={handleSearch}
        enterButton
        style={{ marginBottom: 20 }}
      />
      <Table
        columns={columns}
        dataSource={filteredRequests}
        rowKey="id"
        pagination={{ pageSize: 10 }}
        style={{ fontSize: '20px' }} // Apply font size to the entire table
      />
      <Modal
        title="Leave Request Details"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {selectedRequest && (
          <div>
            <p>{selectedRequest.employeeName} is requesting leave for the following reason: {selectedRequest.description}.</p>
            {selectedRequest.workAssignedTo && (
              <p>During their absence, their work will be handled by {selectedRequest.workAssignedTo}.</p>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default LeaveRequest;