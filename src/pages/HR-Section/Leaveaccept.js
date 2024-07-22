import React, { useState, useEffect } from "react";
import { Table, Button, Input, Avatar, Modal } from "antd";
import "antd/dist/antd.css";
import vector from "../../assets/images/vectorhr.png";
import axios from "axios";
import { baseUrlHr } from "../../url";

const { Search } = Input;

const LeaveRequest = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const token = localStorage.getItem("authToken");

  const fetchLeaveRequests = async () => {
    try {
      let response = await axios.get(`${baseUrlHr}/leave/list/`, {
        headers: { Authorization: `Token ${token}` },
      });

      console.log("response", response.data);

      if (response.status === 200) {
        setLeaveRequests(response.data);
        setFilteredRequests(response.data);
      }
    } catch (error) {
      console.error("Error fetching leave requests:", error);
    }
  };

  
  useEffect(() => {
    fetchLeaveRequests();
  }, []);

  const handleSearch = (value) => {
    const filtered = leaveRequests.filter((request) =>
      request.employeeName.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredRequests(filtered);
  };

  const handleAction = async (id, action) => {
    console.log(`Leave request with ID ${id} ${action}.`);

    let response = await axios.put(
      `${baseUrlHr}/leave/update/${id}/`,
      { status: action },
      {
        headers: { Authorization: `Token ${token}` },
      }
    );

    if (response.status === 200) {
      setLeaveRequests((prevRequests) =>
        prevRequests.map((request) =>
          request.id === id ? { ...request, status: action } : request
        )
      );
      setFilteredRequests((prevRequests) =>
        prevRequests.map((request) =>
          request.id === id ? { ...request, status: action } : request
        )
      );
    }
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
      title: <span style={{ fontSize: "20px" }}>S.No</span>,
      dataIndex: "id",
      key: "id",
      render: (text, record, index) => (
        <div style={{ fontSize: "16px" }}>{index + 1}</div>
      ),
    },
    {
      title: <span style={{ fontSize: "20px" }}>Candidate</span>,
      dataIndex: "name",
      key: "employeeName",
      render: (text, record) => (
        <div
          style={{ display: "flex", alignItems: "center", fontSize: "16px" }}
        >
          {/* <Avatar src={record.avatar} style={{ marginRight: 8 }} /> */}
          <div>
            <div
              style={{ cursor: "pointer", color: "blue" }}
              onClick={() => showModal(record)}
            >
              {text}
            </div>
            <div style={{ color: "gray" }}>{record.email}</div>
          </div>
        </div>
      ),
    },
    {
      title: <span style={{ fontSize: "20px" }}>Position</span>,
      dataIndex: "role",
      key: "position",
      render: (text, record) => (
        <div style={{ fontSize: "16px" }}>
          <div>{text}</div>
          <div style={{ color: "gray" }}>{record.team}</div>
        </div>
      ),
    },

    {
      title: <span style={{ fontSize: "20px" }}>Duration</span>,
      dataIndex: "duration_days",
      key: "duration",
      render: (text, record) => (
        <div style={{ fontSize: "16px" }}>{record.duration_days} Days</div>
      ),
    },
    {
      title: <span style={{ fontSize: "20px" }}>Status</span>,
      key: "status",
      dataIndex: "status",
      render: (text, record) => (
        <div style={{ fontSize: "16px" }}>
          {record.status === "Pending" ? (
            <div>
              <Button
                type="primary"
                onClick={() => handleAction(record.id, "Approved")}
                style={{
                  backgroundColor: "green",
                  marginRight: "10px",
                  fontSize: "16px",
                }}
              >
                Approve
              </Button>
              <Button
                danger
                onClick={() => handleAction(record.id, "Rejected")}
                style={{
                  backgroundColor: "red",
                  color: "white",
                  fontSize: "16px",
                }}
              >
                Reject
              </Button>
            </div>
          ) : (
            <span>
              {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
            </span>
          )}
        </div>
      ),
    },
  ];

  return (
    <div
      style={{
        padding: "50px",
        backgroundImage: `url(${vector})`,
        height: "800px",
      }}
    >
      <h1 style={{ fontSize: "30px", paddingBottom: "50px" }}>Request Leave</h1>
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
        style={{ fontSize: "20px" }} // Apply font size to the entire table
      />
      <Modal
        title="Leave Request Details"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {selectedRequest && (
          <div>
            <p>
              {selectedRequest.employeeName} is requesting leave for the
              following reason: {selectedRequest.description}.
            </p>
            {selectedRequest.workAssignedTo && (
              <p>
                During their absence, their work will be handled by{" "}
                {selectedRequest.workAssignedTo}.
              </p>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default LeaveRequest;
